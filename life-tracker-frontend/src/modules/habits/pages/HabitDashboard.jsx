// src/modules/habits/pages/HabitDashboard.jsx
import React, { useState, useEffect, useMemo } from "react";
import AnalyticsPro from "../components/AnalyticsPro";
import AICoachV3 from "../components/AICoachV3";
import "../styles/habits.css";

export default function HabitDashboard() {
  // ---------- DATE ----------
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const daysInMonth = useMemo(
    () => new Date(year, month + 1, 0).getDate(),
    [year, month]
  );

  const monthLabel = useMemo(
    () =>
      new Date(year, month).toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      }),
    [year, month]
  );

  // ---------- HABITS ----------
  const [habits, setHabits] = useState(() => {
    try {
      const raw = localStorage.getItem("habits");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [habitInput, setHabitInput] = useState("");

  // persist
  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  // ---------- MUTATORS ----------
  const addHabit = () => {
    const name = habitInput.trim();
    if (!name) return;

    setHabits((prev) => [
      ...prev,
      {
        name,
        tracker: [], // entries: { day: number, done: boolean }
      },
    ]);
    setHabitInput("");
  };

  const toggleDay = (habitIndex, day) => {
    // Only allow toggling for TODAY or PAST — future days locked
    const now = new Date();
    const isSameMonth =
      month === now.getMonth() && year === now.getFullYear();
    const todayNumber = now.getDate();

    if (!isSameMonth || day > todayNumber) {
      return; // ignore future clicks
    }

    setHabits((prev) => {
      const copy = [...prev];
      const habit = { ...copy[habitIndex] };
      const tracker = habit.tracker ? [...habit.tracker] : [];

      const idx = tracker.findIndex((t) => t.day === day);
      if (idx >= 0) {
        tracker[idx] = {
          ...tracker[idx],
          done: !tracker[idx].done,
        };
      } else {
        tracker.push({ day, done: true });
      }

      habit.tracker = tracker;
      copy[habitIndex] = habit;
      return copy;
    });
  };

  const removeHabit = (index) => {
    setHabits((prev) => prev.filter((_, i) => i !== index));
  };

  const goNextMonth = () => {
    setMonth((m) => {
      if (m === 11) {
        setYear((y) => y + 1);
        return 0;
      }
      return m + 1;
    });
  };

  const goPrevMonth = () => {
    setMonth((m) => {
      if (m === 0) {
        setYear((y) => y - 1);
        return 11;
      }
      return m - 1;
    });
  };

  return (
    <div className="dash">
      {/* HEADER */}
      <header>
        <h1>🔥 Habit Dashboard PRO</h1>
        <p>
          Input left • Month right • Only past/today editable • Analytics & AI on the
          right.
        </p>
      </header>

      {/* TOP CONTROL BAR */}
      <div className="topControl">
        {/* Habit input (left) */}
        <div className="addBarLeft">
          <input
            value={habitInput}
            maxLength={40}
            placeholder="Add new habit…"
            onChange={(e) => setHabitInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addHabit()}
          />
          <button onClick={addHabit}>Add +</button>
        </div>

        {/* Month selector (right, not touching edge) */}
        <div className="monthBox">
          <button onClick={goPrevMonth}>←</button>
          <h2>{monthLabel}</h2>
          <button onClick={goNextMonth}>→</button>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="layout">
        {/* ========== HABIT GRID ========== */}
        <main className="habits">
          {/* header row */}
          <div className="row head">
            <div className="name">Habit</div>
            {Array.from({ length: daysInMonth }, (_, i) => (
              <div key={i} className="dayNum">
                {i + 1}
              </div>
            ))}
            <div /> {/* delete column */}
          </div>

          {/* habit rows */}
          {habits.map((habit, i) => (
            <div className="row" key={i}>
              <div className="name" title={habit.name}>
                {habit.name.length > 14
                  ? habit.name.slice(0, 14) + "…"
                  : habit.name}
              </div>

              {Array.from({ length: daysInMonth }, (_, d) => {
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

        {/* ========== RIGHT PANEL ========== */}
        <aside className="rightPanel">
          <AnalyticsPro habits={habits} days={daysInMonth} />
          <AICoachV3 habits={habits} days={daysInMonth} />
        </aside>
      </div>
    </div>
  );
}
