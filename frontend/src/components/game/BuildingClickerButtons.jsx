// Building Clicker Buttons - Grid of 4 buttons for collecting resources from different buildings
// Props: onClickBuilding (function), disabled (boolean)

import React from "react";

const BuildingClickerButtons = ({ onClickBuilding, disabled = false }) => {
  const buildings = [
    { type: "farm", icon: "🌾", label: "Farm" },
    { type: "quarry", icon: "⛏️", label: "Quarry" },
    { type: "forest", icon: "🌲", label: "Forest" },
    { type: "goldmine", icon: "⛏️", label: "Gold Mine" },
  ];

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
          onClick={() => onClickBuilding(building.type)}
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
