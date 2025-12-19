import React, { useMemo } from "react";

const MILESTONES = Array.from({ length: 10 }, (_, i) => (i + 1) * 10);
const MILESTONE_LABELS = MILESTONES.reduce((acc, val) => {
  if (val === 100) {
    acc[val] = "Castle Completed!";
  } else {
    acc[val] = `Milestone: ${val}% reached!`;
  }
  return acc;
}, {});

const ProgressBar = ({ progress }) => {
  const progressPercentage = Math.min(progress || 0, 100);

  const milestone = useMemo(() => {
    for (let i = MILESTONES.length - 1; i >= 0; i--) {
      if (progressPercentage >= MILESTONES[i]) {
        return MILESTONES[i];
      }
    }
    return null;
  }, [progressPercentage]);

  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
        flex: 1,
        alignItems: "center",
        flexShrink: 0,
      }}
    >
      <label
        style={{
          fontSize: "10px",
          letterSpacing: "0.5px",
          fontFamily: "'Press Start 2P', cursive, sans-serif",
          color: "#FFD700",
          minWidth: "auto",
          whiteSpace: "nowrap",
        }}
      >
        Castle Progress
      </label>
      <div
        style={{
          flex: 1,
          height: "24px",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          border: "2px solid #FFD700",
          overflow: "hidden",
          boxShadow: "0 0 10px rgba(255, 215, 0, 0.2)",
          position: "relative",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progressPercentage}%`,
            backgroundColor: progressPercentage < 50 ? "#FF6B35" : "#4ECB71",
            transition: "width 0.3s ease",
          }}
        />
      </div>
      <span
        style={{
          fontSize: "10px",
          color: "#FFD700",
          minWidth: "40px",
          fontFamily: "'Press Start 2P', cursive, sans-serif",
          textAlign: "right",
        }}
      >
        {progressPercentage.toFixed(0)}%
      </span>
    </div>
  );
};

export default ProgressBar;
