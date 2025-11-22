// src/modules/dashboard/pages/Dashboard.jsx

import { useNavigate } from "react-router-dom";
import "./dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const services = [
    {
      title: "Habits Tracker",
      description: "Track your daily routines and build discipline.",
      action: () => navigate("/habits"),
      color: "#4CAF50",
    },
    {
      title: "Trips Planner",
      description: "Plan trips and manage your travel goals.",
      action: null,
      color: "#2196F3",
    },
    {
      title: "Fitness Progress",
      description: "Record workouts, runs, and gym sessions.",
      action: null,
      color: "#FF9800",
    },
    {
      title: "Budget Manager",
      description: "Track expenses and plan your monthly budget.",
      action: null,
      color: "#9C27B0",
    },
  ];

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Life Tracker Dashboard</h1>
      <p className="dashboard-subtitle">
        Choose a service to continue
      </p>

      <div className="dashboard-grid">
        {services.map((service, index) => (
          <div
            key={index}
            className="dashboard-card"
            style={{ borderTopColor: service.color }}
          >
            <h2>{service.title}</h2>
            <p>{service.description}</p>

            {service.action ? (
              <button
                className="dashboard-btn"
                onClick={service.action}
              >
                Open
              </button>
            ) : (
              <button className="dashboard-btn disabled">
                Coming Soon
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
