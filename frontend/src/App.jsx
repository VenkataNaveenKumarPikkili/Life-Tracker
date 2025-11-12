import React, { useState, useEffect } from "react";
import HabitCard from "./components/HabitCard";
import ProgressChart from "./components/ProgressChart";
import DashboardSummary from "./components/DashboardSummary";
import { Moon, Sun } from "lucide-react";
import { AnimatePresence } from "framer-motion";

export default function App() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");
  const [goalDays, setGoalDays] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // 🌙 Load from localStorage on start
  useEffect(() => {
    const stored = localStorage.getItem("habits");
    if (stored) setHabits(JSON.parse(stored));

    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // 💾 Save habits
  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  // 💾 Save theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // ➕ Add new habit
  const addHabit = () => {
    if (!newHabit.trim() || !goalDays.trim()) return;
    const newH = {
      id: Date.now(),
      name: newHabit.trim(),
      goalDays: parseInt(goalDays),
      completedDays: [],
    };
    setHabits((prev) => [...prev, newH]);
    setNewHabit("");
    setGoalDays("");
  };

  // ✅ Mark today's completion
  const markToday = (id) => {
    const today = new Date().toISOString().split("T")[0];
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              completedDays: habit.completedDays.includes(today)
                ? habit.completedDays
                : [...habit.completedDays, today],
            }
          : habit
      )
    );
  };

  // ❌ Delete habit
  const deleteHabit = (id) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  };

  // 📊 Chart data
  const chartData = habits.map((h) => ({
    name: h.name,
    progress: Math.min(
      (h.completedDays.length / h.goalDays) * 100,
      100
    ).toFixed(1),
  }));

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 transition-colors duration-500">
      {/* Header */}
      <div className="flex justify-between items-center max-w-6xl mx-auto mb-6">
        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
          My Habits Dashboard
        </h1>

        {/* 🌗 Dark mode toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full border dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {darkMode ? (
            <Sun className="text-yellow-400" />
          ) : (
            <Moon className="text-gray-800" />
          )}
        </button>
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {/* Left Section - Habits */}
        <div>
          {/* Input Form */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md flex gap-2 mb-6">
            <input
              type="text"
              placeholder="Enter habit name"
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
              className="flex-1 border dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input
              type="number"
              placeholder="Goal (days)"
              value={goalDays}
              onChange={(e) => setGoalDays(e.target.value)}
              className="w-32 border dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <button
              onClick={addHabit}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all"
            >
              Add
            </button>
          </div>

          {/* Habit List */}
          <div className="overflow-y-auto max-h-[70vh] pr-2">
            {habits.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400">
                No habits yet. Start by adding one above!
              </p>
            ) : (
              <AnimatePresence>
                {habits.map((habit) => (
                  <HabitCard
                    key={habit.id}
                    habit={habit}
                    onToggle={markToday}
                    onDelete={deleteHabit}
                  />
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>

        {/* Right Section - Dashboard + Charts */}
        <div className="space-y-6 lg:sticky lg:top-4">
          {habits.length > 0 && <DashboardSummary habits={habits} />}
          {habits.length > 0 && <ProgressChart data={chartData} />}
        </div>
      </div>
    </div>
  );
}
