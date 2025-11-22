// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9000",
  withCredentials: false,
});

// Dynamically attach token to all requests
export function setAuthHeader(token) {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}

// Load token on page refresh
const savedToken = localStorage.getItem("accessToken");
if (savedToken) setAuthHeader(savedToken);

export default api;
