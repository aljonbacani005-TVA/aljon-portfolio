"use client";

import { motion } from "framer-motion";
import {
  Bot,
  Zap,
  Workflow,
  MessageSquare,
  Database,
  Plug,
} from "lucide-react";

const services = [
  {
    icon: Bot,
    title: "AI Automation",
    desc: "Build intelligent systems that learn, adapt, and automate complex business processes.",
    gradient: "from-blue-600/20 to-cyan-600/20",
  },
  {
    icon: Zap,
    title: "Zapier Development",
    desc: "Custom Zaps and multi-step workflows that connect 5,000+ apps seamlessly.",
    gradient: "from-orange-600/20 to-yellow-600/20",
  },
  {
    icon: Workflow,
    title: "Make.com Workflows",
    desc: "Advanced scenarios with error handling, data transformation, and webhooks.",
    gradient: "from-purple-600/20 to-pink-600/20",
  },
  {
    icon: MessageSquare,
    title: "AI Chatbots",
    desc: "Conversational AI for customer support, lead gen, and internal knowledge bases.",
    gradient: "from-green-600/20 to-emerald-600/20",
  },
  {
    icon: Database,
    title: "CRM Automation",
    desc: "Automate lead scoring, pipeline management, and follow-up sequences.",
    gradient: "from-red-600/20 to-rose-600/20",
  },
  {
    icon: Plug,
    title: "API Integrations",
    desc: "Custom API connections, webhooks, and data sync between any platforms.",
    gradient: "from-indigo-600/20 to-violet-600/20",
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-500/20 bg-primary-600/5 text-xs text-glow-cyan mb-4">
            SERVICES
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            What I Can{" "}
            <span className="bg-gradient-to-r from-primary-400 to-glow-cyan bg-clip-text text-transparent">
              Build For You
            </span>
          </h2>
          <p className="max-w-xl mx-auto text-text-muted text-lg">
            From simple automations to complex AI-powered systems, I deliver
            solutions that scale with your business.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative rounded-2xl border border-[--border-subtle] bg-[--surface] p-6 hover:border-primary-500/20 transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <service.icon size={22} className="text-white/80" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
