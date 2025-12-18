// Progress Bar Component - Shows castle completion progress as percentage from 0-100%
// Displays a horizontal bar that fills based on progress prop

import React from "react";

const ProgressBar = ({ progress }) => {
  const progressPercentage = Math.min(progress || 0, 100);

  return (
    <div style={{ marginBottom: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "8px",
        }}
      >
        <label style={{ fontWeight: "bold", fontSize: "14px" }}>
          Castle Progress
        </label>
        <span style={{ fontSize: "14px", color: "#666" }}>
          {progressPercentage.toFixed(1)}%
        </span>
      </div>
      <div
        style={{
          width: "100%",
          height: "24px",
          backgroundColor: "#e0e0e0",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progressPercentage}%`,
            backgroundColor: progressPercentage < 50 ? "#e74c3c" : "#2ecc71",
            transition: "width 0.3s ease",
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
