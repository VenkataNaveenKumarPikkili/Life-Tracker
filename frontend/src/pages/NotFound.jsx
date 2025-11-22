// src/pages/NotFound.jsx
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <h1>404 - Not found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/habits">Go to Habits</Link>
    </div>
  );
}
