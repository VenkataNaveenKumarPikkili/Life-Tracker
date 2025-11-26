const BASE = "http://localhost:8000/api/habits";

export async function getHabits() {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error("Failed to load habits");
  return res.json();
}

export async function addHabit(name, icon, category) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, icon, category }), // category added
  });
  if (!res.ok) throw new Error("Failed to add habit");
  return res.json();
}

export async function toggleHabit(id, date) {
  const res = await fetch(`${BASE}/toggle/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ date }),
  });
  if (!res.ok) throw new Error("Failed to toggle habit");
  return res.json();
}

export async function deleteHabit(id) {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete habit");
  return res.json();
}
