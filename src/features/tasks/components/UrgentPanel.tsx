import { useToday } from '@/shared/lib/dates';
import { Card } from '@/shared/ui/Card';
import { isLate, selectUrgentTasks } from '../model/task';
import { useTaskStore } from '../store/task-store';

export function UrgentPanel() {
  // On sélectionne la donnée brute (même référence tant qu'elle ne change pas),
  // et on dérive pendant le rendu : ni nouveau tableau dans le sélecteur, ni effet.
  const tasks = useTaskStore((state) => state.tasks);
  const urgent = selectUrgentTasks(tasks);
  const today = useToday();

  if (urgent.length === 0) return null;

  return (
    <Card title={`Urgentes (${urgent.length})`} className="border-danger">
      <ul className="flex flex-col gap-1">
        {urgent.map((task) => (
          <li key={task.id}>
            {task.title}
            {isLate(task, today) && <span className="text-danger"> (en retard)</span>}
          </li>
        ))}
      </ul>
    </Card>
  );
}
