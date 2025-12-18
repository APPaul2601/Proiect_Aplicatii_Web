// ============================================
// RESOURCE CONTROLLER - Resource Collection
// ============================================
// Handles collecting resources from buildings

const Progress = require("../models/game/Progress");
const { errorResponse, successResponse } = require("../utils/responses");

// POST /api/resources/collect - Collect resources from a building
exports.collectResource = async (req, res) => {
  try {
    const { buildingType } = req.body;

    // Validate building type exists
    const validBuildings = ["castle", "quarry", "lumber_yard", "wheat_field"];
    if (!validBuildings.includes(buildingType)) {
      return errorResponse(res, "Invalid building type", 400);
    }

    // Get player progress
    const progress = await Progress.findOne({ user: req.userId });
    if (!progress) {
      return errorResponse(res, "Player progress not found", 404);
    }

    // Map building to resource type
    const buildingToResource = {
      castle: "gold",
      quarry: "stone",
      lumber_yard: "wood",
      wheat_field: "wheat",
    };

    const resourceType = buildingToResource[buildingType];
    const amount = progress.clickPower; // Multiply by click power

    // Add resources
    progress.resources[resourceType] += amount;

    await progress.save();
    successResponse(
      res,
      progress,
      `Collected ${amount} ${resourceType} from ${buildingType}!`
    );
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

module.exports = exports;