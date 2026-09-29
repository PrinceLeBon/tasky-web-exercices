export const PRIORITIES = ['low', 'medium', 'high'] as const;
export type Priority = (typeof PRIORITIES)[number];

export const CATEGORIES = ['work', 'personal', 'shopping', 'health'] as const;
export type Category = (typeof CATEGORIES)[number];

export type Filter = 'all' | 'active' | 'done';

export type Task = {
  readonly id: string;
  title: string;
  description?: string;
  dueDate?: string; // jour local « AAAA-MM-JJ »
  category?: Category;
  priority: Priority;
  done: boolean;
  createdAt: string; // instant ISO (UTC)
};

export type NewTask = Omit<Task, 'id' | 'done' | 'createdAt'>;

export const PRIORITY_LABELS: Record<Priority, string> = {
  low: 'Basse',
  medium: 'Moyenne',
  high: 'Haute',
};

export const CATEGORY_LABELS: Record<Category, string> = {
  work: 'Travail',
  personal: 'Personnel',
  shopping: 'Courses',
  health: 'Santé',
};

export const FILTER_LABELS: Record<Filter, string> = {
  all: 'Toutes',
  active: 'Actives',
  done: 'Terminées',
};

export function createTask(input: NewTask): Task {
  return { ...input, id: crypto.randomUUID(), done: false, createdAt: new Date().toISOString() };
}

export function addTask(tasks: readonly Task[], task: Task): Task[] {
  return [...tasks, task];
}

export function toggleTask(tasks: readonly Task[], id: string): Task[] {
  return tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task));
}

export function deleteTask(tasks: readonly Task[], id: string): Task[] {
  return tasks.filter((task) => task.id !== id);
}

export function filterTasks(tasks: readonly Task[], filter: Filter): Task[] {
  if (filter === 'active') return tasks.filter((task) => !task.done);
  if (filter === 'done') return tasks.filter((task) => task.done);
  return [...tasks];
}

export function countRemaining(tasks: readonly Task[]): number {
  return tasks.filter((task) => !task.done).length;
}

/** Les tâches urgentes : priorité haute, non terminées, la plus proche échéance d'abord (sans échéance : à la fin). */
export function selectUrgentTasks(tasks: readonly Task[]): Task[] {
  return tasks
    .filter((task) => task.priority === 'high' && !task.done)
    .sort((a, b) => (a.dueDate ?? '9999-12-31').localeCompare(b.dueDate ?? '9999-12-31'));
}

/** Une tâche est en retard si son échéance (un jour local) est passée et qu'elle n'est pas terminée. */
export function isLate(task: Task, today: string): boolean {
  return !task.done && task.dueDate !== undefined && task.dueDate < today;
}
