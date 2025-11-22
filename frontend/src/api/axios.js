import axios from "axios";

export const API = axios.create({
  withCredentials: true,
});

// automatically set token
export function setAuthHeader(token) {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
}
