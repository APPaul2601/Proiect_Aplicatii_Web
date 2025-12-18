// ============================================
// SEED SCRIPT - Populate MongoDB with game data
// ============================================
// Creates all collections and adds initial data
// Run: node backend/scripts/seedData.js

const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const Building = require("../models/content/Building");
const Upgrade = require("../models/content/Upgrade");
const PlayerStats = require("../models/game/PlayerStats");

// Import seed data from data files
const buildingsData = require("../data/buildings");
const upgradesData = require("../data/upgrades");

const seedDatabase = async () => {
  try {
    // ===== CONNECT TO ATLAS =====
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB Atlas");

    // ===== SEED BUILDINGS =====
    await Building.deleteMany({});
    await Building.insertMany(buildingsData);
    console.log(`✅ Seeded ${buildingsData.length} buildings`);

    // ===== SEED UPGRADES =====
    await Upgrade.deleteMany({});
    await Upgrade.insertMany(upgradesData);
    console.log(`✅ Seeded ${upgradesData.length} upgrades`);

    // ===== CREATE PLAYERSTATS COLLECTION =====
    await PlayerStats.collection.createIndex({ user: 1 }, { unique: true });
    console.log("✅ Created PlayerStats collection with index");

    console.log("\n✅✅✅ Database Seeding Complete! ✅✅✅");
    console.log("\nCollections created:");
    console.log("  1. buildings");
    console.log("  2. upgrades");
    console.log("  3. playerstats");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error.message);
    process.exit(1);
  }
};

seedDatabase();