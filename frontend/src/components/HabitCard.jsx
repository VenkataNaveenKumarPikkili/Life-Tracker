import { deleteHabit } from "../api/habits";

export default function HabitCard({ habit, onHabitDeleted }) {
  const handleDelete = async () => {
    if (window.confirm(`Delete habit "${habit.name}"?`)) {
      await deleteHabit(habit.id);
      onHabitDeleted(habit.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-5 w-64 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-semibold text-indigo-700">{habit.name}</h2>
        <p className="text-gray-600 mt-1">{habit.description}</p>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-500">🔥 {habit.streak} days</span>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
