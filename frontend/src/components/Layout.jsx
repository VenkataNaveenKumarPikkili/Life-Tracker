import { Link, useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  function logout() {
    localStorage.removeItem("accessToken");
    navigate("/auth/login");
  }

  return (
    <div>
      {token && (
        <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
          <Link to="/dashboard" style={{ marginRight: "15px" }}>Dashboard</Link>
          <Link to="/habits" style={{ marginRight: "15px" }}>Habits</Link>

          <button
            onClick={logout}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "blue",
            }}
          >
            Logout
          </button>
        </nav>
      )}

      <main style={{ padding: "20px" }}>{children}</main>
    </div>
  );
}
