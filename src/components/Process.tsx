"use client";

import { motion } from "framer-motion";
import { Search, PenTool, Code2, ShieldCheck, Rocket, Headphones } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discovery & Requirements",
    duration: "Weeks 1–2",
    description:
      "We deep-dive into your business, goals, and existing systems. Stakeholder workshops, technical audits, and detailed requirement documentation. You receive a clear project brief and feasibility assessment before any code is written.",
    deliverables: ["Requirements document", "Technical audit", "Project scope", "Timeline estimate"],
    color: "#8B0000",
  },
  {
    number: "02",
    icon: PenTool,
    title: "Architecture & Design",
    duration: "Weeks 2–3",
    description:
      "System architecture, database schema, API design, and UI/UX wireframes are produced and agreed. We present the full technical blueprint so you know exactly what will be built and how before a line of code is touched.",
    deliverables: ["System architecture", "UI wireframes", "API contracts", "Tech stack finalised"],
    color: "#2563EB",
  },
  {
    number: "03",
    icon: Code2,
    title: "Agile Development",
    duration: "Ongoing sprints",
    description:
      "Two-week sprint cycles with demos at every milestone. Continuous integration, code reviews, and daily progress visibility. You see working software early and often — not at the very end.",
    deliverables: ["Sprint demos", "CI/CD pipeline", "Code reviews", "Progress reports"],
    color: "#7C3AED",
  },
  {
    number: "04",
    icon: ShieldCheck,
    title: "Quality Assurance",
    duration: "Throughout",
    description:
      "Automated test suites, manual QA, security reviews, and performance testing run continuously. We target high end-to-end coverage and zero critical bugs at launch. Every release is signed off against acceptance criteria.",
    deliverables: ["Automated tests", "Security audit", "Performance tests", "QA sign-off"],
    color: "#059669",
  },
  {
    number: "05",
    icon: Rocket,
    title: "Deployment & Launch",
    duration: "Final sprint",
    description:
      "Zero-downtime production deployments with rollback plans, environment configuration, monitoring setup, and documentation handover. We stay live alongside you on launch day.",
    deliverables: ["Production deploy", "Monitoring setup", "User training", "Technical docs"],
    color: "#D97706",
  },
  {
    number: "06",
    icon: Headphones,
    title: "Support & Evolution",
    duration: "Post-launch",
    description:
      "Ongoing support, performance monitoring, and iterative improvements. We treat every project as a long-term partnership — not a one-off handover. Your system keeps improving as your business grows.",
    deliverables: ["SLA support", "Bug fixes", "Feature iterations", "Monthly reports"],
    color: "#0891B2",
  },
];

export default function Process() {
  return (
    <section id="process" className="relative py-24 sm:py-32 bg-background overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8B0000]/30 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-[#2563EB]/4 blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#8B0000]/30 bg-[#8B0000]/10 text-sm dark:text-red-300/80 text-red-700 mb-6">
            How We Work
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-5 tracking-tight leading-tight">
            From brief to production,{" "}
            <span className="gradient-text">step by step</span>
          </h2>
          <p className="dark:text-gray-400 text-gray-600 text-lg max-w-2xl mx-auto">
            A structured six-phase engagement model that eliminates surprises, keeps you in control,
            and delivers working software on time.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line — desktop */}
          <div className="hidden lg:block absolute top-[52px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative glass-card rounded-2xl p-6 border dark:border-white/5 dark:hover:border-white/10 border-black/5 hover:border-black/10 transition-all duration-400 hover:-translate-y-1"
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at top left, ${step.color}10, transparent 70%)` }}
                />

                {/* Top row: icon + number */}
                <div className="flex items-center justify-between mb-5">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: `${step.color}18`, border: `1px solid ${step.color}30` }}
                  >
                    <step.icon className="w-5 h-5" style={{ color: step.color }} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-600 font-medium border border-white/5 rounded-full px-2 py-0.5">
                      {step.duration}
                    </span>
                    <span className="text-4xl font-black leading-none" style={{ color: `${step.color}25` }}>
                      {step.number}
                    </span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-5">{step.description}</p>

                {/* Deliverables */}
                <div className="space-y-1.5">
                  {step.deliverables.map((d) => (
                    <div key={d} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: step.color }} />
                      <span className="text-[11px] text-gray-500">{d}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-gray-500 text-sm mb-5">
            Ready to start? Discovery sessions are free and commitment-free.
          </p>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#8B0000] to-[#A52020] text-white text-sm font-semibold hover:from-[#A52020] hover:to-[#DC2626] transition-all duration-300 shadow-lg shadow-red-900/20"
          >
            Book a Discovery Call
          </button>
        </motion.div>
      </div>
    </section>
  );
}
