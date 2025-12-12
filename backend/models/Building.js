// ============================================
// BUILDING MODEL - Game content (what buildings exist)
// ============================================
// This defines all available buildings in the game
// SHARED catalog - all players see the same buildings
// Players buy from this catalog, updates their Progress

const mongoose = require("mongoose");

const buildingSchema = new mongoose.Schema(
  {
    // ===== UNIQUE IDENTIFIER =====
    // Unique ID for this building type (like a SKU)
    // Example: 'farm', 'mine', 'quarry', 'lumbermill'
    // NO TWO BUILDINGS CAN HAVE THE SAME TYPE
    type: {
      type: String,
      required: true, // MUST provide
      unique: true, // Only one 'farm' in the game
    },

    // ===== DISPLAY NAME =====
    // What to show on the UI
    // Example: 'Farm', 'Gold Mine', 'Stone Quarry'
    name: {
      type: String,
      required: true, // MUST provide
    },

    // ===== COST TO PURCHASE =====
    // How many resources needed to buy this building
    // Example: { gold: 100, wood: 50, stone: 0, wheat: 0 }
    // Players need these resources to buy
    cost: {
      gold: { type: Number, default: 0 }, // Gold cost
      wood: { type: Number, default: 0 }, // Wood cost
      stone: { type: Number, default: 0 }, // Stone cost
      wheat: { type: Number, default: 0 }, // Wheat cost
    },

    // ===== PASSIVE INCOME =====
    // How much this building generates per second
    // Example: Farm generates 5 wheat/second
    incomePerSecond: {
      type: Number,
      default: 1, // How fast it generates
    },

    // ===== WHAT IT PRODUCES =====
    // Which resource this building generates
    // MUST be one of: gold, wood, stone, or wheat
    // Example: Farm produces 'wheat'
    resourceType: {
      type: String,
      enum: ["gold", "wood", "stone", "wheat"], // ONLY these 4 allowed
      required: true, // MUST specify
    },
  },
  {
    timestamps: true, // Auto add createdAt, updatedAt dates
    collection: "buildings", // MongoDB collection name
  }
);

// ===== EXPORT MODEL =====
// Creates "Building" model from this schema
// Use: const Building = require('./Building');
module.exports = mongoose.model("Building", buildingSchema);
