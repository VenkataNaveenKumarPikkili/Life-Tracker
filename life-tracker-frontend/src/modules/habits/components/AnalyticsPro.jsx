import React, { useMemo } from "react";
import "../styles/AnalyticsPro.css";

// tracker is { [dayNumber]: true|false }
function calcStreak(tracker = {}, days) {
  let best = 0;
  let currentRun = 0;

  for (let d = 1; d <= days; d++) {
    if (tracker[d]) {
      currentRun += 1;
      if (currentRun > best) best = currentRun;
    } else {
      currentRun = 0;
    }
  }

  // current streak from the end backwards
  let current = 0;
  for (let d = days; d >= 1; d--) {
    if (tracker[d]) current += 1;
    else break;
  }

  return { current, best };
}

function badgeFromStreak(streak) {
  if (streak >= 21) return { label: "Legend", color: "#8b5cf6" };
  if (streak >= 14) return { label: "Hot", color: "#f97316" };
  if (streak >= 7) return { label: "Warm", color: "#22c55e" };
  if (streak >= 3) return { label: "Spark", color: "#38bdf8" };
  if (streak >= 1) return { label: "Started", color: "#a3a3a3" };
  return { label: "Cold Start", color: "#9ca3af" };
}

export default function AnalyticsPro({ habits, days }) {
  const stats = useMemo(() => {
    if (!habits || habits.length === 0) return [];

    return habits
      .map((h) => {
        const tracker = h.tracker || {};
        const doneCount = Object.keys(tracker).filter((k) => tracker[k]).length;
        const percent = days > 0 ? Math.round((doneCount / days) * 100) : 0;
        const { current, best } = calcStreak(tracker, days);
        const badge = badgeFromStreak(current);
        return { name: h.name, percent, current, best, badge };
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
        <p className="emptyText">No data — tick some days in the grid.</p>
      )}

      <div className="analyticsList">
        {stats.map((s, i) => (
          <div className="analyticsItem" key={i}>
            <div className="itemTopRow">
              <span className="habitName">
                {s.name.length > 14 ? s.name.slice(0, 14) + "…" : s.name}
              </span>
              <span className="percentText">{s.percent}%</span>
            </div>

            <div className="barWrapper">
              <div className="barBg">
                <div
                  className="barFill"
                  style={{ width: `${s.percent}%` }}
                ></div>
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
