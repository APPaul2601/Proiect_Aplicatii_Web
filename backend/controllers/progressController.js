// ============================================
// PROGRESS CONTROLLER - Player Game State
// ============================================
// Handles player progress: click castle, get progress
// All changes saved to Progress collection

const Progress = require("../models/game/Progress");
const Upgrade = require("../models/content/Upgrade");

// ===== GET PROGRESS =====
// GET /api/castle
// What it does: Get player's current game state
exports.getProgress = async (req, res) => {
  try {
    const userId = req.userId;
    console.log("?? Fetching progress for user:", userId);

    // Step 1: Find player progress
    let progress = await Progress.findOne({ user: userId });

    // Step 2: If no progress exists, create it
    if (!progress) {
      console.log("?? Creating new progress document");
      progress = new Progress({
        user: userId,
        castleProgress: 0,
        castleStage: 1,
        castleCompleted: false,
        clickPower: 1,
        resources: {
          gold: 0,
          wood: 0,
          stone: 0,
          wheat: 0,
        },
        upgrades: [],
        unlockedUpgrades: ["sharper_sword", "stronger_swing"],
      });
      await progress.save();
      console.log("? Progress created");
    }

    // Step 3: Return progress
    console.log("? Returning progress:", progress);
    res.json({ progress });
  } catch (err) {
    console.error("? getProgress error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// ===== CLICK CASTLE =====
// POST /api/castle/click
// Body: { clicks: number }
// What it does: Add clicks to castle, increase resources, update progress
exports.clickCastle = async (req, res) => {
  try {
    const userId = req.userId;
    const { clicks } = req.body;
    
    console.log("??? Click attempt:", userId, "clicks:", clicks);

    // Step 1: Find player progress
    const progress = await Progress.findOne({ user: userId });
    if (!progress) {
      console.log("? Progress not found for user:", userId);
      return res.status(404).json({ error: "Progress not found" });
    }

    // Step 2: Add clicks to castle progress
    progress.castleProgress += (clicks * progress.clickPower) / 100;
    if (progress.castleProgress > 100) {
      progress.castleProgress = 100;
    }

    // Step 3: Check if castle is completed
    if (progress.castleProgress >= 100) {
      progress.castleCompleted = true;
      progress.castleStage += 1;
      progress.castleProgress = 0;
      console.log("?? Castle completed! Stage:", progress.castleStage);
    }

    // Step 4: Add resources from clicking
    progress.resources.gold += clicks * progress.clickPower;

    // Step 5: Save changes
    await progress.save();
    console.log("? Click saved, progress:", progress.resources.gold);

    res.json({ progress });
  } catch (err) {
    console.error("? clickCastle error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// ===== BUY UPGRADE =====
// POST /api/castle/buy-upgrade
// Body: { upgradeType: string }
// What it does: Buy upgrade, charge resources, apply effect
exports.buyUpgrade = async (req, res) => {
  try {
    const userId = req.userId;
    const { upgradeType } = req.body;
    
    console.log("?? Buy upgrade attempt:", userId, "upgrade:", upgradeType);

    // Step 1: Find player progress and upgrade data
    const progress = await Progress.findOne({ user: userId });
    const upgrade = await Upgrade.findOne({ type: upgradeType });

    if (!progress) {
      console.log("? Progress not found");
      return res.status(404).json({ error: "Progress not found" });
    }
    if (!upgrade) {
      console.log("? Upgrade not found:", upgradeType);
      return res.status(404).json({ error: "Upgrade not found" });
    }

    // Step 2: Check if player can afford upgrade
    if (
      progress.resources.gold < upgrade.cost.gold ||
      progress.resources.wood < upgrade.cost.wood ||
      progress.resources.stone < upgrade.cost.stone ||
      progress.resources.wheat < upgrade.cost.wheat
    ) {
      console.log("? Not enough resources");
      return res.status(400).json({ error: "Not enough resources" });
    }

    // Step 3: Charge resources
    progress.resources.gold -= upgrade.cost.gold;
    progress.resources.wood -= upgrade.cost.wood;
    progress.resources.stone -= upgrade.cost.stone;
    progress.resources.wheat -= upgrade.cost.wheat;

    // Step 4: Apply upgrade effect
    if (upgrade.effect === "clickPower") {
      progress.clickPower += upgrade.amount;
      console.log("?? Click power increased to:", progress.clickPower);
    }

    // Step 5: Add upgrade to player's upgrades
    const existingUpgrade = progress.upgrades.find(
      (u) => u.type === upgradeType
    );
    if (existingUpgrade) {
      existingUpgrade.level += 1;
    } else {
      progress.upgrades.push({ type: upgradeType, level: 1 });
    }

    // Step 6: Save changes
    await progress.save();
    console.log("? Upgrade purchased");

    res.json({ progress, message: "Upgrade purchased" });
  } catch (err) {
    console.error("? buyUpgrade error:", err.message);
    res.status(500).json({ error: err.message });
  }
};
