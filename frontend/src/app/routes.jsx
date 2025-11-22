import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import Login from "../modules/auth/pages/Login";
import Register from "../modules/auth/pages/Register";
import Dashboard from "../modules/dashboard/pages/Dashboard";
import HabitDashboard from "../modules/habits/pages/HabitDashboard";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />

      {/* Protected */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/habits"
        element={
          <ProtectedRoute>
            <HabitDashboard />
          </ProtectedRoute>
        }
      />

      {/* Default */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
