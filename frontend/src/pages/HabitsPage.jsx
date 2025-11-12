import { useEffect, useState } from "react";
import { getHabits, addHabit, deleteHabit, updateHabit } from "../api/habits";
import HabitForm from "../components/HabitForm";
import HabitCard from "../components/HabitCard";
import ProgressChart from "../components/ProgressChart";

export default function HabitsPage() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    getHabits().then(setHabits).catch(console.error);
  }, []);

  const handleAdd = async (habit) => {
    const newHabit = await addHabit(habit);
    setHabits([...habits, newHabit]);
  };

  const handleDelete = async (id) => {
    await deleteHabit(id);
    setHabits(habits.filter((h) => h.id !== id));
  };

  const handleUpdate = async (id, updated) => {
    const newHabit = await updateHabit(id, updated);
    setHabits(habits.map((h) => (h.id === id ? newHabit : h)));
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 space-y-6">
      <h1 className="text-3xl font-bold text-center text-blue-600">My Habits</h1>
      <HabitForm onAdd={handleAdd} />
      <div className="space-y-4">
        {habits.map((habit) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
      <ProgressChart habits={habits} />
    </div>
  );
}
