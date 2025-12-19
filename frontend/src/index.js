// React Entry Point - Initializes React application and renders App component into root DOM element
// Wraps App in React.StrictMode for highlighting potential problems

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
