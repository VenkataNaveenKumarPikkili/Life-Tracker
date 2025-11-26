import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

import "../styles/dashboard.css";
import "../styles/theme.css";

import Particles from "../components/Particles";
import AvatarUploader from "../components/AvatarUploader";
import NotificationPanel from "../components/NotificationPanel";
import Heatmap from "../components/Heatmap";
import ThemeToggle from "../components/ThemeToggle";
import MobileNav from "../components/MobileNav";
import MouseParallaxLayer from "../components/MouseParallaxLayer";

/* Animated Counter */
function AnimatedCounter({ value = 0, duration = 900 }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let start = null;
    let raf;
    function step(ts) {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setV(Math.floor(p * value));
      if (p < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  return <div className="stat-value">{v}</div>;
}

/* Streak Ring */
function StreakRing({ percent = 72, size = 72 }) {
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const c = 2 * Math.PI * radius;
  const offset = c * (1 - percent / 100);

  return (
    <svg width={size} height={size} className="streak-ring">
      <defs>
        <linearGradient id="sg" x1="0" x2="1">
          <stop offset="0" stopColor="#3AA2FF" />
          <stop offset="1" stopColor="#B36CFF" />
        </linearGradient>
      </defs>
      <g transform={`translate(${size / 2}, ${size / 2})`}>
        <circle r={radius} stroke="rgba(255,255,255,0.15)" strokeWidth={stroke} fill="none" />
        <circle
          r={radius}
          stroke="url(#sg)"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={`${c} ${c}`}
          strokeDashoffset={offset}
          style={{ transform: "rotate(-90deg)", transformOrigin: "center", transition: "stroke-dashoffset .9s cubic-bezier(.2,1,.3,1)" }}
        />
        <text x="0" y="0" textAnchor="middle" dominantBaseline="central" fill="#fff" fontWeight="700" fontSize="14">{percent}%</text>
      </g>
    </svg>
  );
}

export default function DashboardVision() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "guest", email: "guest@local" });
  const [profileImage, setProfileImage] = useState(null);
  const [notifOpen, setNotifOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const heroRef = useRef(null);
  const revealRef = useRef([]);

  useEffect(() => {
    const saved = localStorage.getItem("lt_profile_image");
    if (saved) setProfileImage(saved);

    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const d = jwtDecode(token);
      const email = d?.sub || d?.email || d?.username || "";
      const username = email.includes("@") ? email.split("@")[0] : email || "guest";
      setUser({ username, email });
    } catch {}
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("reveal");
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    revealRef.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    function onScroll() {
      const s = window.scrollY;
      el.style.transform = `translateY(${Math.min(s * 0.05, 35)}px)`;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function toggleSidebar() {
    setSidebarCollapsed((s) => !s);
    document.documentElement.classList.toggle("sidebar-collapsed");
  }

  const services = [
    { name: "Habits", path: "/habits", icon: "📅", color: "#36D1DC" },
    { name: "Tasks", path: "/tasks", icon: "✅", color: "#8E8CFF" },
    { name: "Trips", path: "/trips", icon: "✈️", color: "#3AA2FF" },
    { name: "Fitness", path: "/fitness", icon: "🏋️", color: "#FF6B60" },
    { name: "Goals", path: "/goals", icon: "🎯", color: "#B36CFF" }
  ];

  const initials = user.username ? user.username.charAt(0).toUpperCase() : "U";

  return (
    <div className={`app-shell visionos ${sidebarCollapsed ? "collapsed" : ""}`}>
      <aside className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
        <div className="brand">
          <div className="brand-mark">LT</div>
          {!sidebarCollapsed && <div className="brand-text">Life Tracker</div>}
        </div>

        <nav className="nav-links">
          <Link to="/dashboard" className="nav-item active">Overview</Link>
          <Link to="/habits" className="nav-item">Habits</Link>
          <Link to="/tasks" className="nav-item">Tasks</Link>
          <Link to="/trips" className="nav-item">Trips</Link>
          <Link to="/fitness" className="nav-item">Fitness</Link>
          <Link to="/goals" className="nav-item">Goals</Link>
        </nav>

        <div className="sidebar-controls">
          <ThemeToggle />
          <button className="btn small ghost" onClick={toggleSidebar}>{sidebarCollapsed ? "Expand" : "Collapse"}</button>
        </div>

        <div style={{ marginTop: "auto" }}>
          <button className="logout-small" onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}>Logout</button>
        </div>
      </aside>

      <main className="main-area">
        <MouseParallaxLayer />
        <div className="particles-layer"><Particles color="255,255,255" density={0.0004} /></div>

        <header className="topbar">
          <div className="left-controls">
            <button className="btn icon" onClick={() => setNotifOpen(o => !o)} aria-label="notifications">🔔</button>
            <button className="btn icon" onClick={() => setDropdownOpen(d => !d)} aria-label="profile">
              <div className="avatar mini" style={{ backgroundImage: profileImage ? `url(${profileImage})` : undefined }}>
                {!profileImage && initials}
              </div>
            </button>
          </div>

          <div className="search">
            <svg className="icon" width="18" height="18">
              <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
              <path d="M20 20 L15.5 15.5" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <input placeholder="Search services, tasks, trips..." />
          </div>

          <div className="topbar-right">
            <div className="profile-pill">
              <div className="avatar" style={{ backgroundImage: profileImage ? `url(${profileImage})` : undefined }}>
                {!profileImage && initials}
              </div>
              <div className="profile-info">
                <div className="name">{user.username}</div>
                <div className="email">{user.email}</div>
              </div>
            </div>
          </div>

          <NotificationPanel open={notifOpen} onClose={() => setNotifOpen(false)} />
        </header>

        <div className={`profile-dropdown fixed ${dropdownOpen ? "open" : ""}`} role="menu" aria-hidden={!dropdownOpen}>
          <div className="dropdown-row-title">Profile</div>
          <div className="dropdown-row small"><AvatarUploader onChange={b64 => setProfileImage(b64)} /></div>
          <div className="dropdown-row"><button className="btn">Settings</button></div>
          <div className="dropdown-row"><button className="btn ghost" onClick={() => { localStorage.removeItem("lt_profile_image"); setProfileImage(null); }}>Remove Photo</button></div>
          <div className="dropdown-row"><button className="btn danger" onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}>Logout</button></div>
        </div>

        <section className="content">
          <div className="hero" ref={heroRef}>
            <div className="hero-left">
              <div className="hero-badge">Habit • Daily</div>
              <h1>Break bad habits.<br/>Build great habits, daily.</h1>
              <p className="hero-sub">One dashboard for Habits, Tasks, Trips & Fitness — built to keep your momentum.</p>

              <div className="hero-cta">
                <button className="primary-btn">Open Habits</button>
                <button className="ghost-btn">Learn more</button>
              </div>

              <div className="glass-widgets">
                <div className="glass-widget" ref={el => { if (el && !revealRef.current.includes(el)) revealRef.current.push(el); }}>
                  <StreakRing percent={72} />
                  <div className="widget-info"><div className="widget-title">Current Streak</div><div className="widget-sub">7 days</div></div>
                </div>

                <div className="glass-widget" ref={el => { if (el && !revealRef.current.includes(el)) revealRef.current.push(el); }}>
                  <div className="widget-body"><h4>Heatmap</h4><Heatmap rows={6} /></div>
                </div>

                <div className="glass-widget" ref={el => { if (el && !revealRef.current.includes(el)) revealRef.current.push(el); }}>
                  <div className="widget-body">
                    <h4>Today</h4>
                    <div className="small-stats">
                      <div><AnimatedCounter value={8} /><div className="muted-small">Habits</div></div>
                      <div><AnimatedCounter value={14} /><div className="muted-small">Tasks</div></div>
                      <div><AnimatedCounter value={2} /><div className="muted-small">Trips</div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hero-right" />
          </div>

          <div className="panel" ref={el => { if (el && !revealRef.current.includes(el)) revealRef.current.push(el); }}>
            <div className="panel-header"><h3>Your Services</h3><Link to="/services" className="view-all">View all</Link></div>

            <div className="services-grid">
              {services.map((s) => (
                <Link key={s.name} to={s.path} className="service-card" style={{ borderLeftColor: s.color }} ref={el => { if (el && !revealRef.current.includes(el)) revealRef.current.push(el); }}>
                  <div className="service-card-top">
                    <div className="service-icon-circle" style={{ background: s.color }}>{s.icon}</div>
                    <div className="service-card-body"><h4>{s.name}</h4><p className="muted-small">Open {s.name.toLowerCase()} manager</p></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <footer className="dashboard-footer">Made with ❤️ — Life Tracker</footer>
        </section>

        <MobileNav />
      </main>
    </div>
  );
}
