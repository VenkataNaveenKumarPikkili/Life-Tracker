import axios from "axios";

// Gateway base URL
export const API = axios.create({
  baseURL: "http://localhost:9000",
  withCredentials: false,
});

// Optional: set/remove Authorization header
export function setAuthHeader(token) {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
}

// Register
export const registerUser = async (name, email, password) => {
  const resp = await API.post("/api/auth/register", { name, email, password });
  return resp.data;
};

// Login
export const loginUser = async (email, password) => {
  const resp = await API.post("/api/auth/login", { email, password });
  return resp.data; // e.g. { token: "..." }
};

// Get me
export const getMe = async () => {
  const resp = await API.get("/api/auth/me");
  return resp.data;
};
