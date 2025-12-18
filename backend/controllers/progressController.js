// ============================================
// PROGRESS CONTROLLER - Player Game State
// ============================================
// Handles player progress: click castle, collect resources, buy upgrades

const Progress = require("../models/game/Progress");
const Upgrade = require("../models/content/Upgrade");

// ===== GET PROGRESS =====
// GET /api/castle
exports.getProgress = async (req, res) => {
  try {
    const userId = req.userId;
    console.log("📊 Fetching progress for user:", userId);

    let progress = await Progress.findOne({ user: userId });

    if (!progress) {
      console.log("📝 Creating new progress document");
      progress = new Progress({
        user: userId,
        castleProgress: 0,
        clickPower: 1,
        resources: {
          gold: 0,
          wood: 0,
          stone: 0,
          wheat: 0,
        },
        upgrades: [],
      });
      await progress.save();
      console.log("✅ Progress created");
    }

    console.log("✅ Returning progress:", progress.resources);
    res.json({ progress });
  } catch (err) {
    console.error("❌ getProgress error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// ===== CLICK CASTLE =====
// POST /api/castle/click
exports.clickCastle = async (req, res) => {
  try {
    const userId = req.userId;
    console.log("🏰 clickCastle called for user:", userId);

    const progress = await Progress.findOne({ user: userId });

    if (!progress) {
      console.log("❌ Progress not found for user:", userId);
      return res.status(404).json({ error: "Progress not found" });
    }

    console.log("✅ Progress found:");
    console.log(
      "   clickPower:",
      progress.clickPower,
      typeof progress.clickPower
    );
    console.log(
      "   gold:",
      progress.resources.gold,
      typeof progress.resources.gold
    );

    // ⭐ FIX: Ensure clickPower is a valid number
    const clickPower = parseInt(progress.clickPower) || 1;
    console.log("   Parsed clickPower:", clickPower);

    // ⭐ FIX: Ensure gold is a valid number
    const currentGold = parseInt(progress.resources.gold) || 0;
    progress.resources.gold = currentGold + clickPower;

    console.log(
      `✅ Added ${clickPower} gold. New total: ${progress.resources.gold}`
    );

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
    console.error("❌ clickCastle error:", err.message);
    console.error("❌ Full error:", err);
    res.status(500).json({ error: err.message });
  }
};

// ===== COLLECT RESOURCE ⭐ NEW =====
// POST /api/resources/collect
// Body: { buildingType: string }
exports.collectResource = async (req, res) => {
  try {
    console.log(
      "🔥🔥🔥 collectResource HIT - buildingType:",
      req.body.buildingType
    ); // ← DEBUG
    console.log("🔥🔥🔥 User ID:", req.userId); // ← DEBUG

    const { buildingType } = req.body;
    const userId = req.userId;
    console.log("📦 collectResource:", buildingType, "for user:", userId);

    const progress = await Progress.findOne({ user: userId });

    if (!progress) {
      console.log("❌ Progress not found for user:", userId);
      return res.status(404).json({
        success: false,
        message: "Player progress not found",
      });
    }

    // Map building type to resource type
    const resourceMap = {
      quarry: "stone",
      lumber_yard: "wood",
      wheat_field: "wheat",
      castle: "gold",
    };

    const resourceType = resourceMap[buildingType];

    if (!resourceType) {
      console.log("❌ Unknown building type:", buildingType);
      return res.status(400).json({
        success: false,
        message: "Unknown building type",
      });
    }

    console.log("✅ Progress found:");
    console.log(
      "   clickPower:",
      progress.clickPower,
      typeof progress.clickPower
    );
    console.log(
      `   ${resourceType}:`,
      progress.resources[resourceType],
      typeof progress.resources[resourceType]
    );

    // ⭐ FIX: Ensure clickPower is a valid number
    const amount = parseInt(progress.clickPower) || 1;
    console.log("   Parsed amount:", amount);

    // ⭐ FIX: Ensure resource is a valid number
    const currentAmount = parseInt(progress.resources[resourceType]) || 0;
    progress.resources[resourceType] = currentAmount + amount;

    console.log(
      `✅ Added ${amount} ${resourceType}. New total: ${progress.resources[resourceType]}`
    );

    await progress.save();

    res.json({
      success: true,
      message: `Collected ${amount} ${resourceType}`,
      progress,
      resources: progress.resources,
      castleProgress: progress.castleProgress,
    });
  } catch (err) {
    console.error("❌ Error in collectResource:", err.message);
    console.error("❌ Full error:", err);
    res.status(500).json({
      success: false,
      message: "Error collecting resource: " + err.message,
    });
  }
};

// ===== BUY UPGRADE =====
// POST /api/castle/buy-upgrade
// Body: { upgradeType: string }
exports.buyUpgrade = async (req, res) => {
  try {
    const userId = req.userId;
    const { upgradeType } = req.body;

    console.log("⭐ Buy upgrade attempt:", userId, "upgrade:", upgradeType);

    const progress = await Progress.findOne({ user: userId });
    const upgrade = await Upgrade.findOne({ type: upgradeType });

    if (!progress) {
      console.log("❌ Progress not found");
      return res.status(404).json({ error: "Progress not found" });
    }
    if (!upgrade) {
      console.log("❌ Upgrade not found:", upgradeType);
      return res.status(404).json({ error: "Upgrade not found" });
    }

    // Check if player can afford upgrade
    if (
      progress.resources.gold < upgrade.cost.gold ||
      progress.resources.wood < upgrade.cost.wood ||
      progress.resources.stone < upgrade.cost.stone ||
      progress.resources.wheat < upgrade.cost.wheat
    ) {
      console.log("❌ Not enough resources");
      return res.status(400).json({ error: "Not enough resources" });
    }

    // Charge resources
    progress.resources.gold -= upgrade.cost.gold;
    progress.resources.wood -= upgrade.cost.wood;
    progress.resources.stone -= upgrade.cost.stone;
    progress.resources.wheat -= upgrade.cost.wheat;

    // Apply upgrade effect
    if (upgrade.effect === "clickPower") {
      progress.clickPower += upgrade.amount;
      console.log("✅ Click power increased to:", progress.clickPower);
    }

    // Add upgrade to player's upgrades
    if (!progress.upgrades) {
      progress.upgrades = [];
    }
    progress.upgrades.push(upgradeType);

    await progress.save();
    console.log("✅ Upgrade purchased");

    res.json({ success: true, progress, message: "Upgrade purchased" });
  } catch (err) {
    console.error("❌ buyUpgrade error:", err.message);
    res.status(500).json({ error: err.message });
  }
};
