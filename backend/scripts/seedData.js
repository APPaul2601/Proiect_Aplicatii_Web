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

// ===== STAGE REQUIREMENTS =====
// Define what unlocks at each castle stage
const stageRequirements = {
  1: {
    castleProgressNeeded: 0, // Start at stage 1
    unlockedUpgrades: ["sharper_sword", "stronger_swing"],
    unlockedFeatures: [],
    castleUpgradeCost: { gold: 100, wood: 50, stone: 50, wheat: 25 },
  },
  2: {
    castleProgressNeeded: 5, // After 5% progress
    unlockedUpgrades: [
      "sharper_sword",
      "stronger_swing",
      "magic_enchantment",
      "better_tools",
      "faster_workers",
    ],
    unlockedFeatures: ["workers"],
    castleUpgradeCost: { gold: 500, wood: 250, stone: 250, wheat: 125 },
  },
  3: {
    castleProgressNeeded: 25, // After 25% progress
    unlockedUpgrades: [
      "sharper_sword",
      "stronger_swing",
      "magic_enchantment",
      "better_tools",
      "faster_workers",
      "advanced_pickaxe",
      "master_axe",
    ],
    unlockedFeatures: ["workers"],
    castleUpgradeCost: { gold: 2000, wood: 1000, stone: 1000, wheat: 500 },
  },
  4: {
    castleProgressNeeded: 50, // After 50% progress
    unlockedUpgrades: [
      "sharper_sword",
      "stronger_swing",
      "magic_enchantment",
      "better_tools",
      "faster_workers",
      "advanced_pickaxe",
      "master_axe",
      "elite_workers",
    ],
    unlockedFeatures: ["workers"],
    castleUpgradeCost: { gold: 5000, wood: 2500, stone: 2500, wheat: 1250 },
  },
};

const seedDatabase = async () => {
  try {
    // ===== CONNECT TO ATLAS =====
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB Atlas");

    // ===== SEED STAGE REQUIREMENTS =====
    // Save stage requirements to a separate collection for reference
    const StageRequirementSchema = new mongoose.Schema({}, { strict: false });
    const StageRequirement = mongoose.model(
      "stageRequirements",
      StageRequirementSchema
    );

    await StageRequirement.deleteMany({});
    for (const [stage, requirements] of Object.entries(stageRequirements)) {
      await StageRequirement.create({
        stage: parseInt(stage),
        ...requirements,
      });
    }
    console.log("✅ Seeded stage requirements for 4 stages");

    // ===== SEED BUILDINGS =====
    const buildings = [
      {
        type: "castle",
        name: "Castle",
        cost: { gold: 0, wood: 0, stone: 0, wheat: 0 },
        incomePerSecond: 5,
        resourceType: "gold",
      },
      {
        type: "lumber_mill",
        name: "Lumber Mill",
        cost: { gold: 0, wood: 0, stone: 0, wheat: 0 },
        incomePerSecond: 2,
        resourceType: "wood",
      },
      {
        type: "stone_quarry",
        name: "Stone Quarry",
        cost: { gold: 0, wood: 0, stone: 0, wheat: 0 },
        incomePerSecond: 2,
        resourceType: "stone",
      },
      {
        type: "wheat_field",
        name: "Wheat Field",
        cost: { gold: 0, wood: 0, stone: 0, wheat: 0 },
        incomePerSecond: 1,
        resourceType: "wheat",
      },
    ];

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
        stage: 1,
      },
      {
        type: "stronger_swing",
        name: "Stronger Swing",
        cost: { gold: 25, wood: 0, stone: 0, wheat: 0 },
        effect: "clickPower",
        amount: 2,
        stage: 1,
      },
      {
        type: "magic_enchantment",
        name: "Magic Enchantment",
        cost: { gold: 50, wood: 50, stone: 50, wheat: 50 },
        effect: "clickPower",
        amount: 5,
        stage: 2,
      },
      {
        type: "better_tools",
        name: "Better Tools",
        cost: { gold: 30, wood: 0, stone: 0, wheat: 0 },
        effect: "resourceCollection",
        amount: 1,
        stage: 2,
      },
      {
        type: "faster_workers",
        name: "Faster Workers",
        cost: { gold: 100, wood: 50, stone: 0, wheat: 0 },
        effect: "workerSpeed",
        amount: 1,
        stage: 2,
      },
      {
        type: "advanced_pickaxe",
        name: "Advanced Pickaxe",
        cost: { gold: 200, wood: 0, stone: 100, wheat: 0 },
        effect: "stoneCollection",
        amount: 2,
        stage: 3,
      },
      {
        type: "master_axe",
        name: "Master Axe",
        cost: { gold: 200, wood: 100, stone: 0, wheat: 0 },
        effect: "woodCollection",
        amount: 2,
        stage: 3,
      },
      {
        type: "elite_workers",
        name: "Elite Workers",
        cost: { gold: 500, wood: 250, stone: 250, wheat: 250 },
        effect: "workerEfficiency",
        amount: 2,
        stage: 4,
      },
    ];

    await Upgrade.deleteMany({});
    await Upgrade.insertMany(upgrades);
    console.log(`✅ Seeded ${upgrades.length} upgrades`);

    // ===== CREATE PLAYERSTATS COLLECTION =====
    await PlayerStats.collection.createIndex({ user: 1 }, { unique: true });
    console.log("✅ Created PlayerStats collection");

    console.log("\n✅✅✅ All Collections Created on Atlas! ✅✅✅");
    console.log("\nCollections:");
    console.log("  1. users");
    console.log("  2. players (Progress)");
    console.log("  3. buildings");
    console.log("  4. upgrades");
    console.log("  5. playerstats");
    console.log("  6. stagerequirements");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error.message);
    process.exit(1);
  }
};

seedDatabase();
