// src/pages/habits/HabitList.jsx
import React, { useEffect, useState } from "react";
import { getHabits, createHabit, deleteHabit } from "../../api/habits";

export default function HabitList() {
  const [habits, setHabits] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  // Load all habits from backend
  const loadHabits = async () => {
    try {
      const data = await getHabits();
      setHabits(data);
    } catch (err) {
      console.error("Error loading habits:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHabits();
  }, []);

  // Create a new habit
  const handleAdd = async () => {
    if (!title.trim()) return;
    try {
      await createHabit({ title });
      setTitle("");
      loadHabits();
    } catch (err) {
      console.error("Error creating habit:", err);
    }
  };

  // Delete a habit
  const handleDelete = async (id) => {
    try {
      await deleteHabit(id);
      loadHabits();
    } catch (err) {
      console.error("Error deleting habit:", err);
    }
  };

  return (
    <div style={{ padding: "25px" }}>
      <h2>Habits</h2>

      {/* Add Habit */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="New habit title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            padding: "8px",
            marginRight: "10px",
            width: "250px"
          }}
        />
        <button onClick={handleAdd}>Add Habit</button>
      </div>

      {/* Loading indicator */}
      {loading && <p>Loading...</p>}

      {/* Habits List */}
      <ul style={{ paddingLeft: "0px", listStyle: "none" }}>
        {habits.map((habit) => (
          <li
            key={habit.id}
            style={{
              marginBottom: "12px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "350px"
            }}
          >
            <span>{habit.title}</span>

            <button
              onClick={() => handleDelete(habit.id)}
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Delete
            </button>
          </li>
        ))}

        {habits.length === 0 && !loading && <p>No habits found.</p>}
      </ul>
    </div>
  );
}
