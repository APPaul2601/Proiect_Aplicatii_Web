const mongoose = require("mongoose");
const upgradeSchema = new mongoose.Schema(
  {
    type: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    cost: {
      gold: { type: Number, default: 0 },
      wood: { type: Number, default: 0 },
      stone: { type: Number, default: 0 },
      wheat: { type: Number, default: 0 },
    },
    effect: { type: String, enum: ["clickPower"], required: true },
    amount: { type: Number, required: true },
    stage: { type: Number, default: 1 },
  },
  { timestamps: true, collection: "upgrades" }
);
module.exports = mongoose.model("Upgrade", upgradeSchema);
