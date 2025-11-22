// src/modules/habits/components/HabitItem.jsx
export default function HabitItem({ habit, onToggle, onDelete }) {
  return (
    <div className="habit-item">
      <div>
        <strong>{habit.name}</strong>
        {habit.description && (
          <p className="habit-desc">{habit.description}</p>
        )}
      </div>

      <div className="habit-actions">
        <button onClick={() => onToggle(habit.id)}>
          {habit.completedToday ? "✓ Done" : "Mark done"}
        </button>
        <button onClick={() => onDelete(habit.id)}>Delete</button>
      </div>
    </div>
  );
}
