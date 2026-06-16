"use client";

import { useEffect, useRef } from "react";

const DIR = "/ceo_frames";
const FRAME_COUNT = 192;
const FPS = 24;
const INTERVAL = 1000 / FPS;

const FRAME_PATHS: string[] = Array.from(
  { length: FRAME_COUNT },
  (_, i) => `${DIR}/frame_${String(i).padStart(6, "0")}.webp`
);

const imageCache: HTMLImageElement[] = [];

function getFrame(index: number): HTMLImageElement {
  let img = imageCache[index];
  if (!img) {
    img = new Image();
    img.src = FRAME_PATHS[index];
    imageCache[index] = img;
  }
  return img;
}

export function PortraitVideo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Preload first 24 frames
    for (let i = 0; i < 24; i++) getFrame(i);

    // Draw first frame as soon as it's ready
    const img0 = getFrame(0);
    const drawFirst = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img0, 0, 0, canvas.width, canvas.height);
    };
    img0.complete && img0.naturalWidth > 0
      ? drawFirst()
      : img0.addEventListener("load", drawFirst, { once: true });

    // Preload remaining frames in background
    for (let i = 24; i < FRAME_COUNT; i++) getFrame(i);

    // Steady 24fps interval — auto-pauses when tab is hidden
    timerRef.current = setInterval(() => {
      const img = getFrame(frameRef.current);
      if (img.complete && img.naturalWidth > 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
      frameRef.current = (frameRef.current + 1) % FRAME_COUNT;
    }, INTERVAL);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  return (
    <div className="portrait-float portrait-fade-in">
      <canvas
        ref={canvasRef}
        width={520}
        height={693}
        className="w-full h-full object-contain select-none"
      />
    </div>
  );
}
