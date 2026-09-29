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

/** La ligne d'informations sous le titre d'une tâche. */
export function describeTask(task: Task): string {
  const parts = [`Priorité : ${PRIORITY_LABELS[task.priority].toLowerCase()}`];
  if (task.dueDate) {
    parts.push(`Échéance : ${formatDueDate(task.dueDate)}`);
  }
  return parts.join(' · ');
}
