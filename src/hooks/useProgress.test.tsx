import { describe, expect, it, vi } from 'vitest';
import { renderToString } from 'react-dom/server';
import { createElement } from 'react';
import { getAllTopicIds } from '../data/roadmap.ts';
import { PROGRESS_KEY, ProgressStore, type StorageLike, useProgress } from './useProgress.ts';

function assertDefined<T>(value: T | undefined): T {
  if (value === undefined) throw new Error('Expected defined value');
  return value;
}

function makeStorage(initial: Record<string, string> = {}): StorageLike {
  const data = new Map<string, string>(Object.entries(initial));
  return {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => data.set(key, value),
    removeItem: (key: string) => data.delete(key),
  };
}

const validIds = new Set(['t1', 't2', 't3']);

describe('ProgressStore', () => {
  it('returns empty object when storage is empty', () => {
    const store = new ProgressStore(makeStorage(), validIds);
    expect(store.getSnapshot()).toEqual({});
    expect(store.isReady).toBe(true);
  });

  it('parses valid stored progress', () => {
    const storage = makeStorage({
      [PROGRESS_KEY]: JSON.stringify({ t1: 'done', t2: 'in-progress' }),
    });
    const store = new ProgressStore(storage, validIds);
    expect(store.getSnapshot()).toEqual({ t1: 'done', t2: 'in-progress' });
  });

  it('returns empty object for corrupt JSON', () => {
    const storage = makeStorage({ [PROGRESS_KEY]: 'not-json' });
    const store = new ProgressStore(storage, validIds);
    expect(store.getSnapshot()).toEqual({});
  });

  it('coerces invalid values to pending', () => {
    const storage = makeStorage({
      [PROGRESS_KEY]: JSON.stringify({ t1: 'done', t2: 'bogus', t3: 123 }),
    });
    const store = new ProgressStore(storage, validIds);
    expect(store.getSnapshot()).toEqual({ t1: 'done', t2: 'pending', t3: 'pending' });
  });

  it('drops unknown ids', () => {
    const storage = makeStorage({
      [PROGRESS_KEY]: JSON.stringify({ t1: 'done', unknown: 'skipped' }),
    });
    const store = new ProgressStore(storage, validIds);
    expect(store.getSnapshot()).toEqual({ t1: 'done' });
  });

  it('persists setStatus and notifies listeners', () => {
    const storage = makeStorage();
    const store = new ProgressStore(storage, validIds);
    const listener = vi.fn();
    store.subscribe(listener);
    store.setStatus('t1', 'done');
    expect(store.getSnapshot()).toEqual({ t1: 'done' });
    expect(storage.getItem(PROGRESS_KEY)).toBe(JSON.stringify({ t1: 'done' }));
    expect(listener).toHaveBeenCalled();
  });

  it('ignores invalid ids and statuses', () => {
    const storage = makeStorage();
    const store = new ProgressStore(storage, validIds);
    store.setStatus('unknown', 'done');
    // @ts-expect-error testing invalid status
    store.setStatus('t1', 'invalid');
    expect(store.getSnapshot()).toEqual({});
  });

  it('reset clears state and storage', () => {
    const storage = makeStorage({
      [PROGRESS_KEY]: JSON.stringify({ t1: 'done' }),
    });
    const store = new ProgressStore(storage, validIds);
    store.reset();
    expect(store.getSnapshot()).toEqual({});
    expect(storage.getItem(PROGRESS_KEY)).toBeNull();
  });

  it('syncs on storage events', () => {
    const storage = makeStorage();
    const store = new ProgressStore(storage, validIds);
    const listener = vi.fn();
    store.subscribe(listener);

    storage.setItem(PROGRESS_KEY, JSON.stringify({ t1: 'skipped' }));
    store.handleStorageEvent({ key: PROGRESS_KEY } as StorageEvent);

    expect(store.getSnapshot()).toEqual({ t1: 'skipped' });
    expect(listener).toHaveBeenCalled();
  });

  it('keeps working when storage throws', () => {
    const brokenStorage: StorageLike = {
      getItem: () => {
        throw new Error('read error');
      },
      setItem: () => {
        throw new Error('write error');
      },
      removeItem: () => {
        throw new Error('remove error');
      },
    };
    const store = new ProgressStore(brokenStorage, validIds);
    expect(store.getSnapshot()).toEqual({});
    expect(() => {
      store.setStatus('t1', 'done');
    }).not.toThrow();
    expect(() => {
      store.reset();
    }).not.toThrow();
  });
});

describe('useProgress hook', () => {
  it('renders with stored progress via server snapshot', () => {
    const ids = getAllTopicIds();
    const idA = assertDefined(ids[0]);
    const idB = assertDefined(ids[1]);
    const storage = makeStorage({
      [PROGRESS_KEY]: JSON.stringify({ [idA]: 'done', [idB]: 'skipped' }),
    });

    function Test() {
      const progress = useProgress(storage);
      return <output>{JSON.stringify(progress.statuses)}</output>;
    }

    const html = renderToString(createElement(Test));
    expect(html).toContain(`&quot;${idA}&quot;:&quot;done&quot;`);
    expect(html).toContain(`&quot;${idB}&quot;:&quot;skipped&quot;`);
  });
});
