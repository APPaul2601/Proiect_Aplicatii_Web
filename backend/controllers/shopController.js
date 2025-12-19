// ============================================
// SHOP CONTROLLER - Get catalog data
// ============================================
// Provides building and upgrade catalogs from MongoDB

const Building = require("../models/content/Building");
const Upgrade = require("../models/content/Upgrade");

// ===== GET ALL BUILDINGS =====
// GET /api/buildings
// What it does: Return all available buildings in the game
exports.getBuildings = async (req, res) => {
  try {
    const buildings = await Building.find({});
    res.status(200).json(buildings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ===== GET ALL UPGRADES =====
// GET /api/upgrades
// What it does: Return all available upgrades in the game
exports.getUpgrades = async (req, res) => {
  try {
    const upgrades = await Upgrade.find({});
    res.status(200).json(upgrades);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
