import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_PLAYER, setToken } from "../services/api.js";

function GameUI() {
  const navigate = useNavigate();
  const [playerData, setPlayerData] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Set token din localStorage când se încarcă pagina
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
    fetchPlayerData();
  }, []);

  const fetchPlayerData = async () => {
    try {
      const res = await API_PLAYER.get("/");
      console.log("Player data:", res.data);
      setPlayerData(res.data.progress);
      setStats(res.data.stats);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching player data:", err);
      setError("Nu s-a putut încărca datele jucătorului");
      setLoading(false);
    }
  };

  const handleClick = async () => {
    if (!playerData) return;

    try {
      const updatedData = {
        clicks: playerData.clicks + 1,
        castleHp: Math.max(
          0,
          playerData.castleHp - (stats?.damagePerClick || 1)
        ),
      };

      const res = await API_PLAYER.post("/", {
        progressData: updatedData,
        statsData: {},
      });

      setPlayerData(res.data.progress);
    } catch (err) {
      console.error("Error updating player data:", err);
    }
  };

  

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) return <div style={{ padding: "20px" }}>Se încarcă...</div>;

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1>🏰 Castle Defense Game</h1>
        <button
          onClick={handleLogout}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
            backgroundColor: "#ff4444",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Logout
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

<<<<<<< Updated upstream
      {playerData && (
        <>
          {/* Castle Stats */}
          <div
            style={{
              border: "2px solid #333",
              padding: "15px",
              marginBottom: "20px",
              backgroundColor: "#f0f0f0",
              borderRadius: "5px",
            }}
          >
            <h2>📊 Castle Stats</h2>
            <p>
              <strong>Castle HP:</strong> {playerData.castleHp} / 100
            </p>
            <p>
              <strong>Castle Level:</strong> {playerData.castleLevel}
            </p>
            <p>
              <strong>Total Clicks:</strong> {playerData.clicks}
            </p>
          </div>

          {/* Click Button */}
          <div style={{ marginBottom: "20px", textAlign: "center" }}>
            <button
              onClick={handleClick}
              style={{
                padding: "30px 60px",
                fontSize: "24px",
                cursor: "pointer",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontWeight: "bold",
              }}
            >
              ⚔️ ATTACK! ⚔️
            </button>
          </div>

          {/* Resources */}
          <div
            style={{
              border: "2px solid #333",
              padding: "15px",
              marginBottom: "20px",
              backgroundColor: "#f0f0f0",
              borderRadius: "5px",
            }}
          >
            <h2>💰 Resources</h2>
            <p>
              <strong>🪵 Wood:</strong> {playerData.resources?.wood || 0}
            </p>
            <p>
              <strong>⛏️ Stone:</strong> {playerData.resources?.stone || 0}
            </p>
            <p>
              <strong>🌾 Food:</strong> {playerData.resources?.food || 0}
            </p>
            <p>
              <strong>🏆 Gold:</strong> {playerData.resources?.gold || 0}
            </p>
          </div>

          {/* Player Stats */}
          {stats && (
            <div
              style={{
                border: "2px solid #333",
                padding: "15px",
                backgroundColor: "#f0f0f0",
                borderRadius: "5px",
              }}
            >
              <h2>⚡ Player Stats</h2>
              <p>
                <strong>Damage Per Click:</strong> {stats.damagePerClick}
              </p>
            </div>
          )}
        </>
      )}
=======
        <div style={styles.rightColumn}>
          <h3 style={{ marginBottom: "15px" }}>⭐ Upgrades</h3>
          {/* Pass purchase handler to UpgradesShop so it can trigger buys */}
          <UpgradesShop
            upgrades={upgrades}
            playerUpgrades={player.upgrades || []}
            playerResources={player.resources}
            onUpgradePurchased={fetchPlayerData}
          />
        </div>
      </div>
>>>>>>> Stashed changes
    </div>
  );
}

export default GameUI;
