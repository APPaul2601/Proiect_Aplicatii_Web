const Progress = require("../models/game/Progress");
const Upgrade = require("../models/content/Upgrade");

exports.updateCastleProgress = async (req, res) => {
  try {
    const userId = req.userId;
    const { amount } = req.body;
    if (typeof amount !== "number" || isNaN(amount)) {
      return res.status(400).json({ error: "Invalid progress amount" });
    }

    const progress = await Progress.findOne({ user: userId });
    if (!progress) {
      return res.status(404).json({ error: "Progress not found" });
    }

    let newProgress = progress.castleProgress + amount;
    let milestone = null;
    let castleStage = progress.castleStage;
    let castleCompleted = progress.castleCompleted;

    if (newProgress >= 100) {
      newProgress = 100;
      castleCompleted = true;
      milestone = "Castle Completed!";
      castleStage = 4;
    } else if (newProgress >= 75 && progress.castleStage < 4) {
      milestone = "Stage 4 reached!";
      castleStage = 4;
    } else if (newProgress >= 50 && progress.castleStage < 3) {
      milestone = "Stage 3 reached!";
      castleStage = 3;
    } else if (newProgress >= 25 && progress.castleStage < 2) {
      milestone = "Stage 2 reached!";
      castleStage = 2;
    }

    let newlyUnlocked = [];
    if (castleStage > progress.castleStage) {
      try {
        const upgradesToUnlock = await Upgrade.find({
          stage: castleStage,
        }).select("type");
        if (upgradesToUnlock && upgradesToUnlock.length > 0) {
          if (!progress.unlockedUpgrades) progress.unlockedUpgrades = [];
          upgradesToUnlock.forEach((u) => {
            if (!progress.unlockedUpgrades.includes(u.type)) {
              progress.unlockedUpgrades.push(u.type);
              newlyUnlocked.push(u.type);
            }
          });
        }
      } catch (err) {
        console.error("Error unlocking upgrades:", err.message);
      }
    }

    progress.castleProgress = newProgress;
    progress.castleStage = castleStage;
    progress.castleCompleted = castleCompleted;
    await progress.save();

    res.json({
      success: true,
      progress,
      milestone,
      castleProgress: newProgress,
      castleStage,
      castleCompleted,
      newlyUnlocked,
    });
  } catch (err) {
    console.error("updateCastleProgress error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.getProgress = async (req, res) => {
  try {
    const userId = req.userId;

    let progress = await Progress.findOne({ user: userId });

    if (!progress) {
      progress = new Progress({
        user: userId,
        castleProgress: 0,
        clickPower: 10,
        resources: {
          gold: 0,
          wood: 0,
          stone: 0,
          wheat: 0,
        },
        upgrades: [],
      });
      await progress.save();
    }

    res.json({ progress });
  } catch (err) {
    console.error("getProgress error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.clickCastle = async (req, res) => {
  try {
    const userId = req.userId;

    const progress = await Progress.findOne({ user: userId });

    if (!progress) {
      return res.status(404).json({ error: "Progress not found" });
    }

    const clickPower = parseInt(progress.clickPower) || 10;
    const currentGold = parseInt(progress.resources.gold) || 0;
    progress.resources.gold = currentGold + clickPower;

    await progress.save();

    res.json({
      success: true,
      message: "Castle clicked!",
      progress,
      resources: progress.resources,
      castleProgress: progress.castleProgress,
      clickPower: progress.clickPower,
    });
  } catch (err) {
    console.error("clickCastle error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.collectResource = async (req, res) => {
  try {
    const { buildingType } = req.body;
    const userId = req.userId;

    const progress = await Progress.findOne({ user: userId });

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: "Player progress not found",
      });
    }

    const resourceMap = {
      quarry: "stone",
      lumber_yard: "wood",
      wheat_field: "wheat",
      castle: "gold",
    };

    const resourceType = resourceMap[buildingType];

    if (!resourceType) {
      return res.status(400).json({
        success: false,
        message: "Unknown building type",
      });
    }

    const amount = parseInt(progress.clickPower) || 10;
    const currentAmount = parseInt(progress.resources[resourceType]) || 0;
    progress.resources[resourceType] = currentAmount + amount;

    await progress.save();

    res.json({
      success: true,
      message: `Collected ${amount} ${resourceType}`,
      progress,
      resources: progress.resources,
      castleProgress: progress.castleProgress,
    });
  } catch (err) {
    console.error("Error in collectResource:", err.message);
    res.status(500).json({
      success: false,
      message: "Error collecting resource: " + err.message,
    });
  }
};

exports.buyUpgrade = async (req, res) => {
  try {
    const userId = req.userId;
    const { upgradeType } = req.body;

    const progress = await Progress.findOne({ user: userId });
    const upgrade = await Upgrade.findOne({ type: upgradeType });

    if (!progress) {
      return res.status(404).json({ error: "Progress not found" });
    }
    if (!upgrade) {
      return res.status(404).json({ error: "Upgrade not found" });
    }

    if (
      progress.unlockedUpgrades &&
      !progress.unlockedUpgrades.includes(upgradeType)
    ) {
      return res.status(403).json({ error: "Upgrade is locked" });
    }

    if (
      progress.resources.gold < upgrade.cost.gold ||
      progress.resources.wood < upgrade.cost.wood ||
      progress.resources.stone < upgrade.cost.stone ||
      progress.resources.wheat < upgrade.cost.wheat
    ) {
      return res.status(400).json({ error: "Not enough resources" });
    }

    progress.resources.gold -= upgrade.cost.gold;
    progress.resources.wood -= upgrade.cost.wood;
    progress.resources.stone -= upgrade.cost.stone;
    progress.resources.wheat -= upgrade.cost.wheat;

    if (upgrade.effect === "clickPower") {
      progress.clickPower += upgrade.amount;
    }

    if (!progress.upgrades) {
      progress.upgrades = [];
    }
    progress.upgrades.push({ type: upgradeType, level: 1 });

    await progress.save();

    res.json({ success: true, progress, message: "Upgrade purchased" });
  } catch (err) {
    console.error("buyUpgrade error:", err.message);
    res.status(500).json({ error: err.message });
  }
};
