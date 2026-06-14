"use client";

import { motion } from "framer-motion";

const techStack = [
  { name: "OpenAI", color: "#10B981" },
  { name: "Claude", color: "#D97706" },
  { name: "Zapier", color: "#FF4F00" },
  { name: "Make", color: "#6D28D9" },
  { name: "n8n", color: "#EA580C" },
  { name: "Airtable", color: "#F59E0B" },
  { name: "Notion", color: "#FFFFFF" },
  { name: "Asana", color: "#F06A6A" },
  { name: "HubSpot", color: "#FF7A59" },
  { name: "Slack", color: "#E01E5A" },
  { name: "Google", color: "#4285F4" },
  { name: "Stripe", color: "#635BFF" },
];

export function TechStack() {
  return (
    <section id="techstack" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-500/20 bg-primary-600/5 text-xs text-glow-cyan mb-4">
            TECH STACK
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Tools I{" "}
            <span className="bg-gradient-to-r from-primary-400 to-glow-cyan bg-clip-text text-transparent">
              Work With
            </span>
          </h2>
          <p className="max-w-xl mx-auto text-text-muted text-lg">
            I leverage the best tools in the industry to deliver reliable,
            scalable automation solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {techStack.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative flex flex-col items-center gap-3 p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-primary-500/20 hover:bg-primary-600/5 transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold"
                style={{ backgroundColor: tech.color + "15", color: tech.color }}
              >
                {tech.name[0]}
              </div>
              <span className="text-xs text-text-muted group-hover:text-text-secondary transition-colors">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
