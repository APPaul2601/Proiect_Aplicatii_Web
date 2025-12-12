import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import GameUI from './pages/GameUI.jsx';

function App() {
  const isLoggedIn = !!localStorage.getItem('token'); // simplu check JWT

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/game"
          element={isLoggedIn ? <GameUI /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to={isLoggedIn ? "/game" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
