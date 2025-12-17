// Building Clicker Buttons - Grid of 4 buttons for collecting resources from different buildings
// Props: onClickBuilding (function), disabled (boolean)

import React from "react";
import { collectResource, clickCastle } from "../../api/playerAPI";

const BuildingClickerButtons = ({ onClickBuilding, disabled = false }) => {
  // Use backend canonical building types
  const buildings = [
    { type: "castle", icon: "🏰", label: "Castle" },
    { type: "quarry", icon: "⛏️", label: "Quarry" },
    { type: "lumber_yard", icon: "🌲", label: "Lumber Yard" },
    { type: "wheat_field", icon: "🌾", label: "Wheat Field" },
  ];

  const handleClick = async (buildingType) => {
    if (disabled) return;
    try {
      let result;
      if (buildingType === "castle") {
        result = await clickCastle();
      } else {
        result = await collectResource(buildingType);
      }

      // Normalize returned shape: either { progress } or progress
      const progress = result && result.progress ? result.progress : result;

      if (onClickBuilding) onClickBuilding(progress);
    } catch (err) {
      console.error(
        "Error collecting resource/clicking castle:",
        err.response?.data || err.message || err
      );
    }
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "15px",
        marginBottom: "20px",
      }}
    >
      {buildings.map((building) => (
        <button
          key={building.type}
          onClick={() => handleClick(building.type)}
          disabled={disabled}
          style={{
            padding: "15px",
            fontSize: "16px",
            fontWeight: "bold",
            backgroundColor: disabled ? "#bdc3c7" : "#3498db",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: disabled ? "not-allowed" : "pointer",
            transition: "all 0.3s ease",
            transform: disabled ? "scale(1)" : "scale(1)",
          }}
          onMouseEnter={(e) => {
            if (!disabled) e.target.style.backgroundColor = "#2980b9";
          }}
          onMouseLeave={(e) => {
            if (!disabled) e.target.style.backgroundColor = "#3498db";
          }}
        >
          <div style={{ fontSize: "24px", marginBottom: "5px" }}>
            {building.icon}
          </div>
          {building.label}
        </button>
      ))}
    </div>
  );
};

export default BuildingClickerButtons;
