"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUp,
  Calendar,
  Mail,
  Briefcase,
  Wrench,
  Heart,
  Loader2,
} from "lucide-react";
import { PortraitVideo } from "@/components/PortraitVideo";
import { useCalendly } from "@/lib/useCalendly";

const suggestions = [
  { icon: Briefcase, label: "Show me your best projects" },
  { icon: Wrench, label: "What tools do you use?" },
  { icon: Heart, label: "How can we collaborate?" },
];

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

function makeId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function renderMarkdown(text: string) {
  return text.split("\n").map((line, i) => {
    if (!line.trim()) return <br key={i} />;
    if (line.trim().startsWith("- ")) {
      return (
        <li key={i} className="ml-4">
          {line
            .trim()
            .slice(2)
            .split(/(\*\*[^*]+\*\*)/g)
            .map((p, j) =>
              p.startsWith("**") && p.endsWith("**") ? (
                <strong key={j}>{p.slice(2, -2)}</strong>
              ) : (
                p
              )
            )}
        </li>
      );
    }
    return (
      <p key={i}>
        {line
          .split(/(\*\*[^*]+\*\*)/g)
          .map((p, j) =>
            p.startsWith("**") && p.endsWith("**") ? (
              <strong key={j}>{p.slice(2, -2)}</strong>
            ) : (
              p
            )
          )}
      </p>
    );
  });
}

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

