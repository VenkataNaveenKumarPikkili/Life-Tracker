import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { subDays, format } from "date-fns";

export default function HabitHeatmap({ habit }) {
  const today = new Date();

  // Convert completedDays to value array for heatmap
  const values = Array.from({ length: 90 }).map((_, index) => {
    const date = subDays(today, index);
    const formatted = format(date, "yyyy-MM-dd");
    return {
      date: formatted,
      count: habit.completedDays.includes(formatted) ? 1 : 0,
    };
  });

  return (
    <div className="bg-white shadow-md rounded-xl p-4 mb-6">
      <h3 className="text-md font-semibold mb-2 text-gray-700">{habit.name} — Last 90 Days</h3>
      <CalendarHeatmap
        startDate={subDays(today, 89)}
        endDate={today}
        values={values}
        classForValue={(value) => {
          if (!value) return "color-empty";
          return value.count > 0 ? "color-scale-2" : "color-empty";
        }}
        tooltipDataAttrs={(value) => ({
          "data-tip": `${value.date} — ${value.count ? "Completed ✅" : "Missed ❌"}`,
        })}
      />
      <style>
        {`
        .color-empty { fill: #e5e7eb; }
        .color-scale-2 { fill: #3b82f6; }
        .react-calendar-heatmap text { font-size: 8px; fill: #374151; }
        `}
      </style>
    </div>
  );
}
