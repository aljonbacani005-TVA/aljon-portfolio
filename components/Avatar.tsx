"use client";

import { useEffect, useRef, useState } from "react";

const DIR_1 = "/Avatar_frames";
const DIR_2 = "/Avatar_frames_2";
const FRAME_COUNT = 121; // 0-120

function framePath(dir: string, index: number) {
  return `${dir}/frame_${String(Math.max(0, Math.min(FRAME_COUNT - 1, index))).padStart(6, "0")}.webp`;
}

export function Avatar() {
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const smoothRef = useRef({ x: 0.5, y: 0.5 });
  const currentFrame = useRef(60);
  const rafRef = useRef<number | null>(null);
  const [displayFrame, setDisplayFrame] = useState(60);
  const [loaded, setLoaded] = useState(false);

  // Preload center frames from both sets
  useEffect(() => {
    let mounted = true;
    let count = 0;
    const total = 4;

    const preload = [
      framePath(DIR_1, 58),
      framePath(DIR_1, 62),
      framePath(DIR_2, 58),
      framePath(DIR_2, 62),
    ];

    for (const src of preload) {
      const img = new Image();
      img.src = src;
      img.onload = () => { count++; if (count >= total && mounted) setLoaded(true); };
      img.onerror = () => { count++; if (count >= total && mounted) setLoaded(true); };
    }

    const fallback = setTimeout(() => { if (mounted) setLoaded(true); }, 2000);
    return () => { mounted = false; clearTimeout(fallback); };
  }, []);

  // Track mouse
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    const onLeave = () => { mouseRef.current = { x: 0.5, y: 0.5 }; };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  // Animation loop
  useEffect(() => {
    const tick = () => {
      const lerp = 0.06;
      smoothRef.current.x += (mouseRef.current.x - smoothRef.current.x) * lerp;
      smoothRef.current.y += (mouseRef.current.y - smoothRef.current.y) * lerp;

      const { x, y } = smoothRef.current;
      const xNorm = (x - 0.5) * 2; // -1 to 1
      const yNorm = (y - 0.5) * 2;

      // X drives frame selection (left-right gaze)
      // Y adds subtle offset
      const baseFrame = 60 + xNorm * 59;
      const yOffset = yNorm * 4;

      const target = Math.round(baseFrame + yOffset);
      const clamped = Math.max(0, Math.min(FRAME_COUNT - 1, target));

      const blend = 0.08;
      currentFrame.current += (clamped - currentFrame.current) * blend;
      const frame = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(currentFrame.current)));

      setDisplayFrame(frame);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  // Choose frame set based on mouse position
  // Set 1 for left half, Set 2 for right half, with crossfade
  const x = smoothRef.current.x;
  const useDir = x < 0.5 ? DIR_1 : DIR_2;

  return (
    <div className="relative">
      {/* Spotlight glow */}
      <div className="absolute inset-0 -m-8 rounded-full bg-primary-600/20 blur-3xl animate-pulse" />

      {/* Ring */}
      <div
        className="relative w-40 h-40 sm:w-44 sm:h-44 rounded-full p-[3px] shadow-xl shadow-primary-600/30"
        style={{
          animation: "glow-pulse 3s ease-in-out infinite",
          background: "linear-gradient(135deg, #2563EB, #38BDF8, #2563EB)",
        }}
      >
        <div className="w-full h-full rounded-full bg-[--bg-deep] flex items-center justify-center overflow-hidden">
          <img
            src={framePath(useDir, displayFrame)}
            alt="Aljon Bacani"
            className="w-full h-full object-cover select-none"
            style={{ opacity: loaded ? 1 : 0 }}
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
