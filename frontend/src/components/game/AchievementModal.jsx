import React from "react";

function AchievementModal({ achievements, onClose }) {
  if (!achievements || achievements.length === 0) {
    return null;
  }

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <button
          onClick={onClose}
          style={styles.closeButton}
          onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
          onMouseLeave={(e) => (e.target.style.opacity = "1")}
        >
          ✕
        </button>

        <h2 style={styles.title}>🏆 Achievement Unlocked!</h2>

        <div style={styles.achievementsContainer}>
          {achievements.map((achievement, index) => (
            <div key={index} style={styles.achievementCard}>
              <div style={styles.achievementIcon}>⭐</div>
              <div style={styles.achievementInfo}>
                <h3 style={styles.achievementName}>{achievement.message}</h3>
                {Object.keys(achievement.reward).length > 0 && (
                  <p style={styles.achievementReward}>
                    Reward:{" "}
                    {Object.entries(achievement.reward)
                      .map(
                        ([resource, amount]) =>
                          `+${amount} ${resource.charAt(0).toUpperCase() + resource.slice(1)}`
                      )
                      .join(", ")}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          style={styles.acceptButton}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        >
          Got it!
        </button>
      </div>
    </div>
  );
}

const styles = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    borderRadius: "15px",
    padding: "30px",
    maxWidth: "500px",
    width: "90%",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
    position: "relative",
    border: "3px solid gold",
  },
  closeButton: {
    position: "absolute",
    top: "15px",
    right: "15px",
    backgroundColor: "transparent",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    color: "white",
    opacity: "1",
    transition: "opacity 0.2s",
  },
  title: {
    textAlign: "center",
    color: "gold",
    fontSize: "28px",
    marginBottom: "20px",
    marginTop: "0",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
  },
  achievementsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginBottom: "20px",
  },
  achievementCard: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "10px",
    padding: "15px",
    gap: "15px",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  },
  achievementIcon: {
    fontSize: "32px",
    minWidth: "40px",
    textAlign: "center",
  },
  achievementInfo: {
    flex: 1,
  },
  achievementName: {
    margin: "0",
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
  },
  achievementReward: {
    margin: "5px 0 0 0",
    color: "#FFD700",
    fontSize: "14px",
    fontWeight: "bold",
  },
  acceptButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#FFD700",
    color: "#333",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "transform 0.2s",
  },
};

export default AchievementModal;
