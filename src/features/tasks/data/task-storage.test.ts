import { describe, expect, it } from 'vitest';
import { parseStoredTasks } from './task-storage';

const valid = { id: 'a', title: 'Pain', priority: 'high', done: false, createdAt: '2026-09-01T10:00:00.000Z' };

describe('parseStoredTasks', () => {
  it('lit des tâches valides', () => {
    expect(parseStoredTasks(JSON.stringify([valid]))).toEqual([valid]);
  });

  it('écarte les tâches invalides et survit à un JSON cassé', () => {
    expect(parseStoredTasks(JSON.stringify([valid, { ...valid, priority: 'urgentissime' }]))).toEqual([valid]);
    expect(parseStoredTasks('{pas du json')).toEqual([]);
    expect(parseStoredTasks(null)).toEqual([]);
  });
});
