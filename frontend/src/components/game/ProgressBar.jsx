// Progress Bar Component - Shows castle completion progress as 0-100% visually
// Displays a horizontal bar that fills based on progress prop (0-100%)


import React, { useMemo } from "react";

// Milestones at every 10% (0-100%)
const MAX_PROGRESS = 100;
const MILESTONES = Array.from({ length: MAX_PROGRESS / 10 }, (_, i) => (i + 1) * 10);
const MILESTONE_LABELS = MILESTONES.reduce((acc, val) => {
  if (val === 100) {
    acc[val] = "Castle Completed!";
  } else {
    acc[val] = `Milestone: ${val}% reached!`;
  }
  return acc;
}, {});

const ProgressBar = ({ progress }) => {
  // Clamp progress to 0-100 for display
  const progressValue = Math.max(progress || 0, 0);
  const progressPercentage = Math.min(progressValue, MAX_PROGRESS);

  // Find the highest milestone reached
  const milestone = useMemo(() => {
    for (let i = MILESTONES.length - 1; i >= 0; i--) {
      if (progressPercentage >= MILESTONES[i]) {
        return MILESTONES[i];
      }
    }
    return null;
  }, [progressPercentage]);

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
          position: "relative",
        }}
      >
        {/* Progress fill */}
        <div
          style={{
            height: "100%",
            width: `${progressPercentage}%`,
            backgroundColor: progressPercentage < 50 ? "#e74c3c" : progressPercentage < 100 ? "#2ecc71" : "#f1c40f",
            transition: "width 0.3s ease",
            borderRadius: progressPercentage >= 100 ? "12px" : "12px 0 0 12px",
            zIndex: 1,
          }}
        />
        {/* Milestone markers */}
        {MILESTONES.map((milestone, idx) => (
          <div
            key={milestone}
            style={{
              position: "absolute",
              left: `calc(${milestone}% - 10px)`,
              top: 0,
              height: "100%",
              width: "0",
              borderLeft: "2px dashed #888",
              zIndex: 2,
              pointerEvents: "none",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: "-22px",
                left: "-12px",
                fontSize: "11px",
                color: "#888",
                whiteSpace: "nowrap",
              }}
            >
              {milestone}%
            </span>
          </div>
        ))}
      </div>
      {/* Milestone message */}
      {milestone && progressPercentage >= milestone && (
        <div style={{
          marginTop: "8px",
          color: milestone === 100 ? "#2ecc71" : "#2980b9",
          fontWeight: "bold",
          fontSize: "15px",
          textAlign: "center",
        }}>
          {MILESTONE_LABELS[milestone]}
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
