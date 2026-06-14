"use client";

import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 192;
const FRAME_DIR = "/Avatar_frames";

function framePath(index: number) {
  return `${FRAME_DIR}/frame_${String(Math.max(1, Math.min(FRAME_COUNT, index))).padStart(4, "0")}.webp`;
}

export function Avatar() {
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const smoothRef = useRef({ x: 0.5, y: 0.5 });
  const currentFrame = useRef(1);
  const rafRef = useRef<number | null>(null);
  const [displayFrame, setDisplayFrame] = useState(1);
  const [loaded, setLoaded] = useState(false);

  // Preload first batch of frames
  useEffect(() => {
    let mounted = true;
    let count = 0;
    const total = 20;

    for (let i = 1; i <= total; i++) {
      const img = new Image();
      img.src = framePath(i);
      img.onload = () => {
        count++;
        if (count >= total && mounted) setLoaded(true);
      };
      img.onerror = () => {
        count++;
        if (count >= total && mounted) setLoaded(true);
      };
    }

    const fallback = setTimeout(() => {
      if (mounted) setLoaded(true);
    }, 3000);

    return () => {
      mounted = false;
      clearTimeout(fallback);
    };
  }, []);

  // Track mouse
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };

    const onLeave = () => {
      mouseRef.current = { x: 0.5, y: 0.5 };
    };

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
      // Smooth mouse tracking
      const lerp = 0.1;
      smoothRef.current.x += (mouseRef.current.x - smoothRef.current.x) * lerp;
      smoothRef.current.y += (mouseRef.current.y - smoothRef.current.y) * lerp;

      const { x, y } = smoothRef.current;

      // Map mouse position to frame
      // X axis: primary driver (left-right gaze)
      // Y axis: secondary modifier (up-down tilt)
      // Center mouse = middle frames (looking at camera)
      const xNorm = (x - 0.5) * 2; // -1 to 1
      const yNorm = (y - 0.5) * 2; // -1 to 1

      // Map X to base frame (frames 1-192)
      // Center (0) = frame 96, Left (-1) = frame 1, Right (1) = frame 192
      const baseFrame = 96 + xNorm * 95;

      // Y axis shifts the frame range slightly for vertical gaze
      const yOffset = yNorm * 8;

      const target = Math.round(baseFrame + yOffset);
      const clamped = Math.max(1, Math.min(FRAME_COUNT, target));

      // Smooth frame transition
      const blend = 0.15;
      currentFrame.current += (clamped - currentFrame.current) * blend;
      const frame = Math.round(currentFrame.current);
      const finalFrame = Math.max(1, Math.min(FRAME_COUNT, frame));

      setDisplayFrame(finalFrame);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="relative">
      {/* Glow ring */}
      <div
        className="w-32 h-32 rounded-full p-[3px] shadow-2xl shadow-primary-600/40"
        style={{
          animation: "glow-pulse 3s ease-in-out infinite",
          background: "linear-gradient(135deg, #2563EB, #38BDF8, #2563EB)",
        }}
      >
        <div className="w-full h-full rounded-full bg-[--bg-deep] flex items-center justify-center overflow-hidden">
          <img
            src={framePath(displayFrame)}
            alt="Aljon Bacani"
            className={`w-full h-full object-cover select-none transition-opacity duration-500 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            draggable={false}
          />
        </div>
      </div>


    </div>
  );
}
