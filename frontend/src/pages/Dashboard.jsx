import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        
        <button onClick={() => navigate("/habits")}>
          Habits
        </button>

        <button onClick={() => navigate("/trips")}>
          Trips
        </button>

        <button onClick={() => navigate("/tasks")}>
          Tasks
        </button>

      </div>
    </div>
  );
}

