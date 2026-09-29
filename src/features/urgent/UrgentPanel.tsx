import { useEffect, useState } from 'react';
import type { Task } from '@/features/tasks/model/task';
import { useTaskStore } from '@/features/tasks/store/task-store';

function byDueDate(a: any, b: any) {
  return (a.dueDate ?? '9999').localeCompare(b.dueDate ?? '9999');
}

export function UrgentPanel() {
  const urgent = useTaskStore((state) => state.tasks.filter((task) => task.priority == 'high' && !task.done));
  const [sorted, setSorted] = useState<Task[]>([]);

  useEffect(() => {
    setSorted([...urgent].sort(byDueDate));
  }, [urgent]);

  const today = new Date().toISOString().slice(0, 10);

  return (
    <section className="rounded-xl border border-red-300 bg-white p-6">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
        <img src="/favicon.svg" width={20} height={20} />
        Urgentes ({sorted.length})
      </h2>
      <ul className="flex flex-col gap-1">
        {sorted.map((task, index) => (
          <li key={index} className="text-gray-900">
            {task.title}
            {task.dueDate && task.dueDate < today && <span className="text-red-600"> (en retard)</span>}
          </li>
        ))}
      </ul>
    </section>
  );
}
