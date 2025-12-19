const Progress = require("../models/game/Progress");
const Upgrade = require("../models/content/Upgrade");
const { validateUpgradeType } = require("../utils/validators");
const {
  successResponse,
  errorResponse,
  notFoundResponse,
} = require("../utils/responses");


exports.buyUpgrade = async (req, res) => {
  console.log("buyUpgrade endpoint hit", req.body, req.userId);
  try {
    const userId = req.userId;
    const { upgradeType } = req.body;

    const typeValidation = validateUpgradeType(upgradeType);
    if (!typeValidation.valid) {
      return res.status(400).json(errorResponse(typeValidation.error, 400));
    }
    const progress = await Progress.findOne({ user: userId });
    const upgrade = await Upgrade.findOne({ type: upgradeType });

    if (!progress) {
      return res.status(404).json(notFoundResponse("Progress"));
    }
    if (!upgrade) {
      return res.status(404).json(notFoundResponse("Upgrade"));
    }

    if (
      progress.unlockedUpgrades &&
      !progress.unlockedUpgrades.includes(upgradeType)
    ) {
      return res.status(403).json(errorResponse("Upgrade is locked", 403));
    }

    if (
      progress.resources.gold < upgrade.cost.gold ||
      progress.resources.wood < upgrade.cost.wood ||
      progress.resources.stone < upgrade.cost.stone ||
      progress.resources.wheat < upgrade.cost.wheat
    ) {
      return res.status(400).json(errorResponse("Not enough resources", 400));
    }
    progress.resources.gold -= upgrade.cost.gold;
    progress.resources.wood -= upgrade.cost.wood;
    progress.resources.stone -= upgrade.cost.stone;
    progress.resources.wheat -= upgrade.cost.wheat;

    if (upgrade.effect === "clickPower") {
      progress.clickPower += upgrade.amount;
    }

    const existingUpgrade = progress.upgrades.find(
      (u) => u.type === upgradeType
    );
    if (existingUpgrade) {
      existingUpgrade.level += 1;
    } else {
      progress.upgrades.push({ type: upgradeType, level: 1 });
    }
    await progress.save();

    res.json(successResponse({ progress }, "Upgrade purchased successfully"));
  } catch (err) {
    console.error("buyUpgrade error:", err);
    res.status(500).json(errorResponse(err.message, 500));
  }
};
