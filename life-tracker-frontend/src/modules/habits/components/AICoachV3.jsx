import React, { useMemo } from "react";
import "../styles/AICoachV3.css";

function buildStats(habits, days) {
  if (!habits || habits.length === 0) return [];

  return habits.map((h) => {
    const tracker = h.tracker || {};
    const doneCount = Object.keys(tracker).filter((k) => tracker[k]).length;
    const percent = days > 0 ? Math.round((doneCount / days) * 100) : 0;
    return { name: h.name, percent };
  });
}

export default function AICoachV3({ habits, days }) {
  const stats = useMemo(() => buildStats(habits, days), [habits, days]);

  if (!stats || stats.length === 0) {
    return (
      <div className="aiCard">
        <div className="aiHeader">
          <span className="emoji">🤖</span>
          <span className="title">AI Performance Coach V3</span>
        </div>
        <p className="aiEmpty">
          Add habits & track a few days to unlock AI tips 💡
        </p>
      </div>
    );
  }

  const strongest = [...stats].sort((a, b) => b.percent - a.percent)[0];
  const weakest = [...stats].sort((a, b) => a.percent - b.percent)[0];

  return (
    <div className="aiCard">
      <div className="aiHeader">
        <span className="emoji">🤖</span>
        <span className="title">AI Performance Coach V3</span>
      </div>

      <div className="aiBlock">
        <h4>🔥 Strongest habit</h4>
        <p>
          <strong>{strongest.name}</strong> is at {strongest.percent}% this
          month. Keep leaning on it for momentum.
        </p>
      </div>

      <div className="aiBlock">
        <h4>🎯 Needs intention</h4>
        <p>
          <strong>{weakest.name}</strong> is at {weakest.percent}% — try pairing
          it with a strong habit or scheduling it earlier in the day.
        </p>
      </div>

      <div className="aiBlock">
        <h4>💡 Micro-advice</h4>
        <p>
          Aim for at least a 3-day streak in a row for your key habit. Tiny
          streaks compound into big wins.
        </p>
      </div>
    </div>
  );
}
