// Register Page - Displays registration form with username/password fields and link to login
// On successful registration, navigates to the login page

import React from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/auth/RegisterForm";

function Register() {
  const navigate = useNavigate();

  const handleRegisterSuccess = () => {
    navigate("/login", { replace: true });
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
        <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
        <p style={{ textAlign: "center", marginTop: "20px", color: "#666" }}>
          Already have an account?{" "}
          <a href="/login" style={{ color: "#3498db", textDecoration: "none" }}>
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
