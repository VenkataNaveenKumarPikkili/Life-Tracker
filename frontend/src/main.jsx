// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
// If you don't have this file yet, create an empty one.
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
