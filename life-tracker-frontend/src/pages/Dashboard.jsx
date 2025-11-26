import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  Chart,
  LineController,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
} from "chart.js";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "../styles/dashboard.css";

Chart.register(
  LineController,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
);

export default function Dashboard() {
  const navigate = useNavigate();

  // user / profile
  const [user, setUser] = useState({ email: "", username: "" });
  const [profileImage, setProfileImage] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // habit modal + data
  const [showHabitModal, setShowHabitModal] = useState(false);
  const [habitName, setHabitName] = useState("");
  const [habitFrequency, setHabitFrequency] = useState("Daily");
  const [habitStart, setHabitStart] = useState("");
  const [habits, setHabits] = useState([]);

  // chart
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  // ===== auth / init =====
  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const decoded = jwtDecode(token);
      const email = decoded?.sub || decoded?.email || "";
      const username = email.split("@")[0] || "User";
      setUser({ email, username });

      const img = localStorage.getItem("lt_profile_image");
      if (img) setProfileImage(img);

      const storedHabits = localStorage.getItem("lt_habits");
      if (storedHabits) setHabits(JSON.parse(storedHabits));
    } catch (e) {
      console.error(e);
      navigate("/login");
    }
  }, [navigate]);

  // ===== chart init (safe) =====
  useEffect(() => {
    if (!chartRef.current) return;
    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["M", "T", "W", "T", "F", "S", "S"],
        datasets: [
          {
            data: [5, 7, 6, 8, 4, 9, 7],
            borderColor: "#3454ff",
            pointBackgroundColor: "#3454ff",
            tension: 0.4,
          },
        ],
      },
      options: {
        plugins: { legend: false },
        scales: { y: { display: false }, x: { display: false } },
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  // ===== AI-ish text based on habits count =====
  const insightText =
    habits.length >= 5
      ? "🔥 Strong week! Your productivity is above average."
      : "🔥 Strong week! Your productivity is above average.";

  // ===== pdf export of main area =====
  const handleExportPDF = async () => {
    const input = document.getElementById("export-area");
    if (!input) return;

    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeight);
    pdf.save("weekly-report.pdf");
  };

  // ===== habit modal handlers =====
  const openHabitModal = () => {
    setHabitName("");
    setHabitFrequency("Daily");
    setHabitStart("");
    setShowHabitModal(true);
  };

  const closeHabitModal = () => setShowHabitModal(false);

  const saveHabit = () => {
    if (!habitName.trim()) return;
    const newHabit = {
      id: Date.now(),
      name: habitName.trim(),
      frequency: habitFrequency,
      start: habitStart || new Date().toISOString().slice(0, 10),
    };
    const updated = [newHabit, ...habits];
    setHabits(updated);
    localStorage.setItem("lt_habits", JSON.stringify(updated));
    setShowHabitModal(false);
  };

  // ===== logout =====
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const services = [
    { name: "Habits", icon: "📅", path: "/habits" },
    { name: "Tasks", icon: "📋", path: "/tasks" },
    { name: "Trips", icon: "✈️", path: "/trips" },
    { name: "Fitness", icon: "🏋️", path: "/fitness" },
    { name: "Goals", icon: "🎯", path: "/goals" },
  ];

  return (
    <div className="dash-container">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2 className="logo">LifeTracker</h2>

        <nav className="menu">
          <Link to="/dashboard" className="active">
            Overview
          </Link>
          <Link to="/habits">Habits</Link>
          <Link to="/tasks">Tasks</Link>
          <Link to="/trips">Trips</Link>
          <Link to="/fitness">Fitness</Link>
          <Link to="/goals">Goals</Link>
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      {/* MAIN */}
      <main className="main">
        {/* TOPBAR */}
        <header className="topbar">
          <input
            className="search"
            placeholder="Search habits, tasks, trips..."
          />

          <div className="quick-actions">
            <button onClick={openHabitModal}>+ Habit</button>
            <button onClick={() => navigate("/tasks")}>+ Task</button>
            <button onClick={handleExportPDF}>📄 Export PDF</button>
          </div>

          <div
            className="user-box"
            onClick={() => setDropdownOpen((o) => !o)}
          >
            <div
              className="avatar"
              style={{
                backgroundImage: profileImage ? `url(${profileImage})` : "",
              }}
            >
              {!profileImage && user.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <strong>{user.username}</strong>
              <p>{user.email}</p>
            </div>
          </div>

          {dropdownOpen && (
            <div className="profile-dropdown">
              <button
                onClick={() => {
                  localStorage.removeItem("lt_profile_image");
                  setProfileImage(null);
                }}
              >
                Remove Photo
              </button>
              <button className="danger" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </header>

        {/* MAIN EXPORTABLE CONTENT */}
        <div id="export-area">
          {/* Welcome / insight */}
          <h1 className="welcome">
            👋 Welcome back, <span>{user.username}</span>
          </h1>
          <p className="insight-text">{insightText}</p>

          {/* Analytics row */}
          <section className="analytics-row">
            {/* Ring */}
            <div className="analytics-card">
              <div className="ring-wrapper">
                <svg width="110" height="110">
                  <circle
                    cx="55"
                    cy="55"
                    r="42"
                    stroke="#e5e5e5"
                    strokeWidth="10"
                    fill="none"
                  />
                  <circle
                    cx="55"
                    cy="55"
                    r="42"
                    stroke="#3454ff"
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray={2 * Math.PI * 42}
                    strokeDashoffset={
                      (2 * Math.PI * 42 * (100 - 72)) / 100
                    }
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h3>Habit Success</h3>
              <p>72% Score</p>
            </div>

            {/* Trend chart */}
            <div className="analytics-card">
              <div className="chart-wrapper">
                <canvas ref={chartRef} />
              </div>
              <h3>7-Day Trend</h3>
              <p>Habits + Tasks</p>
            </div>

            {/* Weekly streak */}
            <div className="analytics-card">
              <div className="week-bar">
                {[3, 6, 7, 4, 5, 2, 6].map((v, i) => (
                  <div
                    className="bar"
                    key={i}
                    style={{ height: `${v * 10}px` }}
                  />
                ))}
              </div>
              <h3>Weekly Streak</h3>
              <p>Active Days</p>
            </div>
          </section>

          {/* Heat calendar */}
          <section className="heatmap">
            <h2>30-Day Heat Calendar</h2>
            <div className="grid">
              {Array.from({ length: 30 }).map((_, i) => (
                <div className="dot" key={i} />
              ))}
            </div>
          </section>

          {/* Recently added habits */}
          {habits.length > 0 && (
            <section className="recent-habits">
              <h2>Recently Added Habits</h2>
              <ul>
                {habits.slice(0, 5).map((h) => (
                  <li key={h.id}>
                    <span className="habit-name">{h.name}</span>
                    <span className="habit-meta">
                      {h.frequency} • from {h.start}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Services grid */}
          <section className="services">
            <h2>Your Services</h2>
            <div className="service-grid">
              {services.map((s) => (
                <Link
                  key={s.name}
                  to={s.path}
                  className="service-card"
                >
                  <div className="service-icon">{s.icon}</div>
                  <div>
                    <h3>{s.name}</h3>
                    <p>Manage your {s.name.toLowerCase()}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* HABIT MODAL */}
      {showHabitModal && (
        <div className="modal-backdrop" onClick={closeHabitModal}>
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Add New Habit</h2>
            <label>
              Habit name
              <input
                value={habitName}
                onChange={(e) => setHabitName(e.target.value)}
                placeholder="e.g. Morning run"
              />
            </label>

            <label>
              Frequency
              <select
                value={habitFrequency}
                onChange={(e) => setHabitFrequency(e.target.value)}
              >
                <option>Daily</option>
                <option>Weekly</option>
                <option>Weekdays</option>
              </select>
            </label>

            <label>
              Start date
              <input
                type="date"
                value={habitStart}
                onChange={(e) => setHabitStart(e.target.value)}
              />
            </label>

            <div className="modal-actions">
              <button
                type="button"
                className="secondary"
                onClick={closeHabitModal}
              >
                Cancel
              </button>
              <button type="button" onClick={saveHabit}>
                Save Habit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
