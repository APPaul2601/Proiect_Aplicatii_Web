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
  try {
    const userId = req.userId;
    const { upgradeType } = req.body;

    // Step 1: Validate input
    const typeValidation = validateUpgradeType(upgradeType);
    if (!typeValidation.valid) {
      return res.status(400).json(errorResponse(typeValidation.error, 400));
    }

    // Step 2: Find player progress and upgrade data
    const progress = await Progress.findOne({ user: userId });
    const upgrade = await Upgrade.findOne({ type: upgradeType });

    if (!progress) {
      return res.status(404).json(notFoundResponse("Progress"));
    }
    if (!upgrade) {
      return res.status(404).json(notFoundResponse("Upgrade"));
    }

    // Step 3: Check if player can afford upgrade
    if (
      progress.resources.gold < upgrade.cost.gold ||
      progress.resources.wood < upgrade.cost.wood ||
      progress.resources.stone < upgrade.cost.stone ||
      progress.resources.wheat < upgrade.cost.wheat
    ) {
      return res.status(400).json(errorResponse("Not enough resources", 400));
    }

    // Step 4: Charge resources
    progress.resources.gold -= upgrade.cost.gold;
    progress.resources.wood -= upgrade.cost.wood;
    progress.resources.stone -= upgrade.cost.stone;
    progress.resources.wheat -= upgrade.cost.wheat;

    // Step 5: Apply upgrade effect
    if (upgrade.effect === "clickPower") {
      progress.clickPower += upgrade.amount;
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

    // Step 7: Save changes
    await progress.save();

    res.json(successResponse({ progress }, "Upgrade purchased successfully"));
  } catch (err) {
    res.status(500).json(errorResponse(err.message, 500));
  }
};
