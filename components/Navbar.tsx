"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";

const links = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Tech Stack", href: "#techstack" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[--bg-deep]/80 backdrop-blur-xl shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="relative">
            {/* Logo glow */}
            <div
              className="absolute inset-0 -m-3 rounded-full pointer-events-none"
              style={{
                background: "rgba(37, 99, 235, 0.15)",
                filter: "blur(20px)",
                animation: "avatar-spotlight-pulse 3s ease-in-out infinite",
              }}
            />
            <div className="relative">
              <div
                className="text-2xl font-extrabold bg-gradient-to-r from-glow-cyan to-primary-400 bg-clip-text text-transparent tracking-tight group-hover:opacity-80 transition-opacity"
                style={{
                  textShadow: "0 0 15px rgba(59,130,246,0.4), 0 0 30px rgba(59,130,246,0.2)",
                  animation: "avatar-ring-glow 3s ease-in-out infinite",
                }}
              >
                AAIA
              </div>
              <div className="text-[9px] tracking-[0.25em] text-glow-cyan/60 uppercase font-medium">
                AI Automation
              </div>
            </div>
          </div>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm text-[--text-muted] hover:text-[--text-primary] rounded-lg hover:bg-[--surface-hover] transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA + Theme toggle */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-10 h-10 rounded-full border-glow bg-[--surface] backdrop-blur-md flex items-center justify-center text-[--text-muted] hover:text-[--text-primary] hover:bg-primary-600/10 transition-all duration-200 hover:scale-110 cursor-pointer"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-full bg-primary-600 hover:bg-primary-500 text-white shadow-lg shadow-primary-600/25 hover:shadow-primary-500/40 transition-all duration-200 hover:scale-[1.02]"
          >
            Let&apos;s Talk
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 text-[--text-muted] hover:text-[--text-primary]"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-[--text-muted] hover:text-[--text-primary]"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-[--bg-deep]/95 backdrop-blur-xl border-b border-[--border-subtle]"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm text-[--text-muted] hover:text-[--text-primary] rounded-lg hover:bg-[--surface-hover] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-5 py-3 text-sm font-medium rounded-full bg-primary-600 text-white text-center"
              >
                Let&apos;s Talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
