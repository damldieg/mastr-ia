import { describe, expect, it } from 'vitest';
import type { Section } from '../data/roadmap.ts';
import { globalProgress, sectionProgress, type ProgressStatus } from './progress.ts';

const section: Section = {
  id: 's1',
  title: 'Test section',
  goal: 'Test',
  topics: [
    { id: 'a', title: 'A', priority: 'core', summary: '', whyForMe: '', exercise: '', sources: [], fromRoadmapSh: true },
    { id: 'b', title: 'B', priority: 'core', summary: '', whyForMe: '', exercise: '', sources: [], fromRoadmapSh: true },
    { id: 'c', title: 'C', priority: 'recommended', summary: '', whyForMe: '', exercise: '', sources: [], fromRoadmapSh: true },
    { id: 'd', title: 'D', priority: 'optional', summary: '', whyForMe: '', exercise: '', sources: [], fromRoadmapSh: true },
  ],
};

describe('sectionProgress', () => {
  it('returns 0% for an empty section', () => {
    const empty: Section = { ...section, topics: [] };
    expect(sectionProgress(empty, {})).toEqual({
      total: 0,
      done: 0,
      inProgress: 0,
      skipped: 0,
      counted: 0,
      percent: 0,
    });
  });

  it('returns 0% when nothing is done', () => {
    expect(sectionProgress(section, {})).toEqual({
      total: 4,
      done: 0,
      inProgress: 0,
      skipped: 0,
      counted: 4,
      percent: 0,
    });
  });

  it('weights in-progress as half', () => {
    const statuses: Record<string, ProgressStatus> = {
      a: 'done',
      b: 'in-progress',
    };
    expect(sectionProgress(section, statuses)).toEqual({
      total: 4,
      done: 1,
      inProgress: 1,
      skipped: 0,
      counted: 4,
      percent: 38,
    });
  });

  it('excludes skipped items from the denominator', () => {
    const statuses: Record<string, ProgressStatus> = {
      a: 'done',
      d: 'skipped',
    };
    expect(sectionProgress(section, statuses)).toEqual({
      total: 4,
      done: 1,
      inProgress: 0,
      skipped: 1,
      counted: 3,
      percent: 33,
    });
  });

  it('reaches 100% when all counted items are done', () => {
    const statuses: Record<string, ProgressStatus> = {
      a: 'done',
      b: 'done',
      c: 'done',
      d: 'skipped',
    };
    expect(sectionProgress(section, statuses).percent).toBe(100);
  });
});

describe('globalProgress', () => {
  it('aggregates across sections', () => {
    const second: Section = {
      ...section,
      id: 's2',
      topics: section.topics.slice(0, 2).map((t, i) => ({ ...t, id: `s2-${String(i)}` })),
    };
    const sections: Section[] = [section, second];
    const statuses: Record<string, ProgressStatus> = {
      a: 'done',
      b: 'done',
    };
    const result = globalProgress(sections, statuses);
    expect(result.total).toBe(6);
    expect(result.done).toBe(2);
    expect(result.percent).toBe(33);
  });

  it('returns 0% for an empty roadmap', () => {
    expect(globalProgress([], {})).toEqual({
      total: 0,
      done: 0,
      inProgress: 0,
      skipped: 0,
      counted: 0,
      percent: 0,
    });
  });
});
