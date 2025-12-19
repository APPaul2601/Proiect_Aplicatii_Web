// Step 1: Integrate buyUpgrade API
// - Fetch upgrades from backend on mount
// - Pass upgrades and purchase handler to UpgradesShop
// - Refresh player data after purchase
// Game Page (GameUI) - Main game interface composing all components

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/game/Header";
import ResourcesDisplay from "../components/game/ResourcesDisplay";
import ProgressBar from "../components/game/ProgressBar";
import BuildingClickerButtons from "../components/game/BuildingClickerButtons";
import UpgradesShop from "../components/game/UpgradesShop";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useGameData } from "../hooks/useGameData";
import { getAllUpgrades, buyUpgrade } from "../api/upgradeAPI";

function GameUI() {
      // Step 2: Handler for purchasing upgrades (calls buyUpgrade and refreshes player data)
      // This will be passed to UpgradesShop
      const handleUpgradePurchase = async (upgradeType) => {
        try {
          await buyUpgrade(upgradeType);
          await fetchPlayerData();
        } catch (err) {
          console.error('Upgrade purchase failed:', err);
        }
      };
    // Fetch upgrades from backend when component mounts (Step 1)
  const navigate = useNavigate();
  const { player, loading, error, fetchPlayerData } = useGameData();
  const [upgrades, setUpgrades] = useState([]);
  const [upgradesLoading, setUpgradesLoading] = useState(true);

  useEffect(() => {
    // Fetch upgrades on mount
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

      <div style={styles.topSection}>
        {/* ⭐ RESOURCES DISPLAY - Top Bar */}
        <ResourcesDisplay resources={player.resources} />
        {/* ⭐ PROGRESS BAR - Below Resources */}
        {/* Progress is now based on clickPower, capped at 100 */}
        <ProgressBar progress={Math.min((player.clickPower || 0), 100)} />
      </div>

      <div style={styles.contentContainer}>
        <div style={styles.leftColumn}>
          <h3 style={{ marginBottom: "15px" }}>🏗️ Buildings</h3>
          <BuildingClickerButtons
            onClickBuilding={fetchPlayerData}  // ← This should trigger refresh
            disabled={false}
          />
        </div>
        <div style={styles.rightColumn}>
          <h3 style={{ marginBottom: "15px" }}>⭐ Upgrades</h3>
          {/* Step 2: Pass purchase handler to UpgradesShop for upgrade buying */}
          <UpgradesShop
            upgrades={upgrades}
            playerUpgrades={player.upgrades || []}
            playerResources={player.resources}
            onUpgradePurchased={handleUpgradePurchase}
          />
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  topSection: {
    marginBottom: "30px",
  },
  contentContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },
  leftColumn: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  rightColumn: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
};

export default GameUI;