// backend/routes/achievementRoutes.js
const express = require('express');
const router = express.Router();
const achievementController = require('../controllers/achievementController');
const authenticateJWT = require('../middleware/authMiddleware');

// Get all achievements (with owned/unowned status)
router.get('/', authenticateJWT, achievementController.getAllAchievements);

// Check and unlock achievements (call after relevant actions)
router.post('/check', authenticateJWT, achievementController.checkAndUnlockAchievements);

module.exports = router;
