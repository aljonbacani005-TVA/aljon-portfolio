"use client";

import { useEffect, useRef, useState } from "react";

const FRAME_DIR = "/Avatar_frames";

// Available frames (non-contiguous)
const FRAMES = [
  1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,
  170,171,172,
  176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,
];

const FRAME_COUNT = FRAMES.length; // 47
const CENTER_IDX = Math.floor(FRAME_COUNT / 2); // ~23 (frame 24)

function framePath(frameNum: number) {
  return `${FRAME_DIR}/frame_${String(frameNum).padStart(4, "0")}.webp`;
}

export function Avatar() {
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const smoothRef = useRef({ x: 0.5, y: 0.5 });
  const currentIdx = useRef(CENTER_IDX);
  const rafRef = useRef<number | null>(null);
  const [displayIdx, setDisplayIdx] = useState(CENTER_IDX);
  const [loaded, setLoaded] = useState(false);

  // Preload center frames
  useEffect(() => {
    let mounted = true;
    const preload = [FRAMES[CENTER_IDX - 1], FRAMES[CENTER_IDX], FRAMES[CENTER_IDX + 1]];
    let count = 0;

    for (const f of preload) {
      const img = new Image();
      img.src = framePath(f);
      img.onload = () => { count++; if (count >= preload.length && mounted) setLoaded(true); };
      img.onerror = () => { count++; if (count >= preload.length && mounted) setLoaded(true); };
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

      // Map to frame index
      const baseIdx = CENTER_IDX + xNorm * (FRAME_COUNT / 2 - 1);
      const yOffset = yNorm * 2;

      const target = Math.round(baseIdx + yOffset);
      const clamped = Math.max(0, Math.min(FRAME_COUNT - 1, target));

      const blend = 0.08;
      currentIdx.current += (clamped - currentIdx.current) * blend;
      const idx = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(currentIdx.current)));

      setDisplayIdx(idx);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  return (
    <div className="relative">
      <div
        className="w-32 h-32 rounded-full p-[3px] shadow-lg shadow-primary-600/30"
        style={{ background: "linear-gradient(135deg, #2563EB, #38BDF8, #2563EB)" }}
      >
        <div className="w-full h-full rounded-full bg-[--bg-deep] flex items-center justify-center overflow-hidden">
          <img
            src={framePath(FRAMES[displayIdx])}
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
