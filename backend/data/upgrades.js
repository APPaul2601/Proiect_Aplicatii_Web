// Initial seed data for upgrades - populates MongoDB on first run

module.exports = [
  {
    type: "sharper_sword",
    name: "Sharper Sword",
    description: "Increase click power by 5",
    cost: { gold: 120, wood: 60, stone: 40, wheat: 30 },
    effect: "clickPower",
    amount: 5,
    requiredProgressPercent: 0, // Always available
  },
  {
    type: "stronger_swing",
    name: "Stronger Swing",
    description: "Increase click power by 10",
    cost: { gold: 350, wood: 180, stone: 120, wheat: 100 },
    effect: "clickPower",
    amount: 10,
    requiredProgressPercent: 25, // Unlocks at 25% progress
  },
  {
    type: "iron_grip",
    name: "Iron Grip",
    description: "Increase click power by 20",
    cost: { gold: 800, wood: 400, stone: 300, wheat: 250 },
    effect: "clickPower",
    amount: 20,
    requiredProgressPercent: 50, // Unlocks at 50% progress
  },
  {
    type: "warriors_training",
    name: "Warrior's Training",
    description: "Increase click power by 40",
    cost: { gold: 1600, wood: 800, stone: 600, wheat: 500 },
    effect: "clickPower",
    amount: 40,
    requiredProgressPercent: 75, // Unlocks at 75% progress
  },
];