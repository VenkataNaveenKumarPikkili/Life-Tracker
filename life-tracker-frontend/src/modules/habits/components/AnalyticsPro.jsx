// src/modules/habits/components/AnalyticsPro.jsx
import React, { useMemo } from "react";
import "../styles/AnalyticsPro.css";

function calcStreak(tracker = [], days) {
  let current = 0;
  let best = 0;

  for (let day = 1; day <= days; day++) {
    const done = tracker.find((t) => t.day === day && t.done);
    if (done) {
      current += 1;
      if (current > best) best = current;
    } else {
      current = 0;
    }
  }

  // current streak = from last day backwards
  let cur = 0;
  for (let day = days; day >= 1; day--) {
    const done = tracker.find((t) => t.day === day && t.done);
    if (done) cur += 1;
    else break;
  }
  return { current: cur, best };
}

function badgeFromStreak(streak) {
  if (streak >= 21) return { label: "Legend", color: "#8b5cf6" };
  if (streak >= 14) return { label: "Gold", color: "#f59e0b" };
  if (streak >= 7) return { label: "Silver", color: "#38bdf8" };
  if (streak >= 3) return { label: "Bronze", color: "#22c55e" };
  if (streak >= 1) return { label: "Spark", color: "#a3a3a3" };
  return { label: "Cold Start", color: "#9ca3af" };
}

export default function AnalyticsPro({ habits, days }) {
  const stats = useMemo(() => {
    if (!habits || habits.length === 0) return [];

    return habits
      .map((h) => {
        const tracker = h.tracker || [];
        const doneCount = tracker.filter((t) => t.done).length;
        const percent =
          days > 0 ? Math.round((doneCount / days) * 100) : 0;

        const { current, best } = calcStreak(tracker, days);
        const badge = badgeFromStreak(current);

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
    stats.length === 0
      ? 0
      : Math.round(
          stats.reduce((sum, s) => sum + s.percent, 0) / stats.length
        );

  return (
    <div className="analyticsCard">
      <div className="analyticsHeader">
        <div className="titleRow">
          <span className="emoji">📊</span>
          <span className="title">Analytics</span>
        </div>
        <div className="avgChip">
          <span>{avg}%</span>
          <small>Avg</small>
        </div>
      </div>

      {stats.length === 0 && (
        <p className="emptyText">No data yet — start checking boxes ✅</p>
      )}

      <div className="analyticsList">
        {stats.map((s, i) => (
          <div className="analyticsItem" key={i}>
            <div className="itemTopRow">
              <span className="habitName">
                {s.name.length > 16
                  ? s.name.slice(0, 16) + "…"
                  : s.name}
              </span>
              <span className="percentText">{s.percent}%</span>
            </div>

            <div className="barWrapper">
              <div className="barBg">
                <div
                  className="barFill"
                  style={{ width: `${s.percent}%` }}
                />
              </div>
              <span
                className="streakPill"
                style={{ background: s.badge.color }}
              >
                🔥 {s.current}d • {s.badge.label}
              </span>
            </div>

            {s.best > 0 && (
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
