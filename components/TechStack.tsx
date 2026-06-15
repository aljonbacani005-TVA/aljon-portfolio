"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import {
  SiOpenai,
  SiZapier,
  SiMake,
  SiN8N,
  SiAirtable,
  SiNotion,
  SiAsana,
  SiHubspot,
  SiSlack,
  SiGoogle,
  SiStripe,
} from "react-icons/si";
import { Bot } from "lucide-react";

const techStack = [
  { name: "OpenAI", icon: SiOpenai, color: "#10B981" },
  { name: "Claude", icon: Bot, color: "#D97706" },
  { name: "Zapier", icon: SiZapier, color: "#FF4F00" },
  { name: "Make", icon: SiMake, color: "#6D28D9" },
  { name: "n8n", icon: SiN8N, color: "#EA580C" },
  { name: "Airtable", icon: SiAirtable, color: "#F59E0B" },
  { name: "Notion", icon: SiNotion, color: "#FFFFFF" },
  { name: "Asana", icon: SiAsana, color: "#F06A6A" },
  { name: "HubSpot", icon: SiHubspot, color: "#FF7A59" },
  { name: "Slack", icon: SiSlack, color: "#E01E5A" },
  { name: "Google", icon: SiGoogle, color: "#4285F4" },
  { name: "Stripe", icon: SiStripe, color: "#635BFF" },
];

/* ── Single card ──────────────────────────────────────────── */

function TechCard({ tech }: { tech: (typeof techStack)[number] }) {
  return (
    <div className="group relative flex flex-col items-center gap-3 p-5 rounded-2xl border-glow bg-[--surface] hover:bg-primary-600/5 transition-all duration-300 hover:-translate-y-1 shrink-0 w-[140px] sm:w-[160px]">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
        style={{ color: tech.color }}
      >
        <tech.icon size={28} />
      </div>
      <span className="text-xs text-[--text-muted] group-hover:text-[--text-secondary] transition-colors whitespace-nowrap">
        {tech.name}
      </span>
    </div>
  );
}

/* ── Marquee row ──────────────────────────────────────────── */

function MarqueeRow({
  direction,
  speed,
}: {
  direction: "left" | "right";
  speed: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const posRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const startAnimation = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const halfWidth = track.scrollWidth / 2;
    const dir = direction === "left" ? -1 : 1;

    const tick = (now: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = now;
      const delta = now - lastTimeRef.current;
      lastTimeRef.current = now;

      if (!paused) {
        posRef.current += dir * speed * (delta / 1000);

        // Reset position seamlessly when one full set has scrolled
        if (dir === -1 && posRef.current <= -halfWidth) {
          posRef.current += halfWidth;
        } else if (dir === 1 && posRef.current >= 0) {
          posRef.current -= halfWidth;
        }

        track.style.transform = `translate3d(${posRef.current}px, 0, 0)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [direction, speed, paused]);

  useEffect(() => {
    startAnimation();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [startAnimation]);

  // Pause / resume via refs to avoid re-starting the loop
  const onEnter = useCallback(() => setPaused(true), []);
  const onLeave = useCallback(() => setPaused(false), []);

  return (
    <div
      className="overflow-hidden py-2"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onTouchStart={onEnter}
      onTouchEnd={onLeave}
    >
      <div
        ref={trackRef}
        className="flex gap-4 will-change-transform"
        style={{ transform: "translate3d(0,0,0)" }}
      >
        {/* First set */}
        {techStack.map((tech) => (
          <TechCard key={tech.name} tech={tech} />
        ))}
        {/* Duplicate for seamless loop */}
        {techStack.map((tech) => (
          <TechCard key={`${tech.name}-dup`} tech={tech} />
        ))}
      </div>
    </div>
  );
}

/* ── Main component ───────────────────────────────────────── */

export function TechStack() {
  return (
    <section id="techstack" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-glow bg-[--surface] text-xs text-glow-cyan mb-4">
            TECH STACK
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Tools I{" "}
            <span className="bg-gradient-to-r from-primary-400 to-glow-cyan bg-clip-text text-transparent">
              Work With
            </span>
          </h2>
          <p className="max-w-xl mx-auto text-[--text-muted] text-lg">
            I leverage the best tools in the industry to deliver reliable,
            scalable automation solutions.
          </p>
        </motion.div>

        {/* Infinite marquee — scrolls left */}
        <MarqueeRow direction="left" speed={40} />
      </div>
    </section>
  );
}
