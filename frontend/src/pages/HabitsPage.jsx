import { useEffect, useState } from "react";
import { getHabits } from "../api/habits";
import HabitCard from "../components/HabitCard";
import AddHabitForm from "../components/AddHabitForm";

export default function HabitsPage() {
  const [habits, setHabits] = useState([]);

  // 🧠 Fetch habits when the page loads
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getHabits();
        setHabits(data);
      } catch (error) {
        console.error("Error fetching habits:", error);
      }
    }
    fetchData();
  }, []);

  // ➕ Add habit to state after successful creation
  const handleHabitAdded = (newHabit) => {
    setHabits((prev) => [...prev, newHabit]);
  };

  // ❌ Remove habit from state after deletion
  const handleHabitDeleted = (id) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 flex flex-col items-center p-8">
      <h1 className="text-4xl font-extrabold text-indigo-700 mb-6">
        🌱 My Habits
      </h1>

      <AddHabitForm onHabitAdded={handleHabitAdded} />

      {habits.length === 0 ? (
        <p className="text-gray-600 mt-6 text-lg">
          No habits yet — start by adding one above 👆
        </p>
      ) : (
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onHabitDeleted={handleHabitDeleted}
            />
          ))}
        </div>
      )}
    </div>
  );
}
