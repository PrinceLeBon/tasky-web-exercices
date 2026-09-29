import { useRef, useState } from 'react';
import { Card } from '@/shared/ui/Card';
import { NewTaskForm } from '../components/NewTaskForm';
import { TaskFilters } from '../components/TaskFilters';
import { TaskList } from '../components/TaskList';
import { countRemaining, filterTasks, type Filter } from '../model/task';
import { formatCounter } from '../model/task-format';
import { useTaskStore } from '../store/task-store';

export function TasksPage() {
  const tasks = useTaskStore((state) => state.tasks);
  const add = useTaskStore((state) => state.add);
  const toggle = useTaskStore((state) => state.toggle);
  const remove = useTaskStore((state) => state.remove);
  const [filter, setFilter] = useState<Filter>('all');
  const listTitleRef = useRef<HTMLHeadingElement>(null);

  const visibleTasks = filterTasks(tasks, filter);

  return (
    <div className="grid items-start gap-6 md:grid-cols-[minmax(18rem,1fr)_2fr]">
      <Card title="Nouvelle tâche">
        <NewTaskForm onAdd={add} />
      </Card>
      <Card title="Liste des tâches" titleRef={listTitleRef}>
        <p className="mb-4 text-muted" aria-live="polite">{formatCounter(countRemaining(tasks))}</p>
        <TaskFilters current={filter} onChange={setFilter} />
        <TaskList
          tasks={visibleTasks}
          filter={filter}
          onToggle={toggle}
          onDelete={remove}
          fallbackFocusRef={listTitleRef}
        />
      </Card>
    </div>
  );
}
