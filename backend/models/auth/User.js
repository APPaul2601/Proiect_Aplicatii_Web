// ============================================
// USER MODEL - User accounts
// ============================================
// Stores user login credentials
// Every player must have a User account first
// Password is hashed (encrypted) for security

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // ===== USERNAME =====
    // Unique login name for the account
    // NO TWO USERS CAN HAVE THE SAME USERNAME
    // Example: 'paul_gamer', 'john123'
    username: {
      type: String,
      required: true, // MUST provide
      unique: true, // No duplicate usernames
    },

    // ===== EMAIL (OPTIONAL) =====
    // Email address for account recovery
    // Not required, but if provided must be unique
    email: {
      type: String,
      unique: true, // No duplicate emails
      sparse: true, // Can be empty, but unique if filled
    },

    // ===== PASSWORD =====
    // Encrypted password (hashed with bcrypt)
    // NEVER store plain text passwords!
    // Hashing happens in authController.js
    password: {
      type: String,
      required: true, // MUST provide
    },
  },
  {
    timestamps: true, // Auto add createdAt, updatedAt dates
  }
);

// ===== EXPORT MODEL =====
// Creates "User" model from this schema
// Use: const User = require('./User');
module.exports = mongoose.model("User", userSchema);
