import React from "react";

export default function Layout({ children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #6a11cb, #2575fc)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Header */}
      <header
        style={{
          width: "100%",
          padding: "20px 0",
          textAlign: "center",
          fontSize: "28px",
          fontWeight: "bold",
          color: "white",
          letterSpacing: "1px",
        }}
      >
        Life Tracker
      </header>

      {/* Page Content */}
      <div style={{ flex: 1, width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        {children}
      </div>
    </div>
  );
}
