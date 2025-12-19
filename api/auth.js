require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

// Import config and controllers
const connectDB = require("../backend/config/db");
const authController = require("../backend/controllers/authController");
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

// Routes
app.post("/register", authController.register);
app.post("/login", authController.login);

// Export for Vercel
module.exports = app;