export function Hero() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const { openCalendly } = useCalendly();
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isStreaming]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 96) + "px";
    }
  }, [input]);

  async function sendMessage(value: string) {
    const clean = value.trim();
    if (!clean || isStreaming) return;

    setHasInteracted(true);
    setInput("");

    const userMsg: Message = { id: makeId(), role: "user", content: clean };
    const assistantId = makeId();
    const nextMessages = [...messages, userMsg];

    setMessages([
      ...nextMessages,
      { id: assistantId, role: "assistant", content: "" },
    ]);
    setIsStreaming(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({
            role,
            content,
          })),
        }),
      });

      if (!res.ok || !res.body) throw new Error("Chat request failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? { ...m, content: m.content + chunk }
              : m
          )
        );
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? {
                ...m,
                content:
                  "I hit a connection issue. Check the API key in `.env.local` and try again.",
              }
            : m
        )
      );
    } finally {
      setIsStreaming(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16 overflow-hidden">

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 lg:gap-16 items-center">
        {/* LEFT COLUMN — Content */}
        <div className="flex flex-col gap-5 order-1">
        {/* Badge with animated glow pulse */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/25 bg-green-600/10 text-sm text-[--text-primary] backdrop-blur-sm w-fit mx-auto"
          style={{
            animation: "badge-glow-pulse 3s ease-in-out infinite",
          }}
        >
          <span className="relative flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
            Available for automation work
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[--text-primary] leading-[1.1]"
        >
          Hey, I&apos;m{" "}
          <span
            className="bg-gradient-to-r from-primary-400 via-glow-cyan to-primary-300 bg-clip-text text-transparent"
            style={{
              filter: "drop-shadow(0 0 20px rgba(56,189,248,0.3))",
            }}
          >
            Aljon Bacani
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-base sm:text-lg text-[--text-secondary]"
        >
          AI Automation Specialist &bull; Pampanga, PH
        </motion.p>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-sm sm:text-base text-[--text-muted] max-w-lg leading-relaxed"
        >
          I help businesses save time and scale faster through smart automation
          and AI-powered solutions.
        </motion.p>

        {/* Chat container */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="w-full max-w-xl rounded-2xl border-gradient bg-[--surface] backdrop-blur-xl shadow-2xl shadow-primary-600/5 overflow-hidden"
        >
          {/* Messages */}
          {hasInteracted && (
            <div className="max-h-64 overflow-y-auto px-4 pt-3 pb-1 space-y-2 scrollbar-thin">
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                        msg.role === "user"
                          ? "bg-primary-600/20 text-[--text-primary]"
                          : "bg-[--surface] text-[--text-secondary]"
                      }`}
                    >
                      {msg.content ? (
                        renderMarkdown(msg.content)
                      ) : (
                        <span className="flex items-center gap-2 text-glow-cyan">
                          <Loader2 size={14} className="animate-spin" />
                          Thinking...
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={bottomRef} />
            </div>
          )}

          {/* Suggestion pills */}
          {!hasInteracted && (
            <div className="flex flex-wrap gap-2 px-4 pt-3 pb-2">
              {suggestions.map((s) => (
                <button
                  key={s.label}
                  onClick={() => sendMessage(s.label)}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-glow bg-[--surface] text-xs text-[--text-secondary] hover:text-[--text-primary] hover:bg-primary-600/10 transition-all duration-200 hover:scale-[1.03]"
                >
                  <s.icon size={13} className="text-glow-cyan/70" />
                  {s.label}
                </button>
              ))}
            </div>
          )}

          {/* Input row with cursor blink */}
          <form onSubmit={onSubmit} className="px-4 pb-3">
            <div className="flex items-center gap-2 rounded-xl bg-[--bg-deep]/70 border-glow">
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage(input);
                    }
                  }}
                  placeholder="Ask me anything..."
                  rows={1}
                  className="w-full bg-transparent text-[--text-primary] placeholder:text-[--text-muted] text-sm px-4 py-3 resize-none outline-none max-h-24"
                />
                {!input && !hasInteracted && (
                  <span className="absolute left-4 top-3 text-sm pointer-events-none chatbox-cursor text-transparent">
                    {" "}
                  </span>
                )}
              </div>
              <button
                type="submit"
                className="mr-2 w-9 h-9 rounded-lg bg-primary-600 hover:bg-primary-500 flex items-center justify-center text-white shadow-lg shadow-primary-600/30 transition-all duration-200 hover:scale-105 disabled:opacity-30 disabled:hover:scale-100 flex-shrink-0"
                disabled={!input.trim() || isStreaming}
              >
                {isStreaming ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <ArrowUp size={16} />
                )}
              </button>
            </div>
          </form>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-3 justify-center"
        >
          <motion.a
            href="mailto:aljonbacani005@gmail.com?subject=Automation%20Consultation&body=Hi%20Aljon%2C%0A%0AI'd%20like%20to%20discuss%20an%20automation%20project."
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-glow bg-[--surface] backdrop-blur-sm text-sm text-[--text-secondary] hover:text-[--text-primary] hover:bg-primary-600/10 transition-all duration-200"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
          >
            <Mail size={16} />
            Email Me
          </motion.a>
          <motion.button
            type="button"
            onClick={openCalendly}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary-500/30 bg-primary-600/10 backdrop-blur-sm text-sm text-primary-300 hover:text-white hover:bg-primary-600/20 transition-all duration-200 shadow-lg shadow-primary-600/10 cursor-pointer"
            whileHover={{
              scale: 1.04,
              boxShadow: "0 0 25px rgba(59,130,246,0.25)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            <Calendar size={16} />
            Book Discovery Call
          </motion.button>
        </motion.div>
        </div>

        {/* RIGHT COLUMN — Portrait */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative flex items-end justify-center order-2 lg:min-h-[650px]"
        >
          {/* Radial blue glow behind portrait */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(37,99,235,0.2) 0%, rgba(56,189,248,0.08) 40%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />

          {/* Secondary bloom layer */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[350px] h-[350px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(96,165,250,0.2) 0%, transparent 60%)",
              filter: "blur(40px)",
            }}
          />

          {/* Ambient rim glow behind subject */}
          <div
            className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[520px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse, rgba(56,189,248,0.1) 0%, rgba(37,99,235,0.04) 40%, transparent 65%)",
              filter: "blur(50px)",
            }}
          />

          <div className="relative z-10 w-full max-w-[520px]">
            <PortraitVideo />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
