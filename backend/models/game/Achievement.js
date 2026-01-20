const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    achievements: [
      {
        type: {
          type: String,
          enum: ["gold_milestone", "wood_milestone", "stone_milestone", "wheat_milestone"],
          required: true,
        },
        unlockedAt: {
          type: Date,
          default: null,
        },
        isUnlocked: {
          type: Boolean,
          default: false,
        },
      },
    ],

    totalAchievementsUnlocked: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    collection: "achievements",
  }
);

// Compound index to ensure one user per achievement document
achievementSchema.index({ user: 1 }, { unique: true });

module.exports = mongoose.model("Achievement", achievementSchema);
