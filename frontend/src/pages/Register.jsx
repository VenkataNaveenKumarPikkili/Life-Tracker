// src/pages/Register.jsx
import React, { useState } from "react";
import { registerUser } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(name, email, password);
      setMsg("Registration successful!");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      console.error(err);
      setMsg("Registration failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>

      {msg && <p>{msg}</p>}

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <button type="submit">Register</button>
      </form>

      <br />
      <Link to="/">Already have an account? Login</Link>
    </div>
  );
}
