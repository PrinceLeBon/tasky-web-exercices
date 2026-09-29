import { useRef, type RefObject } from 'react';
import type { Filter, Task } from '../model/task';
import { TaskItem } from './TaskItem';

type TaskListProps = {
  tasks: readonly Task[];
  filter: Filter;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  fallbackFocusRef: RefObject<HTMLElement | null>;
};

export function TaskList({ tasks, filter, onToggle, onDelete, fallbackFocusRef }: TaskListProps) {
  const checkboxes = useRef(new Map<string, HTMLInputElement>());

  // Avant qu'une tâche quitte la liste : la suivante, sinon la précédente, sinon le titre (leçon 7.7)
  function moveFocusAwayFrom(id: string) {
    const index = tasks.findIndex((task) => task.id === id);
    const neighbour = tasks[index + 1] ?? tasks[index - 1];
    const target = neighbour ? checkboxes.current.get(neighbour.id) : fallbackFocusRef.current;
    target?.focus();
  }

  function handleDelete(id: string) {
    moveFocusAwayFrom(id);
    onDelete(id);
  }

  function handleToggle(id: string) {
    if (filter !== 'all') moveFocusAwayFrom(id);
    onToggle(id);
  }

  if (tasks.length === 0) {
    return (
      <p className="rounded-md border border-dashed border-line p-6 text-center text-muted">
        {filter === 'all' ? 'Aucune tâche pour le moment. Ajoutez-en une !' : 'Aucune tâche ne correspond à ce filtre.'}
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskItem
            task={task}
            onToggle={handleToggle}
            onDelete={handleDelete}
            checkboxRef={(node) => {
              if (!node) return;
              checkboxes.current.set(task.id, node);
              return () => {
                checkboxes.current.delete(task.id);
              };
            }}
          />
        </li>
      ))}
    </ul>
  );
}
