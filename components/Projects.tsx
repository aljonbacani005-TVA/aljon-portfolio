"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

/* ── Platform SVG logos ──────────────────────────────────── */

const ZapierLogo = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
    <circle cx="12" cy="12" r="11" fill="#FF4A00" opacity="0.15" />
    <path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5zm4 4h-2v-2h2v2zm0-4h-2V7h2v5z"
      fill="#FF4A00"
    />
    <text
      x="12"
      y="16"
      textAnchor="middle"
      fontSize="9"
      fontWeight="bold"
      fill="#FF4A00"
      fontFamily="sans-serif"
    >
      Z
    </text>
  </svg>
);

const MakeLogo = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
    <circle cx="12" cy="12" r="11" fill="#6D28D9" opacity="0.15" />
    <text
      x="12"
      y="16.5"
      textAnchor="middle"
      fontSize="11"
      fontWeight="bold"
      fill="#9333EA"
      fontFamily="sans-serif"
    >
      M
    </text>
  </svg>
);

const N8nLogo = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
    <circle cx="12" cy="12" r="11" fill="#06B6D4" opacity="0.12" />
    <text
      x="12"
      y="16"
      textAnchor="middle"
      fontSize="9"
      fontWeight="bold"
      fill="#06B6D4"
      fontFamily="sans-serif"
    >
      n8n
    </text>
  </svg>
);

/* ── Platform definitions ────────────────────────────────── */

interface Project {
  title: string;
  category: string;
  desc: string;
  tags: string[];
}

interface PlatformSection {
  id: string;
  name: string;
  subtitle: string;
  logo: React.ReactNode;
  glowColor: string; // Tailwind ring/shadow utility
  hoverBorder: string; // hover:border-*
  hoverShadow: string; // hover:shadow-*
  tagBg: string;
  tagBorder: string;
  tagText: string;
  categoryBg: string;
  categoryText: string;
  categoryBorder: string;
  gradientFrom: string;
  gradientTo: string;
  projects: Project[];
}

const platforms: PlatformSection[] = [
  {
    id: "zapier",
    name: "ZAPIER AUTOMATIONS",
    subtitle: "Business process automation and workflow optimization.",
    logo: <ZapierLogo />,
    glowColor: "rgba(255, 74, 0, 0.15)",
    hoverBorder: "hover:border-orange-500/30",
    hoverShadow: "hover:shadow-[0_0_30px_rgba(255,74,0,0.12)]",
    tagBg: "bg-orange-500/10",
    tagBorder: "border-orange-500/20",
    tagText: "text-orange-300",
    categoryBg: "bg-orange-500/8",
    categoryText: "text-orange-400",
    categoryBorder: "border-orange-500/20",
    gradientFrom: "from-orange-600/15",
    gradientTo: "to-amber-600/5",
    projects: [
      {
        title: "CRM & Asana Automation",
        category: "Workflow Automation",
        desc: "Implemented five automation workflows that streamlined CRM operations, improved task management, lead tracking, and team communication.",
        tags: ["Zapier", "Asana", "CRM"],
      },
      {
        title: "Lead Enrichment Automation",
        category: "Sales Automation",
        desc: "Built automated lead enrichment workflows that gather, organize, and enhance prospect information to improve lead quality and sales readiness.",
        tags: ["Zapier", "CRM", "AI", "Lead Generation"],
      },
      {
        title: "Automated Blog Publishing Workflow",
        category: "Content Automation",
        desc: "Created a workflow that automatically generates blog content and publishes it to Facebook pages, reducing manual work and increasing content distribution.",
        tags: ["Zapier", "OpenAI", "Facebook"],
      },
    ],
  },
  {
    id: "make",
    name: "MAKE.COM AUTOMATIONS",
    subtitle: "Data synchronization and operational automation.",
    logo: <MakeLogo />,
    glowColor: "rgba(147, 51, 234, 0.15)",
    hoverBorder: "hover:border-purple-500/30",
    hoverShadow: "hover:shadow-[0_0_30px_rgba(147,51,234,0.12)]",
    tagBg: "bg-purple-500/10",
    tagBorder: "border-purple-500/20",
    tagText: "text-purple-300",
    categoryBg: "bg-purple-500/8",
    categoryText: "text-purple-400",
    categoryBorder: "border-purple-500/20",
    gradientFrom: "from-purple-600/15",
    gradientTo: "to-pink-600/5",
    projects: [
      {
        title: "Xero to Asana Financial Workflow",
        category: "Business Automation",
        desc: "Developed an automation that exports account transactions from Xero, converts data into CSV format, uploads files, and synchronizes information with Asana.",
        tags: ["Make.com", "Xero", "Asana", "CSV"],
      },
      {
        title: "Gmail Attachment Management System",
        category: "Productivity Automation",
        desc: "Built a workflow that automatically sorts Gmail attachments and stores them into organized Google Drive folders.",
        tags: ["Make.com", "Gmail", "Google Drive"],
      },
    ],
  },
  {
    id: "n8n",
    name: "N8N AI AUTOMATIONS",
    subtitle: "AI agents, RAG systems, and intelligent workflows.",
    logo: <N8nLogo />,
    glowColor: "rgba(6, 182, 212, 0.15)",
    hoverBorder: "hover:border-cyan-500/30",
    hoverShadow: "hover:shadow-[0_0_30px_rgba(6,182,212,0.12)]",
    tagBg: "bg-cyan-500/10",
    tagBorder: "border-cyan-500/20",
    tagText: "text-cyan-300",
    categoryBg: "bg-cyan-500/8",
    categoryText: "text-cyan-400",
    categoryBorder: "border-cyan-500/20",
    gradientFrom: "from-cyan-600/15",
    gradientTo: "to-teal-600/5",
    projects: [
      {
        title: "AI Facebook Inquiry Assistant",
        category: "AI Agent",
        desc: "Built an AI-powered Facebook inquiry assistant that answers customer questions using company documents and knowledge bases.",
        tags: ["n8n", "OpenAI", "Facebook", "RAG"],
      },
      {
        title: "RAG Knowledge Base System",
        category: "AI Agent",
        desc: "Implemented a Retrieval-Augmented Generation system capable of retrieving information from knowledge bases and delivering accurate context-aware responses.",
        tags: ["n8n", "OpenAI", "RAG"],
      },
      {
        title: "AI Appointment Setter",
        category: "AI Agent",
        desc: "Created an AI-driven appointment scheduling system that qualifies leads and automates booking workflows.",
        tags: ["n8n", "OpenAI", "Calendly"],
      },
      {
        title: "AI Jobs Scraper & Resume Optimizer",
        category: "AI Automation",
        desc: "Built an AI workflow that scrapes job opportunities, analyzes job requirements, and optimizes resumes for better job matching.",
        tags: ["n8n", "OpenAI", "Scraping"],
      },
      {
        title: "Automated Content Creation Pipeline",
        category: "Content Automation",
        desc: "Developed an end-to-end workflow that generates and publishes YouTube Shorts and Facebook Reels automatically.",
        tags: ["n8n", "AI", "YouTube", "Facebook"],
      },
    ],
  },
];

