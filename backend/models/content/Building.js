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

    // ===== ICON FOR UI =====
    // Emoji or symbol to display in UI
    // Example: '🏰', '⛏️', '🪵', '🌾'
    icon: {
      type: String,
      default: "🏰",
    },

    // ===== DESCRIPTION =====
    // Flavor text for UI
    description: {
      type: String,
      default: "A building",
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
