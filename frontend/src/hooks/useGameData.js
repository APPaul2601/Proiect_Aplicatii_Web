import { useState, useEffect } from "react";
import { getPlayerData } from "../api/playerAPI";

export const useGameData = () => {
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [latestUnlocked, setLatestUnlocked] = useState([]);
  const [prevUnlocked, setPrevUnlocked] = useState([]);
  const [achievements, setAchievements] = useState(null);

  const fetchPlayerData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getPlayerData();
      const progress = response.data.progress;
      console.log("Fetched player data, clickPower:", progress.clickPower);
      const unlocked = (progress && progress.unlockedUpgrades) || [];
      setPrevUnlocked(unlocked);
      setPlayer(progress);
      console.log("Player state updated");
      
      // Extract achievements from response if available
      if (response.data.unlockedAchievements) {
        setAchievements(response.data.unlockedAchievements);
      }
    } catch (err) {
      console.error("Error fetching player data:", err.message);
      setError(err.response?.data?.message || "Failed to load game data");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPlayerData();
  }, []);
  const clearLatestUnlocked = () => setLatestUnlocked([]);
  const clearAchievements = () => setAchievements(null);

  return {
    player,
    loading,
    error,
    fetchPlayerData,
    latestUnlocked,
    clearLatestUnlocked,
    achievements,
    clearAchievements,
  };
};
