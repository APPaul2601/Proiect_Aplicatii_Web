const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

// Import database connection
const connectDB = require("./config/db");

// ===== CONNECT TO MONGODB =====
connectDB();

// ===== CREATE EXPRESS APP =====
const app = express();

// ===== MIDDLEWARE =====
// CORS: Allow frontend to make requests from different domain
app.use(cors({
  origin: "*", // Allow all origins (development only)
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Parse JSON: Convert incoming JSON to JavaScript objects
app.use(express.json());

// ===== DEFINE ROUTES =====
// Routes are organized by feature

// Authentication routes (register, login - NO token required)
// Pattern: POST /api/auth/register
//          POST /api/auth/login
app.use("/api/auth", require("./routes/authRoutes"));

// Castle/Progress routes (get/update game state - TOKEN REQUIRED)
// Pattern: GET /api/castle
//          POST /api/castle/click
//          POST /api/castle/buy-upgrade
app.use("/api/castle", require("./routes/castleRoutes"));

// Resource collection routes (TOKEN REQUIRED)
// Pattern: POST /api/resources/collect
app.use("/api/resources", require("./routes/resourceRoutes"));

// Upgrade catalog and purchase routes (TOKEN REQUIRED)
// Pattern: GET /api/upgrades
//          POST /api/upgrades/buy
app.use("/api/upgrades", require("./routes/upgradeRoutes"));

// Shop routes (backward compatibility)
app.use("/api/shop", require("./routes/shopRoutes"));

// ===== ERROR HANDLING =====
app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err.message);
  console.error("Full error:", err);
  res.status(500).json({ 
    success: false, 
    message: err.message,
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// ===== START SERVER =====
// Listen on PORT (from .env or default 5000)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server pornit pe http://localhost:${PORT}/`);
  console.log(`MongoDB URI: ${process.env.MONGO_URI}`);
  console.log("Ready to receive requests!");
});