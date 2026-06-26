"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, BadgeCheck, Repeat2, Clock } from "lucide-react";

const tiers = [
  {
    icon: BadgeCheck,
    name: "Fixed Price",
    tagline: "Defined scope. Defined budget.",
    description:
      "Best for projects with clear requirements. We agree on scope, timeline, and cost upfront, no surprises.",
    range: "Custom Quote",
    period: "scoped to your project",
    color: "from-[#1E3A8A] to-[#2563EB]",
    border: "border-blue-800/30",
    accent: "dark:text-blue-400 text-blue-700",
    checkColor: "dark:text-blue-400 text-blue-600",
    glow: "shadow-blue-900/20",
    features: [
      "Discovery & scoping workshop",
      "Fixed milestone-based payments",
      "Full delivery to agreed spec",
      "60-day post-launch support",
      "Source code handover",
    ],
    cta: "Get a Fixed Quote",
    popular: false,
  },
  {
    icon: Repeat2,
    name: "Retainer",
    tagline: "Ongoing partnership. Predictable costs.",
    description:
      "Ideal for businesses that need a dedicated tech team on-hand every month, feature development, maintenance, and strategy included.",
    range: "Monthly Retainer",
    period: "tailored to your capacity needs",
    color: "from-[#8B0000] to-[#DC2626]",
    border: "border-red-800/30",
    accent: "dark:text-red-400 text-red-700",
    checkColor: "dark:text-red-400 text-red-600",
    glow: "shadow-red-900/30",
    features: [
      "Dedicated engineering capacity",
      "Weekly sprint reviews",
      "Priority bug fixes & patches",
      "Architecture advisory included",
      "Monthly performance reports",
      "Flexible scope per month",
    ],
    cta: "Start a Retainer",
    popular: true,
  },
  {
    icon: Clock,
    name: "Time & Materials",
    tagline: "Maximum flexibility. Pay as you go.",
    description:
      "Perfect for evolving projects, R&D, or when requirements shift. Track every hour with full transparency.",
    range: "Hourly Rate",
    period: "transparent time tracking",
    color: "from-[#059669] to-[#10B981]",
    border: "border-green-800/30",
    accent: "dark:text-green-400 text-green-700",
    checkColor: "dark:text-green-400 text-green-600",
    glow: "shadow-green-900/20",
    features: [
      "No long-term commitment",
      "Transparent time tracking",
      "Weekly invoicing",
      "Scale up or down instantly",
      "Access to full team bench",
    ],
    cta: "Discuss T&M",
    popular: false,
  },
];

const faqs = [
  {
    q: "Do you work with early-stage startups?",
    a: "Yes. We work across all business stages. Startups often benefit from our Fixed Price model for an MVP, then transition to a Retainer as the product grows.",
  },
  {
    q: "What's the minimum engagement size?",
    a: "We focus on substantive, delivery-oriented engagements. We don't take on small gigs, we're a dedicated delivery partner, not a freelance marketplace. Contact us to discuss your scope.",
  },
  {
    q: "Can I switch between models?",
    a: "Absolutely. Many clients start Fixed Price for V1, then move to Retainer for ongoing development. We structure contracts to make this transition seamless.",
  },
  {
    q: "What currencies do you invoice in?",
    a: "We invoice in USD, GBP, or ZAR depending on your location. International wire transfers, Wise, and Payoneer are all supported.",
  },
];

export default function Pricing() {
  const scrollToContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="pricing" className="relative py-24 sm:py-32 bg-background-alt overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8B0000]/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent dark:via-white/5 via-black/5 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#8B0000]/30 bg-[#8B0000]/10 text-sm dark:text-red-300/80 text-red-700 mb-6">
            <BadgeCheck className="w-3.5 h-3.5" />
            Engagement Models
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Transparent{" "}
            <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-lg dark:text-gray-400 text-gray-600 max-w-2xl mx-auto">
            Three engagement models built for how real businesses work. No hidden fees,
            no retainer lock-in traps, just honest pricing that scales with your needs.
          </p>
        </motion.div>

        {/* Tier cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {tiers.map((tier, i) => {
            const Icon = tier.icon;
            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative rounded-2xl border ${tier.border} dark:bg-white/[0.02] bg-white p-8 flex flex-col ${tier.popular ? `shadow-xl ${tier.glow}` : "shadow-sm"}`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-gradient-to-r from-[#8B0000] to-[#DC2626] text-white shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${tier.color} flex items-center justify-center mb-5 shadow-lg`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-1">{tier.name}</h3>
                <p className={`text-xs font-semibold uppercase tracking-widest ${tier.accent} mb-4`}>{tier.tagline}</p>
                <p className="text-sm dark:text-gray-400 text-gray-600 leading-relaxed mb-6">{tier.description}</p>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-foreground">{tier.range}</span>
                  </div>
                  <span className="text-xs dark:text-gray-500 text-gray-500">{tier.period}</span>
                </div>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm dark:text-gray-300 text-gray-700">
                      <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${tier.checkColor}`} />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={scrollToContact}
                  className={`w-full py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 group ${
                    tier.popular
                      ? "bg-gradient-to-r from-[#8B0000] to-[#A52020] text-white hover:from-[#A52020] hover:to-[#DC2626] shadow-lg shadow-red-900/20"
                      : `border ${tier.border} ${tier.accent} dark:hover:bg-white/5 hover:bg-black/5`
                  }`}
                >
                  {tier.cta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Custom enterprise bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border dark:border-white/8 border-black/8 dark:bg-white/[0.02] bg-white shadow-sm p-8 flex flex-col sm:flex-row items-center justify-between gap-6 mb-20"
        >
          <div>
            <h4 className="text-lg font-bold text-foreground mb-1">Enterprise & Government</h4>
            <p className="text-sm dark:text-gray-400 text-gray-600 max-w-xl">
              Large-scale implementations, multi-year agreements, and compliance-sensitive environments. We offer custom MSA/SLA structures, dedicated account management, and on-site delivery where required.
            </p>
          </div>
          <button
            onClick={scrollToContact}
            className="shrink-0 flex items-center gap-2 px-7 py-3.5 rounded-xl dark:bg-white/5 dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:hover:border-white/20 bg-black/5 border border-black/10 text-gray-800 hover:bg-black/10 hover:border-black/20 font-bold text-sm transition-all duration-300 group"
          >
            Talk to Us
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl font-bold text-foreground text-center mb-8">Frequently Asked</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-xl border dark:border-white/8 border-black/8 dark:bg-white/[0.02] bg-white shadow-sm p-6">
                <h4 className="text-sm font-bold text-foreground mb-2">{faq.q}</h4>
                <p className="text-sm dark:text-gray-400 text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
