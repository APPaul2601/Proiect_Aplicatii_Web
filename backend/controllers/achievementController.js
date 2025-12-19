// backend/controllers/achievementController.js
const PlayerStats = require('../models/game/PlayerStats');
const Achievement = require('../models/content/Achievement');

// Utility: Check which achievements are unlocked for a player
function getUnlockedAchievements(playerStats) {
  return playerStats.achievements || [];
}

// Utility: Check which achievements are still locked
function getLockedAchievements(playerStats) {
  const unlocked = new Set(getUnlockedAchievements(playerStats));
  return achievements.filter(a => !unlocked.has(a.type));
}

// GET all achievements with owned/unowned status
exports.getAllAchievements = async (req, res) => {
  try {
    const playerStats = await PlayerStats.findOne({ user: req.user._id });
    if (!playerStats) return res.status(404).json({ error: 'Player stats not found' });
    const unlocked = new Set(getUnlockedAchievements(playerStats));
    const achievements = await Achievement.find({});
    const all = achievements.map(a => ({
      type: a.type,
      name: a.name,
      description: a.description,
      requirement: a.requirement,
      unlocked: unlocked.has(a.type)
    }));
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch achievements' });
  }
};

// POST: Check and unlock achievements (called after game actions)
exports.checkAndUnlockAchievements = async (req, res) => {
  try {
    const playerStats = await PlayerStats.findOne({ user: req.user._id });
    if (!playerStats) return res.status(404).json({ error: 'Player stats not found' });
    const unlocked = new Set(getUnlockedAchievements(playerStats));
    const achievements = await Achievement.find({});
    const newlyUnlocked = [];
    for (const a of achievements) {
      if (!unlocked.has(a.type) && meetsRequirement(a.requirement, playerStats, req.body)) {
        playerStats.achievements.push(a.type);
        newlyUnlocked.push({
          type: a.type,
          name: a.name,
          description: a.description,
          requirement: a.requirement
        });
      }
    }
    if (newlyUnlocked.length > 0) await playerStats.save();
    res.json({ newlyUnlocked });
  } catch (err) {
    res.status(500).json({ error: 'Failed to check achievements' });
  }
};

// Helper: Check if player meets achievement requirement
function meetsRequirement(requirement, stats, extra) {
  if (requirement.resource) {
    return (extra && extra[requirement.resource] >= requirement.amount);
  }
  if (requirement.power) {
    return (extra && extra.power >= requirement.power);
  }
  if (requirement.upgradeAny) {
    return (extra && extra.upgradeAny >= requirement.upgradeAny);
  }
  if (requirement.upgrade) {
    return (extra && extra.upgrades && extra.upgrades[requirement.upgrade] >= requirement.amount);
  }
  if (requirement.progress) {
    return (extra && extra.progress >= requirement.progress);
  }
  return false;
}
