"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { ArrowUpRight, X } from "lucide-react";

/* ── Platform SVG logos ──────────────────────────────────── */

const ZapierLogo = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#FF4A00">
    <path d="M4.157 0A4.151 4.151 0 0 0 0 4.161v15.678A4.151 4.151 0 0 0 4.157 24h15.682A4.152 4.152 0 0 0 24 19.839V4.161A4.152 4.152 0 0 0 19.839 0H4.157Zm10.61 8.761h.03a.577.577 0 0 1 .23.038.585.585 0 0 1 .201.124.63.63 0 0 1 .162.431.612.612 0 0 1-.162.435.58.58 0 0 1-.201.128.58.58 0 0 1-.23.042.529.529 0 0 1-.235-.042.585.585 0 0 1-.332-.328.559.559 0 0 1-.038-.235.613.613 0 0 1 .17-.431.59.59 0 0 1 .405-.162Zm2.853 1.572c.03.004.061.004.095.004.325-.011.646.064.937.219.238.144.431.355.552.609.128.279.189.582.185.888v.193a2 2 0 0 1 0 .219h-2.498c.003.227.075.45.204.642a.78.78 0 0 0 .646.265.714.714 0 0 0 .484-.136.642.642 0 0 0 .23-.318l.915.257a1.398 1.398 0 0 1-.28.537c-.14.159-.321.284-.521.355a2.234 2.234 0 0 1-.836.136 1.923 1.923 0 0 1-1.001-.245 1.618 1.618 0 0 1-.665-.703 2.221 2.221 0 0 1-.227-1.036 1.95 1.95 0 0 1 .48-1.398 1.9 1.9 0 0 1 1.3-.488Zm-9.607.023c.162.004.325.026.48.079.207.065.4.174.563.314.26.302.393.692.366 1.088v2.276H8.53l-.109-.711h-.065c-.064.163-.155.31-.272.439a1.122 1.122 0 0 1-.374.264 1.023 1.023 0 0 1-.453.083 1.334 1.334 0 0 1-.866-.264.965.965 0 0 1-.329-.801.993.993 0 0 1 .076-.431 1.02 1.02 0 0 1 .242-.363 1.478 1.478 0 0 1 1.043-.303h.952v-.181a.696.696 0 0 0-.136-.454.553.553 0 0 0-.438-.154.695.695 0 0 0-.378.086.48.48 0 0 0-.193.254l-.99-.144a1.26 1.26 0 0 1 .257-.563c.14-.174.321-.302.533-.378.261-.091.54-.136.82-.129.053-.003.106-.007.163-.007Zm4.384.007c.174 0 .347.038.506.114.182.083.34.211.458.374.257.423.377.911.351 1.406a2.53 2.53 0 0 1-.355 1.448 1.148 1.148 0 0 1-1.009.517c-.204 0-.401-.045-.582-.136a1.052 1.052 0 0 1-.48-.457 1.298 1.298 0 0 1-.114-.234h-.045l.004 1.784h-1.059v-4.713h.904l.117.805h.057c.068-.208.177-.401.328-.56a1.129 1.129 0 0 1 .843-.344h.076v-.004Zm7.559.084h.903l.113.805h.053a1.37 1.37 0 0 1 .235-.484.813.813 0 0 1 .313-.242.82.82 0 0 1 .39-.076h.234v1.051h-.401a.662.662 0 0 0-.313.008.623.623 0 0 0-.272.155.663.663 0 0 0-.174.26.683.683 0 0 0-.027.314v1.875h-1.054v-3.666Zm-17.515.003h3.262v.896L3.73 13.104l.034.113h1.973l.042.9H2.4v-.9l1.931-1.754-.045-.117H2.441v-.896Zm11.815 0h1.055v3.659h-1.055V10.45Zm3.443.684.019.016a.69.69 0 0 0-.351.045.756.756 0 0 0-.287.204c-.11.155-.174.336-.189.522h1.545c-.034-.526-.257-.787-.74-.787h.003Zm-5.718.163c-.026 0-.057 0-.083.004a.78.78 0 0 0-.31.053.746.746 0 0 0-.257.189 1.016 1.016 0 0 0-.204.695v.064c-.015.257.057.507.204.711a.634.634 0 0 0 .253.196.638.638 0 0 0 .314.061.644.644 0 0 0 .578-.265c.14-.223.204-.48.189-.74a1.216 1.216 0 0 0-.181-.711.677.677 0 0 0-.503-.257Zm-4.509 1.266a.464.464 0 0 0-.268.102.373.373 0 0 0-.114.276c0 .053.008.106.027.155a.375.375 0 0 0 .087.132.576.576 0 0 0 .397.11v.004a.863.863 0 0 0 .563-.182.573.573 0 0 0 .211-.457v-.14h-.903Z" />
  </svg>
);

