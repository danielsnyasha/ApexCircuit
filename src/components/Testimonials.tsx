"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Quote, ChevronLeft, ChevronRight, Star, Building2, HeartPulse, Landmark, ShoppingCart, Truck, Home, Factory, Zap, GraduationCap, Leaf, Pickaxe, Globe } from "lucide-react";

const sectors = [
  { name: "Banking & Finance",    icon: Building2,    color: "#2563EB" },
  { name: "Healthcare",           icon: HeartPulse,   color: "#DC2626" },
  { name: "Government",           icon: Landmark,     color: "#7C3AED" },
  { name: "Retail & E-commerce",  icon: ShoppingCart, color: "#D97706" },
  { name: "Logistics",            icon: Truck,        color: "#059669" },
  { name: "Real Estate",          icon: Home,         color: "#0891B2" },
  { name: "Manufacturing",        icon: Factory,      color: "#6B7280" },
  { name: "Energy & Utilities",   icon: Zap,          color: "#F59E0B" },
  { name: "Education",            icon: GraduationCap,color: "#8B5CF6" },
  { name: "Agriculture",          icon: Leaf,         color: "#16A34A" },
  { name: "Mining & Resources",   icon: Pickaxe,      color: "#92400E" },
  { name: "NGO & Development",    icon: Globe,        color: "#0E7490" },
];

const testimonials = [
  {
    quote:
      "Apex Circuit delivered our digital tipping platform end-to-end in 14 weeks. The team's technical depth is exceptional. They handled a complex multi-portal architecture and third-party payment integration without a single missed milestone. Post-launch support has been outstanding.",
    name: "Isaac Noah",
    role: "Chief Technology Officer",
    company: "PaySwift Africa",
    sector: "FinTech",
    photo: "https://i.pravatar.cc/150?img=59",
    gradient: "from-[#1E3A8A] to-[#2563EB]",
    accent: "#2563EB",
  },
  {
    quote:
      "We had a 15-year-old ERP running on a system three vendors had given up on. Apex Circuit understood our requirements in the first session and delivered a fully customised ERPNext implementation with custom doctypes, automated bank reconciliation, and a management dashboard within 3 months. Remarkable.",
    name: "David Osei-Bonsu",
    role: "Head of Operations",
    company: "Osei Industrial Group",
    sector: "Manufacturing",
    photo: "https://randomuser.me/api/portraits/men/55.jpg",
    gradient: "from-[#7C3AED] to-[#A78BFA]",
    accent: "#7C3AED",
  },
  {
    quote:
      "The GIS platform Apex Circuit built for our land management division handles thousands of spatial records across three provinces. The Mapbox integration, PostGIS queries, and the QGIS workflow they designed are production-grade and our team adopted it within days of go-live.",
    name: "Grace Chikwanda",
    role: "Digital Transformation Lead",
    company: "Ministry of Lands",
    sector: "Government",
    photo: "https://randomuser.me/api/portraits/women/62.jpg",
    gradient: "from-[#059669] to-[#10B981]",
    accent: "#059669",
  },
  {
    quote:
      "Our React Native field force app now handles 500+ field agents across five regions. Apex Circuit designed the offline-first architecture, biometric auth, and the sync engine. The 82%+ test coverage they delivered gave our QA team confidence we had never had on a mobile project before.",
    name: "Amara Diallo",
    role: "VP Engineering",
    company: "FieldForce Solutions",
    sector: "Enterprise",
    photo: "https://randomuser.me/api/portraits/women/89.jpg",
    gradient: "from-[#8B0000] to-[#DC2626]",
    accent: "#DC2626",
  },
  {
    quote:
      "We needed an AI quoting engine that could cut material waste and speed up our sales cycle. Apex Circuit built exactly that: an ML nesting algorithm integrated into a seamless Next.js front-end. 20% waste reduction and 50% faster quotes from day one. ROI was evident within weeks.",
    name: "Stefan Vogt",
    role: "Managing Director",
    company: "Vogt Fabrication GmbH",
    sector: "Industrial",
    photo: "https://randomuser.me/api/portraits/men/75.jpg",
    gradient: "from-[#D97706] to-[#F59E0B]",
    accent: "#D97706",
  },
  {
    quote:
      "Apex Circuit redesigned and rebuilt our entire property portal from the ground up. The interactive maps, advanced search, and agent CRM they built are enterprise-grade. The site performs brilliantly on mobile, and our leads have increased measurably since launch.",
    name: "Priya Sharma",
    role: "Product Director",
    company: "Landmark Properties",
    sector: "PropTech",
    photo: "https://randomuser.me/api/portraits/women/19.jpg",
    gradient: "from-[#0891B2] to-[#06B6D4]",
    accent: "#0891B2",
  },
];

