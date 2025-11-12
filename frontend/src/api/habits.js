import axios from "axios";

const API_URL = "http://127.0.0.1:8001/habits";

export const getHabits = async () => (await axios.get(API_URL)).data;
export const addHabit = async (habit) => (await axios.post(API_URL, habit)).data;
export const updateHabit = async (id, habit) =>
  (await axios.put(`${API_URL}/${id}`, habit)).data;
export const deleteHabit = async (id) =>
  (await axios.delete(`${API_URL}/${id}`)).data;
