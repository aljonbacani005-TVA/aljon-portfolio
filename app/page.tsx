"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Calendar, Loader2, Mail, Moon, Sparkles, Sun } from "lucide-react";
import { Avatar } from "@/components/Avatar";
import { MouseEffects } from "@/components/MouseEffects";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const suggestions = [
  "Show me your best projects",
  "What tools do you use?",
  "How can we collaborate?"
];

const intro =
  "Ask me about automations, AI workflows, project ideas, or how I can help remove repetitive work from your business.";

function makeId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function renderMarkdownLite(text: string) {
  const lines = text.split("\n");

  return lines.map((line, index) => {
    if (!line.trim()) {
      return <br key={index} />;
    }

    if (line.trim().startsWith("- ")) {
      return (
        <li key={index}>
          {line
            .trim()
            .slice(2)
            .split(/(\*\*[^*]+\*\*)/g)
            .map((part, partIndex) =>
              part.startsWith("**") && part.endsWith("**") ? (
                <strong key={partIndex}>{part.slice(2, -2)}</strong>
              ) : (
                part
              )
            )}
        </li>
      );
    }

    return (
      <p key={index}>
        {line.split(/(\*\*[^*]+\*\*)/g).map((part, partIndex) =>
          part.startsWith("**") && part.endsWith("**") ? (
            <strong key={partIndex}>{part.slice(2, -2)}</strong>
          ) : (
            part
          )
        )}
      </p>
    );
  });
}

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "intro",
      role: "assistant",
      content:
        "Hey, I'm Aljon's AI avatar. I can walk you through his automation work, tools, experience, and how to collaborate. What should we explore first? 😄"
    }
  ]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const bottomRef = useRef<HTMLDivElement>(null);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const avatarState = useMemo(() => {
    if (isStreaming) return "thinking";
    const last = messages[messages.length - 1];
    return last?.role === "assistant" && hasInteracted ? "speaking" : "idle";
  }, [hasInteracted, isStreaming, messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isStreaming]);

  async function sendMessage(value: string) {
    const clean = value.trim();
    if (!clean || isStreaming) return;

    setHasInteracted(true);
    setInput("");

    const userMessage: Message = {
      id: makeId(),
      role: "user",
      content: clean
    };
    const assistantId = makeId();
    const nextMessages = [...messages, userMessage];

    setMessages([
      ...nextMessages,
      {
        id: assistantId,
        role: "assistant",
        content: ""
      }
    ]);
    setIsStreaming(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content }))
        })
      });

      if (!response.ok || !response.body) {
        throw new Error("Chat request failed");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        setMessages((current) =>
          current.map((message) =>
            message.id === assistantId
              ? {
                  ...message,
                  content: message.content + chunk
                }
              : message
          )
        );
      }
    } catch {
      setMessages((current) =>
        current.map((message) =>
          message.id === assistantId
            ? {
                ...message,
                content:
                  "I hit a connection issue before I could answer. Check the API key in `.env.local`, then ask me again. I'll be right here."
              }
            : message
        )
      );
    } finally {
      setIsStreaming(false);
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  function toggleTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  return (
    <main className="portfolio-shell">
      <div className="ambient-grid" />
      <MouseEffects />

      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      >
        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      <section className="conversation-stage" aria-label="AI portfolio chat">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="status-pill">
            <Sparkles size={14} />
            Available for automation work
          </div>
          <h1>Hey, I&apos;m Aljon Bacani</h1>
          <p className="subtitle">AI Automation Specialist - Pampanga, PH</p>
        </motion.div>

        <motion.div
          className="avatar-wrap"
          initial={{ opacity: 0, scale: 0.92, y: 22 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.75, ease: "easeOut" }}
        >
          <Avatar state={avatarState} />
        </motion.div>

        <section className="chat-panel" aria-label="Conversation with Aljon AI">
          <div className={`messages${hasInteracted ? " has-messages" : ""}`} aria-live="polite">
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <motion.article
                  key={message.id}
                  className={`message ${message.role}`}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="bubble">
                    {message.content ? (
                      renderMarkdownLite(message.content)
                    ) : (
                      <span className="typing">
                        <Loader2 size={14} />
                        Thinking
                      </span>
                    )}
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
            <div ref={bottomRef} />
          </div>

          {!hasInteracted && (
            <motion.div
              className="suggestions"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.45 }}
            >
              {suggestions.map((suggestion) => (
                <button key={suggestion} type="button" onClick={() => sendMessage(suggestion)}>
                  {suggestion}
                </button>
              ))}
            </motion.div>
          )}

          <form className="composer" onSubmit={onSubmit}>
            <label className="sr-only" htmlFor="portfolio-question">
               Ask Aljon&apos;s AI avatar a question
            </label>
            <textarea
              id="portfolio-question"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  void sendMessage(input);
                }
              }}
              placeholder="Ask me anything..."
              rows={1}
            />
            <button type="submit" disabled={!input.trim() || isStreaming} aria-label="Send message">
              {isStreaming ? <Loader2 size={18} className="spin" /> : <ArrowUp size={18} />}
            </button>
          </form>
        </section>

        <div className="quick-actions" aria-label="Contact options">
          <a href="mailto:aljon.bacani@gmail.com">
            <Mail size={15} />
            Email
          </a>
          <a href="#" target="_blank" rel="noreferrer">
            <Calendar size={15} />
            Book a call
          </a>
        </div>

        <p className="intro-line">{intro}</p>
      </section>
    </main>
  );
}