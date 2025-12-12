// ============================================
// SEED SCRIPT - Populate MongoDB with game data
// ============================================
// Creates all collections and adds initial data
// Run: node backend/scripts/seedData.js

const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const Building = require("../models/Building");
const Upgrade = require("../models/Upgrade");
const PlayerStats = require("../models/PlayerStats");

const seedDatabase = async () => {
  try {
    // ===== CONNECT TO ATLAS =====
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB Atlas");

    // ===== SEED BUILDINGS =====
    const buildings = [
      {
        type: "farm",
        name: "Farm",
        cost: { gold: 0, wood: 10, stone: 0, wheat: 0 },
        incomePerSecond: 1,
        resourceType: "gold",
      },
      {
        type: "mine",
        name: "Gold Mine",
        cost: { gold: 20, wood: 0, stone: 0, wheat: 0 },
        incomePerSecond: 2,
        resourceType: "gold",
      },
      {
        type: "quarry",
        name: "Stone Quarry",
        cost: { gold: 30, wood: 20, stone: 0, wheat: 0 },
        incomePerSecond: 1,
        resourceType: "stone",
      },
      {
        type: "lumbermill",
        name: "Lumber Mill",
        cost: { gold: 25, wood: 0, stone: 10, wheat: 0 },
        incomePerSecond: 1,
        resourceType: "wood",
      },
    ];

    // Delete old, insert new
    await Building.deleteMany({});
    await Building.insertMany(buildings);
    console.log(`✅ Seeded ${buildings.length} buildings`);

    // ===== SEED UPGRADES =====
    const upgrades = [
      {
        type: "sharper_sword",
        name: "Sharper Sword",
        cost: { gold: 5, wood: 0, stone: 0, wheat: 0 },
        effect: "clickPower",
        amount: 1,
      },
      {
        type: "stronger_swing",
        name: "Stronger Swing",
        cost: { gold: 25, wood: 0, stone: 0, wheat: 0 },
        effect: "clickPower",
        amount: 2,
      },
      {
        type: "magic_enchantment",
        name: "Magic Enchantment",
        cost: { gold: 50, wood: 50, stone: 50, wheat: 50 },
        effect: "clickPower",
        amount: 5,
      },
    ];

    // Delete old, insert new
    await Upgrade.deleteMany({});
    await Upgrade.insertMany(upgrades);
    console.log(`✅ Seeded ${upgrades.length} upgrades`);

    // ===== CREATE PLAYERSTATS COLLECTION =====
    // Just creating the collection (empty is OK)
    await PlayerStats.collection.createIndex({ user: 1 }, { unique: true });
    console.log("✅ Created PlayerStats collection");

    console.log("\n✅✅✅ All 5 Collections Created on Atlas! ✅✅✅");
    console.log("\nCollections:");
    console.log("  1. users");
    console.log("  2. players (Progress)");
    console.log("  3. buildings");
    console.log("  4. upgrades");
    console.log("  5. playerstats");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error.message);
    process.exit(1);
  }
};

seedDatabase();
