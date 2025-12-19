// Step 1: Integrate buyUpgrade API
// - Fetch upgrades from backend on mount
// - Pass upgrades and purchase handler to UpgradesShop
// - Refresh player data after purchase
// Game Page (GameUI) - Main game interface composing all components

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/game/Header";
import AchievementsModal from "../components/game/AchievementsModal";
import { getAllAchievements, checkAndUnlockAchievements } from "../api/achievementAPI";
import ResourcesDisplay from "../components/game/ResourcesDisplay";
import ProgressBar from "../components/game/ProgressBar";
import BuildingClickerButtons from "../components/game/BuildingClickerButtons";
import UpgradesShop from "../components/game/UpgradesShop";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useGameData } from "../hooks/useGameData";
import { getAllUpgrades, buyUpgrade } from "../api/upgradeAPI";

function GameUI() {
  const [achievementPopup, setAchievementPopup] = useState(null);
  // Handler for purchasing upgrades (calls buyUpgrade and refreshes player data)
  const handleUpgradePurchase = async (upgradeType) => {
    try {
      await buyUpgrade(upgradeType);
      await fetchPlayerData();
      // Only check for achievements if purchase succeeded
      const result = await checkAndUnlockAchievements({ upgradeAny: 1 });
      if (result && result.newlyUnlocked && result.newlyUnlocked.length > 0) {
        // Show popup for each newly unlocked achievement (show first, then auto-dismiss)
        const achievement = result.newlyUnlocked[0];
        setAchievementPopup({
          name: achievement.name,
          description: achievement.description
        });
        setTimeout(() => setAchievementPopup(null), 4000);
      }
    } catch (err) {
      console.error('Upgrade purchase failed:', err);
      alert('Failed to purchase upgrade');
    }
  };
    // Fetch upgrades from backend when component mounts (Step 1)
  const navigate = useNavigate();
  const { player, loading, error, fetchPlayerData, latestUnlocked, clearLatestUnlocked } = useGameData();
  const [achievementsOpen, setAchievementsOpen] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const [achievementsLoading, setAchievementsLoading] = useState(false);
  const [upgrades, setUpgrades] = useState([]);
  const [upgradesLoading, setUpgradesLoading] = useState(true);

  // Fetch upgrades on mount
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

  // auto-dismiss the unlock banner after a short delay
  useEffect(() => {
    if (latestUnlocked && latestUnlocked.length > 0) {
      const t = setTimeout(() => {
        clearLatestUnlocked();
      }, 4000);
      return () => clearTimeout(t);
    }
  }, [latestUnlocked, clearLatestUnlocked]);

  // auto-dismiss the unlock banner after a short delay
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


  // Fetch achievements when modal is opened
  // (No useEffect should return JSX. The main component should return the JSX below.)
  // ...existing code...
  return (
    <div style={styles.pageContainer}>
      <Header
        username={player.user?.username || "Player"}
        clickPower={player.clickPower}
        onLogout={handleLogout}
        onShowAchievements={() => setAchievementsOpen(true)}
      />

      <AchievementsModal
        open={achievementsOpen}
        onClose={() => setAchievementsOpen(false)}
        achievements={achievements}
        loading={achievementsLoading}
      />

      {/* Achievement unlocked popup */}
      {achievementPopup && (
        <div style={styles.achievementPopup}>
          <div style={{ fontWeight: 'bold', fontSize: 18, color: '#27ae60', marginBottom: 4 }}>Achievement Unlocked!</div>
          <div style={{ fontWeight: 'bold', fontSize: 16 }}>{achievementPopup.name}</div>
          <div style={{ fontSize: 14, color: '#555' }}>{achievementPopup.description}</div>
        </div>
      )}

      {/* Unlock notification banner */}
      {latestUnlocked && latestUnlocked.length > 0 && (
        <div style={styles.unlockBanner}>
          New upgrades unlocked: {latestUnlocked.join(", ")}
        </div>
      )}

      {/* Auto-dismiss handled in useEffect above */}

      <div style={styles.topSection}>
        {/* ⭐ RESOURCES DISPLAY - Top Bar */}
        <ResourcesDisplay resources={player.resources} />
        {/* ⭐ PROGRESS BAR - Below Resources */}
        {/* Progress is now based on clickPower, capped at 100 */}
        <ProgressBar progress={Math.min((player.clickPower || 0), 100)} />
      </div>

      <div style={styles.contentContainer}>
        <div style={styles.leftColumn}>
          <div>
            <h3 style={{ marginBottom: "15px" }}>🏗️ Buildings</h3>
            <BuildingClickerButtons
              onClickBuilding={fetchPlayerData}  // ⭐ This should trigger refresh
              disabled={false}
            />
          </div>
        </div>
        <div style={styles.rightColumn}>
          <div>
            <h3 style={{ marginBottom: "15px" }}>⭐ Upgrades</h3>
            {/* Step 2: Pass purchase handler to UpgradesShop for upgrade buying */}
            <UpgradesShop
              upgrades={upgrades}
              playerUpgrades={player.upgrades || []}
              playerUnlockedUpgrades={player.unlockedUpgrades || []}
              playerResources={player.resources}
              onUpgradePurchased={handleUpgradePurchase}
              progressPercent={Math.min(((player.power || 0) / 500) * 100, 100)}
            />
          </div>
        </div>
      </div>
    </div>
  );

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
  unlockBanner: {
      },
      achievementPopup: {
        position: 'fixed',
        top: 40,
        left: '50%',
        transform: 'translateX(-50%)',
        background: '#fff',
        border: '2px solid #27ae60',
        borderRadius: 10,
        padding: '18px 32px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
        zIndex: 2000,
        textAlign: 'center',
        minWidth: 280,
        maxWidth: 400,
        fontFamily: 'inherit',
        animation: 'fadeInScale 0.3s',
      },
      '@keyframes fadeInScale': {
        from: { opacity: 0, transform: 'translateX(-50%) scale(0.8)' },
        to: { opacity: 1, transform: 'translateX(-50%) scale(1)' },
      },
    backgroundColor: "#fffbeb",
    border: "1px solid #ffe58f",
    padding: "10px 14px",
    borderRadius: "6px",
    margin: "12px 0",
    textAlign: "center",
    color: "#8a6d1b",
    fontWeight: "600",
  },
};

export default GameUI;