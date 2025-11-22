// src/modules/habits/components/HabitList.jsx
import HabitItem from "./HabitItem";

export default function HabitList({ habits, onToggle, onDelete }) {
  if (!habits.length) {
    return <p>No habits yet. Create your first one!</p>;
  }

  return (
    <div className="habit-list">
      {habits.map((habit) => (
        <HabitItem
          key={habit.id}
          habit={habit}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
