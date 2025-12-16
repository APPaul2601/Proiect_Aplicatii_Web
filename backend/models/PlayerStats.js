const mongoose = require('mongoose');

const playerStatsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  damagePerClick: { type: Number, default: 1 }
}, { timestamps: true, collection: 'playerStats' });

module.exports = mongoose.model('PlayerStats', playerStatsSchema);