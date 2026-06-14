"use client";

import { Linkedin, Twitter, Heart } from "lucide-react";

function UpworkIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 68 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="34" cy="34" r="34" fill="#14a800" />
      <path
        d="M22.5 26.2c0-1.3.7-2.3 1.9-2.8.8-.3 1.7-.5 2.6-.5 1.7 0 3.1.5 4.1 1.4v14.5c0 2.5-1.3 4-3.6 4-1.1 0-2.1-.3-3-1l-2 7.1c1.2.8 2.8 1.3 4.6 1.3 3.7 0 6.3-2.2 6.3-6.4v-16h-3.9v15.5c0 1.9-.8 2.8-2 2.8-.8 0-1.4-.3-2-.7l-.5 1.7c.9.6 2.2 1 3.6 1 2.9 0 4.8-1.7 4.8-4.8v-15.5h-7v7.7z"
        fill="white"
      />
      <path
        d="M39.3 17.9v19.5c0 2.5 1.2 4 3.5 4 1 0 2-.3 2.9-.8l.8 2.5c-1.2.6-2.6 1-4.2 1-3.9 0-6.2-2.2-6.2-6.4v-19.8h3.2z"
        fill="white"
      />
      <path
        d="M47.6 27.5c3.5 0 5.8 2.4 5.8 6.3 0 3.8-2.3 6.2-5.8 6.2-3.4 0-5.7-2.4-5.7-6.2 0-3.9 2.3-6.3 5.7-6.3zm0 10c2.4 0 2.8-3.2 2.8-3.8 0-.6-.4-3.7-2.8-3.7-2.4 0-2.8 3.1-2.8 3.7 0 .6-.4 3.8 2.8 3.8z"
        fill="white"
      />
    </svg>
  );
}

const links = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { icon: UpworkIcon, href: "https://www.upwork.com/freelancers/~0141b6eeb3ade39241?mp_source=share", label: "Upwork" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-glow py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-primary-400 flex items-center justify-center text-xs font-bold">
              AA
            </div>
            <span className="text-sm text-[--text-muted]">
              © 2026 Aljon Bacani. All rights reserved.
            </span>
          </div>

          {/* Links */}
          <div className="flex gap-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-[--text-muted] hover:text-[--text-primary] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Socials */}
          <div className="flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-glow bg-[--surface] flex items-center justify-center text-[--text-muted] hover:text-[--text-primary] hover:border-primary-500/30 hover:bg-primary-600/5 transition-all duration-200"
                aria-label={s.label}
              >
                <s.icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

