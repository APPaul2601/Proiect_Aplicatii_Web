// Register Form Component - SIMPLIFIED VERSION
// Works with the updated Register page that handles navigation
import React, { useState } from "react";
import { registerUser } from "../../services/authService";

const RegisterForm = ({ onRegisterSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      setError("");

      console.log(`Registering user: ${username}`);
      const res = await registerUser(username, password);

      console.log("Registration successful:", res);

      // Let parent component (Register page) handle navigation and auth clearing
      onRegisterSuccess();
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      style={{ width: "100%", maxWidth: "400px" }}
    >
      <div style={{ marginBottom: "15px" }}>
        <label
          htmlFor="reg-username"
          style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
        >
          Username
        </label>
        <input
          id="reg-username"
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
        <label
          htmlFor="reg-password"
          style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
        >
          Password (min 6 characters)
        </label>
        <input
          id="reg-password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          autoComplete="new-password"
          required
          minLength="6"
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
        <label
          htmlFor="reg-confirm-password"
          style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
        >
          Confirm Password
        </label>
        <input
          id="reg-confirm-password"
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={loading}
          autoComplete="new-password"
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
          backgroundColor: loading ? "#bdc3c7" : "#3498db",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: loading ? "not-allowed" : "pointer",
          fontWeight: "bold",
          fontSize: "16px",
        }}
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default RegisterForm;
