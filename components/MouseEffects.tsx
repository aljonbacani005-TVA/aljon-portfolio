"use client";

import { useCallback, useEffect, useRef } from "react";

interface Splash {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  hue: number;
}

export function MouseEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -999, y: -999 });
  const smoothRef = useRef({ x: -999, y: -999 });
  const velocityRef = useRef(0);
  const lastPosRef = useRef({ x: -999, y: -999 });
  const lastMoveRef = useRef(Date.now());
  const fadeRef = useRef(1);
  const splashesRef = useRef<Splash[]>([]);
  const rafRef = useRef<number | null>(null);

  const handlePointerMove = useCallback((e: PointerEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
    lastMoveRef.current = Date.now();
    fadeRef.current = 1;
  }, []);

  const handleClick = useCallback((e: MouseEvent) => {
    const hue = Math.random() * 360;
    for (let i = 0; i < 5; i++) {
      splashesRef.current.push({
        x: e.clientX + (Math.random() - 0.5) * 40,
        y: e.clientY + (Math.random() - 0.5) * 40,
        radius: 10 + Math.random() * 30,
        opacity: 0.9,
        hue: hue + Math.random() * 60,
      });
    }
    // Main splash ring
    splashesRef.current.push({
      x: e.clientX,
      y: e.clientY,
      radius: 5,
      opacity: 1,
      hue,
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("click", handleClick);

    const animate = () => {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth mouse interpolation
      const lerp = 0.12;
      smoothRef.current.x += (mouseRef.current.x - smoothRef.current.x) * lerp;
      smoothRef.current.y += (mouseRef.current.y - smoothRef.current.y) * lerp;

      // Calculate velocity
      const dx = smoothRef.current.x - lastPosRef.current.x;
      const dy = smoothRef.current.y - lastPosRef.current.y;
      velocityRef.current = Math.sqrt(dx * dx + dy * dy);
      lastPosRef.current = { ...smoothRef.current };

      // Fade out on inactivity (starts fading after 800ms)
      const timeSinceMove = Date.now() - lastMoveRef.current;
      if (timeSinceMove > 800) {
        fadeRef.current = Math.max(0, fadeRef.current - 0.025);
      }

      const opacity = fadeRef.current;

      // Draw rainbow/liquid gradient blobs
      if (opacity > 0.01) {
        const { x, y } = smoothRef.current;
        const time = Date.now() * 0.001;
        const size = 180 + velocityRef.current * 1.5;

        // Multiple liquid blobs with rainbow colors
        const blobs = [
          { ox: 0, oy: 0, color: `hsla(${(time * 50) % 360}, 90%, 60%, ${opacity * 0.35})`, s: size },
          { ox: -30, oy: -20, color: `hsla(${(time * 50 + 72) % 360}, 85%, 65%, ${opacity * 0.28})`, s: size * 0.85 },
          { ox: 30, oy: 15, color: `hsla(${(time * 50 + 144) % 360}, 80%, 62%, ${opacity * 0.28})`, s: size * 0.9 },
          { ox: -15, oy: 25, color: `hsla(${(time * 50 + 216) % 360}, 85%, 58%, ${opacity * 0.25})`, s: size * 0.75 },
          { ox: 20, oy: -25, color: `hsla(${(time * 50 + 288) % 360}, 90%, 62%, ${opacity * 0.28})`, s: size * 0.8 },
        ];

        for (const blob of blobs) {
          const bx = x + blob.ox + Math.sin(time * 2 + blob.ox) * 15;
          const by = y + blob.oy + Math.cos(time * 2.5 + blob.oy) * 15;
          const gradient = ctx.createRadialGradient(bx, by, 0, bx, by, blob.s);
          gradient.addColorStop(0, blob.color);
          gradient.addColorStop(0.5, blob.color.replace(/[\d.]+\)$/, `${opacity * 0.12})`));
          gradient.addColorStop(1, "transparent");
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(bx, by, blob.s, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw splashes
      const splashes = splashesRef.current;
      for (let i = splashes.length - 1; i >= 0; i--) {
        const s = splashes[i];
        s.radius += 3.5;
        s.opacity -= 0.025;

        if (s.opacity <= 0) {
          splashes.splice(i, 1);
          continue;
        }

        // Expanding ring
        ctx.strokeStyle = `hsla(${s.hue}, 85%, 60%, ${s.opacity})`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Inner glow
        const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.radius * 0.6);
        glow.addColorStop(0, `hsla(${s.hue}, 90%, 70%, ${s.opacity * 0.3})`);
        glow.addColorStop(1, "transparent");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("click", handleClick);
    };
  }, [handlePointerMove, handleClick]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 2,
        opacity: 0.85,
      }}
    />
  );
}