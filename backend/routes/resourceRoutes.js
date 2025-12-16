// ============================================
// RESOURCE ROUTES - Resource Collection
// ============================================
// Handles collecting resources from buildings

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { collectResource } = require("../controllers/resourceController");

// POST /api/resources/collect - Collect resources from a building
// Requires: token, buildingType, amount
router.post("/collect", authMiddleware, collectResource);

module.exports = router;