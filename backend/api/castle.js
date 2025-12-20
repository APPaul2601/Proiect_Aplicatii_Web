require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Import config and controllers
const connectDB = require("../config/db");
const progressController = require("../controllers/progressController");
const authMiddleware = require("../middleware/authMiddleware");

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

// Routes - Castle endpoints
app.get("/", authMiddleware, progressController.getProgress);
app.post("/click", authMiddleware, progressController.clickCastle);
app.post("/buy-upgrade", authMiddleware, progressController.buyUpgrade);

// Export for Vercel
module.exports = app;
