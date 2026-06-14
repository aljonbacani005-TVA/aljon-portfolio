"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type AvatarProps = {
  state?: "idle" | "thinking" | "speaking";
};

const FRAME_COUNT = 168;

function framePath(index: number) {
  return `/Avatar_frames/frame_${String(index).padStart(4, "0")}.webp`;
}

export function Avatar({ state = "idle" }: AvatarProps) {
  const reduceMotion = useReducedMotion();
  const pointerTarget = useRef({ x: 0.5, y: 0.5 });
  const currentFrame = useRef(1);
  const rafRef = useRef<number | null>(null);
  const [displayFrame, setDisplayFrame] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

  const frameMap = useMemo(
    () => ({
      idle: Math.max(1, Math.min(FRAME_COUNT, displayFrame)),
      thinking: Math.min(FRAME_COUNT, Math.max(1, displayFrame + 12)),
      speaking: Math.min(FRAME_COUNT, Math.max(1, displayFrame + 24))
    }),
    [displayFrame]
  );

  useEffect(() => {
    let mounted = true;
    const image = new Image();
    image.src = framePath(1);
    image.onload = () => {
      if (mounted) setIsLoaded(true);
    };
    image.onerror = () => {
      if (mounted) setIsLoaded(true);
    };

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    const tick = () => {
      const pointerMix = pointerTarget.current.x * 0.72 + pointerTarget.current.y * 0.28;
      const target =
        state === "thinking"
          ? Math.min(FRAME_COUNT, 45 + Math.round(pointerMix * 70))
          : state === "speaking"
            ? Math.min(FRAME_COUNT, 82 + Math.round(pointerMix * 86))
            : Math.min(FRAME_COUNT, 1 + Math.round(pointerMix * 80));

      const blend = state === "idle" ? 0.08 : state === "thinking" ? 0.18 : 0.22;
      currentFrame.current = Math.round(currentFrame.current + (target - currentFrame.current) * blend);
      currentFrame.current = Math.max(1, Math.min(FRAME_COUNT, currentFrame.current));
      setDisplayFrame(currentFrame.current);
      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [reduceMotion, state]);

  useEffect(() => {
    if (reduceMotion) return;

    const handlePointerMove = (event: PointerEvent) => {
      pointerTarget.current = {
        x: Math.max(0, Math.min(1, event.clientX / window.innerWidth)),
        y: Math.max(0, Math.min(1, event.clientY / window.innerHeight))
      };
    };

    const handlePointerLeave = () => {
      pointerTarget.current = { x: 0.5, y: 0.5 };
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [reduceMotion]);

  const shownFrame = state === "idle" ? frameMap.idle : state === "thinking" ? frameMap.thinking : frameMap.speaking;

  return (
    <motion.div
      className={`avatar-shell avatar-${state}`}
      initial={{ opacity: 0, scale: 0.94, y: 18 }}
      animate={reduceMotion ? { opacity: 1, scale: 1, y: 0 } : { opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      aria-label="Animated AI avatar for Aljon Bacani"
      role="img"
    >
      <div className="avatar-aura" />
      <div className={`avatar-track ${isLoaded ? "is-loaded" : "is-loading"}`}>
        <img
          src={framePath(shownFrame)}
          alt=""
          className="avatar-frame"
          draggable={false}
          onLoad={() => setIsLoaded(true)}
        />
      </div>
    </motion.div>
  );
}
