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

// Routes - Resources endpoints
app.post("/collect", authMiddleware, progressController.collectResource);

// Export for Vercel
module.exports = app;
