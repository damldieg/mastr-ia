import type { Section } from '../data/roadmap.ts';

export type ProgressStatus = 'pending' | 'in-progress' | 'done' | 'skipped';

export interface SectionProgress {
  total: number;
  done: number;
  inProgress: number;
  skipped: number;
  counted: number;
  percent: number;
}

export function sectionProgress(
  section: Section,
  statuses: Record<string, ProgressStatus>
): SectionProgress {
  let done = 0;
  let inProgress = 0;
  let skipped = 0;

  for (const topic of section.topics) {
    const status = statuses[topic.id] ?? 'pending';
    if (status === 'done') done += 1;
    else if (status === 'in-progress') inProgress += 1;
    else if (status === 'skipped') skipped += 1;
  }

  const total = section.topics.length;
  const counted = total - skipped;
  const units = done + inProgress * 0.5;
  const percent = counted > 0 ? Math.round((units / counted) * 100) : 0;

  return { total, done, inProgress, skipped, counted, percent };
}

export interface GlobalProgress {
  total: number;
  done: number;
  inProgress: number;
  skipped: number;
  counted: number;
  percent: number;
}

export function globalProgress(
  sections: Section[],
  statuses: Record<string, ProgressStatus>
): GlobalProgress {
  let total = 0;
  let done = 0;
  let inProgress = 0;
  let skipped = 0;

  for (const section of sections) {
    const sp = sectionProgress(section, statuses);
    total += sp.total;
    done += sp.done;
    inProgress += sp.inProgress;
    skipped += sp.skipped;
  }

  const counted = total - skipped;
  const units = done + inProgress * 0.5;
  const percent = counted > 0 ? Math.round((units / counted) * 100) : 0;

  return { total, done, inProgress, skipped, counted, percent };
}
