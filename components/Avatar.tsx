"use client";

import { useEffect, useRef, useState } from "react";

const FRAME_DIR = "/Avatar_frames";
const FRAME_COUNT = 192;
const CENTER = Math.ceil(FRAME_COUNT / 2); // 96

function framePath(index: number) {
  return `${FRAME_DIR}/frame_${String(Math.max(1, Math.min(FRAME_COUNT, index))).padStart(4, "0")}.webp`;
}

export function Avatar() {
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const smoothRef = useRef({ x: 0.5, y: 0.5 });
  const currentFrame = useRef(CENTER);
  const rafRef = useRef<number | null>(null);
  const [displayFrame, setDisplayFrame] = useState(CENTER);
  const [loaded, setLoaded] = useState(false);

  // Preload center frame + a few around it
  useEffect(() => {
    let mounted = true;
    const preload = [CENTER - 2, CENTER - 1, CENTER, CENTER + 1, CENTER + 2];
    let count = 0;

    for (const i of preload) {
      const img = new Image();
      img.src = framePath(i);
      img.onload = () => {
        count++;
        if (count >= preload.length && mounted) setLoaded(true);
      };
      img.onerror = () => {
        count++;
        if (count >= preload.length && mounted) setLoaded(true);
      };
    }

    const fallback = setTimeout(() => {
      if (mounted) setLoaded(true);
    }, 2000);

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
      const lerp = 0.06;
      smoothRef.current.x += (mouseRef.current.x - smoothRef.current.x) * lerp;
      smoothRef.current.y += (mouseRef.current.y - smoothRef.current.y) * lerp;

      const { x, y } = smoothRef.current;

      // Map mouse to frame range
      // X: primary (left-right gaze)
      // Y: secondary (up-down tilt)
      const xNorm = (x - 0.5) * 2; // -1 to 1
      const yNorm = (y - 0.5) * 2; // -1 to 1

      // Use full frame range
      const baseFrame = CENTER + xNorm * (CENTER - 1);
      const yOffset = yNorm * 8;

      const target = Math.round(baseFrame + yOffset);
      const clamped = Math.max(1, Math.min(FRAME_COUNT, target));

      // Smooth blend
      const blend = 0.08;
      currentFrame.current += (clamped - currentFrame.current) * blend;
      const frame = Math.max(1, Math.min(FRAME_COUNT, Math.round(currentFrame.current)));

      setDisplayFrame(frame);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="relative">
      <div
        className="w-32 h-32 rounded-full p-[3px] shadow-lg shadow-primary-600/30"
        style={{
          background: "linear-gradient(135deg, #2563EB, #38BDF8, #2563EB)",
        }}
      >
        <div className="w-full h-full rounded-full bg-[--bg-deep] flex items-center justify-center overflow-hidden">
          <img
            src={framePath(displayFrame)}
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
