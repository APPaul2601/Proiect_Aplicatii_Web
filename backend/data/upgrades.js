// Initial seed data for upgrades - populates MongoDB on first run

module.exports = [
  {
    type: "sharper_sword",
    name: "Sharper Sword",
    description: "Increase click power by 1",
    cost: { gold: 100, wood: 0, stone: 0, wheat: 0 },
    effect: "clickPower",
    amount: 1,
  },
  {
    type: "stronger_swing",
    name: "Stronger Swing",
    description: "Increase click power by 2",
    cost: { gold: 250, wood: 50, stone: 0, wheat: 0 },
    effect: "clickPower",
    amount: 2,
  },
  {
    type: "iron_grip",
    name: "Iron Grip",
    description: "Increase click power by 5",
    cost: { gold: 500, wood: 100, stone: 100, wheat: 0 },
    effect: "clickPower",
    amount: 5,
  },
  {
    type: "warriors_training",
    name: "Warrior's Training",
    description: "Increase click power by 10",
    cost: { gold: 1000, wood: 200, stone: 200, wheat: 100 },
    effect: "clickPower",
    amount: 10,
  },
];