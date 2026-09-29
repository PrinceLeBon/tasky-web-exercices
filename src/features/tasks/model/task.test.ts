import { describe, expect, it } from 'vitest';
import { addTask, countRemaining, createTask, deleteTask, filterTasks, isLate, selectUrgentTasks, toggleTask, type Task } from './task';

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

describe('tâches urgentes', () => {
  it('selectUrgentTasks garde les tâches hautes non terminées, par échéance, sans échéance à la fin', () => {
    const tasks = [
      makeTask({ id: 'sans', priority: 'high' }),
      makeTask({ id: 'tard', priority: 'high', dueDate: '2026-10-05' }),
      makeTask({ id: 'tot', priority: 'high', dueDate: '2026-09-28' }),
      makeTask({ id: 'finie', priority: 'high', done: true }),
      makeTask({ id: 'basse', priority: 'low', dueDate: '2026-09-01' }),
    ];
    expect(selectUrgentTasks(tasks).map((t) => t.id)).toEqual(['tot', 'tard', 'sans']);
    expect(tasks[0].id).toBe('sans'); // le tableau d'origine n'est pas trié en place
  });

  it('isLate compare des jours locaux, et ignore les tâches terminées', () => {
    expect(isLate(makeTask({ dueDate: '2026-09-28' }), '2026-09-29')).toBe(true);
    expect(isLate(makeTask({ dueDate: '2026-09-29' }), '2026-09-29')).toBe(false);
    expect(isLate(makeTask({ dueDate: '2026-09-28', done: true }), '2026-09-29')).toBe(false);
  });
});
