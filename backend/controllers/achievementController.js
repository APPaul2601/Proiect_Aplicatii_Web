const Progress = require("../models/game/Progress");
const Achievement = require("../models/game/Achievement");
const { errorResponse, successResponse } = require("../utils/responses");

// Achievement definitions with threshold and rewards
const ACHIEVEMENT_CONFIG = {
  gold_milestone: {
    resourceType: "gold",
    threshold: 50,
    reward: {},
    message: "Ai bani de te enerveaza !",
  },
  wood_milestone: {
    resourceType: "wood",
    threshold: 50,
    reward: {},
    message: "Esti seful la lemne !",
  },
  stone_milestone: {
    resourceType: "stone",
    threshold: 50,
    reward: {},
    message: "Esti tare ca piatra !",
  },
  wheat_milestone: {
    resourceType: "wheat",
    threshold: 50,
    reward: {},
    message: "Am cereale ca la Nestle !",
  },
};

/**
 * Check and unlock achievements for a player
 * Returns newly unlocked achievements with rewards
 */
exports.checkAndUnlockAchievements = async (userId) => {
  try {
    const progress = await Progress.findOne({ user: userId });
    if (!progress) return null;

    let achievement = await Achievement.findOne({ user: userId });
    if (!achievement) {
      achievement = new Achievement({
        user: userId,
        achievements: Object.keys(ACHIEVEMENT_CONFIG).map((type) => ({
          type,
          isUnlocked: false,
          unlockedAt: null,
        })),
        totalAchievementsUnlocked: 0,
      });
      await achievement.save();
    }

    const newlyUnlocked = [];
    let rewardToGive = {};

    // Check each achievement
    for (const achievementType of Object.keys(ACHIEVEMENT_CONFIG)) {
      const config = ACHIEVEMENT_CONFIG[achievementType];
      const currentResource = progress.resources[config.resourceType] || 0;
      const achievementRecord = achievement.achievements.find(
        (a) => a.type === achievementType
      );

      // If achievement not yet unlocked and resource threshold reached
      if (
        achievementRecord &&
        !achievementRecord.isUnlocked &&
        currentResource >= config.threshold
      ) {
        achievementRecord.isUnlocked = true;
        achievementRecord.unlockedAt = new Date();

        newlyUnlocked.push({
          type: achievementType,
          message: config.message,
          reward: config.reward,
        });

        // Add reward to the total to be given
        Object.keys(config.reward).forEach((resource) => {
          rewardToGive[resource] =
            (rewardToGive[resource] || 0) + config.reward[resource];
        });
      }
    }

    // Apply rewards if any achievements were unlocked
    if (newlyUnlocked.length > 0) {
      Object.keys(rewardToGive).forEach((resource) => {
        progress.resources[resource] =
          (progress.resources[resource] || 0) + rewardToGive[resource];
      });

      achievement.totalAchievementsUnlocked =
        achievement.achievements.filter((a) => a.isUnlocked).length;

      await achievement.save();
      await progress.save();
    }

    return newlyUnlocked.length > 0 ? newlyUnlocked : null;
  } catch (error) {
    console.error("Error checking achievements:", error.message);
    return null;
  }
};

/**
 * Get all achievements for a player
 */
exports.getPlayerAchievements = async (req, res) => {
  try {
    const userId = req.userId;

    let achievement = await Achievement.findOne({ user: userId });

    if (!achievement) {
      // Initialize achievements if not exists
      achievement = new Achievement({
        user: userId,
        achievements: Object.keys(ACHIEVEMENT_CONFIG).map((type) => ({
          type,
          isUnlocked: false,
          unlockedAt: null,
        })),
        totalAchievementsUnlocked: 0,
      });
      await achievement.save();
    }

    return successResponse(res, achievement, "Achievements retrieved successfully");
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

module.exports = exports;
