// src/modules/habits/components/AICoachV3.jsx
import React, { useMemo } from "react";
import "../styles/AICoachV3.css";

// same streak helper so coach & analytics agree
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

  let cur = 0;
  for (let day = days; day >= 1; day--) {
    const done = tracker.find((t) => t.day === day && t.done);
    if (done) cur += 1;
    else break;
  }
  return { current: cur, best };
}

export default function AICoachV3({ habits, days }) {
  const insight = useMemo(() => {
    if (!habits || habits.length === 0) return null;

    const extended = habits.map((h) => {
      const tracker = h.tracker || [];
      const doneCount = tracker.filter((t) => t.done).length;
      const percent =
        days > 0 ? Math.round((doneCount / days) * 100) : 0;
      const { current, best } = calcStreak(tracker, days);
      return { name: h.name, percent, current, best };
    });

    const bestStreak = [...extended].sort(
      (a, b) => b.current - a.current
    )[0];

    const weakest = [...extended].sort(
      (a, b) => a.percent - b.percent
    )[0];

    const lowStreaks = extended.filter((h) => h.current === 0);

    return { bestStreak, weakest, lowStreaks };
  }, [habits, days]);

  return (
    <div className="coachCard">
      <div className="coachHeader">
        <div className="titleRow">
          <span className="emoji">🤖</span>
          <span className="title">AI Performance Coach V3</span>
        </div>
      </div>

      {!insight && (
        <p className="emptyText">
          Add habits & track a few days to unlock AI tips 💡
        </p>
      )}

      {insight && (
        <div className="coachBody">
          {insight.bestStreak && insight.bestStreak.current > 0 && (
            <div className="coachItem positive">
              <div className="label">🔥 Strongest streak</div>
              <div className="text">
                <b>{insight.bestStreak.name}</b> is on a{" "}
                <b>{insight.bestStreak.current}-day</b> streak. Keep
                it alive today!
              </div>
            </div>
          )}

          {insight.weakest && (
            <div className="coachItem neutral">
              <div className="label">📉 Needs intention</div>
              <div className="text">
                <b>{insight.weakest.name}</b> is at{" "}
                <b>{insight.weakest.percent}%</b> this month. Try
                pairing it with a strong habit or scheduling it
                earlier in the day.
              </div>
            </div>
          )}

          {insight.lowStreaks && insight.lowStreaks.length > 0 && (
            <div className="coachItem tip">
              <div className="label">🧊 Cold habits</div>
              <div className="text">
                These habits have no current streak:{" "}
                {insight.lowStreaks
                  .map((h) => h.name)
                  .slice(0, 3)
                  .join(", ")}
                .
                <br />
                Start with a simple<strong> 2-day mini-streak</strong>{" "}
                challenge.
              </div>
            </div>
          )}

          <div className="coachItem micro">
            <div className="label">💡 Micro-advice</div>
            <div className="text">
              Aim for <b>at least 3 days in a row</b> on one habit
              this week. Tiny streaks compound into big wins.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
