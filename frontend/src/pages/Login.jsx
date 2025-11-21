// src/pages/Login.jsx
import React, { useState } from "react";
import { loginUser, setAuthHeader } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(email, password);

      if (response?.data?.token) {
        const token = response.data.token;

        localStorage.setItem("token", token);
        setAuthHeader(token);

        navigate("/dashboard");
      } else {
        setMsg("Login failed: No token returned");
      }
    } catch (err) {
      console.error(err);
      const message =
        err?.response?.data?.message || "Login failed - unknown error";
      setMsg(message);
    }
  };

  return (
    <div>
      <h2>Login</h2>

      {msg && <p style={{ color: "red" }}>{msg}</p>}

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>

      <br />
      <Link to="/register">Create an account</Link>
    </div>
  );
}

export default Login;
