"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const FRAME_COUNT = 192;

function framePath(index: number) {
  return `/Avatar_frames/frame_${String(index).padStart(4, "0")}.webp`;
}

export function Avatar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const currentFrame = useRef(1);
  const rafRef = useRef<number | null>(null);
  const [displayFrame, setDisplayFrame] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

  // Preload first few frames
  useEffect(() => {
    let mounted = true;
    const preloadCount = 5;
    let loaded = 0;

    for (let i = 1; i <= preloadCount; i++) {
      const img = new Image();
      img.src = framePath(i);
      img.onload = () => {
        loaded++;
        if (loaded >= preloadCount && mounted) setIsLoaded(true);
      };
      img.onerror = () => {
        loaded++;
        if (loaded >= preloadCount && mounted) setIsLoaded(true);
      };
    }

    // Fallback
    const timer = setTimeout(() => {
      if (mounted) setIsLoaded(true);
    }, 2000);

    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, []);

  // Track mouse position relative to viewport
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      mouseRef.current = {
        x: Math.max(0, Math.min(1, e.clientX / window.innerWidth)),
        y: Math.max(0, Math.min(1, e.clientY / window.innerHeight)),
      };
    };

    const handlePointerLeave = () => {
      mouseRef.current = { x: 0.5, y: 0.5 };
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  // Animation loop — map mouse position to frame
  useEffect(() => {
    const tick = () => {
      const { x, y } = mouseRef.current;

      // Map mouse X to frame range (left = early frames, right = later frames)
      // Use Y to add subtle variation
      const xMix = x;
      const yMix = 0.3 + y * 0.4; // Weight Y less, keep it subtle

      const target = Math.round(1 + xMix * (FRAME_COUNT - 1) * 0.8 + (yMix - 0.5) * 10);
      const clamped = Math.max(1, Math.min(FRAME_COUNT, target));

      // Smooth interpolation
      const blend = 0.12;
      currentFrame.current = Math.round(
        currentFrame.current + (clamped - currentFrame.current) * blend
      );
      currentFrame.current = Math.max(1, Math.min(FRAME_COUNT, currentFrame.current));

      setDisplayFrame(currentFrame.current);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative"
    >
      <div
        className="w-28 h-28 rounded-full bg-[--bg-card] p-[3px] shadow-2xl shadow-primary-600/40"
        style={{ animation: "glow-pulse 3s ease-in-out infinite" }}
      >
        <div className="w-full h-full rounded-full bg-[--bg-deep] flex items-center justify-center overflow-hidden">
          <img
            src={framePath(displayFrame)}
            alt="Aljon Bacani"
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
