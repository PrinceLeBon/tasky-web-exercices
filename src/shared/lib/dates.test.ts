import { describe, expect, it } from 'vitest';
import { toLocalIsoDate } from './dates';

describe('toLocalIsoDate', () => {
  it('donne le jour local, pas le jour UTC', () => {
    // 26 septembre à 0 h 30 à Cotonou = 25 septembre à 23 h 30 en UTC
    expect(toLocalIsoDate(new Date('2026-09-25T23:30:00.000Z'))).toBe('2026-09-26');
  });
});
