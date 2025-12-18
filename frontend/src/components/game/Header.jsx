// Header Component - Displays game title, player username, and logout button
// Used in the main game UI to provide navigation and user context

import React from "react";

const Header = ({ username, onLogout }) => {
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
          Welcome, {username}!
        </p>
      </div>
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
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#c0392b";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "#e74c3c";
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
