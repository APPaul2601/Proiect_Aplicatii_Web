import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/game/Header";
import ResourcesDisplay from "../components/game/ResourcesDisplay";
import ProgressBar from "../components/game/ProgressBar";
import BuildingClickerButtons from "../components/game/BuildingClickerButtons";
import UpgradesShop from "../components/game/UpgradesShop";
import AchievementModal from "../components/game/AchievementModal";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useGameData } from "../hooks/useGameData";
import { getAllUpgrades, buyUpgrade } from "../api/upgradeAPI";

function GameUI() {
  const handleUpgradePurchase = async (upgradeType) => {
    try {
      await buyUpgrade(upgradeType);
      await fetchPlayerData();
    } catch (err) {
      console.error("Upgrade purchase failed:", err);
    }
  };

  const navigate = useNavigate();
  const {
    player,
    loading,
    error,
    fetchPlayerData,
    latestUnlocked,
    clearLatestUnlocked,
    achievements,
    clearAchievements,
  } = useGameData();
  const [upgrades, setUpgrades] = useState([]);
  const [upgradesLoading, setUpgradesLoading] = useState(true);
  const [showUpgradesModal, setShowUpgradesModal] = useState(false);
  const [unlockedAchievements, setUnlockedAchievements] = useState(null);
  const [showAchievementModal, setShowAchievementModal] = useState(false);


  useEffect(() => {
    const fetchUpgradesData = async () => {
      try {
        const data = await getAllUpgrades();
        setUpgrades(data);
        setUpgradesLoading(false);
      } catch (err) {
        console.error("Error fetching upgrades:", err);
        setUpgradesLoading(false);
      }
    };
    fetchUpgradesData();
  }, []);


  useEffect(() => {
    if (latestUnlocked && latestUnlocked.length > 0) {
      const t = setTimeout(() => {
        clearLatestUnlocked();
      }, 4000);
      return () => clearTimeout(t);
    }
  }, [latestUnlocked, clearLatestUnlocked]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading || upgradesLoading) {
    return <LoadingSpinner message="Loading game data..." />;
  }

  if (error || !player) {
    return (
      <div style={{ padding: "20px", textAlign: "center", color: "#e74c3c" }}>
        Error loading game: {error || "Unknown error"}
      </div>
    );
  }

  return (
    <div style={styles.pageContainer}>
      <Header
        username={player.user?.username || "Player"}
        clickPower={player.clickPower}
        onLogout={handleLogout}
      />

      {latestUnlocked && latestUnlocked.length > 0 && (
        <div style={styles.unlockBanner}>
          New upgrades unlocked: {latestUnlocked.join(", ")}
        </div>
      )}


      <div style={styles.topSection}>
        <ProgressBar progress={Math.min(player.clickPower || 0, 100)} />
        <ResourcesDisplay resources={player.resources} />
        <button
          onClick={() => setShowUpgradesModal(true)}
          style={styles.upgradesButton}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.05)";
            e.target.style.filter = "brightness(1.2)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.filter = "brightness(1)";
          }}
        >
          UPGRADES
        </button>
      </div>

      <div style={styles.contentContainer}>
        <div style={styles.gameplayArea}>
          <BuildingClickerButtons
            onClickBuilding={(achievements) => {
              console.log("Achievements received in GameUI:", achievements);
              if (achievements && achievements.length > 0) {
                console.log("Setting achievements and showing modal");
                setUnlockedAchievements(achievements);
                setShowAchievementModal(true);
              }
              fetchPlayerData();
            }}
            disabled={false}
          />
        </div>
      </div>

      {showUpgradesModal && (
        <div
          style={styles.modalOverlay}
          onClick={() => setShowUpgradesModal(false)}
        >
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowUpgradesModal(false)}
              style={styles.closeButton}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.1)";
                e.target.style.filter = "brightness(1.2)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.filter = "brightness(1)";
              }}
            >
              ✕
            </button>

            <UpgradesShop
              upgrades={upgrades}
              playerUpgrades={player.upgrades || []}
              playerUnlockedUpgrades={player.unlockedUpgrades || []}
              playerResources={player.resources}
              onUpgradePurchased={handleUpgradePurchase}
            />
          </div>
        </div>
      )}

      {showAchievementModal && (
        <AchievementModal
          achievements={unlockedAchievements}
          onClose={() => {
            setShowAchievementModal(false);
            setUnlockedAchievements(null);
          }}
        />
      )}
    </div>
  );
}

