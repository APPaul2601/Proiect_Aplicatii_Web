// ============================================
// UPGRADE CONTROLLER - Purchase Upgrades
// ============================================
// Handles upgrade purchasing and application
// Manages upgrade costs and effects

const Progress = require("../models/game/Progress");
const Upgrade = require("../models/content/Upgrade");
const { validateUpgradeType } = require("../utils/validators");
const {
  successResponse,
  errorResponse,
  notFoundResponse,
} = require("../utils/responses");

// ===== BUY UPGRADE =====
// POST /api/upgrades/buy
// Body: { upgradeType: string }
// What it does: Purchase upgrade, charge resources, apply effect
exports.buyUpgrade = async (req, res) => {
  console.log("buyUpgrade endpoint hit", req.body, req.userId);// print message and request data to backend everytime the endpoint is called
  try {
    const userId = req.userId;
    const { upgradeType } = req.body;

    // Step 1: Validate input (ensure upgradeType is valid)
    const typeValidation = validateUpgradeType(upgradeType);
    if (!typeValidation.valid) {
      return res.status(400).json(errorResponse(typeValidation.error, 400));
    }

    // Step 2: Find player progress and upgrade data (load player and upgrade info)
    const progress = await Progress.findOne({ user: userId });
    const upgrade = await Upgrade.findOne({ type: upgradeType });

    if (!progress) {
      return res.status(404).json(notFoundResponse("Progress"));
    }
    if (!upgrade) {
      return res.status(404).json(notFoundResponse("Upgrade"));
    }

    // Step 3: Check if player can afford upgrade (compare player resources to upgrade cost)
    if (
      progress.resources.gold < upgrade.cost.gold ||
      progress.resources.wood < upgrade.cost.wood ||
      progress.resources.stone < upgrade.cost.stone ||
      progress.resources.wheat < upgrade.cost.wheat
    ) {
      return res.status(400).json(errorResponse("Not enough resources", 400));
    }

    // Step 4: Charge resources (deduct upgrade cost from player resources)
    progress.resources.gold -= upgrade.cost.gold;
    progress.resources.wood -= upgrade.cost.wood;
    progress.resources.stone -= upgrade.cost.stone;
    progress.resources.wheat -= upgrade.cost.wheat;

    // Step 5: Apply upgrade effect (update player stats or unlock features)
    if (upgrade.effect === "clickPower") {
      progress.clickPower += upgrade.amount;
    }

    // Step 6: Add upgrade to player's upgrades (track ownership and level)
    const existingUpgrade = progress.upgrades.find(
      (u) => u.type === upgradeType
    );
    if (existingUpgrade) {
      existingUpgrade.level += 1;
    } else {
      progress.upgrades.push({ type: upgradeType, level: 1 });
    }

    // Step 7: Save changes (persist progress to database)
    await progress.save();

    // Step 8: Respond with updated progress object
    res.json(successResponse({ progress }, "Upgrade purchased successfully"));
  } catch (err) {
    console.error("buyUpgrade error:", err);
    res.status(500).json(errorResponse(err.message, 500));
  }
};
