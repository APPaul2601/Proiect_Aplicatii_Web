// Header Component - Displays game title, player username, and logout button
// Used in the main game UI to provide navigation and user context

import React from "react";


const Header = ({ username, clickPower, onLogout, onShowAchievements }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
        padding: "15px",
        backgroundColor: "#34495e",
        color: "white",
        borderRadius: "8px",
      }}
    >
      <div>
        <h1 style={{ margin: 0, fontSize: "24px" }}>⚔️ Castle Clicker</h1>
        <p style={{ margin: "5px 0 0 0", fontSize: "14px", opacity: 0.8 }}>
          Welcome, {username}!<br />
          <span style={{ fontWeight: "bold", color: "#ffd700", display: "flex", alignItems: "center", gap: "6px" }}>
            <span role="img" aria-label="Sword">🗡️</span> Power: {clickPower}
          </span>
        </p>
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={onShowAchievements}
          style={{
            padding: "10px 16px",
            backgroundColor: "#27ae60",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "14px",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={e => e.target.style.backgroundColor = "#219150"}
          onMouseLeave={e => e.target.style.backgroundColor = "#27ae60"}
        >
          🏆 Achievements
        </button>
        <button
          onClick={onLogout}
          style={{
            padding: "10px 20px",
            backgroundColor: "#e74c3c",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "14px",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={e => e.target.style.backgroundColor = "#c0392b"}
          onMouseLeave={e => e.target.style.backgroundColor = "#e74c3c"}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
