// useGameData Hook - Custom React hook for managing all game state and data fetching
// Handles fetching player data, loading and error states, and building click actions
import { useState, useEffect } from "react";
import { getPlayerData } from "../api/playerAPI";

export const useGameData = () => {
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [latestUnlocked, setLatestUnlocked] = useState([]);
  const [prevUnlocked, setPrevUnlocked] = useState([]);

  const fetchPlayerData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getPlayerData();
      const progress = response.data.progress;
      // detect newly unlocked upgrades compared to the previous fetch
      const unlocked = (progress && progress.unlockedUpgrades) || [];
      const newly = unlocked.filter((u) => !prevUnlocked.includes(u));
      if (newly.length > 0) {
        setLatestUnlocked(newly);
      }
      setPrevUnlocked(unlocked);
      setPlayer(progress);
    } catch (err) {
      console.error("❌ Error fetching player data:", err);
      setError(err.response?.data?.message || "Failed to load game data");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data ONCE when component mounts
  useEffect(() => {
    fetchPlayerData();
  }, []); // Empty dependency array = run only once
  const clearLatestUnlocked = () => setLatestUnlocked([]);

  return { player, loading, error, fetchPlayerData, latestUnlocked, clearLatestUnlocked };
};
