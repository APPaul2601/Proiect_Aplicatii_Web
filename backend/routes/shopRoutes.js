// routes/shopRoutes.js
// ============================================
// SHOP ROUTES - Catalog endpoints (DEPRECATED)
// ============================================
// These routes are kept for backward compatibility
// Use upgradeRoutes.js instead for new endpoints

const router = require("express").Router();
const { getUpgrades } = require("../controllers/shopController");

// ===== GET UPGRADES =====
// GET /api/shop/upgrades
// Returns all available upgrades
router.get("/upgrades", getUpgrades);

module.exports = router;
