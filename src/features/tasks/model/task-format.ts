import { PRIORITY_LABELS, type Task } from './task';

const DATE_FORMAT = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

/** « 2026-10-02 » → « 2 octobre 2026 ». Le jour est lu comme une date locale. */
export function formatDueDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number);
  return DATE_FORMAT.format(new Date(year, month - 1, day));
}

export function formatCounter(remaining: number): string {
  if (remaining === 0) return 'Aucune tâche restante';
  if (remaining === 1) return '1 tâche restante';
  return `${remaining} tâches restantes`;
}

/** La ligne d'informations sous le titre d'une tâche. `today` : le jour local, « AAAA-MM-JJ ». */
export function describeTask(task: Task, today: string): string {
  const parts = [`Priorité : ${PRIORITY_LABELS[task.priority].toLowerCase()}`];
  if (task.dueDate) {
    const isLate = !task.done && task.dueDate < today;
    parts.push(`Échéance : ${formatDueDate(task.dueDate)}${isLate ? ' (en retard)' : ''}`);
  }
  return parts.join(' · ');
}
