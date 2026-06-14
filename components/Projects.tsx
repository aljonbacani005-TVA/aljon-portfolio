"use client";

import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "AI Lead Qualification System",
    desc: "Automated lead scoring and routing using AI to qualify inbound leads, assign to reps, and trigger follow-up sequences.",
    tags: ["Zapier", "OpenAI", "HubSpot"],
    color: "from-blue-600/20 to-cyan-600/10",
  },
  {
    title: "Customer Support AI Agent",
    desc: "Built a conversational AI agent that handles 80% of customer inquiries automatically, escalating complex issues to humans.",
    tags: ["Claude", "Make.com", "Slack"],
    color: "from-purple-600/20 to-pink-600/10",
  },
  {
    title: "E-commerce Order Pipeline",
    desc: "End-to-end order processing automation from checkout to fulfillment, inventory sync, and customer notifications.",
    tags: ["n8n", "Stripe", "Airtable"],
    color: "from-orange-600/20 to-yellow-600/10",
  },
  {
    title: "Internal Knowledge Base Bot",
    desc: "AI-powered chatbot trained on company docs that answers employee questions instantly, reducing support tickets by 60%.",
    tags: ["OpenAI", "Notion", "Slack"],
    color: "from-green-600/20 to-emerald-600/10",
  },
];

export function Projects() {
  return (
    <section id="projects" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-500/20 bg-primary-600/5 text-xs text-glow-cyan mb-4">
            PROJECTS
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Recent{" "}
            <span className="bg-gradient-to-r from-primary-400 to-glow-cyan bg-clip-text text-transparent">
              Work
            </span>
          </h2>
          <p className="max-w-xl mx-auto text-text-muted text-lg">
            Real automations that saved businesses time, money, and headaches.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden hover:border-primary-500/20 transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />
              <div className="relative p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold group-hover:text-primary-300 transition-colors">
                    {project.title}
                  </h3>
                  <ArrowUpRight
                    size={20}
                    className="text-text-muted group-hover:text-primary-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  />
                </div>
                <p className="text-sm text-text-muted leading-relaxed mb-4">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs rounded-full border border-white/10 bg-white/[0.03] text-text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
