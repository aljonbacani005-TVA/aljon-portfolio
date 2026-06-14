"use client";

import { motion } from "framer-motion";
import {
  SiOpenai,
  SiZapier,
  SiAirtable,
  SiNotion,
  SiAsana,
  SiHubspot,
  SiSlack,
  SiGoogle,
  SiStripe,
} from "react-icons/si";
import { Bot, Workflow, Box } from "lucide-react";

const techStack = [
  { name: "OpenAI", icon: SiOpenai, color: "#10B981" },
  { name: "Claude", icon: Bot, color: "#D97706" },
  { name: "Zapier", icon: SiZapier, color: "#FF4F00" },
  { name: "Make", icon: Workflow, color: "#6D28D9" },
  { name: "n8n", icon: Box, color: "#EA580C" },
  { name: "Airtable", icon: SiAirtable, color: "#F59E0B" },
  { name: "Notion", icon: SiNotion, color: "#FFFFFF" },
  { name: "Asana", icon: SiAsana, color: "#F06A6A" },
  { name: "HubSpot", icon: SiHubspot, color: "#FF7A59" },
  { name: "Slack", icon: SiSlack, color: "#E01E5A" },
  { name: "Google", icon: SiGoogle, color: "#4285F4" },
  { name: "Stripe", icon: SiStripe, color: "#635BFF" },
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-glow bg-[--surface] text-xs text-glow-cyan mb-4">
            TECH STACK
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Tools I{" "}
            <span className="bg-gradient-to-r from-primary-400 to-glow-cyan bg-clip-text text-transparent">
              Work With
            </span>
          </h2>
          <p className="max-w-xl mx-auto text-[--text-muted] text-lg">
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
              className="group relative flex flex-col items-center gap-3 p-5 rounded-2xl border-glow bg-[--surface] hover:bg-primary-600/5 transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{ color: tech.color }}
              >
                <tech.icon size={28} />
              </div>
              <span className="text-xs text-[--text-muted] group-hover:text-[--text-secondary] transition-colors">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
