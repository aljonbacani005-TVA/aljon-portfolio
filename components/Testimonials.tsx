"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Startup Founder",
    text: "Aljon automated our entire lead pipeline. What used to take 3 hours of manual work daily now runs on its own. Absolute game changer.",
    stars: 5,
  },
  {
    name: "Marcus Rodriguez",
    role: "Operations Manager",
    text: "The AI chatbot Aljon built handles 80% of our customer inquiries. Our support team can now focus on complex issues. ROI was insane.",
    stars: 5,
  },
  {
    name: "Emily Tanaka",
    role: "E-commerce Owner",
    text: "From order processing to inventory sync, everything is automated now. I finally have time to focus on growing the business instead of drowning in tasks.",
    stars: 5,
  },
];

export function Testimonials() {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-500/20 bg-primary-600/5 text-xs text-glow-cyan mb-4">
            TESTIMONIALS
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            What Clients{" "}
            <span className="bg-gradient-to-r from-primary-400 to-glow-cyan bg-clip-text text-transparent">
              Say
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-2xl border border-[--border-subtle] bg-[--surface] p-6 hover:border-primary-500/20 transition-all duration-300"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, si) => (
                  <Star
                    key={si}
                    size={16}
                    className="fill-yellow-500 text-yellow-500"
                  />
                ))}
              </div>
              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-600 to-glow-cyan flex items-center justify-center text-sm font-bold text-white">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-text-muted">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
