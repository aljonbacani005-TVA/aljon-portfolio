"use client";

import { memo, useEffect, useRef } from "react";

const DIR_1 = "/Avatar_frames";
const DIR_2 = "/Avatar_frames_2";
const FRAME_COUNT = 121; // 0-120

function framePath(dir: string, index: number) {
  return `${dir}/frame_${String(Math.max(0, Math.min(FRAME_COUNT - 1, index))).padStart(6, "0")}.webp`;
}

// Pre-built path lookup tables
const FRAME_PATHS_1: string[] = [];
const FRAME_PATHS_2: string[] = [];
for (let i = 0; i < FRAME_COUNT; i++) {
  FRAME_PATHS_1.push(framePath(DIR_1, i));
  FRAME_PATHS_2.push(framePath(DIR_2, i));
}

// Module-level image cache — persists across re-renders
// Lazy-loaded: images are created on first access, then reused
const imageCache: (HTMLImageElement | undefined)[] = new Array(
  FRAME_COUNT * 2
);

function getCacheIndex(dir: 1 | 2, frame: number): number {
  return (dir === 1 ? 0 : FRAME_COUNT) + frame;
}

function ensureImage(dir: 1 | 2, frame: number): HTMLImageElement {
  const idx = getCacheIndex(dir, frame);
  let img = imageCache[idx];
  if (!img) {
    img = new Image();
    img.src = dir === 1 ? FRAME_PATHS_1[frame] : FRAME_PATHS_2[frame];
    imageCache[idx] = img;
  }
  return img;
}

export const Avatar = memo(function Avatar() {
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const smoothRef = useRef({ x: 0.5, y: 0.5 });
  const currentFrameRef = useRef(60);
  const rafRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const lastFrameRef = useRef(-1);
  const lastDirRef = useRef<1 | 2>(1);
  const needsRenderRef = useRef(true);
  const startLoopRef = useRef<() => void>(() => {});
  const initTimeRef = useRef(Date.now());

  // Preload only center frames — minimal HTTP requests on mount
  useEffect(() => {
    for (let offset = 0; offset <= 5; offset++) {
      const f1 = 60 + offset;
      const f2 = 60 - offset;
      if (f1 < FRAME_COUNT) {
        ensureImage(1, f1);
        ensureImage(2, f1);
      }
      if (offset > 0 && f2 >= 0) {
        ensureImage(1, f2);
        ensureImage(2, f2);
      }
    }

    // Draw center frame as soon as it loads — no waiting for loop
    const drawCenter = () => {
      const canvas = canvasRef.current;
      const img = imageCache[getCacheIndex(1, 60)];
      if (canvas && img && img.complete && img.naturalWidth > 0) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
      }
    };

    const img60 = ensureImage(1, 60);
    if (img60.complete) {
      drawCenter();
    } else {
      img60.addEventListener("load", () => {
        drawCenter();
        // Force animation loop to redraw this frame
        lastFrameRef.current = -1;
        needsRenderRef.current = true;
        startLoopRef.current();
      }, { once: true });
    }
  }, []);

  // Mouse tracking — passive, no React state, no re-renders
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
      needsRenderRef.current = true;
      startLoopRef.current();
    };
    const onLeave = () => {
      mouseRef.current = { x: 0.5, y: 0.5 };
      needsRenderRef.current = true;
      startLoopRef.current();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  // Animation loop — canvas drawImage instead of img.src swap
  useEffect(() => {
    const tick = () => {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const lerp = 0.06;

      const dx = mx - smoothRef.current.x;
      const dy = my - smoothRef.current.y;

      smoothRef.current.x += dx * lerp;
      smoothRef.current.y += dy * lerp;

      const { x, y } = smoothRef.current;
      const xNorm = (x - 0.5) * 2;
      const yNorm = (y - 0.5) * 2;

      const baseFrame = 60 + xNorm * 59;
      const yOffset = yNorm * 4;
      const target = Math.round(baseFrame + yOffset);
      const clamped = Math.max(0, Math.min(FRAME_COUNT - 1, target));

      const blend = 0.08;
      currentFrameRef.current +=
        (clamped - currentFrameRef.current) * blend;
      const frame = Math.max(
        0,
        Math.min(FRAME_COUNT - 1, Math.round(currentFrameRef.current))
      );
      const dir: 1 | 2 = x < 0.5 ? 1 : 2;

      if (frame !== lastFrameRef.current || dir !== lastDirRef.current) {
        lastFrameRef.current = frame;
        lastDirRef.current = dir;

        // Canvas drawImage — GPU blit, no image decode, ~0.1ms
        const canvas = canvasRef.current;
        const img = ensureImage(dir, frame);
        if (canvas && img.complete && img.naturalWidth > 0) {
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          }
        }
      }

      needsRenderRef.current = false;

      // Keep loop alive for first 3s so avatar animates on initial load
      const elapsed = Date.now() - initTimeRef.current;
      const warmup = elapsed < 3000;

      // Stop loop if converged and no new input
      const converged =
        Math.abs(dx) < 0.0005 && Math.abs(dy) < 0.0005;
      if (converged && !needsRenderRef.current && !warmup) {
        rafRef.current = null;
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    startLoopRef.current = () => {
      if (rafRef.current !== null) return; // Already running
      rafRef.current = requestAnimationFrame(tick);
    };

    // Start initial loop
    startLoopRef.current();

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative" style={{ willChange: "transform" }}>
      {/* Spotlight glow — static blur, opacity-only animation (GPU composited) */}
      <div className="avatar-spotlight absolute inset-0 -m-8 rounded-full" />

      {/* Ring — static gradient, glow via ::after pseudo-element */}
      <div
        className="avatar-ring relative w-48 h-40 sm:w-52 sm:h-44 rounded-full p-[3px]"
        style={{
          background:
            "linear-gradient(135deg, #2563EB, #38BDF8, #2563EB)",
        }}
      >
        <div className="w-full h-full rounded-full bg-[--bg-deep] flex items-center justify-center overflow-hidden">
          <canvas
            ref={canvasRef}
            width={422}
            height={352}
            className="w-full h-full select-none"
          />
        </div>
      </div>
    </div>
  );
});