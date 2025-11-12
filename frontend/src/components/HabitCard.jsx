import React, { useMemo } from "react";
import { subDays, format } from "date-fns";
import { motion } from "framer-motion";

export default function HabitCard({ habit, onToggle, onDelete }) {
  const today = new Date().toISOString().split("T")[0];
  const completedToday = habit.completedDays.includes(today);
  const progress = Math.min(
    (habit.completedDays.length / habit.goalDays) * 100,
    100
  );

  // Last 7 days streaks
  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const date = subDays(new Date(), 6 - i);
    const dateStr = date.toISOString().split("T")[0];
    const completed = habit.completedDays.includes(dateStr);
    return {
      day: format(date, "EEE"),
      completed,
    };
  });

  // Dynamic motivational message
  const message = useMemo(() => {
    if (progress === 100) return "🏆 Excellent! Goal completed!";
    if (progress >= 80) return "🔥 You're unstoppable!";
    if (progress >= 50) return "💪 Great consistency!";
    if (progress > 0) return "🌱 Small steps lead to big results.";
    return "🚀 Let's begin your journey!";
  }, [progress]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4 hover:shadow-lg transition-all"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          {habit.name}
        </h3>
        <button
          onClick={() => onDelete(habit.id)}
          className="text-red-500 hover:text-red-700 dark:hover:text-red-400 font-semibold"
        >
          ✕
        </button>
      </div>

      {/* Progress Bar with Animation */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2 overflow-hidden">
        <motion.div
          className="bg-blue-500 h-3 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        ></motion.div>
      </div>

      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
        <p>Progress: {progress.toFixed(0)}%</p>
        <p>🔥 {habit.completedDays.length} days</p>
      </div>

      {/* 🗓️ Weekly streak tracker */}
      <div className="flex justify-between items-center mb-3">
        {last7Days.map((d, idx) => (
          <motion.div
            key={idx}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="flex flex-col items-center"
          >
            <div
              className={`w-6 h-6 rounded-md border dark:border-gray-600 transition-all ${
                d.completed
                  ? "bg-green-500 dark:bg-green-400"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
              title={d.day}
            ></div>
            <span className="text-[10px] mt-1 text-gray-500 dark:text-gray-400">
              {d.day[0]}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Motivational Message */}
      <motion.p
        key={message}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-sm italic text-gray-600 dark:text-gray-400 mb-3"
      >
        {message}
      </motion.p>

      {/* Mark Today Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => onToggle(habit.id)}
        className={`w-full py-2 rounded-md text-white font-medium ${
          completedToday
            ? "bg-green-500 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
        disabled={completedToday}
      >
        {completedToday ? "Completed Today ✅" : "Mark Today"}
      </motion.button>
    </motion.div>
  );
}