/* ── Staggered card wrapper ──────────────────────────────── */

function StaggerCard({
  children,
  index,
  className,
}: {
  children: React.ReactNode;
  index: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Main component ──────────────────────────────────────── */

export function Projects() {
  return (
    <section id="projects" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-500/20 bg-primary-600/5 text-xs text-glow-cyan mb-4 tracking-widest uppercase">
            Projects
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Recent{" "}
            <span className="bg-gradient-to-r from-primary-400 to-glow-cyan bg-clip-text text-transparent">
              Work
            </span>
          </h2>
          <p className="max-w-xl mx-auto text-[--text-muted] text-lg">
            Real automations that saved businesses time, money, and headaches — built across three leading platforms.
          </p>
        </motion.div>

        {/* Platform sections */}
        {platforms.map((platform, pIdx) => (
          <div key={platform.id} className="mb-20 last:mb-0">
            {/* Platform heading */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-3 mb-3"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[--surface] border border-[--border-subtle]">
                {platform.logo}
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-wide text-[--text-primary]">
                  {platform.name}
                </h3>
              </div>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[--text-muted] mb-8 ml-[52px]"
            >
              {platform.subtitle}
            </motion.p>

            {/* Project cards grid */}
            <div className="grid md:grid-cols-2 gap-5">
              {platform.projects.map((project, i) => (
                <StaggerCard
                  key={project.title}
                  index={i}
                  className="group relative"
                >
                  <div
                    className={`
                      relative h-full rounded-2xl
                      border border-white/[0.06] bg-[--surface]
                      backdrop-blur-sm
                      ${platform.hoverBorder} ${platform.hoverShadow}
                      transition-all duration-300 ease-out
                      hover:-translate-y-1 hover:bg-[--surface-hover]
                      overflow-hidden
                    `}
                  >
                    {/* Hover gradient glow */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${platform.gradientFrom} ${platform.gradientTo} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                    />

                    {/* Top accent line */}
                    <div
                      className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${platform.glowColor}, transparent)`,
                      }}
                    />

                    <div className="relative p-6 flex flex-col h-full">
                      {/* Title row */}
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="text-lg font-semibold text-[--text-primary] group-hover:text-[--text-primary] transition-colors leading-snug pr-2">
                          {project.title}
                        </h4>
                        <ArrowUpRight
                          size={18}
                          className="text-[--text-muted] group-hover:text-[--text-secondary] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0 mt-0.5"
                        />
                      </div>

                      {/* Category badge */}
                      <div className="mb-3">
                        <span
                          className={`
                            inline-flex items-center px-2.5 py-0.5 text-[11px] font-medium rounded-full
                            border ${platform.categoryBorder} ${platform.categoryBg} ${platform.categoryText}
                            tracking-wide uppercase
                          `}
                        >
                          {project.category}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-[--text-muted] leading-relaxed mb-5 flex-1">
                        {project.desc}
                      </p>

                      {/* Tech tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`
                              px-2.5 py-1 text-[11px] font-medium rounded-full
                              border ${platform.tagBorder} ${platform.tagBg} ${platform.tagText}
                              transition-colors duration-200
                            `}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </StaggerCard>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}