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
    expect(describeTask(base, '2026-09-29')).toBe('Priorité : haute');
    expect(describeTask({ ...base, dueDate: '2026-10-02' }, '2026-09-29')).toBe('Priorité : haute · Échéance : 2 octobre 2026');
  });

  it('describeTask signale une échéance dépassée, sauf si la tâche est terminée', () => {
    const late = { ...base, dueDate: '2026-09-28' };
    expect(describeTask(late, '2026-09-29')).toBe('Priorité : haute · Échéance : 28 septembre 2026 (en retard)');
    expect(describeTask({ ...late, done: true }, '2026-09-29')).toBe('Priorité : haute · Échéance : 28 septembre 2026');
    expect(describeTask({ ...base, dueDate: '2026-09-29' }, '2026-09-29')).not.toContain('en retard');
  });
});
