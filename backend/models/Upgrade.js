// ============================================
// UPGRADE MODEL - Game content (what upgrades exist)
// ============================================
// This defines all available upgrades in the game
// SHARED catalog - all players see the same upgrades
// Players buy from this catalog, updates their Progress

const mongoose = require("mongoose");

const upgradeSchema = new mongoose.Schema(
  {
    // ===== UNIQUE IDENTIFIER =====
    // Unique ID for this upgrade type (like a SKU)
    // Example: 'sharper_sword', 'stronger_swing', 'magic_enchantment'
    // NO TWO UPGRADES CAN HAVE THE SAME TYPE
    type: {
      type: String,
      required: true, // MUST provide
      unique: true, // Only one 'sharper_sword' in the game
    },

    // ===== DISPLAY NAME =====
    // What to show on the UI
    // Example: 'Sharper Sword', 'Stronger Swing', 'Magic Enchantment'
    name: {
      type: String,
      required: true, // MUST provide
    },

    // ===== COST TO PURCHASE =====
    // How many resources needed to buy this upgrade
    // Example: { gold: 50, wood: 0, stone: 0, wheat: 0 }
    // Players need these resources to buy
    cost: {
      gold: { type: Number, default: 0 }, // Gold cost
      wood: { type: Number, default: 0 }, // Wood cost
      stone: { type: Number, default: 0 }, // Stone cost
      wheat: { type: Number, default: 0 }, // Wheat cost
    },

    // ===== WHAT STAT IT AFFECTS =====
    // Which player stat this upgrade affects
    // MUST be one of: clickPower or castleGoal
    // Example: 'clickPower' = boost your damage
    effect: {
      type: String,
      enum: ["clickPower", "castleGoal"], // ONLY these 2 allowed
      required: true, // MUST specify
    },

    // ===== HOW MUCH IT CHANGES =====
    // The amount to increase/decrease the stat by
    // Example: clickPower +1, castleGoal -1000000
    amount: {
      type: Number,
      required: true, // MUST specify
    },
  },
  {
    timestamps: true, // Auto add createdAt, updatedAt dates
    collection: "upgrades", // MongoDB collection name
  }
);

// ===== EXPORT MODEL =====
// Creates "Upgrade" model from this schema
// Use: const Upgrade = require('./Upgrade');
module.exports = mongoose.model("Upgrade", upgradeSchema);
