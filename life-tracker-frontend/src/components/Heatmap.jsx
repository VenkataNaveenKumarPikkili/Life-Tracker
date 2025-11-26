import React from "react";
import "../styles/dashboard.css";

export default function Heatmap({ rows = 6, data = [] }) {
  const cells = [];
  const total = rows * 7;
  for (let i = 0; i < total; i++) {
    const v = data[i] ?? Math.floor(Math.random() * 5); // 0..4
    cells.push(v);
  }

  return (
    <div className="heatmap">
      {cells.map((v, i) => <div key={i} className={`heat-cell level-${v}`} />)}
    </div>
  );
}
