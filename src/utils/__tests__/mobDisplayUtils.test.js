import { describe, it, expect, afterEach } from 'vitest';
import { generateMobWithAura, getRandomAura, AURA_ADJECTIVES } from '../mobDisplayUtils.js';

const originalRandom = Math.random;

afterEach(() => {
  Math.random = originalRandom;
});

describe('mobDisplayUtils', () => {
  it('getRandomAura returns deterministic aura when Math.random mocked', () => {
    Math.random = () => 0; // picks first
    expect(getRandomAura()).toBe('rainbow');
  });

  it('generateMobWithAura prefixes adjective when available', () => {
    Math.random = () => 1 / 8; // second aura: frost
    const mob = generateMobWithAura('Zombie', '/zombie.png');
    expect(mob.aura).toBe('frost');
    expect(mob.displayName).toBe(`${AURA_ADJECTIVES.frost} Zombie`);
  });
});
