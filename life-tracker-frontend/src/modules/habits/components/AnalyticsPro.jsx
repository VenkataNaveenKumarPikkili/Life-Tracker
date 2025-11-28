// src/modules/habits/components/AnalyticsPro.jsx
import React, { useMemo } from "react";
import "../styles/AnalyticsPro.css";

// -------- streak helpers --------
function calcStreak(tracker = [], days) {
  let longest = 0;
  let current = 0;

  for (let d = 1; d <= days; d++) {
    const done = tracker.some((t) => t.day === d && t.done);
    if (done) {
      current++;
      if (current > longest) longest = current;
    } else {
      current = 0;
    }
  }

  // running streak from end backwards
  let running = 0;
  for (let d = days; d >= 1; d--) {
    const done = tracker.some((t) => t.day === d && t.done);
    if (done) running++;
    else break;
  }

  return { current: running, best: longest };
}

function badgeLevel(days) {
  if (days >= 21) return { text: "Legend", color: "#7c3aed" };
  if (days >= 14) return { text: "Gold", color: "#f59e0b" };
  if (days >= 7) return { text: "Silver", color: "#38bdf8" };
  if (days >= 3) return { text: "Bronze", color: "#22c55e" };
  if (days >= 1) return { text: "Warm", color: "#9ca3af" };
  return { text: "Cold Start", color: "#d1d5db" };
}

export default function AnalyticsPro({ habits, days }) {
  const stats = useMemo(() => {
    if (!habits || habits.length === 0 || !days) return [];

    return habits
      .map((h) => {
        const tracker = h.tracker || [];
        const doneCount = tracker.filter((t) => t.done && t.day <= days).length;
        const percent = Math.round((doneCount / days) * 100);

        const { current, best } = calcStreak(tracker, days);
        const badge = badgeLevel(current);

        return {
          name: h.name,
          percent,
          current,
          best,
          badge,
        };
      })
      .sort((a, b) => b.percent - a.percent);
  }, [habits, days]);

  const avg =
    stats.length > 0
      ? Math.round(
          stats.reduce((sum, s) => sum + s.percent, 0) / stats.length
        )
      : 0;

  return (
    <div className="analyticsCard">
      <div className="analyticsHeader">
        <span className="title">📊 Analytics</span>
        <div className="avgChip">
          <b>{avg}%</b> <small>Avg</small>
        </div>
      </div>

      {stats.length === 0 && (
        <p className="emptyText">
          No data — tick some days in the grid to see stats 📈
        </p>
      )}

      <div className="analyticsList">
        {stats.map((s, i) => (
          <div key={i} className="analyticRow">
            <div className="topRow">
              <span className="habitName">
                {s.name.length > 16 ? s.name.slice(0, 16) + "…" : s.name}
              </span>
              <span className="percentText">{s.percent}%</span>
            </div>

            <div className="bar">
              <div className="fill" style={{ width: `${s.percent}%` }} />
            </div>

            <span className="badge" style={{ background: s.badge.color }}>
              🔥 {s.current}d — {s.badge.text}
            </span>

            {s.best > 1 && (
              <div className="bestHint">
                Best streak: {s.best} day{s.best > 1 ? "s" : ""}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
