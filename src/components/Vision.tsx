"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Lightbulb, Shield, Trophy, Handshake, Eye, Target, CheckCircle2 } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "We push boundaries with cutting-edge technology, embracing new approaches that create real competitive advantage.",
    color: "#F59E0B",
    bg: "bg-yellow-500/10",
  },
  {
    icon: Shield,
    title: "Integrity",
    desc: "Honest, transparent relationships with every client. If we aren't the right fit, we'll say so.",
    color: "#10B981",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Trophy,
    title: "Excellence",
    desc: "We only take on work we can win. We win by delivering outcomes that exceed expectations.",
    color: "#8B0000",
    bg: "bg-red-900/20",
  },
  {
    icon: Handshake,
    title: "Partnership",
    desc: "We embed ourselves in your success. Your goals become our goals. We stay with you beyond delivery.",
    color: "#2563EB",
    bg: "bg-blue-500/10",
  },
];

const statsData = [
  { value: 100, suffix: "+", label: "Projects Vision", duration: 2000 },
  { value: 6, suffix: "+", label: "Service Lines", duration: 1200 },
  { value: 2019, suffix: "", label: "Est.", duration: 1800 },
  { value: 100, suffix: "%", label: "Delivery Focus", duration: 2000 },
];

function AnimatedNumber({ value, suffix, duration }: { value: number; suffix: string; duration: number }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const startVal = value === 2019 ? 2015 : 0;
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(startVal + (value - startVal) * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value, duration]);

  return <span ref={ref}>{display}{suffix}</span>;
}

export default function Vision() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-background">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8B0000]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#8B0000]/5 via-transparent to-[#1E3A8A]/5" />
        <div className="absolute inset-0 dot-grid opacity-20" />
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 rounded-full bg-[#8B0000]/8 blur-3xl" />
      <div className="absolute bottom-1/3 -right-32 w-96 h-96 rounded-full bg-[#1E3A8A]/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#8B0000]/30 bg-[#8B0000]/10 text-sm text-red-300/80 mb-6">
            Our North Star
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Vision &amp; <span className="gradient-text">Mission</span>
          </h2>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-20">
          {/* Left: Vision / Mission / Promise */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {[
              {
                icon: Eye,
                color: "text-red-400",
                bg: "bg-red-900/20",
                border: "border-[#8B0000]/30",
                title: "Our Vision",
                text: "To be the world&apos;s most trusted technology powerhouse, delivering enterprise solutions that rival the best globally. Built with precision, trusted worldwide.",
              },
              {
                icon: Target,
                color: "text-blue-400",
                bg: "bg-blue-900/20",
                border: "border-[#1E3A8A]/30",
                title: "Our Mission",
                text: "We empower organizations to drive decisions with data and technology, not guesswork. We don&apos;t consult. We deliver.",
              },
              {
                icon: CheckCircle2,
                color: "text-emerald-400",
                bg: "bg-emerald-900/20",
                border: "border-emerald-800/30",
                title: "Our Promise",
                text: "If we aren&apos;t the right fit, we&apos;ll tell you. We only take on work we can win. When we commit, we deliver with full accountability.",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                className={`glass-card rounded-2xl p-6 border ${item.border}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`shrink-0 w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center`}>
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="dark:text-gray-400 text-gray-600 text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: item.text.replace(/&apos;/g, "'") }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right: Values */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {values.map((val) => (
              <motion.div
                key={val.title}
                variants={itemVariants}
                className="glass-card rounded-2xl p-5 border border-white/5 hover:border-white/10 transition-all duration-300 group"
              >
                <div
                  className={`w-10 h-10 rounded-xl ${val.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <val.icon className="w-5 h-5" style={{ color: val.color }} />
                </div>
                <h4 className="text-base font-bold text-foreground mb-2">{val.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}

            {/* Tagline card */}
            <motion.div
              variants={itemVariants}
              className="col-span-2 glass-card rounded-2xl p-6 border border-[#8B0000]/20 bg-gradient-to-br from-[#8B0000]/10 to-[#1E3A8A]/5 text-center"
            >
              <p className="text-2xl font-bold text-foreground mb-1">
                &ldquo;Your Shortcut to Excellence&rdquo;
              </p>
              <p className="text-sm text-gray-500">The Apex Circuit Promise</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {statsData.map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="glass-card rounded-2xl p-6 text-center border border-white/5 hover:border-[#8B0000]/20 transition-all duration-300"
            >
              <div className="text-4xl font-bold gradient-text mb-2">
                <AnimatedNumber
                  value={stat.value}
                  suffix={stat.suffix}
                  duration={stat.duration}
                />
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
