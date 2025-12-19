// Building Clicker Buttons - Grid of 4 buttons for collecting resources from different buildings
// Props: onClickBuilding (function), disabled (boolean)

import React, { useState } from "react";
import { clickCastle } from "../../api/playerAPI";
import { collectResource } from "../../api/resourceAPI";

const BuildingClickerButtons = ({ onClickBuilding, disabled = false }) => {
  const [loading, setLoading] = useState(false);

  // Use backend canonical building types
  const buildings = [
    { type: "castle", icon: "🏰", label: "Castle" },
    { type: "quarry", icon: "⛏️", label: "Quarry" },
    { type: "lumber_yard", icon: "🌲", label: "Lumber Yard" },
    { type: "wheat_field", icon: "🌾", label: "Wheat Field" },
  ];

  const handleClick = async (buildingType) => {
    console.log("🖱️ Button clicked:", buildingType);
    
    if (disabled || loading) {
      console.log("❌ Button disabled or loading");
      return;
    }

    try {
      setLoading(true);
      console.log("📤 Sending request for:", buildingType);

      let result;
      if (buildingType === "castle") {
        console.log("💰 Calling clickCastle()");
        result = await clickCastle();
      } else {
        console.log("📦 Calling collectResource()");
        result = await collectResource(buildingType);
      }

      console.log("✅ API Response:", result);
      const responseData = result && result.data ? result.data : result;
      console.log("📊 Normalized data:", responseData);

      // ⭐ FIX: AWAIT the callback and close loading AFTER it completes
      if (onClickBuilding && typeof onClickBuilding === 'function') {
        console.log("🔄 Calling onClickBuilding callback NOW");
        await onClickBuilding();  // ← AWAIT HERE - don't pass data, it will fetch fresh
        console.log("✅ Callback finished, enabling buttons");
      }

      setLoading(false);
    } catch (err) {
      console.error("❌ FULL ERROR OBJECT:", err);
      console.error("❌ Error message:", err.message);
      console.error("❌ Error response:", err.response);
      setLoading(false);
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
          disabled={disabled || loading}
          style={{
            padding: "15px",
            fontSize: "16px",
            fontWeight: "bold",
            backgroundColor: disabled || loading ? "#bdc3c7" : "#3498db",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: disabled || loading ? "not-allowed" : "pointer",
            transition: "all 0.3s ease",
            opacity: disabled || loading ? 0.6 : 1,
          }}
          onMouseEnter={(e) => {
            if (!disabled && !loading) e.target.style.backgroundColor = "#2980b9";
          }}
          onMouseLeave={(e) => {
            if (!disabled && !loading) e.target.style.backgroundColor = "#3498db";
          }}
        >
          <div style={{ fontSize: "24px", marginBottom: "5px" }}>
            {building.icon}
          </div>
          {building.label}
          {loading && " ..."}
        </button>
      ))}
    </div>
  );
};

export default BuildingClickerButtons;
