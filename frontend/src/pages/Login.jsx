import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";

function Login() {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate("/game", { replace: true });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
          ⚔️ Castle Clicker
        </h1>
        <LoginForm onLoginSuccess={handleLoginSuccess} />
        <p style={{ textAlign: "center", marginTop: "20px", color: "#666" }}>
          Don't have an account?{" "}
          <a
            href="/register"
            style={{ color: "#3498db", textDecoration: "none" }}
          >
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