function StarRow() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive((a) => (a + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, [paused]);

  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((a) => (a + 1) % testimonials.length);

  return (
    <section className="relative py-24 sm:py-32 bg-background-alt overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2563EB]/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Industries We Serve ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2563EB]/30 bg-[#2563EB]/10 text-sm dark:text-blue-300/80 text-blue-700 mb-6">
            Industries We Serve
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-5 tracking-tight">
            Built for every{" "}
            <span className="gradient-text-blue">sector</span>
          </h2>
          <p className="dark:text-gray-400 text-gray-600 text-base max-w-xl mx-auto">
            Domain-aware engineering across twelve industries. We speak your language before we write your code.
          </p>
        </motion.div>

        {/* Sectors grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-20"
        >
          {sectors.map((sector, i) => (
            <motion.div
              key={sector.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group flex flex-col items-center gap-2 py-4 px-3 rounded-2xl border dark:border-white/5 border-black/5 dark:bg-white/[0.02] bg-white/50 dark:hover:border-white/15 dark:hover:bg-white/[0.04] hover:border-black/10 hover:bg-white/80 transition-all duration-300 cursor-default"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${sector.color}18`, border: `1px solid ${sector.color}25` }}
              >
                <sector.icon className="w-4 h-4" style={{ color: sector.color }} />
              </div>
              <span className="text-[11px] font-medium dark:text-gray-400 text-gray-600 text-center leading-tight dark:group-hover:text-white group-hover:text-gray-900 transition-colors">
                {sector.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Testimonials ── */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#8B0000]/30 bg-[#8B0000]/10 text-sm dark:text-red-300/80 text-red-700 mb-4">
            Client Testimonials
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
            What clients say about <span className="gradient-text">our work</span>
          </h2>
        </div>

        {/* Avatar selector row */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {testimonials.map((t, i) => (
            <button
              key={i}
              onClick={() => { setActive(i); setPaused(true); }}
              className={`relative transition-all duration-300 ${i === active ? "scale-110" : "opacity-50 hover:opacity-80 hover:scale-105"}`}
            >
              <div
                className={`w-14 h-14 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${i === active ? "border-white shadow-lg" : "border-white/10"}`}
                style={i === active ? { boxShadow: `0 0 16px ${t.accent}70` } : {}}
              >
                <Image
                  src={t.photo}
                  alt={t.name}
                  width={56}
                  height={56}
                  className="w-full h-full object-cover object-top"
                  unoptimized
                />
              </div>
              {i === active && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white" />
              )}
            </button>
          ))}
        </div>

        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Card */}
          <div className="relative glass-card rounded-3xl border border-white/5 overflow-hidden">
            {/* Gradient top accent */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="h-1 w-full"
                style={{ background: `linear-gradient(90deg, ${testimonials[active].accent}, transparent 70%)` }}
              />
            </AnimatePresence>

            <div className="p-8 sm:p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <Quote className="w-10 h-10 text-white/10 mb-6" />

                  <p className="text-foreground text-base sm:text-lg leading-relaxed font-medium mb-8">
                    &ldquo;{testimonials[active].quote}&rdquo;
                  </p>

                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 border-2"
                        style={{ borderColor: `${testimonials[active].accent}50` }}
                      >
                        <Image
                          src={testimonials[active].photo}
                          alt={testimonials[active].name}
                          width={56}
                          height={56}
                          className="w-full h-full object-cover object-top"
                          unoptimized
                        />
                      </div>
                      <div>
                        <p className="text-foreground font-bold text-sm">{testimonials[active].name}</p>
                        <p className="text-xs dark:text-gray-400 text-gray-600">{testimonials[active].role}</p>
                        <p className="text-xs dark:text-gray-600 text-gray-500 mb-1">{testimonials[active].company}</p>
                        <StarRow />
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold px-3 py-1 rounded-full dark:bg-white/5 dark:border-white/10 dark:text-gray-400 bg-black/5 border border-black/10 text-gray-600">
                      {testimonials[active].sector}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={prev}
              className="p-2.5 rounded-xl border dark:border-white/10 dark:text-gray-400 dark:hover:text-white dark:hover:border-white/20 border-black/10 text-gray-600 hover:text-gray-900 hover:border-black/20 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === active ? "w-6 h-2 dark:bg-white bg-gray-800" : "w-2 h-2 dark:bg-white/20 bg-black/20 dark:hover:bg-white/40 hover:bg-black/40"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2.5 rounded-xl border dark:border-white/10 dark:text-gray-400 dark:hover:text-white dark:hover:border-white/20 border-black/10 text-gray-600 hover:text-gray-900 hover:border-black/20 transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
