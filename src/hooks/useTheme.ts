import { useState, useSyncExternalStore } from 'react';
import type { StorageLike } from './useProgress.ts';

export const THEME_KEY = 'ai-engineer-roadmap:v1:theme';
export type Theme = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

export interface ThemeState {
  theme: Theme;
  resolved: ResolvedTheme;
}

export interface MatchMediaLike {
  matches: boolean;
  addEventListener(type: 'change', listener: () => void): void;
  removeEventListener(type: 'change', listener: () => void): void;
}

const VALID_THEMES: readonly Theme[] = ['light', 'dark', 'system'];

function isValidTheme(value: unknown): value is Theme {
  return typeof value === 'string' && (VALID_THEMES as readonly string[]).includes(value);
}

export function resolveTheme(theme: Theme, darkQuery: MatchMediaLike): ResolvedTheme {
  if (theme !== 'system') return theme;
  return darkQuery.matches ? 'dark' : 'light';
}

export class ThemeStore {
  private listeners = new Set<() => void>();
  private readonly storage: StorageLike | null;
  private _theme: Theme;
  private _resolved: ResolvedTheme;
  private _state: ThemeState;
  private darkQuery: MatchMediaLike;
  private handleChange: () => void;

  constructor(
    storage: StorageLike | null,
    matchMediaFn: (query: string) => MatchMediaLike
  ) {
    this.storage = storage;
    this._theme = this.readStoredTheme();
    this.darkQuery = matchMediaFn('(prefers-color-scheme: dark)');
    this._resolved = resolveTheme(this._theme, this.darkQuery);
    this._state = { theme: this._theme, resolved: this._resolved };
    this.handleChange = () => {
      this._resolved = resolveTheme(this._theme, this.darkQuery);
      this._state = { theme: this._theme, resolved: this._resolved };
      this.apply();
      this.notify();
    };
    this.darkQuery.addEventListener('change', this.handleChange);
    this.apply();
  }

  private readStoredTheme(): Theme {
    if (!this.storage) return 'system';
    try {
      const stored = this.storage.getItem(THEME_KEY);
      if (isValidTheme(stored)) return stored;
    } catch {
      // Fail-soft.
    }
    return 'system';
  }

  private persist(): void {
    if (!this.storage) return;
    try {
      this.storage.setItem(THEME_KEY, this._theme);
    } catch {
      // Fail-soft.
    }
  }

  private apply(): void {
    if (typeof document === 'undefined') return;
    document.documentElement.setAttribute('data-theme', this._resolved);
    document.documentElement.style.colorScheme = this._resolved;
  }

  private notify(): void {
    for (const listener of this.listeners) {
      listener();
    }
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  getSnapshot(): ThemeState {
    return this._state;
  }

  getServerSnapshot(): ThemeState {
    return this._state;
  }

  setTheme(theme: Theme): void {
    if (!isValidTheme(theme)) return;
    this._theme = theme;
    this._resolved = resolveTheme(theme, this.darkQuery);
    this._state = { theme: this._theme, resolved: this._resolved };
    this.persist();
    this.apply();
    this.notify();
  }

  destroy(): void {
    this.darkQuery.removeEventListener('change', this.handleChange);
  }
}

export interface UseThemeResult extends ThemeState {
  setTheme: (theme: Theme) => void;
}

export function useTheme(
  storage: StorageLike | null =
    typeof window !== 'undefined' ? window.localStorage : null,
  matchMediaFn: (query: string) => MatchMediaLike =
    typeof window !== 'undefined'
      ? (query: string) => window.matchMedia(query)
      : () => ({
          matches: false,
          addEventListener: () => {
            return undefined;
          },
          removeEventListener: () => {
            return undefined;
          },
        })
): UseThemeResult {
  const [store] = useState(() => new ThemeStore(storage, matchMediaFn));

  const state = useSyncExternalStore(
    (listener) => store.subscribe(listener),
    () => store.getSnapshot(),
    () => store.getServerSnapshot()
  );

  return {
    ...state,
    setTheme: store.setTheme.bind(store),
  };
}
