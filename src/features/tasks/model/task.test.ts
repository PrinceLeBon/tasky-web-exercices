import { describe, expect, it } from 'vitest';
import { addTask, countRemaining, createTask, deleteTask, filterTasks, toggleTask, type Task } from './task';

function makeTask(overrides: Partial<Task> = {}): Task {
  return { id: crypto.randomUUID(), title: 'Une tâche', priority: 'medium', done: false, createdAt: '2026-09-01T10:00:00.000Z', ...overrides };
}

describe('logique des tâches', () => {
  it('createTask crée une tâche non terminée, avec un identifiant', () => {
    const task = createTask({ title: 'Pain', priority: 'low' });
    expect(task).toMatchObject({ title: 'Pain', priority: 'low', done: false });
    expect(task.id).toBeTypeOf('string');
  });

  it('addTask et deleteTask ne modifient pas le tableau d’origine', () => {
    const tasks = [makeTask({ id: 'a' })];
    const added = addTask(tasks, makeTask({ id: 'b' }));
    expect(added).toHaveLength(2);
    expect(tasks).toHaveLength(1);
    expect(deleteTask(added, 'a').map((t) => t.id)).toEqual(['b']);
  });

  it('toggleTask inverse uniquement la tâche ciblée, sans modifier l’original', () => {
    const tasks = [makeTask({ id: 'a' }), makeTask({ id: 'b' })];
    const result = toggleTask(tasks, 'a');
    expect(result.find((t) => t.id === 'a')?.done).toBe(true);
    expect(result.find((t) => t.id === 'b')).toBe(tasks[1]);
    expect(tasks[0].done).toBe(false);
  });

  it('filterTasks et countRemaining', () => {
    const tasks = [makeTask({ done: true }), makeTask(), makeTask()];
    expect(filterTasks(tasks, 'active')).toHaveLength(2);
    expect(filterTasks(tasks, 'done')).toHaveLength(1);
    expect(countRemaining(tasks)).toBe(2);
  });
});
