import { describe, expect, it } from 'vitest';
import type { Section } from '../data/roadmap.ts';
import { activeFilterCount, clearFilters, filterSections } from './filters.ts';
import type { ProgressStatus } from './progress.ts';

function assertDefined<T>(value: T | undefined): T {
  if (value === undefined) throw new Error('Expected defined value');
  return value;
}

const sections: Section[] = [
  {
    id: 's1',
    title: 'S1',
    goal: 'g',
    topics: [
      { id: 'a', title: 'A', priority: 'core', summary: '', whyForMe: '', exercise: '', sources: [], fromRoadmapSh: true },
      { id: 'b', title: 'B', priority: 'recommended', summary: '', whyForMe: '', exercise: '', sources: [], fromRoadmapSh: true },
      { id: 'c', title: 'C', priority: 'optional', summary: '', whyForMe: '', exercise: '', sources: [], fromRoadmapSh: true },
    ],
  },
  {
    id: 's2',
    title: 'S2',
    goal: 'g',
    topics: [
      { id: 'd', title: 'D', priority: 'core', summary: '', whyForMe: '', exercise: '', sources: [], fromRoadmapSh: true },
    ],
  },
];

const statuses: Record<string, ProgressStatus> = {
  a: 'done',
  b: 'in-progress',
  c: 'pending',
  d: 'skipped',
};

describe('filterSections', () => {
  it('returns all sections when filters are empty', () => {
    const result = filterSections(sections, statuses, clearFilters());
    expect(result).toHaveLength(2);
    expect(assertDefined(result[0]).topics).toHaveLength(3);
  });

  it('filters by priority', () => {
    const result = filterSections(sections, statuses, {
      priorities: ['core'],
      statuses: [],
      hideOptional: false,
    });
    expect(result.flatMap((s) => s.topics).map((t) => t.id)).toEqual(['a', 'd']);
  });

  it('filters by status defaulting missing ids to pending', () => {
    const result = filterSections(sections, statuses, {
      priorities: [],
      statuses: ['pending'],
      hideOptional: false,
    });
    expect(result.flatMap((s) => s.topics).map((t) => t.id)).toEqual(['c']);
  });

  it('AND-combines priority and status', () => {
    const result = filterSections(sections, statuses, {
      priorities: ['core'],
      statuses: ['done'],
      hideOptional: false,
    });
    expect(result.flatMap((s) => s.topics).map((t) => t.id)).toEqual(['a']);
  });

  it('hides optional topics', () => {
    const result = filterSections(sections, statuses, {
      priorities: [],
      statuses: [],
      hideOptional: true,
    });
    expect(assertDefined(result[0]).topics.map((t) => t.id)).toEqual(['a', 'b']);
  });

  it('prunes empty sections', () => {
    const result = filterSections(sections, statuses, {
      priorities: ['recommended'],
      statuses: [],
      hideOptional: false,
    });
    expect(result).toHaveLength(1);
    expect(assertDefined(result[0]).id).toBe('s1');
  });
});

describe('activeFilterCount', () => {
  it('counts active dimensions', () => {
    expect(activeFilterCount(clearFilters())).toBe(0);
    expect(
      activeFilterCount({ priorities: ['core'], statuses: ['done'], hideOptional: true })
    ).toBe(3);
  });
});
