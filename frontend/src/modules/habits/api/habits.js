// src/modules/habits/api/habits.js
import api from "../../../api/axios";

// GET all habits
export async function fetchHabits() {
  const resp = await api.get("/api/habits/");
  return resp.data;
}

// CREATE new habit
export async function createHabit(title, frequency) {
  const resp = await api.post("/api/habits/", {
    title,
    frequency,
  });

  // Make sure completed_dates exists so the UI can use it
  return {
    ...resp.data,
    completed_dates: resp.data.completed_dates || [],
  };
}

// TOGGLE completion for a specific date of a habit
export async function toggleHabit(habitId, dateISO) {
  // We only care that the call succeeds – we’ll update UI locally
  await api.patch(`/api/habits/${habitId}/toggle`, {
    date: dateISO,
  });
}

// DELETE habit
export async function deleteHabit(habitId) {
  await api.delete(`/api/habits/${habitId}`);
}
