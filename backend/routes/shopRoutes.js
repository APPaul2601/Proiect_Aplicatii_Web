// routes/shopRoutes.js
const router = require("express").Router();
const { getBuildings, getUpgrades } = require("../controllers/shopController");

router.get("/buildings", getBuildings); // -> /api/buildings
router.get("/upgrades", getUpgrades);   // -> /api/upgrades

module.exports = router;
