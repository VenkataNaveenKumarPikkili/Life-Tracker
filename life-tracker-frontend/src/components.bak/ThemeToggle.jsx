import React, { useEffect, useState } from "react";
import "../styles/dashboard.css";

export default function ThemeToggle() {
  const [mode, setMode] = useState(localStorage.getItem("lt_theme") || "light");
  useEffect(() => {
    document.documentElement.dataset.theme = mode;
    localStorage.setItem("lt_theme", mode);
  }, [mode]);
  return (
    <div className="theme-toggle">
      <button className={`btn small ${mode === "light" ? "active" : ""}`} onClick={() => setMode("light")}>Light</button>
      <button className={`btn small ${mode === "dark" ? "active" : ""}`} onClick={() => setMode("dark")}>Dark</button>
    </div>
  );
}
