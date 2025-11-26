// Particles.jsx
import React, { useRef, useEffect } from "react";

/**
 * Soft floating circles particle layer (very lightweight).
 * Place <Particles /> once inside your main area. It uses pointer-events: none
 * so it won't block interactions.
 */

export default function Particles({ color = "255,255,255", density = 0.0006 }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = canvas.clientWidth);
    let height = (canvas.height = canvas.clientHeight);

    const particles = [];
    const count = Math.max(6, Math.floor(width * height * density));

    function rand(min, max) {
      return Math.random() * (max - min) + min;
    }

    for (let i = 0; i < count; i++) {
      particles.push({
        x: rand(0, width),
        y: rand(0, height),
        r: rand(8, 36),
        a: rand(0.03, 0.18),
        vx: rand(-0.2, 0.2),
        vy: rand(-0.15, 0.15),
        drift: rand(0.001, 0.01),
        phase: rand(0, Math.PI * 2)
      });
    }

    function resize() {
      width = canvas.width = canvas.clientWidth;
      height = canvas.height = canvas.clientHeight;
    }
    window.addEventListener("resize", resize);

    let last = performance.now();
    function draw(now) {
      const dt = (now - last) / 1000;
      last = now;

      ctx.clearRect(0, 0, width, height);

      for (let p of particles) {
        // update
        p.x += p.vx * (1 + p.drift * 60) * dt * 60;
        p.y += p.vy * (1 + p.drift * 60) * dt * 60;
        p.phase += 0.01;

        // drift wrap
        if (p.x < -p.r) p.x = width + p.r;
        if (p.x > width + p.r) p.x = -p.r;
        if (p.y < -p.r) p.y = height + p.r;
        if (p.y > height + p.r) p.y = -p.r;

        // subtle pulsing
        const pulse = 1 + Math.sin(p.phase) * 0.08;

        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.r * pulse
        );
        gradient.addColorStop(0, `rgba(${color}, ${p.a * 0.9})`);
        gradient.addColorStop(0.6, `rgba(${color}, ${p.a * 0.35})`);
        gradient.addColorStop(1, `rgba(${color}, 0)`);
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.r * pulse, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [color, density]);

  return (
    <canvas
      ref={canvasRef}
      className="particles-canvas"
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        mixBlendMode: "screen"
      }}
    />
  );
}
