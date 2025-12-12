// ============================================
// AUTH ROUTES - User Registration & Login
// ============================================
// Defines URL endpoints for authentication
// No token required (public endpoints)
// Called: POST /api/auth/register and /api/auth/login

const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

// ===== REGISTER ENDPOINT =====
// POST /api/auth/register
// Body: { username, password }
// Returns: { message } or { error }
// What it does: Creates new user account + Progress + Stats
router.post("/register", register);

// ===== LOGIN ENDPOINT =====
// POST /api/auth/login
// Body: { username, password }
// Returns: { token } or { error }
// What it does: Authenticates user, returns JWT token
router.post("/login", login);

// Export routes to be used in server.js
module.exports = router;
