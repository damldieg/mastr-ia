import { useEffect, useState, useSyncExternalStore } from 'react';
import { getAllTopicIds } from '../data/roadmap.ts';
import type { ProgressStatus } from '../lib/progress.ts';

export const PROGRESS_KEY = 'ai-engineer-roadmap:v1:progress';
export const VALID_STATUSES: readonly ProgressStatus[] = [
  'pending',
  'in-progress',
  'done',
  'skipped',
];

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

function isValidStatus(value: unknown): value is ProgressStatus {
  return typeof value === 'string' && (VALID_STATUSES as readonly string[]).includes(value);
}

function safeRead(
  storage: StorageLike | null,
  validIds: Set<string>
): Record<string, ProgressStatus> {
  if (!storage) return {};
  try {
    const raw = storage.getItem(PROGRESS_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) return {};
    const result: Record<string, ProgressStatus> = {};
    for (const [id, value] of Object.entries(parsed as Record<string, unknown>)) {
      if (!validIds.has(id)) continue;
      result[id] = isValidStatus(value) ? value : 'pending';
    }
    return result;
  } catch {
    return {};
  }
}

export class ProgressStore {
  private listeners = new Set<() => void>();
  private _statuses: Record<string, ProgressStatus> = {};
  private _ready = false;
  private readonly storage: StorageLike | null;
  private readonly validIds: Set<string>;

  constructor(storage: StorageLike | null, validIds: Set<string>) {
    this.storage = storage;
    this.validIds = validIds;
    this.read();
  }

  private read(): void {
    this._statuses = safeRead(this.storage, this.validIds);
    this._ready = true;
  }

  private notify(): void {
    for (const listener of this.listeners) {
      listener();
    }
  }

  private persist(): void {
    if (!this.storage) return;
    try {
      this.storage.setItem(PROGRESS_KEY, JSON.stringify(this._statuses));
    } catch {
      // Fail-soft: progress keeps working even if storage throws.
    }
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  getSnapshot(): Record<string, ProgressStatus> {
    return this._statuses;
  }

  getServerSnapshot(): Record<string, ProgressStatus> {
    return this._statuses;
  }

  setStatus(id: string, status: ProgressStatus): void {
    if (!this.validIds.has(id) || !isValidStatus(status)) return;
    this._statuses = { ...this._statuses, [id]: status };
    this.persist();
    this.notify();
  }

  reset(): void {
    this._statuses = {};
    if (this.storage) {
      try {
        this.storage.removeItem(PROGRESS_KEY);
      } catch {
        // Fail-soft.
      }
    }
    this.notify();
  }

  handleStorageEvent(event: StorageEvent): void {
    if (event.key === PROGRESS_KEY) {
      this.read();
      this.notify();
    }
  }

  get isReady(): boolean {
    return this._ready;
  }
}

export interface UseProgressResult {
  statuses: Record<string, ProgressStatus>;
  setStatus: (id: string, status: ProgressStatus) => void;
  reset: () => void;
  isReady: boolean;
}

export function useProgress(
  storage: StorageLike | null =
    typeof window !== 'undefined' ? window.localStorage : null
): UseProgressResult {
  const [store] = useState(
    () => new ProgressStore(storage, new Set(getAllTopicIds()))
  );

  const statuses = useSyncExternalStore(
    (listener) => store.subscribe(listener),
    () => store.getSnapshot(),
    () => store.getServerSnapshot()
  );

  useEffect(() => {
    if (typeof window === 'undefined' || storage !== window.localStorage) return;
    const handler = (event: StorageEvent): void => {
      store.handleStorageEvent(event);
    };
    window.addEventListener('storage', handler);
    return (): void => {
      window.removeEventListener('storage', handler);
    };
  }, [storage, store]);

  return {
    statuses,
    setStatus: store.setStatus.bind(store),
    reset: store.reset.bind(store),
    isReady: store.isReady,
  };
}
