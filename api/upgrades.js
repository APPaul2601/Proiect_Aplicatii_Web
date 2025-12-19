require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Import config and controllers
const connectDB = require("../backend/config/db");
const shopController = require("../backend/controllers/shopController");
const upgradeController = require("../backend/controllers/upgradeController");
const authMiddleware = require("../backend/middleware/authMiddleware");

// Create Express app
const app = express();

// Middleware
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Connect to DB
connectDB();

// Routes - Upgrades endpoints
app.get("/", shopController.getUpgrades);
app.post("/buy", authMiddleware, upgradeController.buyUpgrade);

// Export for Vercel
module.exports = app;
