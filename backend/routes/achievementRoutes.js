const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getPlayerAchievements } = require("../controllers/achievementController");

router.get("/", authMiddleware, getPlayerAchievements);

module.exports = router;
