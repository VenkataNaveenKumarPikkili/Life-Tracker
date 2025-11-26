import React, { useEffect, useState } from "react";
import "../styles/dashboard.css";

export default function NotificationPanel({ open = false, onClose = () => {} }) {
  const [items, setItems] = useState([
    { id: 1, title: "Welcome back!", time: "Now" },
    { id: 2, title: "Daily habit reminder", time: "Now" },
    { id: 3, title: "New task: Prepare trip", time: "1h" },
    { id: 4, title: "Streak unlocked: 7 days", time: "1d" },
  ]);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      setItems(prev => [{ id: Date.now(), title: "Fresh reminder", time: "Now" }, ...prev]);
    }, 900);
    return () => clearTimeout(t);
  }, [open]);

  return (
    <aside className={`notif-panel ${open ? "open" : ""}`} aria-hidden={!open}>
      <div className="notif-header">
        <h4>Notifications</h4>
        <button className="btn ghost" onClick={onClose}>Close</button>
      </div>

      <div className="notif-list">
        {items.map(it => (
          <div key={it.id} className="notif-item">
            <div className="notif-dot" />
            <div className="notif-body">
              <div className="notif-title">{it.title}</div>
              <div className="notif-time">{it.time}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="notif-footer">
        <button className="btn" onClick={() => alert("View all notifications")}>View all</button>
      </div>
    </aside>
  );
}