const MakeLogo = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#6D28D9">
    <path d="M13.38 3.498c-.27 0-.511.19-.566.465L9.85 18.986a.578.578 0 0 0 .453.678l4.095.826a.58.58 0 0 0 .682-.455l2.963-15.021a.578.578 0 0 0-.453-.678l-4.096-.826a.589.589 0 0 0-.113-.012zm-5.876.098a.576.576 0 0 0-.516.318L.062 17.697a.575.575 0 0 0 .256.774l3.733 1.877a.578.578 0 0 0 .775-.258l6.926-13.781a.577.577 0 0 0-.256-.776L7.762 3.658a.571.571 0 0 0-.258-.062zm11.74.115a.576.576 0 0 0-.576.576v15.426c0 .318.258.578.576.578h4.178a.58.58 0 0 0 .578-.578V4.287a.578.578 0 0 0-.578-.576Z" />
  </svg>
);

const N8nLogo = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#06B6D4">
    <path d="M21.4737 5.6842c-1.1772 0-2.1663.8051-2.4468 1.8947h-2.8955c-1.235 0-2.289.893-2.492 2.111l-.1038.623a1.263 1.263 0 0 1-1.246 1.0555H11.289c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947s-2.1663.8051-2.4467 1.8947H4.973c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947C1.1311 9.4737 0 10.6047 0 12s1.131 2.5263 2.5263 2.5263c1.1772 0 2.1663-.8051 2.4468-1.8947h1.4223c.2804 1.0896 1.2696 1.8947 2.4467 1.8947 1.1772 0 2.1663-.8051 2.4468-1.8947h1.0008a1.263 1.263 0 0 1 1.2459 1.0555l.1038.623c.203 1.218 1.257 2.111 2.492 2.111h.3692c.2804 1.0895 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263c-1.1772 0-2.1664.805-2.4468 1.8947h-.3692a1.263 1.263 0 0 1-1.246-1.0555l-.1037-.623A2.52 2.52 0 0 0 13.9607 12a2.52 2.52 0 0 0 .821-1.4794l.1038-.623a1.263 1.263 0 0 1 1.2459-1.0555h2.8955c.2805 1.0896 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263m0 1.2632a1.263 1.263 0 0 1 1.2631 1.2631 1.263 1.263 0 0 1-1.2631 1.2632 1.263 1.263 0 0 1-1.2632-1.2632 1.263 1.263 0 0 1 1.2632-1.2631M2.5263 10.7368A1.263 1.263 0 0 1 3.7895 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 1.2632 12a1.263 1.263 0 0 1 1.2631-1.2632m6.3158 0A1.263 1.263 0 0 1 10.1053 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 7.579 12a1.263 1.263 0 0 1 1.2632-1.2632m10.1053 3.7895a1.263 1.263 0 0 1 1.2631 1.2632 1.263 1.263 0 0 1-1.2631 1.2631 1.263 1.263 0 0 1-1.2632-1.2631 1.263 1.263 0 0 1 1.2632-1.2632" />
  </svg>
);

/* ── Platform definitions ────────────────────────────────── */

