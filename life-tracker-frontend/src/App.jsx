import { BrowserRouter, Routes, Route } from "react-router-dom";

// Main Pages
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Habit Module Page
import HabitDashboard from "./modules/habits/pages/HabitDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Main Home */}
        <Route path="/" element={<Dashboard />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Habit Feature Route (FIXED) */}
        <Route path="/habits" element={<HabitDashboard />} />

        {/* Optional Fallback Route */}
        <Route path="*" element={<h2 style={{padding: "20px"}}>404 | Page Not Found</h2>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
