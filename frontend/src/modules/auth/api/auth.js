// src/modules/auth/api/auth.js
import api from "../../../api/axios";

export async function registerUser(name, email, password) {
  const resp = await api.post("/api/auth/register", {
    name,
    email,
    password,
  });
  return resp.data;
}

export async function loginUser(email, password) {
  const resp = await api.post("/api/auth/login", {
    email,
    password,
  });

  if (resp.data?.token) {
    localStorage.setItem("accessToken", resp.data.token);
  }

  return resp.data;
}

export async function getMe() {
  const resp = await api.get("/api/auth/me");
  return resp.data;
}

export function logoutUser() {
  localStorage.removeItem("accessToken");
}
