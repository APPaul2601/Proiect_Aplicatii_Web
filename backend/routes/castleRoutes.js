const express = require("express");
const router = express.Router();
const {
  getProgress,
  clickCastle,
  buyUpgrade,
} = require("../controllers/progressController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getProgress);

router.post("/click", authMiddleware, clickCastle);

router.post("/buy-upgrade", authMiddleware, buyUpgrade);


module.exports = router;
