"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Calendar, Mail, Sparkles, Briefcase, Wrench, Heart, Sun, Moon, Loader2 } from "lucide-react";
import { Avatar } from "@/components/Avatar";
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
          {line.trim().slice(2).split(/(\*\*[^*]+\*\*)/g).map((p, j) =>
            p.startsWith("**") && p.endsWith("**") ? <strong key={j}>{p.slice(2, -2)}</strong> : p
          )}
        </li>
      );
    }
    return (
      <p key={i}>
        {line.split(/(\*\*[^*]+\*\*)/g).map((p, j) =>
          p.startsWith("**") && p.endsWith("**") ? <strong key={j}>{p.slice(2, -2)}</strong> : p
        )}
      </p>
    );
  });
}

export function Hero() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const { openCalendly } = useCalendly();
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isStreaming]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 96) + "px";
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

    setMessages([...nextMessages, { id: assistantId, role: "assistant", content: "" }]);
    setIsStreaming(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
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
          prev.map((m) => (m.id === assistantId ? { ...m, content: m.content + chunk } : m))
        );
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: "I hit a connection issue. Check the API key in `.env.local` and try again." }
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
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-primary-600/25 via-glow-cyan/10 to-transparent rounded-full blur-[120px] translate-x-1/4 translate-y-1/4" />

      {/* Theme toggle */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="fixed top-4 right-4 z-50 w-10 h-10 rounded-full border-glow bg-[--surface] backdrop-blur-md flex items-center justify-center text-[--text-muted] hover:text-[--text-primary] hover:bg-primary-600/10 transition-all duration-200 hover:scale-110"
      >
        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      </motion.button>

      <div className="relative z-10 max-w-2xl mx-auto w-full flex flex-col items-center gap-5">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-500/25 bg-primary-600/10 text-sm text-[--text-primary] backdrop-blur-sm"
        >
          <Sparkles size={14} className="text-glow-cyan" />
          Available for automation work
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-extrabold text-center tracking-tight text-[--text-primary]"
        >
          Hey, I&apos;m Aljon Bacani
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-base text-[--text-secondary]"
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
          <Avatar />
        </motion.div>

        {/* Chat container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="w-full rounded-2xl border-gradient bg-[--surface] backdrop-blur-xl shadow-2xl shadow-primary-600/5 overflow-hidden"
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
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
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
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-glow bg-[--surface] text-xs text-[--text-secondary] hover:text-[--text-primary] hover:bg-primary-600/10 transition-all duration-200"
                >
                  <s.icon size={13} className="text-glow-cyan/70" />
                  {s.label}
                </button>
              ))}
            </div>
          )}

          {/* Input row */}
          <form onSubmit={onSubmit} className="px-4 pb-3">
            <div className="flex items-center gap-2 rounded-xl bg-[--bg-deep]/70 border-glow">
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
                className="flex-1 bg-transparent text-[--text-primary] placeholder:text-[--text-muted] text-sm px-4 py-3 resize-none outline-none max-h-24"
              />
              <button
                type="submit"
                className="mr-2 w-9 h-9 rounded-lg bg-primary-600 hover:bg-primary-500 flex items-center justify-center text-white shadow-lg shadow-primary-600/30 transition-all duration-200 hover:scale-105 disabled:opacity-30 disabled:hover:scale-100 flex-shrink-0"
                disabled={!input.trim() || isStreaming}
              >
                {isStreaming ? <Loader2 size={16} className="animate-spin" /> : <ArrowUp size={16} />}
              </button>
            </div>
          </form>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex gap-3"
        >
          <a
            href="mailto:aljonbacani005@gmail.com?subject=Automation%20Consultation&body=Hi%20Aljon%2C%0A%0AI'd%20like%20to%20discuss%20an%20automation%20project."
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-glow bg-[--surface] text-sm text-[--text-secondary] hover:text-[--text-primary] hover:bg-primary-600/10 transition-all duration-200"
          >
            <Mail size={16} />
            Email me
          </a>
          <button
            type="button"
            onClick={openCalendly}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-glow bg-[--surface] text-sm text-[--text-secondary] hover:text-[--text-primary] hover:bg-primary-600/10 transition-all duration-200 cursor-pointer"
          >
            <Calendar size={16} />
            Book Discovery Call
          </button>
        </motion.div>

        {/* Bottom text */}
        {!hasInteracted && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-sm text-[--text-muted] text-center max-w-md mt-1"
          >
            Ask me about automations, AI workflows, project ideas, or how I can
            help remove repetitive work from your business.
          </motion.p>
        )}
      </div>
    </section>
  );
}
