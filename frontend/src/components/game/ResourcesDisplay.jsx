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
    <div
      style={{
        backgroundColor: "#f0f0f0",
        padding: "15px",
        borderRadius: "8px",
        marginBottom: "20px",
        border: "2px solid #333",
      }}
    >
      <h3 style={{ marginTop: 0, marginBottom: "15px" }}>Resources</h3>
      
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "10px",
        }}
      >
        {Object.entries(defaultResources).map(([resource, amount]) => (
          <div
            key={resource}
            style={{
              backgroundColor: "white",
              padding: "10px",
              borderRadius: "6px",
              textAlign: "center",
              border: "1px solid #ddd",
            }}
          >
            <div style={{ fontSize: "20px", marginBottom: "5px" }}>
              {resourceEmojis[resource]}
            </div>
            <div style={{ fontSize: "12px", color: "#666" }}>
              {resource.charAt(0).toUpperCase() + resource.slice(1)}
            </div>
            <div
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "#333",
                marginTop: "5px",
              }}
            >
              {amount || 0}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourcesDisplay;