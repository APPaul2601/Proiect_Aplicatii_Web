import React from "react";

const Header = ({ username, clickPower, onLogout, onReset }) => {
  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset your progress? This cannot be undone!")) {
      onReset();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        backgroundColor: "rgba(26, 26, 46, 0.95)",
        color: "white",
        borderBottom: "3px solid #FFD700",
        fontFamily: "'Press Start 2P', cursive, sans-serif",
        flexShrink: 0,
      }}
    >
      <div>
        <h1
          style={{
            margin: 0,
            fontSize: "14px",
            letterSpacing: "1px",
            textShadow: "0 0 10px rgba(255, 215, 0, 0.5)",
          }}
        >
          ⚔️ Castle Clicker
        </h1>
        <p
          style={{
            margin: "5px 0 0 0",
            fontSize: "8px",
            color: "#FFD700",
            letterSpacing: "0.5px",
          }}
        >
          Welcome, {username}!<br />
          <span
            style={{
              fontWeight: "bold",
              color: "#ffd700",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span role="img" aria-label="Sword">
              🗡️
            </span>{" "}
            Power: {clickPower}
          </span>
        </p>
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={handleReset}
          style={{
            padding: "6px 12px",
            backgroundColor: "#f39c12",
            color: "#FFD700",
            border: "2px solid #FFD700",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "8px",
            fontFamily: "'Press Start 2P', cursive, sans-serif",
            letterSpacing: "0.5px",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.05)";
            e.target.style.boxShadow = "0 0 10px rgba(255, 215, 0, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow = "none";
          }}
        >
          Reset
        </button>
        <button
          onClick={onLogout}
          style={{
            padding: "6px 12px",
            backgroundColor: "#c0392b",
            color: "#FFD700",
            border: "2px solid #FFD700",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "8px",
            fontFamily: "'Press Start 2P', cursive, sans-serif",
            letterSpacing: "0.5px",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.05)";
            e.target.style.boxShadow = "0 0 10px rgba(255, 215, 0, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow = "none";
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
