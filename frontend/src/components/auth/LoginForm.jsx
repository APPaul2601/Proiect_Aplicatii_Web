// Login Form Component - UPDATED VERSION 2
// More robust implementation with better error handling
import React, { useState } from "react";
import { loginUser } from "../../services/authService";
import { saveToken } from "../../services/storageService";
import { setToken } from "../../services/api";

const LoginForm = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      setError("");
      
      console.log(`Attempting login for: ${username}`);
      
      // Call login API
      const res = await loginUser(username, password);
      
      console.log('Login response:', res);
      
      if (!res || !res.token) {
        setError("Invalid response from server");
        return;
      }
      
      // Save token to localStorage
      saveToken(res.token);
      
      // Set token in API headers
      setToken(res.token);
      
      console.log('Token saved and set in API headers');
      
      // Give a moment for state to update before navigating
      setTimeout(() => {
        onLoginSuccess();
      }, 50);
      
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ width: "100%", maxWidth: "400px" }}>
      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="username" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
          autoComplete="username"
          required
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            boxSizing: "border-box",
            fontSize: "16px",
          }}
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="password" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          autoComplete="current-password"
          required
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            boxSizing: "border-box",
            fontSize: "16px",
          }}
        />
      </div>
      {error && (
        <div
          style={{
            backgroundColor: "#f8d7da",
            color: "#721c24",
            padding: "10px",
            borderRadius: "4px",
            marginBottom: "15px",
            fontSize: "14px",
          }}
        >
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: loading ? "#bdc3c7" : "#2ecc71",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: loading ? "not-allowed" : "pointer",
          fontWeight: "bold",
          fontSize: "16px",
        }}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
