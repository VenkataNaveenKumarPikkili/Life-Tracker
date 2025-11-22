import { API } from "./auth";

// Get all habits
export const fetchHabits = async () => {
  const resp = await API.get("/api/habits/");
  return resp.data;
};

// Create a habit
export const createHabit = async (title) => {
  const resp = await API.post("/api/habits/", { title, completed: false });
  return resp.data;
};
