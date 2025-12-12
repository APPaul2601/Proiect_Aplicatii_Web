// controllers/shopController.js
const buildings = require("../data/buildings");
const upgrades = require("../data/upgrades");

// GET /api/buildings
exports.getBuildings = (req, res) => {
  res.status(200).json(buildings);
};

// GET /api/upgrades
exports.getUpgrades = (req, res) => {
  res.status(200).json(upgrades);
};
