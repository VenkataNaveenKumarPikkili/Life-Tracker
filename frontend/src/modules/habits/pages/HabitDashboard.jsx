// src/modules/habits/pages/HabitDashboard.jsx
import { useEffect, useMemo, useState } from "react";
import {
  fetchHabits,
  createHabit,
  toggleHabit,
  deleteHabit,
} from "../api/habits";
import "./habit-dashboard.css";

function toISODate(d) {
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

export default function HabitDashboard() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [frequency, setFrequency] = useState("Daily");
  const [viewMonth, setViewMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const today = new Date();
  const todayISO = toISODate(today);

  // ---- derived values for current month ----
  const { days, monthLabel, monthKey } = useMemo(() => {
    const year = viewMonth.getFullYear();
    const monthIndex = viewMonth.getMonth(); // 0-based
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

    const arr = Array.from({ length: daysInMonth }, (_, i) => {
      return new Date(year, monthIndex, i + 1);
    });

    return {
      days: arr,
      monthLabel: viewMonth.toLocaleString("default", {
        month: "long",
        year: "numeric",
      }),
      monthKey: `${year}-${String(monthIndex + 1).padStart(2, "0")}`,
    };
  }, [viewMonth]);

  // ---- initial load ----
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await fetchHabits();
        // ensure completed_dates array exists
        const normalized = (data || []).map((h) => ({
          ...h,
          completed_dates: h.completed_dates || [],
        }));
        setHabits(normalized);
      } catch (err) {
        console.error(err);
        setError("Failed to load habits.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ---- summary / analysis helpers ----
  function countDoneToday(habit) {
    return habit.completed_dates?.includes(todayISO);
  }

  function countDoneThisMonth(habit) {
    return (habit.completed_dates || []).filter((d) => d.startsWith(monthKey))
      .length;
  }

  const summary = useMemo(() => {
    if (!habits.length) {
      return {
        totalHabits: 0,
        completedToday: 0,
        progressPct: 0,
      };
    }

    const totalHabits = habits.length;
    const completedToday = habits.filter(countDoneToday).length;
    const progressPct = Math.round((completedToday / totalHabits) * 100);

    return { totalHabits, completedToday, progressPct };
  }, [habits]);

  // ---- actions ----
  async function handleAddHabit(e) {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      setError("");
      const newHabit = await createHabit(title.trim(), frequency);
      setHabits((prev) => [...prev, newHabit]);
      setTitle("");
      setFrequency("Daily");
    } catch (err) {
      console.error(err);
      setError("Failed to create habit.");
    }
  }

  async function handleToggle(habitId, dateObj) {
    const dateISO = toISODate(dateObj);

    try {
      setError("");
      await toggleHabit(habitId, dateISO);

      // Update client-side state based on that date
      setHabits((prev) =>
        prev.map((h) => {
          if (h.id !== habitId) return h;
          const current = h.completed_dates || [];
          const already = current.includes(dateISO);
          const nextDates = already
            ? current.filter((d) => d !== dateISO)
            : [...current, dateISO];
          return { ...h, completed_dates: nextDates };
        })
      );
    } catch (err) {
      console.error(err);
      setError("Failed to update habit.");
    }
  }

  async function handleDelete(habitId) {
    if (!confirm("Delete this habit?")) return;
    try {
      setError("");
      await deleteHabit(habitId);
      setHabits((prev) => prev.filter((h) => h.id !== habitId));
    } catch (err) {
      console.error(err);
      setError("Failed to delete habit.");
    }
  }

  function changeMonth(offset) {
    setViewMonth((prev) => {
      const y = prev.getFullYear();
      const m = prev.getMonth();
      return new Date(y, m + offset, 1);
    });
  }

  // ---- render helpers ----
  function renderDayCell(habit, dateObj) {
    const dateISO = toISODate(dateObj);
    const isInPastOrToday = dateObj <= today;
    const isDone = habit.completed_dates?.includes(dateISO);
    const isToday = dateISO === todayISO;

    const classNames = [
      "habit-grid-checkbox",
      isInPastOrToday ? "today" : "",
      isDone ? "done" : "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        key={dateISO}
        type="button"
        className={classNames}
        onClick={() => isInPastOrToday && handleToggle(habit.id, dateObj)}
        disabled={!isInPastOrToday}
        aria-pressed={isDone}
        title={dateISO}
      >
        {isDone ? "✓" : ""}
      </button>
    );
  }

  // ---- UI ----
  return (
    <div className="habit-page">
      {/* HEADER */}
      <header className="habit-header">
        <div>
          <h1>My Habits</h1>
          <p className="habit-subtitle">Track your daily progress</p>
        </div>

        <div className="habit-summary">
          <div className="summary-item">
            <span className="summary-label">Month</span>
            <span className="summary-value">{monthLabel}</span>
            <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
              <button
                type="button"
                onClick={() => changeMonth(-1)}
                style={{ padding: "2px 6px" }}
              >
                ◀
              </button>
              <button
                type="button"
                onClick={() => changeMonth(1)}
                style={{ padding: "2px 6px" }}
              >
                ▶
              </button>
            </div>
          </div>

          <div className="summary-item">
            <span className="summary-label">Number of habits</span>
            <span className="summary-value">{summary.totalHabits}</span>
          </div>

          <div className="summary-item">
            <span className="summary-label">Completed today</span>
            <span className="summary-value">{summary.completedToday}</span>
          </div>

          <div className="summary-item">
            <span className="summary-label">Progress</span>
            <div className="summary-progress">
              <div className="summary-progress-bar">
                <div
                  className="summary-progress-fill"
                  style={{ width: `${summary.progressPct}%` }}
                />
              </div>
              <span className="summary-progress-text">
                {summary.progressPct}%
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ADD HABIT FORM */}
      <section className="habit-add-section">
        <h2>Add New Habit</h2>
        <form className="habit-add-form" onSubmit={handleAddHabit}>
          <input
            type="text"
            placeholder="Habit title (e.g. Drink water)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Frequency (e.g. Daily)"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
        {error && <p className="habit-error">{error}</p>}
      </section>

      {/* GRID */}
      <section className="habit-grid-section">
        {/* header row */}
        <div className="habit-grid-header-row">
          <div className="habit-grid-habit-col">My Habits</div>
          <div className="habit-grid-days-col">
            <div className="habit-grid-week-row">
              <span>Week 1</span>
              <span>Week 2</span>
              <span>Week 3</span>
              <span>Week 4</span>
            </div>
            <div className="habit-grid-days-row">
              {days.map((d) => (
                <div key={d.getDate()} className="habit-grid-day-cell">
                  {d.getDate()}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* body */}
        <div className="habit-grid-body">
          {loading && <p style={{ padding: 12 }}>Loading habits…</p>}

          {!loading && habits.length === 0 && (
            <p className="habit-empty">
              No habits yet. Create your first one above!
            </p>
          )}

          {habits.map((habit) => {
            const doneCount = countDoneThisMonth(habit);
            const pct =
              days.length > 0
                ? Math.round((doneCount / days.length) * 100)
                : 0;

            return (
              <div key={habit.id} className="habit-grid-row">
                <div className="habit-grid-habit-cell">
                  <div className="habit-name">{habit.title}</div>
                  <div className="habit-goal">{habit.frequency}</div>
                  <button
                    type="button"
                    className="habit-delete-btn"
                    onClick={() => handleDelete(habit.id)}
                    title="Delete habit"
                  >
                    ✕
                  </button>
                </div>

                <div>
                  <div className="habit-grid-days-row">
                    {days.map((dateObj) => renderDayCell(habit, dateObj))}
                  </div>
                  {/* simple per-habit progress under the row */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "0 12px 8px 12px",
                      fontSize: 11,
                      color: "#666",
                    }}
                  >
                    <span>Done {doneCount} / {days.length}</span>
                    <div
                      style={{
                        flex: 1,
                        height: 6,
                        borderRadius: 999,
                        background: "#eee",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${pct}%`,
                          background: "#5bb85c",
                        }}
                      />
                    </div>
                    <span>{pct}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
