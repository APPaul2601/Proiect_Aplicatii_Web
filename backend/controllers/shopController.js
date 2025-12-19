const Building = require("../models/content/Building");
const Upgrade = require("../models/content/Upgrade");

exports.getBuildings = async (req, res) => {
  try {
    const buildings = await Building.find({});
    res.status(200).json(buildings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUpgrades = async (req, res) => {
  try {
    const upgrades = await Upgrade.find({});
    res.status(200).json(upgrades);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