const styles = {
  pageContainer: {
    fontFamily: "'Press Start 2P', cursive, sans-serif",
    backgroundColor: "#0a0a15",
    minHeight: "100vh",
    maxHeight: "100vh",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  topSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    padding: "15px 30px",
    flexShrink: 0,
  },
  upgradesButton: {
    padding: "8px 12px",
    backgroundColor: "rgba(26, 26, 46, 0.95)",
    color: "#FFD700",
    border: "2px solid #FFD700",
    fontFamily: "'Press Start 2P', cursive, sans-serif",
    fontSize: "10px",
    fontWeight: "bold",
    cursor: "pointer",
    letterSpacing: "0.5px",
    whiteSpace: "nowrap",
    transition: "all 0.2s ease",
  },
  contentContainer: {
    padding: "0 30px 30px",
    flex: 1,
    overflow: "hidden",
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "20px",
  },
  gameplayArea: {
    position: "relative",
    backgroundImage: `url(${require("../images/background/Background.png")})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    flex: 1,
    overflow: "hidden",
    userSelect: "none",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    position: "relative",
    backgroundColor: "rgba(26, 26, 46, 0.98)",
    border: "3px solid #FFD700",
    padding: "20px",
    maxWidth: "600px",
    maxHeight: "80vh",
    overflow: "auto",
    boxShadow: "0 0 30px rgba(255, 215, 0, 0.3)",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    width: "28px",
    height: "28px",
    padding: 0,
    backgroundColor: "transparent",
    color: "#FFD700",
    border: "2px solid #FFD700",
    fontFamily: "'Press Start 2P', cursive, sans-serif",
    fontSize: "14px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
  },
  unlockBanner: {
    backgroundColor: "rgba(26, 26, 46, 0.95)",
    border: "2px solid #FFD700",
    color: "#FFD700",
    padding: "10px 14px",
    margin: "12px 0",
    textAlign: "center",
    fontWeight: "600",
    boxShadow: "0 0 10px rgba(255, 215, 0, 0.3)",
    letterSpacing: "0.5px",
  },
  upgradesButton: {
    backgroundColor: "rgba(26, 26, 46, 0.95)",
    color: "#FFD700",
    border: "2px solid #FFD700",
    padding: "8px 12px",
    borderRadius: "0",
    fontFamily: "'Press Start 2P', cursive, sans-serif",
    fontSize: "10px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.2s ease",
    letterSpacing: "0.5px",
    whiteSpace: "nowrap",
    boxShadow:
      "0 4px 12px rgba(0, 0, 0, 0.5), inset 0 0 10px rgba(255, 215, 0, 0.1)",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "rgba(26, 26, 46, 0.98)",
    border: "3px solid #FFD700",
    borderRadius: "0",
    padding: "20px",
    maxWidth: "600px",
    maxHeight: "80vh",
    overflow: "auto",
    position: "relative",
    boxShadow:
      "0 8px 32px rgba(0, 0, 0, 0.7), inset 0 0 20px rgba(255, 215, 0, 0.1)",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "transparent",
    color: "#FFD700",
    border: "2px solid #FFD700",
    width: "30px",
    height: "30px",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "0",
    fontFamily: "'Press Start 2P', cursive, sans-serif",
    transition: "all 0.2s ease",
  },
};

export default GameUI;
