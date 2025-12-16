// ============================================
// UPGRADE ROUTES - Upgrade Shop & Purchase
// ============================================
// Defines URL endpoints for upgrades
// ALL routes require JWT token (authMiddleware)
// Called: GET /api/upgrades, POST /api/upgrades/buy

const express = require("express");
const router = express.Router();
const { getUpgrades } = require("../controllers/shopController");
const { buyUpgrade } = require("../controllers/upgradeController");
const authMiddleware = require("../middleware/authMiddleware");

// ===== GET ALL UPGRADES =====
// GET /api/upgrades
// What it does: Return all available upgrades in the game
router.get("/", getUpgrades);

// ===== BUY UPGRADE =====
// POST /api/upgrades/buy
// Body: { upgradeType: string }
// What it does: Purchase an upgrade
router.post("/buy", authMiddleware, buyUpgrade);

module.exports = router;
