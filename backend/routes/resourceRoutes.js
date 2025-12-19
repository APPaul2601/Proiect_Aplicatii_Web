
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { collectResource } = require("../controllers/progressController");

router.post("/collect", authMiddleware, collectResource);

module.exports = router;