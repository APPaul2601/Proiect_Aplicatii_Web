// backend/data/achievements.js
// Defines all achievements for the game

module.exports = [
  // Resource Milestones
  {
    type: "resource_gold",
    name: "Gold Hoarder",
    description: "Collect 1,000 gold.",
    requirement: { resource: "gold", amount: 1000 },
  },
  {
    type: "resource_wood",
    name: "Woodcutter",
    description: "Gather 500 wood.",
    requirement: { resource: "wood", amount: 500 },
  },
  {
    type: "resource_stone",
    name: "Stone Mason",
    description: "Mine 300 stone.",
    requirement: { resource: "stone", amount: 300 },
  },
  {
    type: "resource_wheat",
    name: "Wheat Farmer",
    description: "Harvest 200 wheat.",
    requirement: { resource: "wheat", amount: 200 },
  },

  // Upgrade Power Achievements
  {
    type: "power_10",
    name: "First Steps",
    description: "Increase your click power by 10.",
    requirement: { power: 10 },
  },
  {
    type: "power_50",
    name: "Getting Stronger",
    description: "Reach 50 total click power.",
    requirement: { power: 50 },
  },
  {
    type: "power_100",
    name: "Powerhouse",
    description: "Reach 100 total click power.",
    requirement: { power: 100 },
  },

  // Upgrade Purchase Achievements
  {
    type: "upgrade_any_5",
    name: "Novice Upgrader",
    description: "Buy any upgrade 5 times.",
    requirement: { upgradeAny: 5 },
  },
  {
    type: "upgrade_any_20",
    name: "Dedicated Upgrader",
    description: "Buy any upgrade 20 times.",
    requirement: { upgradeAny: 20 },
  },
  {
    type: "upgrade_sharper_sword_10",
    name: "Sharper Sword Master",
    description: "Buy “Sharper Sword” 10 times.",
    requirement: { upgrade: "sharper_sword", amount: 10 },
  },
  {
    type: "upgrade_iron_grip_10",
    name: "Iron Grip Collector",
    description: "Buy “Iron Grip” 10 times.",
    requirement: { upgrade: "iron_grip", amount: 10 },
  },

  // Progression Achievements
  {
    type: "progress_25",
    name: "Quarter Way",
    description: "Reach 25% progress.",
    requirement: { progress: 25 },
  },
  {
    type: "progress_50",
    name: "Halfway There",
    description: "Reach 50% progress.",
    requirement: { progress: 50 },
  },
  {
    type: "progress_75",
    name: "Almost There",
    description: "Reach 75% progress.",
    requirement: { progress: 75 },
  },
  {
    type: "progress_100",
    name: "Castle Conqueror",
    description: "Reach 100% progress.",
    requirement: { progress: 100 },
  },
];
