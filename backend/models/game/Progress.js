

const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
  {

    user: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true, 
      unique: true, 
    },

    castleProgress: {
      type: Number,
      default: 0, 
    },

    castleStage: {
      type: Number,
      default: 1, 
    },

    castleCompleted: {
      type: Boolean,
      default: false, 
    },

    clickPower: {
      type: Number,
      default: 10, 
    },

    resources: {
      gold: { type: Number, default: 0 }, 
      wood: { type: Number, default: 0 }, 
      stone: { type: Number, default: 0 }, 
      wheat: { type: Number, default: 0 }, 
    },

    upgrades: [
      {
        type: { type: String, required: true }, 
        level: { type: Number, default: 1 }, 
      },
    ],

    unlockedUpgrades: {
      type: [String], 
      default: ["sharper_sword", "stronger_swing"],
    },


    totalClicks: {
      type: Number,
      default: 0, 
    },
  },
  {
    timestamps: true, 
    collection: "players", 
  }
);

module.exports = mongoose.model("Progress", progressSchema);
