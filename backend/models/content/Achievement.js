// backend/models/content/Achievement.js
const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  type: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  requirement: { type: Object, required: true },
}, { collection: 'achievements' });

module.exports = mongoose.model('Achievement', achievementSchema);
