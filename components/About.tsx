"use client";

import { motion } from "framer-motion";
import { Zap, Bot, Workflow, ArrowRight } from "lucide-react";

const stats = [
  { value: "10+", label: "Automations Built" },
  { value: "∞", label: "Automation Potential", special: true },
  { value: "10k+", label: "Hours Saved" },
  { value: "99%", label: "Uptime" },
];

export function About() {
  return (
    <section id="about" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-500/20 bg-primary-600/5 text-xs text-glow-cyan mb-4">
            ABOUT ME
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Turning Repetitive Work Into
            <br />
            <span className="bg-gradient-to-r from-primary-400 to-glow-cyan bg-clip-text text-transparent">
              Automated Workflows
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-[--text-secondary] text-lg leading-relaxed">
            I&apos;m an AI Automation Specialist who helps businesses eliminate repetitive
            tasks, connect their tools, and build intelligent workflows that save time
            and money. Based in Pampanga, Philippines, working with clients worldwide.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="relative group rounded-2xl border-glow bg-[--surface] p-6 text-center hover:border-primary-500/20 hover:bg-primary-600/5 transition-all duration-300"
            >
              <div className="h-16 sm:h-20 flex items-center justify-center mb-2">
                <span
                  className={`font-black leading-none bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent ${
                    stat.special
                      ? "text-6xl sm:text-7xl animate-pulse-slow"
                      : "text-4xl sm:text-5xl"
                  }`}
                  style={{
                    textShadow: stat.special
                      ? "0 0 25px rgba(59,130,246,0.5), 0 0 50px rgba(59,130,246,0.25), 0 0 80px rgba(59,130,246,0.1)"
                      : "0 0 20px rgba(59,130,246,0.35), 0 0 40px rgba(59,130,246,0.15)",
                  }}
                >
                  {stat.value}
                </span>
              </div>
              <div className="text-sm text-[--text-muted]">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Highlights */}
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              icon: Zap,
              title: "Workflow Automation",
              desc: "End-to-end automation pipelines using Zapier, Make, and n8n that run your business on autopilot.",
            },
            {
              icon: Bot,
              title: "AI-Powered Assistants",
              desc: "Custom chatbots and AI agents that handle customer support, lead qualification, and internal ops.",
            },
            {
              icon: Workflow,
              title: "Tool Integration",
              desc: "Connecting CRMs, spreadsheets, APIs, and databases into seamless unified systems.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-2xl border-glow bg-[--surface] p-6 hover:border-primary-500/20 hover:bg-primary-600/5 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-600/10 flex items-center justify-center mb-4 group-hover:bg-primary-600/20 transition-colors">
                <item.icon size={22} className="text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-[--text-muted] leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


