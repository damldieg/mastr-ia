import type { FilterState } from '../lib/filters.ts';
import type { UseThemeResult } from '../hooks/useTheme.ts';
import { FilterBar } from './FilterBar.tsx';
import { ProgressBar } from './ProgressBar.tsx';

interface RoadmapHeaderProps {
  title: string;
  globalPercent: number;
  filter: FilterState;
  onFilterChange: (filter: FilterState) => void;
  resultCount: number;
  totalCount: number;
  theme: UseThemeResult;
}

export function RoadmapHeader({
  title,
  globalPercent,
  filter,
  onFilterChange,
  resultCount,
  totalCount,
  theme,
}: RoadmapHeaderProps) {
  const toggleTheme = () => {
    theme.setTheme(theme.resolved === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <h1 className="site-title">{title}</h1>
        <div className="global-progress">
          <ProgressBar
            value={globalPercent}
            label={`${String(globalPercent)}%`}
            ariaLabel="Progreso global del roadmap"
          />
        </div>
        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Cambiar tema. Actual: ${theme.resolved === 'dark' ? 'oscuro' : 'claro'}`}
        >
          {theme.resolved === 'dark' ? '☀️ Claro' : '🌙 Oscuro'}
        </button>
      </div>
      <div className="container">
        <FilterBar
          filter={filter}
          onChange={onFilterChange}
          resultCount={resultCount}
          totalCount={totalCount}
        />
      </div>
    </header>
  );
}
