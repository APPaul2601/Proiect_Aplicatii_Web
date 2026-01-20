const express = require("express");
const router = express.Router();
const {
  getProgress,
  clickCastle,
  buyUpgrade,
  resetProgress,
} = require("../controllers/progressController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getProgress);

router.post("/click", authMiddleware, clickCastle);

router.post("/buy-upgrade", authMiddleware, buyUpgrade);

router.post("/reset", authMiddleware, resetProgress);

module.exports = router;
