import { useState } from "react";
import { createHabit } from "../api/habits";

export default function AddHabitForm({ onHabitAdded }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [streak, setStreak] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Please enter a habit name.");

    const newHabit = { name, description, streak: parseInt(streak) || 0 };
    const addedHabit = await createHabit(newHabit);
    onHabitAdded(addedHabit);

    setName("");
    setDescription("");
    setStreak(0);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-5 w-full max-w-md mb-6"
    >
      <h2 className="text-2xl font-semibold text-indigo-600 mb-3">
        Add New Habit
      </h2>

      <input
        type="text"
        placeholder="Habit name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-gray-300 rounded w-full p-2 mb-3 focus:ring-2 focus:ring-indigo-400"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border border-gray-300 rounded w-full p-2 mb-3 focus:ring-2 focus:ring-indigo-400"
      />

      <input
        type="number"
        placeholder="Current streak (optional)"
        value={streak}
        onChange={(e) => setStreak(e.target.value)}
        className="border border-gray-300 rounded w-full p-2 mb-3 focus:ring-2 focus:ring-indigo-400"
      />

      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded w-full font-medium"
      >
        Add Habit
      </button>
    </form>
  );
}
