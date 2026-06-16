"use client";

import { useEffect, useRef, useState } from "react";

function GridParallax() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!ref.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      ref.current.style.backgroundPosition = `${x}px ${y}px`;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 bg-grid bg-grid-parallax" />
  );
}

function FloatingParticles({ count = 20 }: { count?: number }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Defer particles until after first paint
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Pre-compute deterministic particle data
  const particles: {
    id: number;
    style: React.CSSProperties;
    animStyle: React.CSSProperties;
  }[] = [];

  for (let i = 0; i < count; i++) {
    const seed = ((i * 7919 + 1) % 1000) / 1000;
    const seed2 = ((i * 6271 + 3) % 1000) / 1000;
    const seed3 = ((i * 3571 + 7) % 1000) / 1000;
    const seed4 = ((i * 9311 + 9) % 1000) / 1000;
    const seed5 = ((i * 4219 + 13) % 1000) / 1000;
    const seed6 = ((i * 2857 + 17) % 1000) / 1000;
    const size = 1.5 + seed3 * 3.5;
    const duration = 5 + seed4 * 8;
    const delay = seed5 * 6;
    const drift = (seed6 - 0.5) * 40;
    const animY = -25 - seed3 * 20;

    particles.push({
      id: i,
      style: {
        left: `${seed * 100}%`,
        top: `${seed2 * 100}%`,
        width: size,
        height: size,
        background: `radial-gradient(circle, rgba(96,165,250,0.6) 0%, rgba(56,189,248,0.2) 100%)`,
        boxShadow: `0 0 ${size * 2}px rgba(56,189,248,0.3)`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        "--drift": `${drift}px`,
        "--anim-y": `${animY}px`,
      } as React.CSSProperties,
      animStyle: {},
    });
  }

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full particle-float"
          style={p.style}
        />
      ))}
    </div>
  );
}

export function GlobalBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -50 }}>
      <GridParallax />

      {/* Single ambient glow — replaces 3 heavy blur orbs */}
      <div
        className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse, rgba(37,99,235,0.1) 0%, rgba(56,189,248,0.04) 40%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Light streaks — zero GPU cost */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-[400px] bg-gradient-to-b from-primary-500/15 via-primary-400/5 to-transparent" />
      <div className="absolute bottom-0 right-1/4 w-[1px] h-[300px] bg-gradient-to-t from-glow-cyan/10 via-primary-400/5 to-transparent" />

      <FloatingParticles count={20} />
    </div>
  );
}
