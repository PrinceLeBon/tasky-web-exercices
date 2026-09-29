import { z } from 'zod';
import { CATEGORIES, PRIORITIES, type Task } from '../model/task';

const STORAGE_KEY = 'tasky:tasks:v1';

const storedTaskSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  dueDate: z.iso.date().optional(),
  category: z.enum(CATEGORIES).optional(),
  priority: z.enum(PRIORITIES),
  done: z.boolean(),
  createdAt: z.iso.datetime(),
});

/**
 * Le stockage est une donnée extérieure (leçons 5.4 et 12.2) : on valide chaque tâche,
 * et une tâche illisible est écartée au lieu de faire planter l'application.
 */
export function parseStoredTasks(raw: string | null): Task[] {
  if (raw === null) return [];
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return [];
  }
  if (!Array.isArray(data)) return [];
  return data.flatMap((item) => {
    const result = storedTaskSchema.safeParse(item);
    return result.success ? [result.data] : [];
  });
}

export function loadTasks(): Task[] {
  try {
    return parseStoredTasks(localStorage.getItem(STORAGE_KEY));
  } catch {
    return [];
  }
}

export function saveTasks(tasks: readonly Task[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
