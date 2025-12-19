const express = require("express");
const router = express.Router();
const { getUpgrades } = require("../controllers/shopController");
const { buyUpgrade } = require("../controllers/upgradeController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", getUpgrades);

router.post("/buy", authMiddleware, buyUpgrade);

module.exports = router;
