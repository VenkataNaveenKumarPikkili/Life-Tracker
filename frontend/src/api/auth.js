// src/api/auth.js
import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:4000/api/auth",
  withCredentials: true
});

// Set Authorization header globally
export function setAuthHeader(token) {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
}

export const registerUser = async (name, email, password) => {
  const resp = await API.post("/register", { name, email, password });
  return resp.data;
};

export const loginUser = async (email, password) => {
  const resp = await API.post("/login", { email, password });
  return resp; // contains resp.data.token
};

export const getMe = async () => {
  const resp = await API.get("/me");
  return resp.data;
};
