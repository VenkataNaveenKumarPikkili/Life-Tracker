import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { subDays, format } from "date-fns";

export default function DashboardSummary({ habits }) {
  const today = new Date().toISOString().split("T")[0];
  const totalHabits = habits.length;
  const completedToday = habits.filter((h) =>
    h.completedDays.includes(today)
  ).length;

  const averageProgress = (
    habits.reduce(
      (sum, h) => sum + (h.completedDays.length / h.goalDays) * 100,
      0
    ) / totalHabits
  ).toFixed(1);

  const weekData = Array.from({ length: 7 }).map((_, i) => {
    const day = subDays(new Date(), 6 - i);
    const dateStr = day.toISOString().split("T")[0];
    const completed = habits.filter((h) => h.completedDays.includes(dateStr))
      .length;
    return {
      day: format(day, "EEE"),
      completed,
    };
  });

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
        Dashboard Summary
      </h2>

      <div className="grid grid-cols-3 gap-4 text-center mb-6">
        <div className="bg-blue-100 p-4 rounded-lg">
          <h3 className="text-xl font-bold text-blue-700">{totalHabits}</h3>
          <p className="text-gray-600">Total Habits</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <h3 className="text-xl font-bold text-green-700">{completedToday}</h3>
          <p className="text-gray-600">Completed Today</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg">
          <h3 className="text-xl font-bold text-yellow-700">
            {averageProgress}%
          </h3>
          <p className="text-gray-600">Avg Progress</p>
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-2 text-gray-700 text-center">
        Weekly Overview
      </h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={weekData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="completed" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
