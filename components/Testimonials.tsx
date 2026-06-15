"use client";

import { motion } from "framer-motion";
import { Zap, Puzzle, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Fast Communication",
    desc: "Clear updates, quick responses, and transparent project progress from start to finish.",
  },
  {
    icon: Puzzle,
    title: "Custom Solutions",
    desc: "Every automation is designed around your specific workflows, tools, and business requirements.",
  },
  {
    icon: TrendingUp,
    title: "Long-Term Value",
    desc: "Solutions built to save time, reduce repetitive work, minimize errors, and support future growth.",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-24 px-6">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary-600/8 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-500/20 bg-primary-600/5 text-xs text-glow-cyan mb-4 tracking-widest uppercase">
            Why Choose Me
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            What You Can{" "}
            <span className="bg-gradient-to-r from-primary-400 to-glow-cyan bg-clip-text text-transparent">
              Expect
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-[--text-secondary] text-lg leading-relaxed">
            I focus on delivering automation solutions that save time, reduce
            manual work, and help businesses scale efficiently through AI and
            workflow automation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {features.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-2xl border-glow bg-[--surface] p-8 hover:border-primary-500/25 hover:bg-primary-600/5 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300"
            >
              {/* Hover gradient glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-primary-500/40 to-transparent" />

              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-primary-600/10 border border-primary-500/10 flex items-center justify-center mb-6 group-hover:bg-primary-600/20 group-hover:border-primary-500/20 transition-all duration-300">
                  <item.icon
                    size={24}
                    className="text-primary-400 group-hover:text-primary-300 transition-colors"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-[--text-primary]">
                  {item.title}
                </h3>
                <p className="text-sm text-[--text-muted] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
