// backend/scripts/seedAchievements.js
// Seeds the achievements collection from backend/data/achievements.js
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const Achievement = require('../models/content/Achievement');
const achievementsData = require('../data/achievements');

const seedAchievements = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');
    await Achievement.deleteMany({});
    await Achievement.insertMany(achievementsData);
    console.log(`✅ Seeded ${achievementsData.length} achievements`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding achievements:', err.message);
    process.exit(1);
  }
};

seedAchievements();
