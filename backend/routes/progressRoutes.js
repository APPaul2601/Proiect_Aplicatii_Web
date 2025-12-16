const express = require('express');
const router = express.Router();
const { getPlayerData, updatePlayerData } = require('../controllers/progressController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, getPlayerData);
router.post('/', authMiddleware, updatePlayerData);

module.exports = router;
