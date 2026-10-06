import { describe, expect, it, vi } from 'vitest';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { THEME_KEY, ThemeStore, type MatchMediaLike, useTheme } from './useTheme.ts';
import type { StorageLike } from './useProgress.ts';

function makeStorage(initial: Record<string, string> = {}): StorageLike {
  const data = new Map<string, string>(Object.entries(initial));
  return {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => data.set(key, value),
    removeItem: (key: string) => data.delete(key),
  };
}

function makeMatchMedia(matches: boolean): MatchMediaLike & { fire: () => void } {
  const state = { matches };
  const listeners = new Set<() => void>();
  return {
    get matches() {
      return state.matches;
    },
    set matches(value: boolean) {
      state.matches = value;
    },
    addEventListener: (_type: 'change', listener: () => void) => {
      listeners.add(listener);
    },
    removeEventListener: (_type: 'change', listener: () => void) => {
      listeners.delete(listener);
    },
    fire: () => {
      for (const listener of listeners) {
        listener();
      }
    },
  };
}

describe('ThemeStore', () => {
  it('defaults to system and resolves to light', () => {
    const store = new ThemeStore(makeStorage(), () => makeMatchMedia(false));
    expect(store.getSnapshot()).toEqual({ theme: 'system', resolved: 'light' });
    store.destroy();
  });

  it('resolves to dark when system prefers dark', () => {
    const store = new ThemeStore(makeStorage(), () => makeMatchMedia(true));
    expect(store.getSnapshot()).toEqual({ theme: 'system', resolved: 'dark' });
    store.destroy();
  });

  it('reads and persists a stored theme', () => {
    const storage = makeStorage({ [THEME_KEY]: 'dark' });
    const store = new ThemeStore(storage, () => makeMatchMedia(false));
    expect(store.getSnapshot().theme).toBe('dark');

    store.setTheme('light');
    expect(storage.getItem(THEME_KEY)).toBe('light');
    expect(store.getSnapshot()).toEqual({ theme: 'light', resolved: 'light' });
    store.destroy();
  });

  it('falls back to system for invalid stored values', () => {
    const storage = makeStorage({ [THEME_KEY]: 'purple' });
    const store = new ThemeStore(storage, () => makeMatchMedia(false));
    expect(store.getSnapshot().theme).toBe('system');
    store.destroy();
  });

  it('notifies listeners on change', () => {
    const store = new ThemeStore(makeStorage(), () => makeMatchMedia(false));
    const listener = vi.fn();
    store.subscribe(listener);
    store.setTheme('dark');
    expect(listener).toHaveBeenCalled();
    store.destroy();
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
    const store = new ThemeStore(brokenStorage, () => makeMatchMedia(false));
    expect(store.getSnapshot()).toEqual({ theme: 'system', resolved: 'light' });
    expect(() => {
      store.setTheme('dark');
    }).not.toThrow();
    store.destroy();
  });

  it('caches snapshot identity across calls', () => {
    const store = new ThemeStore(makeStorage(), () => makeMatchMedia(false));
    expect(store.getSnapshot()).toBe(store.getSnapshot());
    expect(store.getServerSnapshot()).toBe(store.getSnapshot());
    store.destroy();
  });

  it('bumps snapshot reference only when state changes', () => {
    const store = new ThemeStore(makeStorage(), () => makeMatchMedia(false));
    const before = store.getSnapshot();
    expect(before).toEqual({ theme: 'system', resolved: 'light' });

    store.setTheme('dark');
    const after = store.getSnapshot();
    expect(after).not.toBe(before);
    expect(after).toEqual({ theme: 'dark', resolved: 'dark' });
    expect(store.getSnapshot()).toBe(after);
    store.destroy();
  });

  it('updates snapshot reference on media-query change', () => {
    const media = makeMatchMedia(false);
    const store = new ThemeStore(makeStorage(), () => media);
    const before = store.getSnapshot();
    expect(before).toEqual({ theme: 'system', resolved: 'light' });

    media.matches = true;
    media.fire();
    const after = store.getSnapshot();
    expect(after).not.toBe(before);
    expect(after).toEqual({ theme: 'system', resolved: 'dark' });
    expect(store.getSnapshot()).toBe(after);
    store.destroy();
  });
});

describe('useTheme hook', () => {
  it('renders the resolved theme via server snapshot', () => {
    const storage = makeStorage({ [THEME_KEY]: 'dark' });

    function Test() {
      const theme = useTheme(storage, () => makeMatchMedia(false));
      return (
        <output>
          {theme.theme}-{theme.resolved}
        </output>
      );
    }

    const html = renderToString(createElement(Test));
    expect(html).toMatch(/dark.*dark/);
  });
});
