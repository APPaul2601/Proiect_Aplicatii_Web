// Main App Component - Root component handling routing and authentication state management
// Uses React Router for navigation between Register, Login, and Game pages

import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import GameUI from "./pages/GameUI.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    // Listen for storage changes (when token is added/removed)
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      console.log(
        "🔔 Storage changed, token:",
        token ? "✅ Found" : "❌ Not found"
      );
      setIsLoggedIn(!!token);
    };

    // Listen for storage changes from other tabs/windows
    window.addEventListener("storage", handleStorageChange);

    // Also check token on component mount
    const token = localStorage.getItem("token");
    if (token) {
      console.log("✅ Token found on app mount, user is logged in");
      setIsLoggedIn(true);
    }

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/game"
          element={isLoggedIn ? <GameUI /> : <Navigate to="/login" />}
        />
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/game" : "/login"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
