import { describe, it, expect } from 'vitest';
import {
  getEncounterType,
  getExpectedDifficulty,
  calculateXPReward,
  calculateXPToLevel,
} from '../gameUtils.js';

// Deterministic math-focused tests to pin key progression behaviors

describe('gameUtils progression math', () => {
  it('getEncounterType follows 1-20 cycle', () => {
    expect(getEncounterType(1)).toBe('hostile');
    expect(getEncounterType(9)).toBe('hostile');
    expect(getEncounterType(10)).toBe('miniboss');
    expect(getEncounterType(11)).toBe('hostile');
    expect(getEncounterType(20)).toBe('boss');
    expect(getEncounterType(21)).toBe('hostile'); // cycle repeats
  });

  it('getExpectedDifficulty rises every 20 levels up to cap 7', () => {
    expect(getExpectedDifficulty(1)).toBe(1);
    expect(getExpectedDifficulty(20)).toBe(1);
    expect(getExpectedDifficulty(21)).toBe(2);
    expect(getExpectedDifficulty(40)).toBe(2);
    expect(getExpectedDifficulty(41)).toBe(3);
    expect(getExpectedDifficulty(140)).toBe(7); // capped
  });

  it('calculateXPReward applies penalty when playing below expected difficulty', () => {
    const atExpected = calculateXPReward(3, 41); // expected diff = 3
    const below = calculateXPReward(2, 41);
    expect(below).toBeLessThan(atExpected);
  });

  it('calculateXPToLevel scales with expected difficulty for level parity', () => {
    const level10 = calculateXPToLevel(1, 10);
    const level30 = calculateXPToLevel(2, 30); // expected diff 2
    const level70 = calculateXPToLevel(4, 70); // expected diff 4
    expect(level30).toBeGreaterThan(level10);
    expect(level70).toBeGreaterThan(level30);
  });
});
