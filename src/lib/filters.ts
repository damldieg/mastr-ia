import type { Section, Priority } from '../data/roadmap.ts';
import type { ProgressStatus } from './progress.ts';

export interface FilterState {
  priorities: Priority[];
  statuses: ProgressStatus[];
  hideOptional: boolean;
}

export function clearFilters(): FilterState {
  return {
    priorities: [],
    statuses: [],
    hideOptional: false,
  };
}

export function filterSections(
  sections: Section[],
  statuses: Record<string, ProgressStatus>,
  filter: FilterState
): Section[] {
  const prioritySet = new Set(filter.priorities);
  const statusSet = new Set(filter.statuses);

  return sections
    .map((section) => ({
      ...section,
      topics: section.topics.filter((topic) => {
        if (filter.hideOptional && topic.priority === 'optional') {
          return false;
        }
        if (prioritySet.size > 0 && !prioritySet.has(topic.priority)) {
          return false;
        }
        if (statusSet.size > 0) {
          const status = statuses[topic.id] ?? 'pending';
          if (!statusSet.has(status)) {
            return false;
          }
        }
        return true;
      }),
    }))
    .filter((section) => section.topics.length > 0);
}

export function activeFilterCount(filter: FilterState): number {
  return (
    filter.priorities.length + filter.statuses.length + (filter.hideOptional ? 1 : 0)
  );
}
