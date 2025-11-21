import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <aside style={{ width: "220px", background: "#202123", color: "white", padding: "20px" }}>
        <h2>Life Planner</h2>
        <nav>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li><Link to="/" style={{ color: "white" }}>Dashboard</Link></li>
            <li><Link to="/habits" style={{ color: "white" }}>Habits</Link></li>
          </ul>
        </nav>
      </aside>

      <main style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
}
