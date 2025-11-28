// src/modules/habits/pages/HabitDashboard.jsx
import React, { useState, useEffect } from "react";
import AnalyticsPro from "../components/AnalyticsPro";
import AICoachV3 from "../components/AICoachV3";
import "../styles/habits.css";

export default function HabitDashboard() {
  const [habits, setHabits] = useState(
    JSON.parse(localStorage.getItem("habits") || "[]")
  );

  const [habitInput, setHabitInput] = useState("");

  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const days = new Date(year, month + 1, 0).getDate();

  // Persist in localStorage
  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  function addHabit() {
    const name = habitInput.trim();
    if (!name) return;

    setHabits((prev) => [
      ...prev,
      {
        name,
        tracker: [], // {day, done: true}
      },
    ]);
    setHabitInput("");
  }

  function toggleDay(habitIndex, day) {
    setHabits((prev) => {
      const copy = [...prev];
      const habit = copy[habitIndex];

      const tracker = habit.tracker || [];
      const existingIndex = tracker.findIndex((t) => t.day === day);

      if (existingIndex >= 0) {
        tracker[existingIndex] = {
          ...tracker[existingIndex],
          done: !tracker[existingIndex].done,
        };
      } else {
        tracker.push({ day, done: true });
      }

      habit.tracker = tracker;
      copy[habitIndex] = habit;
      return copy;
    });
  }

  function removeHabit(index) {
    setHabits((prev) => prev.filter((_, i) => i !== index));
  }

  const goNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  };

  const goPrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  };

  const monthLabel = new Date(year, month).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="dash">
      <header>
        <h1>🔥 Habit Dashboard PRO MAX V7</h1>
        <p>Elite • Stable • No Popup • Perfect Alignment • Streaks ON 🔥</p>
      </header>

      {/* Month row */}
      <div className="monthRow">
        <button onClick={goPrevMonth}>← Prev</button>
        <h2>{monthLabel}</h2>
        <button onClick={goNextMonth}>Next →</button>
      </div>

      {/* Add habit bar */}
      <div className="addBar">
        <input
          value={habitInput}
          maxLength={40}
          placeholder="Add new habit…"
          onChange={(e) => setHabitInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addHabit()}
        />
        <button onClick={addHabit}>Add +</button>
      </div>

      <div className="layout">
        {/* HABIT GRID */}
        <main className="habits">
          {/* header row */}
          <div className="row head">
            <div className="name">Habit</div>
            {Array.from({ length: days }, (_, i) => (
              <div className="dayNum" key={i}>
                {i + 1}
              </div>
            ))}
            <div></div>
          </div>

          {/* habit rows */}
          {habits.map((habit, i) => (
            <div className="row" key={i}>
              <div className="name" title={habit.name}>
                {habit.name.length > 14
                  ? habit.name.slice(0, 14) + "…"
                  : habit.name}
              </div>

              {Array.from({ length: days }, (_, d) => {
                const tracker = habit.tracker || [];
                const record = tracker.find((t) => t.day === d + 1);
                const done = !!record?.done;
                return (
                  <div
                    key={d}
                    className={`cell ${done ? "ok" : ""}`}
                    onClick={() => toggleDay(i, d + 1)}
                  >
                    {done ? "✔" : ""}
                  </div>
                );
              })}

              <button className="del" onClick={() => removeHabit(i)}>
                ✕
              </button>
            </div>
          ))}

          {habits.length === 0 && (
            <div className="emptyHint">
              Start by adding your first habit above 👆
            </div>
          )}
        </main>

        {/* RIGHT PANEL  */}
        <aside className="rightPanel">
          <AnalyticsPro habits={habits} days={days} />
          <AICoachV3 habits={habits} days={days} />
        </aside>
      </div>
    </div>
  );
}
