import { describe, expect, it } from 'vitest';
import type { Task } from './task';
import { describeTask, formatCounter, formatDueDate } from './task-format';

const base: Task = { id: 'a', title: 'Pain', priority: 'high', done: false, createdAt: '2026-09-01T10:00:00.000Z' };

describe('formatage des tâches', () => {
  it('formatDueDate lit le jour sans décalage de fuseau', () => {
    expect(formatDueDate('2026-10-02')).toBe('2 octobre 2026');
  });

  it('formatCounter accorde le pluriel', () => {
    expect(formatCounter(0)).toBe('Aucune tâche restante');
    expect(formatCounter(1)).toBe('1 tâche restante');
    expect(formatCounter(3)).toBe('3 tâches restantes');
  });

  it('describeTask donne la priorité, puis l’échéance si elle existe', () => {
    expect(describeTask(base)).toBe('Priorité : haute');
    expect(describeTask({ ...base, dueDate: '2026-10-02' })).toBe('Priorité : haute · Échéance : 2 octobre 2026');
  });
});
