import type { Ref } from 'react';
import { Button } from '@/shared/ui/Button';
import type { Priority, Task } from '../model/task';
import { describeTask } from '../model/task-format';

const ACCENT_CLASSES: Record<Priority, string> = {
  low: 'border-l-priority-low',
  medium: 'border-l-priority-medium',
  high: 'border-l-priority-high',
};

type TaskItemProps = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  checkboxRef?: Ref<HTMLInputElement>;
};

export function TaskItem({ task, onToggle, onDelete, checkboxRef }: TaskItemProps) {
  const checkboxId = `task-${task.id}`;

  return (
    <article
      className={`grid grid-cols-[auto_1fr_auto] items-center gap-x-3 gap-y-1 rounded-md border border-l-4 border-line bg-surface px-4 py-3 ${ACCENT_CLASSES[task.priority]}`}
    >
      <input
        ref={checkboxRef}
        id={checkboxId}
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
        className="peer size-5 accent-primary"
      />
      <label
        htmlFor={checkboxId}
        className="min-w-0 cursor-pointer font-medium [overflow-wrap:anywhere] peer-checked:text-muted peer-checked:line-through"
      >
        {task.title}
      </label>
      <Button variant="ghost" size="sm" aria-label={`Supprimer la tâche ${task.title}`} onClick={() => onDelete(task.id)}>
        <span aria-hidden="true">🗑️</span>
      </Button>
      <p className="col-start-2 text-sm text-muted">{describeTask(task)}</p>
    </article>
  );
}