interface Project {
  title: string;
  category: string;
  desc: string;
  tags: string[];
  image?: string;
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
        image: "/projects/asana-automation.png",
      },
      {
        title: "Lead Enrichment Automation",
        category: "Sales Automation",
        desc: "Built automated lead enrichment workflows that gather, organize, and enhance prospect information to improve lead quality and sales readiness.",
        tags: ["Zapier", "CRM", "AI", "Lead Generation"],
        image: "/projects/lead-enrichment.png",
      },
      {
        title: "Automated Blog Publishing Workflow",
        category: "Content Automation",
        desc: "Created a workflow that automatically generates blog content and publishes it to Facebook pages, reducing manual work and increasing content distribution.",
        tags: ["Zapier", "OpenAI", "Facebook"],
        image: "/projects/automated-blog-publishing.png",
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
        image: "/projects/xero-asana-workflow.png",
      },
      {
        title: "Gmail Attachment Management System",
        category: "Productivity Automation",
        desc: "Built a workflow that automatically sorts Gmail attachments and stores them into organized Google Drive folders.",
        tags: ["Make.com", "Gmail", "Google Drive"],
        image: "/projects/gmail-attachment-management.png",
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
        image: "/projects/n8n-facebook-inquiry.png",
      },
      {
        title: "RAG Knowledge Base System",
        category: "AI Agent",
        desc: "Implemented a Retrieval-Augmented Generation system capable of retrieving information from knowledge bases and delivering accurate context-aware responses.",
        tags: ["n8n", "OpenAI", "RAG"],
        image: "/projects/n8n-rag-agent.png",
      },
      {
        title: "AI Appointment Setter",
        category: "AI Agent",
        desc: "Created an AI-driven appointment scheduling system that qualifies leads and automates booking workflows.",
        tags: ["n8n", "OpenAI", "Calendly"],
        image: "/projects/n8n-appointment-setter.png",
      },
      {
        title: "AI Jobs Scraper & Resume Optimizer",
        category: "AI Automation",
        desc: "Built an AI workflow that scrapes job opportunities, analyzes job requirements, and optimizes resumes for better job matching.",
        tags: ["n8n", "OpenAI", "Scraping"],
        image: "/projects/n8n-resume-optimizer.png",
      },
      {
        title: "Automated Content Creation Pipeline",
        category: "Content Automation",
        desc: "Developed an end-to-end workflow that generates and publishes YouTube Shorts and Facebook Reels automatically.",
        tags: ["n8n", "AI", "YouTube", "Facebook"],
        image: "/projects/n8n-content-pipeline.png",
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

/* ── Image modal ───────────────────────────────────────── */

function ImageModal({
  open,
  onClose,
  src,
  alt,
}: {
  open: boolean;
  onClose: () => void;
  src: string;
  alt: string;
}) {
  /* Close on ESC */
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    /* Prevent body scroll while modal is open */
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="image-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close image preview"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X size={24} />
          </button>

          {/* Image container */}
          <motion.div
            key="image-modal-content"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative z-10 max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="w-full h-auto rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.5)] object-contain max-h-[85vh]"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Main component ──────────────────────────────────────── */

export function Projects() {
  const [modalImage, setModalImage] = useState<{ src: string; alt: string } | null>(null);

  const openModal = useCallback((src: string, alt: string) => setModalImage({ src, alt }), []);
  const closeModal = useCallback(() => setModalImage(null), []);

  return (
    <section id="projects" className="relative py-24 px-6">
      {/* Image preview modal */}
      <ImageModal
        open={!!modalImage}
        onClose={closeModal}
        src={modalImage?.src ?? ""}
        alt={modalImage?.alt ?? ""}
      />

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
        {platforms.map((platform) => (
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
                      ${project.image ? "cursor-pointer" : ""}
                    `}
                    onClick={
                      project.image
                        ? () => openModal(project.image!, `${project.title} preview`)
                        : undefined
                    }
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
