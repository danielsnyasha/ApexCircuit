"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

const capabilities = [
  "Enterprise App Development",
  "Web Development",
  "ERP Systems",
  "GIS Development",
  "AI & Automation",
  "Project Management",
];

const marqueeItems = [
  "ENTERPRISE SOLUTIONS",
  "AI AUTOMATION",
  "ERP SYSTEMS",
  "GIS DEVELOPMENT",
  "WEB APPLICATIONS",
  "SPATIAL ANALYSIS",
  "ML PIPELINES",
  "FULL-STACK ENGINEERING",
  "ERPNEXT CERTIFIED",
  "AZURE CLOUD",
  "LANGCHAIN",
  "NEXT.JS",
  "REACT NATIVE",
  "POSTGIS",
];

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "11", label: "Capabilities" },
  { value: "8+", label: "Countries Served" },
  { value: "99.9%", label: "Uptime Guaranteed" },
];

export default function Hero() {
  const [activeCap, setActiveCap] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setActiveCap((c) => (c + 1) % capabilities.length), 1800);
    return () => clearInterval(id);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative min-h-screen flex flex-col bg-background overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />

      {/* Gradient orbs, fewer, more intentional */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#8B0000]/6 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#1E3A8A]/8 blur-[120px] pointer-events-none" />

      {/* ── Main content ── */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-20">
          <div className="grid lg:grid-cols-12 gap-12 xl:gap-20 items-center">

            {/* ── LEFT: Text ── */}
            <div className="lg:col-span-7 xl:col-span-6">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#8B0000]/40 bg-[#8B0000]/10 text-[11px] dark:text-red-300/90 text-red-700 mb-10 uppercase tracking-[0.18em] font-semibold"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse flex-shrink-0" />
                Global Enterprise Technology Partner
              </motion.div>

              {/* Headline */}
              <div className="mb-8 overflow-hidden">
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.6 }}
                  className="text-2xl sm:text-3xl text-gray-500 font-medium mb-1 leading-none"
                >
                  We engineer
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.7 }}
                  className="text-[4rem] sm:text-[5.5rem] lg:text-[6.5rem] xl:text-[7.5rem] font-black leading-[0.9] tracking-tighter gradient-text"
                >
                  world-class
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.38, duration: 0.7 }}
                  className="text-[4rem] sm:text-[5.5rem] lg:text-[6.5rem] xl:text-[7.5rem] font-black leading-[0.9] tracking-tighter text-foreground"
                >
                  technology.
                </motion.p>
              </div>

              {/* Subtext */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.6 }}
                className="dark:text-gray-400 text-gray-600 text-base sm:text-lg leading-relaxed max-w-lg mb-10"
              >
                From enterprise-grade applications to spatial intelligence systems,
                Apex Circuit delivers solutions that rival the world's best technology firms.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="flex flex-wrap gap-3 mb-14"
              >
                <button
                  onClick={() => scrollTo("services")}
                  className="group flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#8B0000] to-[#A52020] text-white font-bold text-[13px] uppercase tracking-widest hover:from-[#A52020] hover:to-[#DC2626] transition-all duration-300 shadow-2xl shadow-red-900/30 hover:-translate-y-0.5"
                >
                  Explore Our Work
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => scrollTo("contact")}
                  className="group flex items-center gap-2 px-7 py-3.5 rounded-xl border dark:border-white/10 dark:text-white dark:hover:bg-white/5 dark:hover:border-white/20 border-black/10 text-foreground hover:bg-black/5 hover:border-black/20 font-bold text-[13px] uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5"
                >
                  Start a Project
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>

              {/* Stats, inline, no cards */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="grid grid-cols-4 gap-4 sm:gap-8 max-w-sm sm:max-w-none"
              >
                {stats.map((s, i) => (
                  <div key={i} className="flex flex-col gap-0.5">
                    <span className="text-xl sm:text-2xl font-black text-foreground leading-none">{s.value}</span>
                    <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-[0.1em] sm:tracking-[0.15em] leading-tight">{s.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ── RIGHT: Terminal visual ── */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.9, ease: "easeOut" }}
              className="lg:col-span-5 xl:col-span-6 flex items-center justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-[420px]">
                {/* Decorative rings behind the card */}
                <div className="absolute -inset-10 rounded-full border border-white/[0.04] spin-slow pointer-events-none" />
                <div className="absolute -inset-20 rounded-full border border-[#8B0000]/[0.06] spin-slow-reverse pointer-events-none" />
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-[#8B0000]/5 to-[#1E3A8A]/5 blur-2xl pointer-events-none" />

                {/* Terminal card */}
                <div className="relative glass-card rounded-2xl overflow-hidden border border-white/8 shadow-2xl shadow-black/50">
                  {/* Title bar */}
                  <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28CA41]" />
                    <span className="ml-3 text-[11px] text-gray-500 font-mono tracking-wide">apex-circuit.sh</span>
                  </div>

                  {/* Body */}
                  <div className="p-6 font-mono">
                    <p className="text-gray-600 text-[12px] mb-4">$ apex --capabilities --list</p>

                    <div className="space-y-2 mb-6">
                      {capabilities.map((cap, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: mounted ? 1 : 0, x: 0 }}
                          transition={{ delay: 0.8 + i * 0.12, duration: 0.4 }}
                          className="flex items-center gap-3 text-[12px]"
                        >
                          <span
                            className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold transition-all duration-500"
                            style={{
                              background: i === activeCap ? "#28CA41" : i < activeCap ? "rgba(40,202,65,0.2)" : "rgba(255,255,255,0.05)",
                              color: i <= activeCap ? "#28CA41" : "#4B5563",
                            }}
                          >
                            {i <= activeCap ? "✓" : String(i + 1).padStart(2, "0")}
                          </span>
                          <span
                            className="transition-colors duration-500"
                            style={{
                              color: i === activeCap ? "#F0F4FF" : i < activeCap ? "#9CA3AF" : "#374151",
                            }}
                          >
                            {cap}
                          </span>
                          {i === activeCap && (
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: [0, 1, 0] }}
                              transition={{ duration: 0.8, repeat: Infinity }}
                              className="text-green-400 text-[10px]"
                            >
                              ▊
                            </motion.span>
                          )}
                        </motion.div>
                      ))}
                    </div>

                    {/* Bottom status line */}
                    <div className="border-t border-white/5 pt-4 flex items-center justify-between">
                      <span className="text-[11px] text-gray-600 font-mono">
                        status:{" "}
                        <span className="text-green-400">operational</span>
                      </span>
                      <span className="text-[11px] text-gray-600 font-mono">
                        uptime: <span className="text-white">99.9%</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating metric cards */}
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-5 -right-5 glass-card rounded-xl px-3.5 py-2.5 border border-[#8B0000]/25 shadow-xl shadow-red-900/10"
                >
                  <div className="text-base font-black text-white leading-none">MSc</div>
                  <div className="text-[9px] dark:text-gray-400 text-gray-500 uppercase tracking-wider mt-0.5">Distinction · UEL</div>
                </motion.div>

                <motion.div
                  animate={{ y: [5, -5, 5] }}
                  transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-5 -left-5 glass-card rounded-xl px-3.5 py-2.5 border border-[#2563EB]/25 shadow-xl shadow-blue-900/10"
                >
                  <div className="text-base font-black text-white leading-none">ERPNext</div>
                  <div className="text-[9px] dark:text-gray-400 text-gray-500 uppercase tracking-wider mt-0.5">Certified Partner</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Marquee strip ── */}
      <div className="relative z-10 border-t dark:border-white/[0.06] border-black/[0.06] py-4 overflow-hidden dark:bg-white/[0.01] bg-black/[0.01]">
        <div className="marquee-track gap-0">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="whitespace-nowrap text-[10px] uppercase tracking-[0.22em] text-gray-600 font-semibold px-6 flex items-center gap-6"
            >
              {item}
              <span className="w-1 h-1 rounded-full bg-[#8B0000] flex-shrink-0" />
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-20 right-8 z-10 flex flex-col items-center gap-3 text-gray-600"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
        <span
          className="text-[9px] uppercase tracking-[0.3em]"
          style={{ writingMode: "vertical-rl" }}
        >
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
