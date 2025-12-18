// ============================================
// PROGRESS MODEL - Stores player game state
// ============================================
// This tracks individual player progress
// Each player has ONE Progress document
// Updates when they click, buy buildings, buy upgrades

const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
  {
    // ===== PLAYER CONNECTION =====
    // Links this progress to a User account
    // ONE progress per user, NO duplicates
    user: {
      type: mongoose.Schema.Types.ObjectId, // References User model
      ref: "User", // Can populate user data
      required: true, // MUST have a user
      unique: true, // Only one Progress per user
    },

    // ===== MAIN GOAL =====
    // Castle construction progress (0 to 100%)
    castleProgress: {
      type: Number,
      default: 0, // Starts at 0%
    },

    // Which stage of castle building (1, 2, 3, or 4)
    // Determines what upgrades and features are available
    castleStage: {
      type: Number,
      default: 1, // Starts at stage 1
    },

    // Whether the castle is fully completed (true when castleProgress >= 100)
    castleCompleted: {
      type: Boolean,
      default: false, // Not completed yet
    },

    // ===== COMBAT =====
    // How much damage each click does
    // Increased by purchasing upgrades
    clickPower: {
      type: Number,
      default: 1, // Starts at 1 damage per click
    },

    // ===== RESOURCES =====
    // Player's stored resources (earned by clicking and buildings)
    resources: {
      gold: { type: Number, default: 0 }, // Earned by clicking
      wood: { type: Number, default: 0 }, // Earned by Lumber Mill
      stone: { type: Number, default: 0 }, // Earned by Stone Quarry
      wheat: { type: Number, default: 0 }, // Earned by Farm
    },

    // ===== UPGRADES UNLOCKED =====
    // List of upgrades the player has purchased
    // Example: [ { type: 'sharper_sword', level: 1 } ]
    upgrades: [
      {
        type: { type: String, required: true }, // Upgrade type ('sharper_sword', etc)
        level: { type: Number, default: 1 }, // What level they own
      },
    ],

    // ===== AVAILABLE UPGRADES =====
    // Which upgrades are unlocked for purchase (based on castleStage)
    // Example: ['sharper_sword', 'stronger_swing', 'better_tools']
    unlockedUpgrades: {
      type: [String], // Array of upgrade types available
      default: ["sharper_sword", "stronger_swing"], // Stage 1 unlocks these
    },

    // ===== STATS TRACKING =====
    // Total clicks made by this player (for achievements/stats)
    totalClicks: {
      type: Number,
      default: 0, // Starts at 0
    },
  },
  {
    timestamps: true, // Auto add createdAt, updatedAt dates
    collection: "players", // MongoDB collection name
  }
);

// ===== EXPORT MODEL =====
// Creates "Progress" model from this schema
// Use: const Progress = require('./Progress');
module.exports = mongoose.model("Progress", progressSchema);
