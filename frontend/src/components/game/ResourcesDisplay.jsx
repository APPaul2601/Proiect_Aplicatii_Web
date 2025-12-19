import React from "react";

const ResourcesDisplay = ({ resources = {} }) => {
  const defaultResources = {
    gold: 0,
    wood: 0,
    stone: 0,
    wheat: 0,
    ...resources,
  };

  const resourceEmojis = {
    gold: "💰",
    wood: "🪵",
    stone: "🪨",
    wheat: "🌾",
  };

  return (
    <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
      {Object.entries(defaultResources).map(([resource, amount]) => (
        <div
          key={resource}
          style={{
            backgroundColor: "rgba(26, 26, 46, 0.95)",
            border: "2px solid #FFD700",
            padding: "6px 8px",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
            boxShadow: "0 0 10px rgba(255, 215, 0, 0.2)",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "16px" }}>{resourceEmojis[resource]}</div>
          <div
            style={{
              fontSize: "8px",
              color: "#FFD700",
              fontFamily: "'Press Start 2P', cursive, sans-serif",
            }}
          >
            {resource.charAt(0).toUpperCase() + resource.slice(1)}
          </div>
          <div
            style={{
              fontSize: "12px",
              color: "#FFD700",
              fontFamily: "'Press Start 2P', cursive, sans-serif",
            }}
          >
            {amount || 0}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResourcesDisplay;
