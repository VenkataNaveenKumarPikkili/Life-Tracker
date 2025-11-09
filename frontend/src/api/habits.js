import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8001";

export async function getHabits() {
  const response = await axios.get(`${API_BASE_URL}/habits/`);
  return response.data;
}

export async function createHabit(habit) {
  const response = await axios.post(`${API_BASE_URL}/habits/`, habit);
  return response.data;
}

export async function deleteHabit(id) {
  const response = await axios.delete(`${API_BASE_URL}/habits/${id}`);
  return response.data;
}
