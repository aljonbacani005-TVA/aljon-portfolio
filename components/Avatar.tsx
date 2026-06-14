"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";

const DIR_1 = "/Avatar_frames";
const DIR_2 = "/Avatar_frames_2";
const FRAME_COUNT = 121; // 0-120

function framePath(dir: string, index: number) {
  return `${dir}/frame_${String(Math.max(0, Math.min(FRAME_COUNT - 1, index))).padStart(6, "0")}.webp`;
}

// Pre-built path lookup table to avoid string concatenation in rAF
const FRAME_PATHS_1: string[] = [];
const FRAME_PATHS_2: string[] = [];
for (let i = 0; i < FRAME_COUNT; i++) {
  FRAME_PATHS_1.push(framePath(DIR_1, i));
  FRAME_PATHS_2.push(framePath(DIR_2, i));
}

export const Avatar = memo(function Avatar() {
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const smoothRef = useRef({ x: 0.5, y: 0.5 });
  const currentFrame = useRef(60);
  const rafRef = useRef<number | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const lastFrame = useRef(-1);
  const lastDir = useRef<1 | 2>(1);
  const [loaded, setLoaded] = useState(false);
  const [initialSrc, setInitialSrc] = useState("");

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

    setInitialSrc(framePath(DIR_1, 60));

    for (const src of preload) {
      const img = new Image();
      img.src = src;
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

  // Animation loop — updates DOM directly, NO React state
  useEffect(() => {
    const tick = () => {
      const lerp = 0.06;
      smoothRef.current.x +=
        (mouseRef.current.x - smoothRef.current.x) * lerp;
      smoothRef.current.y +=
        (mouseRef.current.y - smoothRef.current.y) * lerp;

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
      const frame = Math.max(
        0,
        Math.min(FRAME_COUNT - 1, Math.round(currentFrame.current))
      );

      // Determine which directory to use
      const dir: 1 | 2 = x < 0.5 ? 1 : 2;

      // Only update DOM if frame or dir actually changed
      if (frame !== lastFrame.current || dir !== lastDir.current) {
        lastFrame.current = frame;
        lastDir.current = dir;

        // Direct DOM manipulation — bypasses React entirely
        if (imgRef.current) {
          imgRef.current.src = dir === 1 ? FRAME_PATHS_1[frame] : FRAME_PATHS_2[frame];
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const setImgRef = useCallback((el: HTMLImageElement | null) => {
    imgRef.current = el;
  }, []);

  return (
    <div
      className="relative"
      style={{ willChange: "transform" }}
    >
      {/* Spotlight glow — GPU accelerated */}
      <div
        className="absolute inset-0 -m-8 rounded-full bg-primary-600/20 animate-pulse"
        style={{
          filter: "blur(48px)",
          willChange: "filter",
          transform: "translateZ(0)",
        }}
      />

      {/* Ring */}
      <div
        className="relative w-40 h-40 sm:w-44 sm:h-44 rounded-full p-[3px]"
        style={{
          animation: "glow-pulse 3s ease-in-out infinite",
          background: "linear-gradient(135deg, #2563EB, #38BDF8, #2563EB)",
          willChange: "transform, box-shadow",
          transform: "translateZ(0)",
        }}
      >
        <div
          className="w-full h-full rounded-full bg-[--bg-deep] flex items-center justify-center overflow-hidden"
          style={{ transform: "translateZ(0)" }}
        >
          <img
            ref={setImgRef}
            src={initialSrc || framePath(DIR_1, 60)}
            alt="Aljon Bacani"
            className="w-full h-full object-cover select-none"
            style={{
              opacity: loaded ? 1 : 0,
              willChange: "transform",
              transform: "translateZ(0)",
            }}
            draggable={false}
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
});