// useGameData Hook - Custom React hook for managing all game state and data fetching
// Handles fetching player data, loading and error states, and building click actions
import { useState, useEffect } from "react";
import { getPlayerData } from "../api/playerAPI";

export const useGameData = () => {
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPlayerData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getPlayerData();
      console.log("📥 useGameData - Full response:", response.data); // ← DEBUG
      console.log(
        "📥 useGameData - Setting player to:",
        response.data.progress
      ); // ← DEBUG
      setPlayer(response.data.progress); // ← FIX: Extract progress from response
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

  return { player, loading, error, fetchPlayerData };
};
