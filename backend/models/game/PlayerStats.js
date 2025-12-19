// ============================================
// PLAYER STATS MODEL - Track player achievements
// ============================================
// Stores statistics about player progress
// Separate from Progress for cleaner data organization

const mongoose = require('mongoose');

const playerStatsSchema = new mongoose.Schema({
  
  // ===== LINK TO PLAYER =====
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true  // One stats document per player
  },
  
  // ===== STATISTICS =====
  totalClicksMade: {
    type: Number,
    default: 0  // Total clicks in game history
  },
  
  buildingsOwned: {
    type: Number,
    default: 0  // Total number of buildings owned
  },
  
  upgradesUnlocked: {
    type: Number,
    default: 0  // Total upgrades purchased
  },
  
  // ===== MILESTONES =====
  firstBuildingBought: {
    type: Date,
    default: null  // When player bought first building
  },
  
  firstUpgradeBought: {
    type: Date,
    default: null  // When player bought first upgrade
  },

  // ===== ACHIEVEMENTS =====
  achievements: [
    {
      type: String, // achievement type/id
      required: true
    }
  ]
  
}, { timestamps: true, collection: 'playerstats' });

module.exports = mongoose.model('PlayerStats', playerStatsSchema);