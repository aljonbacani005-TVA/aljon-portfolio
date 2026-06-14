"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUp, Calendar, Mail, Sparkles, Briefcase, Wrench, Heart, Sun, Moon } from "lucide-react";

const suggestions = [
  { icon: Briefcase, label: "Show me your best projects" },
  { icon: Wrench, label: "What tools do you use?" },
  { icon: Heart, label: "How can we collaborate?" },
];

export function Hero() {
  const [input, setInput] = useState("");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [input]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid opacity-100 dark:opacity-100 light:opacity-30" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-primary-600/25 via-glow-cyan/10 to-transparent rounded-full blur-[120px] translate-x-1/4 translate-y-1/4" />

      {/* Theme toggle */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="fixed top-4 right-4 z-50 w-10 h-10 rounded-full border border-white/10 bg-white/[0.05] backdrop-blur-md flex items-center justify-center text-text-muted hover:text-white hover:border-primary-500/30 hover:bg-primary-600/10 transition-all duration-200 hover:scale-110"
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      >
        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      </motion.button>

      <div className="relative z-10 max-w-2xl mx-auto w-full flex flex-col items-center gap-5">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-500/25 bg-primary-600/10 text-sm text-white/90 backdrop-blur-sm"
        >
          <Sparkles size={14} className="text-glow-cyan" />
          Available for automation work
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-extrabold text-center tracking-tight text-text-primary"
        >
          Hey, I&apos;m Aljon Bacani
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-base text-text-secondary"
        >
          AI Automation Specialist · Pampanga, PH
        </motion.p>

        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="my-2"
        >
          <div
            className="w-28 h-28 rounded-full bg-white p-[3px] shadow-2xl shadow-primary-600/40"
            style={{ animation: "glow-pulse 3s ease-in-out infinite" }}
          >
            <div className="w-full h-full rounded-full bg-bg-deep flex items-center justify-center overflow-hidden">
              <img
                src="/Avatar_frames/frame_0001.webp"
                alt="Aljon Bacani"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Chat container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="w-full rounded-2xl border border-primary-500/20 bg-primary-950/40 backdrop-blur-xl shadow-2xl shadow-primary-600/5 overflow-hidden"
        >
          {/* Suggestion pills */}
          <div className="flex flex-wrap gap-2 px-4 pt-3 pb-2">
            {suggestions.map((s) => (
              <button
                key={s.label}
                onClick={() => setInput(s.label)}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-primary-900/50 text-xs text-white/80 hover:text-white hover:border-primary-500/30 hover:bg-primary-800/50 transition-all duration-200"
              >
                <s.icon size={13} className="text-glow-cyan/70" />
                {s.label}
              </button>
            ))}
          </div>

          {/* Input row */}
          <div className="px-4 pb-3">
            <div className="flex items-center gap-2 rounded-xl bg-bg-deep/70 border border-white/[0.06]">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                  }
                }}
                placeholder="Ask me anything..."
                rows={1}
                className="flex-1 bg-transparent text-text-primary placeholder:text-text-muted text-sm px-4 py-3 resize-none outline-none max-h-24"
              />
              <button
                className="mr-2 w-9 h-9 rounded-lg bg-primary-600 hover:bg-primary-500 flex items-center justify-center text-white shadow-lg shadow-primary-600/30 transition-all duration-200 hover:scale-105 disabled:opacity-30 disabled:hover:scale-100 flex-shrink-0"
                disabled={!input.trim()}
              >
                <ArrowUp size={16} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex gap-3"
        >
          <a
            href="mailto:aljon.bacani@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-primary-900/40 text-sm text-white/80 hover:text-white hover:border-primary-500/30 hover:bg-primary-800/40 transition-all duration-200"
          >
            <Mail size={16} />
            Email me
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-primary-900/40 text-sm text-white/80 hover:text-white hover:border-primary-500/30 hover:bg-primary-800/40 transition-all duration-200"
          >
            <Calendar size={16} />
            Book a call
          </a>
        </motion.div>

        {/* Bottom text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-sm text-text-muted text-center max-w-md mt-1"
        >
          Ask me about automations, AI workflows, project ideas, or how I can
          help remove repetitive work from your business.
        </motion.p>
      </div>
    </section>
  );
}
