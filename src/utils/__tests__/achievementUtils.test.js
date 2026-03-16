import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock achievements with one one-time and one tiered achievement
vi.mock('../../constants/achievements', () => ({
  ACHIEVEMENTS: {
    slayer: {
      id: 'slayer',
      isTiered: false,
      name: 'Slayer',
      checkUnlock: (stats) => stats.totalMobsDefeated >= 5,
    },
    grinder: {
      id: 'grinder',
      isTiered: true,
      name: 'Grinder',
      tiers: [
        { level: 10, tierName: 'Bronze Grinder' },
        { level: 25, tierName: 'Silver Grinder' },
      ],
      getProgress: (stats) => stats.totalMobsDefeated,
    },
  },
}));

let utils;

describe('achievementUtils', () => {
  beforeEach(async () => {
    utils = await import('../achievementUtils.js');
  });

  it('detects unlocked one-time achievements', () => {
    const stats = { totalMobsDefeated: 6 };
    const skills = {};
    expect(utils.isAchievementUnlocked('slayer', stats, skills)).toBe(true);
  });

  it('computes current tier and next tier for tiered achievements', () => {
    const stats = { totalMobsDefeated: 20 };
    const skills = {};
    expect(utils.getCurrentTier('grinder', stats, skills)).toBe(0);
    const next = utils.getNextTier('grinder', stats, skills);
    expect(next).toEqual({ level: 25, tierName: 'Silver Grinder' });
  });

  it('returns 100% when at max tier and partial otherwise', () => {
    const statsMid = { totalMobsDefeated: 12 };
    const statsMax = { totalMobsDefeated: 30 };
    const skills = {};
    expect(utils.getTierProgress('grinder', statsMid, skills)).toBeGreaterThan(0);
    expect(utils.getTierProgress('grinder', statsMax, skills)).toBe(100);
  });

  it('detects newly unlocked achievements across state change', () => {
    const oldStats = { totalMobsDefeated: 3 };
    const newStats = { totalMobsDefeated: 12 };
    const oldSkills = {};
    const newSkills = {};
    const unlocked = utils.getNewlyUnlockedAchievements(oldStats, newStats, oldSkills, newSkills);
    expect(unlocked).toContain('slayer');
    expect(unlocked).toContain('grinder');
  });
});
