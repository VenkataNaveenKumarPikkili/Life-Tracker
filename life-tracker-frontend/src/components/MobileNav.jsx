import React from "react";
import { Link } from "react-router-dom";
import "../styles/dashboard.css";

export default function MobileNav() {
  return (
    <nav className="mobile-nav" aria-hidden={false}>
      <Link to="/habits" className="mobile-item">Habits</Link>
      <Link to="/tasks" className="mobile-item">Tasks</Link>
      <Link to="/dashboard" className="mobile-item">Home</Link>
      <Link to="/trips" className="mobile-item">Trips</Link>
      <Link to="/goals" className="mobile-item">Goals</Link>
    </nav>
  );
}
