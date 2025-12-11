const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  resources: { type: Object, default: {} },
  clicks: { type: Number, default: 0 },
  castleHp: { type: Number, default: 100 },
  castleLevel: { type: Number, default: 1 }
}, { timestamps: true, collection: 'players' });

module.exports = mongoose.model('Progress', progressSchema);
