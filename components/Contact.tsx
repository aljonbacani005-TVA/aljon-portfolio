"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Calendar, ArrowRight, MapPin, Copy, Check } from "lucide-react";
import { useCalendly } from "@/lib/useCalendly";

export function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { openCalendly } = useCalendly();

  return (
    <section id="contact" className="relative py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl border-glow bg-[--surface] overflow-hidden"
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 via-transparent to-glow-cyan/5" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-primary-600/20 blur-[100px]" />

          <div className="relative p-8 sm:p-12 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-500/20 bg-primary-600/5 text-xs text-glow-cyan mb-6">
              <MapPin size={12} />
              Pampanga, Philippines
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to{" "}
              <span className="bg-gradient-to-r from-primary-400 to-glow-cyan bg-clip-text text-transparent">
                Automate?
              </span>
            </h2>

            <p className="max-w-lg mx-auto text-[--text-secondary] text-lg mb-8">
              Let&apos;s discuss how AI automation can transform your business.
              Book a free strategy call or send me an email.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:aljonbacani005@gmail.com?subject=Automation%20Consultation&body=Hi%20Aljon%2C%0A%0AI'd%20like%20to%20discuss%20an%20automation%20project."
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary-600 hover:bg-primary-500 text-white font-semibold shadow-xl shadow-primary-600/25 hover:shadow-primary-500/40 transition-all duration-200 hover:scale-[1.02]"
              >
                <Mail size={18} />
                Email Me Here — aljonbacani005@gmail.com
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    navigator.clipboard.writeText("aljonbacani005@gmail.com");
                    setCopiedEmail(true);
                    setTimeout(() => setCopiedEmail(false), 2000);
                  }}
                  className="ml-1 p-1 rounded hover:bg-white/20 transition-colors"
                  aria-label="Copy email"
                >
                  {copiedEmail ? <Check size={16} className="text-green-300" /> : <Copy size={16} />}
                </button>
                <ArrowRight size={16} />
              </a>
              <button
                type="button"
                onClick={openCalendly}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-glow bg-[--surface] text-[--text-secondary] hover:text-[--text-primary] hover:border-primary-500/30 hover:bg-primary-600/5 font-semibold backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] cursor-pointer"
              >
                <Calendar size={18} />
                Book Discovery Call
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


