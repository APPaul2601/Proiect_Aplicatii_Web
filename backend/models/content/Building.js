const mongoose = require("mongoose");

const buildingSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: "🏰",
    },
    description: {
      type: String,
      default: "A building",
    },
    resourceType: {
      type: String,
      enum: ["gold", "wood", "stone", "wheat"],
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "buildings",
  }
);

module.exports = mongoose.model("Building", buildingSchema);
