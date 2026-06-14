"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUp, Calendar, Mail, Sparkles } from "lucide-react";

const suggestions = [
  "Show me your best projects",
  "What tools do you use?",
  "How can we collaborate?",
];

export function Hero() {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [input]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 bg-grid">
      {/* Floating orbs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary-600/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-glow-cyan/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-500/20 bg-primary-600/5 text-sm text-glow-cyan backdrop-blur-sm"
        >
          <Sparkles size={14} className="text-glow-cyan" />
          Available for automation work
        </motion.div>

        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
          style={{ animation: "float 6s ease-in-out infinite" }}
        >
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-600 to-glow-cyan p-[3px] shadow-xl shadow-primary-600/30" style={{ animation: "glow-pulse 3s ease-in-out infinite" }}>
            <div className="w-full h-full rounded-full bg-bg-deep flex items-center justify-center overflow-hidden">
              <img
                src="/Avatar_frames/frame_0001.webp"
                alt="Aljon Bacani"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-bg-card border border-white/10 text-xs text-text-secondary">
            🟢 Online
          </div>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
            Hey, I&apos;m{" "}
            <span className="bg-gradient-to-r from-primary-400 via-glow-cyan to-primary-300 bg-clip-text text-transparent">
              Aljon Bacani
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-text-secondary font-medium">
            AI Automation Specialist{" "}
            <span className="text-text-muted">•</span> Pampanga, PH
          </p>
        </motion.div>

        {/* Search box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full max-w-2xl"
        >
          <div className="relative group rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-2xl shadow-black/20 transition-all duration-300 hover:border-primary-500/30 focus-within:border-primary-500/40 focus-within:shadow-primary-600/10">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                }
              }}
              placeholder="Ask me anything about AI automation..."
              rows={1}
              className="w-full bg-transparent text-text-primary placeholder:text-text-muted text-base px-6 py-5 pr-14 resize-none outline-none max-h-32"
            />
            <button
              className="absolute right-3 bottom-3 w-10 h-10 rounded-xl bg-primary-600 hover:bg-primary-500 flex items-center justify-center text-white shadow-lg shadow-primary-600/30 transition-all duration-200 hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
              disabled={!input.trim()}
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </motion.div>

        {/* Quick suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => setInput(s)}
              className="px-4 py-2 text-sm rounded-full border border-white/10 bg-white/[0.03] text-text-secondary hover:text-white hover:border-primary-500/30 hover:bg-primary-600/5 transition-all duration-200 hover:scale-[1.02]"
            >
              {s}
            </button>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 pt-2"
        >
          <a
            href="mailto:aljon.bacani@gmail.com"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary-600 hover:bg-primary-500 text-white font-semibold shadow-xl shadow-primary-600/25 hover:shadow-primary-500/40 transition-all duration-200 hover:scale-[1.02]"
          >
            <Mail size={18} />
            Email Me
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/10 bg-white/[0.03] text-text-secondary hover:text-white hover:border-primary-500/30 hover:bg-primary-600/5 font-semibold backdrop-blur-sm transition-all duration-200 hover:scale-[1.02]"
          >
            <Calendar size={18} />
            Book a Call
          </a>
        </motion.div>
      </div>
    </section>
  );
}
