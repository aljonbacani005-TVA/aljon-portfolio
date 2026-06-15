"use client";

import { Linkedin } from "lucide-react";

function UpworkIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"
        fill="#14a800"
      />
    </svg>
  );
}

function OnlineJobsIcon({ size = 16 }: { size?: number }) {
  return (
    <img
      src="/olj-logo.webp"
      alt="OnlineJobs.ph"
      width={size}
      height={size}
      className="object-contain"
    />
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
  { icon: Linkedin, href: "https://www.linkedin.com/in/aljon-bacani-1ba743215/", label: "LinkedIn" },
  { icon: OnlineJobsIcon, href: "https://v2.onlinejobs.ph/jobseekers/info/4898958", label: "OnlineJobs.ph" },
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

