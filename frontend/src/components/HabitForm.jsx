import { useState } from "react";

export default function HabitForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [goal, setGoal] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && goal) {
      onAdd({ title, goal, progress: 0 });
      setTitle("");
      setGoal("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-xl flex gap-3">
      <input
        className="border p-2 flex-1 rounded-lg"
        placeholder="Enter habit name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="border p-2 w-28 rounded-lg"
        placeholder="Goal (days)"
        type="number"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Add
      </button>
    </form>
  );
}
