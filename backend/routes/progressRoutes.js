// ============================================
// PROGRESS ROUTES - Player Game State
// ============================================
// Defines URL endpoints for player progress
// ALL routes require JWT token (authMiddleware)
// Called: GET/POST /api/player

const express = require("express");
const router = express.Router();
const {
  getProgress,
  clickCastle,
  buyUpgrade,
  buyBuilding,
} = require("../controllers/progressController");
const authMiddleware = require("../middleware/authMiddleware");

// ===== GET PROGRESS =====
// GET /api/player
// What it does: Get player's current game state
router.get("/", authMiddleware, getProgress);

// ===== CLICK CASTLE =====
// POST /api/player/click
// Body: { clicks: number }
// What it does: Click castle, increase completion, gain gold
router.post("/click", authMiddleware, clickCastle);

// ===== BUY UPGRADE =====
// POST /api/player/buy-upgrade
// Body: { upgradeType: string }
// What it does: Buy upgrade, charge resources, apply effect (click power boost)
router.post("/buy-upgrade", authMiddleware, buyUpgrade);

// ===== BUY BUILDING =====
// POST /api/player/buy-building
// Body: { buildingType: string }
// What it does: Buy building, charge resources, add to buildings
router.post("/buy-building", authMiddleware, buyBuilding);

// Export routes to be used in server.js
module.exports = router;
