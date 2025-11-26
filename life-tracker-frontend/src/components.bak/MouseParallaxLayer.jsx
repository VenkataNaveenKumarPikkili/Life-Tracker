import React, { useEffect, useRef } from "react";
import "../styles/dashboard.css";

export default function MouseParallaxLayer({ strength = 12 }) {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    function onMove(e) {
      const w = window.innerWidth, h = window.innerHeight;
      const x = (e.clientX / w - 0.5) * 2;
      const y = (e.clientY / h - 0.5) * 2;
      node.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [strength]);
  return <div ref={ref} className="mouse-parallax-layer" aria-hidden />;
}
