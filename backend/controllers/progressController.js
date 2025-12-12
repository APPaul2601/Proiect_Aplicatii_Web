// ============================================
// PROGRESS CONTROLLER - Player Game State
// ============================================
// Handles player progress: click, buy upgrade, buy building
// All changes saved to Progress collection

const Progress = require("../models/Progress");
const Building = require("../models/Building");
const Upgrade = require("../models/Upgrade");

// ===== GET PROGRESS =====
// GET /api/player
// What it does: Get player's current game state
exports.getProgress = async (req, res) => {
  try {
    const userId = req.user.id;

    // Step 1: Find player progress
    let progress = await Progress.findOne({ user: userId });

    // Step 2: If no progress exists, create it
    if (!progress) {
      progress = new Progress({
        user: userId,
        castleCompletion: 0,
        clickPower: 1,
        resources: { gold: 0, wood: 0, stone: 0, wheat: 0 },
        buildings: [],
        upgrades: [],
        totalClicks: 0,
      });
      await progress.save();
    }

    // Step 3: Return progress
    res.json({ progress });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ===== CLICK CASTLE =====
// POST /api/player/click
// Body: { clicks: number }
// What it does: Add clicks to castle, increase resources, update progress
exports.clickCastle = async (req, res) => {
  try {
    const userId = req.user.id;
    const { clicks } = req.body; // How many times player clicked

    // Step 1: Find player progress
    const progress = await Progress.findOne({ user: userId });
    if (!progress) return res.status(404).json({ error: "Player not found" });

    // Step 2: Add clicks to castle completion
    progress.castleCompletion += clicks * progress.clickPower;

    // Step 3: Check if castle is completed (100M)
    if (progress.castleCompletion >= 100000000) {
      progress.castleCompletion = 100000000;
      progress.castleCompleted = true;
    }

    // Step 4: Add gold to resources (1 gold per click)
    progress.resources.gold += clicks;

    // Step 5: Increment total clicks
    progress.totalClicks += clicks;

    // Step 6: Save to database
    await progress.save();

    // Step 7: Return updated progress
    res.json({ progress });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ===== BUY UPGRADE =====
// POST /api/player/buy-upgrade
// Body: { upgradeType: string }
// What it does: Buy upgrade, charge resources, apply effect
exports.buyUpgrade = async (req, res) => {
  try {
    const userId = req.user.id;
    const { upgradeType } = req.body;

    // Step 1: Find player progress
    const progress = await Progress.findOne({ user: userId });
    if (!progress) return res.status(404).json({ error: "Player not found" });

    // Step 2: Find upgrade from catalog
    const upgrade = await Upgrade.findOne({ type: upgradeType });
    if (!upgrade) return res.status(404).json({ error: "Upgrade not found" });

    // Step 3: Check if player has enough resources
    const hasEnough =
      progress.resources.gold >= upgrade.cost.gold &&
      progress.resources.wood >= upgrade.cost.wood &&
      progress.resources.stone >= upgrade.cost.stone &&
      progress.resources.wheat >= upgrade.cost.wheat;

    if (!hasEnough)
      return res.status(400).json({ error: "Not enough resources" });

    // Step 4: Subtract resources from player
    progress.resources.gold -= upgrade.cost.gold;
    progress.resources.wood -= upgrade.cost.wood;
    progress.resources.stone -= upgrade.cost.stone;
    progress.resources.wheat -= upgrade.cost.wheat;

    // Step 5: Apply upgrade effect
    if (upgrade.effect === "clickPower") {
      progress.clickPower += upgrade.amount;
    } else if (upgrade.effect === "castleGoal") {
      // Reduce goal (make it easier)
      progress.castleCompletion += upgrade.amount;
    }

    // Step 6: Add upgrade to player's upgrades
    const existingUpgrade = progress.upgrades.find(
      (u) => u.type === upgradeType
    );
    if (existingUpgrade) {
      existingUpgrade.level += 1;
    } else {
      progress.upgrades.push({ type: upgradeType, level: 1 });
    }

    // Step 7: Save to database
    await progress.save();

    // Step 8: Return updated progress
    res.json({ progress });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ===== BUY BUILDING =====
// POST /api/player/buy-building
// Body: { buildingType: string }
// What it does: Buy building, charge resources, add to buildings
exports.buyBuilding = async (req, res) => {
  try {
    const userId = req.user.id;
    const { buildingType } = req.body;

    // Step 1: Find player progress
    const progress = await Progress.findOne({ user: userId });
    if (!progress) return res.status(404).json({ error: "Player not found" });

    // Step 2: Find building from catalog
    const building = await Building.findOne({ type: buildingType });
    if (!building) return res.status(404).json({ error: "Building not found" });

    // Step 3: Check if player has enough resources
    const hasEnough =
      progress.resources.gold >= building.cost.gold &&
      progress.resources.wood >= building.cost.wood &&
      progress.resources.stone >= building.cost.stone &&
      progress.resources.wheat >= building.cost.wheat;

    if (!hasEnough)
      return res.status(400).json({ error: "Not enough resources" });

    // Step 4: Subtract resources from player
    progress.resources.gold -= building.cost.gold;
    progress.resources.wood -= building.cost.wood;
    progress.resources.stone -= building.cost.stone;
    progress.resources.wheat -= building.cost.wheat;

    // Step 5: Add building to player's buildings (or increment count)
    const existingBuilding = progress.buildings.find(
      (b) => b.type === buildingType
    );
    if (existingBuilding) {
      existingBuilding.count += 1;
    } else {
      progress.buildings.push({ type: buildingType, count: 1 });
    }

    // Step 6: Save to database
    await progress.save();

    // Step 7: Return updated progress
    res.json({ progress });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
