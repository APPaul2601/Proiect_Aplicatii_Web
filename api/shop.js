require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Import config and controllers
const connectDB = require("../backend/config/db");
const shopController = require("../backend/controllers/shopController");

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

// Routes - Shop endpoints
app.get("/upgrades", shopController.getUpgrades);

// Export for Vercel
module.exports = app;
