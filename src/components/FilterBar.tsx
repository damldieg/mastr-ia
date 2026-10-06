import type { Priority } from '../data/roadmap.ts';
import type { ProgressStatus } from '../lib/progress.ts';
import type { FilterState } from '../lib/filters.ts';

const PRIORITIES: Priority[] = ['core', 'recommended', 'optional'];
const STATUSES: ProgressStatus[] = ['pending', 'in-progress', 'done', 'skipped'];

const STATUS_LABELS: Record<ProgressStatus, string> = {
  pending: 'Pendiente',
  'in-progress': 'En curso',
  done: 'Hecho',
  skipped: 'Saltado',
};

interface FilterBarProps {
  filter: FilterState;
  onChange: (filter: FilterState) => void;
  resultCount: number;
  totalCount: number;
}

export function FilterBar({ filter, onChange, resultCount, totalCount }: FilterBarProps) {
  const togglePriority = (priority: Priority) => {
    const priorities = filter.priorities.includes(priority)
      ? filter.priorities.filter((p) => p !== priority)
      : [...filter.priorities, priority];
    onChange({ ...filter, priorities });
  };

  const toggleStatus = (status: ProgressStatus) => {
    const statuses = filter.statuses.includes(status)
      ? filter.statuses.filter((s) => s !== status)
      : [...filter.statuses, status];
    onChange({ ...filter, statuses });
  };

  const clear = () => {
    onChange({ priorities: [], statuses: [], hideOptional: false });
  };

  const hasFilters =
    filter.priorities.length > 0 || filter.statuses.length > 0 || filter.hideOptional;

  return (
    <div className="filter-bar" role="search" aria-label="Filtros del roadmap">
      <div className="filter-group">
        <span className="filter-group__title">Prioridad</span>
        <div className="filter-options">
          {PRIORITIES.map((priority) => (
            <label key={priority} className="filter-chip">
              <input
                type="checkbox"
                checked={filter.priorities.includes(priority)}
                onChange={() => {
                  togglePriority(priority);
                }}
              />
              {priority}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <span className="filter-group__title">Estado</span>
        <div className="filter-options">
          {STATUSES.map((status) => (
            <label key={status} className="filter-chip">
              <input
                type="checkbox"
                checked={filter.statuses.includes(status)}
                onChange={() => {
                  toggleStatus(status);
                }}
              />
              {STATUS_LABELS[status]}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-actions">
        <label className="filter-chip">
          <input
            type="checkbox"
            checked={filter.hideOptional}
            onChange={() => {
              onChange({ ...filter, hideOptional: !filter.hideOptional });
            }}
          />
          Ocultar optional
        </label>

        <span className="filter-count">
          {resultCount} / {totalCount}
        </span>

        {hasFilters && (
          <button type="button" className="button" onClick={clear}>
            Limpiar
          </button>
        )}
      </div>
    </div>
  );
}
