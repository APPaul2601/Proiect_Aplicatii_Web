const mongoose = require('mongoose');

const playerStatsSchema = new mongoose.Schema({
  
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true 
  },
  
  totalClicksMade: {
    type: Number,
    default: 0  
  },
  
  buildingsOwned: {
    type: Number,
    default: 0  
  },
  
  upgradesUnlocked: {
    type: Number,
    default: 0  
  },
  
  firstBuildingBought: {
    type: Date,
    default: null  
  },
  
  firstUpgradeBought: {
    type: Date,
    default: null  
  }
  
}, { timestamps: true, collection: 'playerstats' });

module.exports = mongoose.model('PlayerStats', playerStatsSchema);