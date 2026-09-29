import { cn } from '@/shared/lib/cn';
import { FILTER_LABELS, type Filter } from '../model/task';

const FILTERS: readonly Filter[] = ['all', 'active', 'done'];

type TaskFiltersProps = {
  current: Filter;
  onChange: (filter: Filter) => void;
};

export function TaskFilters({ current, onChange }: TaskFiltersProps) {
  return (
    <div role="group" aria-label="Filtrer les tâches" className="mb-4 flex flex-wrap gap-2">
      {FILTERS.map((filter) => (
        <button
          key={filter}
          type="button"
          aria-pressed={filter === current}
          onClick={() => onChange(filter)}
          className={cn(
            'rounded-full border border-line px-3 py-1 text-ink',
            'focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary',
            'aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-primary-contrast',
          )}
        >
          {FILTER_LABELS[filter]}
        </button>
      ))}
    </div>
  );
}
