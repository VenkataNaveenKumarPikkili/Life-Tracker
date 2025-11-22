import { useEffect, useState } from "react";
import { fetchHabits, createHabit } from "../api/habits";

export default function Habits() {
  const [habits, setHabits] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const loadHabits = async () => {
    try {
      setLoading(true);
      const data = await fetchHabits();
      setHabits(data);
    } catch (err) {
      console.error("Failed to load habits", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHabits();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const newHabit = await createHabit(title.trim());
      setHabits((prev) => [...prev, newHabit]);
      setTitle("");
    } catch (err) {
      console.error("Failed to create habit", err);
    }
  };

  return (
    <div style={{ padding: "1.5rem" }}>
      <h2>Habits</h2>

      <form onSubmit={handleAdd} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="New habit"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: "0.5rem", marginRight: "0.5rem" }}
        />
        <button type="submit">Add</button>
      </form>

      {loading ? (
        <p>Loading habits...</p>
      ) : habits.length === 0 ? (
        <p>No habits yet.</p>
      ) : (
        <ul>
          {habits.map((h) => (
            <li key={h.id}>{h.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
