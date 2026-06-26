"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, type Variants, AnimatePresence } from "framer-motion";
import { Cpu, Globe, Database, Map, Bot, BarChart3, Cloud, Server, GitBranch, TrendingUp, ShieldCheck, ArrowRight, X, ChevronLeft, ChevronRight } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Stacked offsets for each image layer (back to front)
const stackOffsets = [
  { rotate: -8, x: -14, y: 6,  scale: 0.82, zIndex: 1 },
  { rotate: -3, x:  -6, y: 2,  scale: 0.90, zIndex: 2 },
  { rotate:  3, x:   6, y: -2, scale: 0.95, zIndex: 3 },
  { rotate:  0, x:   0, y:  0, scale: 1.00, zIndex: 4 },
];

// ─── Lightbox ───────────────────────────────────────────────────────────────
function Lightbox({
  images,
  alt,
  initialIndex,
  onClose,
}: {
  images: string[];
  alt: string;
  initialIndex: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(initialIndex);

  const prev = useCallback(() => setCurrent((c) => (c - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % images.length), [images.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, prev, next]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="lightbox-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Counter */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 text-xs text-white/50 select-none">
          {current + 1} / {images.length}
        </div>

        {/* Main image */}
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-[90vw] max-w-4xl"
          style={{ aspectRatio: "16/10" }}
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={images[current]}
            alt={`${alt} ${current + 1}`}
            fill
            sizes="90vw"
            className="object-cover rounded-2xl shadow-2xl"
            priority
          />
        </motion.div>

        {/* Arrows */}
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Thumbnails */}
        <div
          className="absolute bottom-6 flex gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`relative w-14 h-9 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                i === current ? "border-white scale-110" : "border-white/20 opacity-50 hover:opacity-80"
              }`}
            >
              <Image src={src} alt="" fill sizes="56px" className="object-cover" />
            </button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

// ─── ImageMosaic ─────────────────────────────────────────────────────────────
function ImageMosaic({
  images,
  alt,
  color,
  onOpenGallery,
}: {
  images: string[];
  alt: string;
  color: string;
  onOpenGallery: (index: number) => void;
}) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const n = images.length;

  useEffect(() => {
    if (hovered) return;
    const id = setInterval(() => setActive((a) => (a + 1) % n), 2800);
    return () => clearInterval(id);
  }, [n, hovered]);

  const ordered = [
    images[(active + 1) % n],
    images[(active + 2) % n],
    images[(active + 3) % n],
    images[active],
  ];

  return (
    <div
      className="relative h-48 w-full flex items-center justify-center overflow-hidden select-none cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpenGallery(active)}
      title="Click to view gallery"
    >
      {/* Glow */}
      <div
        className="absolute w-48 h-32 rounded-2xl blur-2xl opacity-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(ellipse, ${color}80, transparent 70%)`,
          opacity: hovered ? 0.5 : 0.3,
        }}
      />

      {ordered.map((src, i) => {
        const off = stackOffsets[i];
        const isTop = i === 3;
        return (
          <motion.div
            key={src}
            animate={{
              rotate: off.rotate,
              x: off.x,
              y: isTop && hovered ? off.y - 6 : off.y,
              scale: isTop && hovered ? 1.08 : off.scale,
              zIndex: off.zIndex,
            }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="absolute rounded-xl overflow-hidden shadow-2xl border border-white/10"
            style={{ width: "68%", aspectRatio: "16/10" }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 768px) 90vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30 rounded-xl" />
            {/* Click hint on top card */}
            {isTop && hovered && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-xl">
                <span className="text-[10px] text-white/80 font-medium tracking-widest uppercase bg-black/40 px-3 py-1 rounded-full">
                  View Gallery
                </span>
              </div>
            )}
          </motion.div>
        );
      })}

      {/* Dot indicators */}
      <div className="absolute bottom-2 flex gap-1.5" style={{ zIndex: 10 }}>
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setActive(i); }}
            className="w-1.5 h-1.5 rounded-full transition-all duration-300"
            style={{
              background: i === active ? color : "rgba(255,255,255,0.25)",
              transform: i === active ? "scale(1.4)" : "scale(1)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Services data ────────────────────────────────────────────────────────────
const services = [
  {
    icon: Cpu,
    title: "Enterprise App Development",
    description:
      "Pro-level applications for large-scale enterprises. Scalable architectures, microservices, and battle-tested engineering for mission-critical systems.",
    color: "#8B0000",
    bg: "from-[#8B0000]/20 to-[#8B0000]/5",
    border: "border-[#8B0000]/20 hover:border-[#8B0000]/50",
    tags: ["Scalable", "Mission-Critical", "Full-Stack"],
    image: null,
    mosaicImages: [
      "/close-up-shot-man-using-tablet-data-center-ensuring-rigs-are-functioning.jpg",
      "/top-view-unrecognizable-hacker-performing-cyberattack-night.jpg",
      "/jolly-it-worker-using-computer-innovative-silicon-valley-workplace.jpg",
      "/programmer-night.jpg",
    ] as string[] | null,
  },
  {
    icon: Globe,
    title: "Web Development",
    description:
      "Premium, conversion-optimized websites and web applications. From landing pages to complex SaaS platforms. Built fast, built right.",
    color: "#2563EB",
    bg: "from-[#2563EB]/20 to-[#2563EB]/5",
    border: "border-[#2563EB]/20 hover:border-[#2563EB]/50",
    tags: ["Next.js", "React", "Performance"],
    image: null,
    mosaicImages: [
      "/representation-user-experience-interface-design.jpg",
      "/852.jpg",
      "/1720.jpg",
      "/html-css-collage-concept-with-person.jpg",
    ] as string[] | null,
  },
  {
    icon: Database,
    title: "ERP Systems",
    description:
      "ERPNext certified and customized to world-class standards. Full implementation, training, and ongoing support for your business operations.",
    color: "#7C3AED",
    bg: "from-[#7C3AED]/20 to-[#7C3AED]/5",
    border: "border-[#7C3AED]/20 hover:border-[#7C3AED]/50",
    tags: ["ERPNext", "Certified", "Custom Modules"],
    image: null,
    mosaicImages: [
      "/futuristic-technology-concept.jpg",
      "/busy-multicultural-diverse-employees-analysing-annual-financial-statistics-sitting-desk-front-laptop-holding-documents-searching-business-solutions-team-businesspeople-working-company.jpg",
      "/business-leader-trader-searching-new-investment-solution.jpg",
      "/data-center-admin-using-pc-find-misconfigurations.jpg",
    ],
  },
  {
    icon: Map,
    title: "GIS Development",
    description:
      "Geographic Information Systems and spatial analysis solutions. Custom mapping platforms, spatial databases, and remote sensing integrations.",
    color: "#059669",
    bg: "from-[#059669]/20 to-[#059669]/5",
    border: "border-[#059669]/20 hover:border-[#059669]/50",
    tags: ["Spatial Analysis", "QGIS", "Remote Sensing"],
    image: null,
    mosaicImages: [
      "/aerial-view-fussen-forggensee-germany.jpg",
      "/wireframe-terrain.jpg",
      "/view-land-plot-real-estate-business-development.jpg",
      "/aerial-view-crystal-palace-london-july-2008.jpg",
    ],
  },
  {
    icon: Bot,
    title: "AI & Automation",
    description:
      "Intelligent automation that transforms operations. From LLM integrations to custom ML pipelines, we embed AI where it creates real value.",
    color: "#0891B2",
    bg: "from-[#0891B2]/20 to-[#0891B2]/5",
    border: "border-[#0891B2]/20 hover:border-[#0891B2]/50",
    tags: ["LLMs", "ML Pipelines", "Workflow AI"],
    image: null,
    mosaicImages: [
      "/computer-scientist-updating-ai-systems.jpg",
      "/data-center-engineer-uses-ai-visualization-tool-laptop.jpg",
      "/digital-art-ai-technology-background.jpg",
      "/7076235.jpg",
    ],
  },
  {
    icon: BarChart3,
    title: "Project Management",
    description:
      "End-to-end project delivery with structured governance. We manage complexity, timelines, and stakeholders so your technology investments land on time.",
    color: "#D97706",
    bg: "from-[#D97706]/20 to-[#D97706]/5",
    border: "border-[#D97706]/20 hover:border-[#D97706]/50",
    tags: ["Agile", "Delivery", "Governance"],
    image: null,
    mosaicImages: [
      "/close-up-worktable-with-reports-plans.jpg",
      "/millennial-asia-businessmen-businesswomen-meeting-brainstorming-ideas-about-new-paperwork-project-colleagues-working-together-planning-success-strategy-enjoy-teamwork-small-modern-night-office.jpg",
      "/manager-analyzing-financial-growth-report-with-coworker.jpg",
      "/people-working-elegant-cozy-office.jpg",
    ],
  },
  {
    icon: Cloud,
    title: "Cloud Systems",
    description:
      "End-to-end cloud architecture, migration, and managed infrastructure across AWS, Azure, and Google Cloud. We design resilient, cost-optimised cloud environments built for enterprise scale and compliance.",
    color: "#0EA5E9",
    bg: "from-[#0EA5E9]/20 to-[#0EA5E9]/5",
    border: "border-[#0EA5E9]/20 hover:border-[#0EA5E9]/50",
    tags: ["AWS", "Azure", "GCP", "IaC", "Cost Optimisation"],
    image: null,
    mosaicImages: [
      "/close-up-data-center-computer-scientist-using-tablet-deploying-servers-network-hardware-it.jpg",
      "/close-up-shot-man-using-tablet-data-center-ensuring-rigs-are-functioning.jpg",
      "/data-center-admin-using-pc-find-misconfigurations.jpg",
      "/data-center-engineer-uses-ai-visualization-tool-laptop.jpg",
    ],
  },
  {
    icon: Server,
    title: "Enterprise Systems",
    description:
      "Integration, modernisation, and architecture of complex enterprise software landscapes. From legacy system migration to microservices decomposition, we make enterprise systems work the way your business needs them to.",
    color: "#6366F1",
    bg: "from-[#6366F1]/20 to-[#6366F1]/5",
    border: "border-[#6366F1]/20 hover:border-[#6366F1]/50",
    tags: ["System Integration", "Microservices", "API Design", "Modernisation"],
    image: null,
    mosaicImages: [
      "/futuristic-technology-concept.jpg",
      "/business-leader-trader-searching-new-investment-solution.jpg",
      "/abstract-technology-background.jpg",
      "/jolly-it-worker-using-computer-innovative-silicon-valley-workplace.jpg",
    ],
  },
  {
    icon: GitBranch,
    title: "DevOps",
    description:
      "CI/CD pipelines, containerisation, infrastructure as code, and automated testing frameworks. We reduce your time-to-deploy from weeks to minutes and ensure every release is production-safe.",
    color: "#F97316",
    bg: "from-[#F97316]/20 to-[#F97316]/5",
    border: "border-[#F97316]/20 hover:border-[#F97316]/50",
    tags: ["CI/CD", "Docker", "Kubernetes", "Terraform", "Monitoring"],
    image: null,
    mosaicImages: [
      "/programmer-night.jpg",
      "/top-view-unrecognizable-hacker-performing-cyberattack-night.jpg",
      "/jolly-it-worker-using-computer-innovative-silicon-valley-workplace.jpg",
      "/close-up-data-center-computer-scientist-using-tablet-deploying-servers-network-hardware-it.jpg",
    ],
  },
  {
    icon: TrendingUp,
    title: "Business Analysis",
    description:
      "Structured requirements gathering, process mapping, and gap analysis that bridges the gap between business stakeholders and engineering teams. We ensure the right thing is built — not just the thing that was asked for.",
    color: "#EC4899",
    bg: "from-[#EC4899]/20 to-[#EC4899]/5",
    border: "border-[#EC4899]/20 hover:border-[#EC4899]/50",
    tags: ["Requirements", "Process Mapping", "Stakeholder Mgmt", "Gap Analysis"],
    image: null,
    mosaicImages: [
      "/manager-analyzing-financial-growth-report-with-coworker.jpg",
      "/busy-multicultural-diverse-employees-analysing-annual-financial-statistics-sitting-desk-front-laptop-holding-documents-searching-business-solutions-team-businesspeople-working-company.jpg",
      "/close-up-worktable-with-reports-plans.jpg",
      "/millennial-asia-businessmen-businesswomen-meeting-brainstorming-ideas-about-new-paperwork-project-colleagues-working-together-planning-success-strategy-enjoy-teamwork-small-modern-night-office.jpg",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Quality Assurance",
    description:
      "Comprehensive test strategy, automated test frameworks, security reviews, and performance benchmarking. We embed quality from day one — not as a phase at the end — so systems ship with confidence.",
    color: "#10B981",
    bg: "from-[#10B981]/20 to-[#10B981]/5",
    border: "border-[#10B981]/20 hover:border-[#10B981]/50",
    tags: ["Automated Testing", "Security", "Performance", "Test Strategy"],
    image: null,
    mosaicImages: [
      "/data-center-engineer-uses-ai-visualization-tool-laptop.jpg",
      "/computer-scientist-updating-ai-systems.jpg",
      "/data-center-admin-using-pc-find-misconfigurations.jpg",
      "/top-view-unrecognizable-hacker-performing-cyberattack-night.jpg",
    ],
  },
];

// ─── Bento card layout config ─────────────────────────────────────────────────
const layoutConfig = [
  { span: "lg:col-span-2", featured: true,  horizontal: false }, // Enterprise App
  { span: "lg:col-span-1", featured: false, horizontal: false }, // Web Dev
  { span: "lg:col-span-1", featured: false, horizontal: false }, // ERP
  { span: "lg:col-span-1", featured: false, horizontal: false }, // GIS
  { span: "lg:col-span-1", featured: false, horizontal: false }, // AI
  { span: "lg:col-span-3", featured: false, horizontal: true  }, // PM
  { span: "lg:col-span-1", featured: false, horizontal: false }, // Cloud
  { span: "lg:col-span-1", featured: false, horizontal: false }, // Enterprise Systems
  { span: "lg:col-span-1", featured: false, horizontal: false }, // DevOps
  { span: "lg:col-span-1", featured: false, horizontal: false }, // Business Analysis
  { span: "lg:col-span-2", featured: false, horizontal: false }, // QA
];

// ─── Main component ───────────────────────────────────────────────────────────
export default function Services() {
  const [gallery, setGallery] = useState<{ images: string[]; alt: string; index: number } | null>(null);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative py-28 sm:py-36 bg-background overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2563EB]/40 to-transparent" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#1E3A8A]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#8B0000]/8 blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2563EB]/30 bg-[#2563EB]/10 text-sm dark:text-blue-300/80 text-blue-700 mb-6">
            What We Build
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground leading-tight tracking-tight mb-5">
            Eleven capabilities.<br />
            <span className="gradient-text-blue">Endless possibilities.</span>
          </h2>
          <p className="dark:text-gray-400 text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            From enterprise software to cloud infrastructure, GIS, and AI automation — we cover the full
            spectrum of modern technology needs.
          </p>
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 mt-12 max-w-lg mx-auto">
            {[
              { value: "11", label: "Core Services" },
              { value: "8+", label: "Projects Delivered" },
              { value: "100%", label: "Delivery Focus" },
            ].map((s) => (
              <div key={s.label} className="glass-card rounded-xl p-4 text-center border border-white/5">
                <div className="text-2xl font-bold gradient-text">{s.value}</div>
                <div className="text-xs text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Bento Grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid lg:grid-cols-3 gap-4 sm:gap-5"
        >
          {services.map((service, idx) => {
            const layout = layoutConfig[idx];
            const num = String(idx + 1).padStart(2, "0");

            // ── Horizontal (PM full-width) card ──
            if (layout.horizontal) {
              return (
                <motion.div
                  key={service.title}
                  variants={cardVariants}
                  className={`${layout.span} group relative glass-card rounded-2xl overflow-hidden`}
                  style={{ border: `1px solid ${service.color}18` }}
                  whileHover={{ borderColor: `${service.color}40` }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Top accent line */}
                  <div className="h-[1px] w-full" style={{ background: `linear-gradient(90deg, ${service.color}, transparent 60%)` }} />

                  <div className="flex flex-col md:flex-row">
                    {/* Mosaic side */}
                    <div className="md:w-2/5 flex-shrink-0">
                      {service.mosaicImages && (
                        <ImageMosaic
                          images={service.mosaicImages}
                          alt={service.title}
                          color={service.color}
                          onOpenGallery={(index) =>
                            setGallery({ images: service.mosaicImages!, alt: service.title, index })
                          }
                        />
                      )}
                    </div>

                    {/* Content side */}
                    <div className="relative md:w-3/5 p-7 md:p-10 flex flex-col justify-between">
                      {/* Background number */}
                      <span className="card-number absolute top-4 right-6 select-none">{num}</span>

                      <div>
                        <div className="flex items-center gap-3 mb-5">
                          <div
                            className="inline-flex w-9 h-9 items-center justify-center rounded-lg"
                            style={{ background: `${service.color}18`, border: `1px solid ${service.color}25` }}
                          >
                            <service.icon className="w-4 h-4" style={{ color: service.color }} />
                          </div>
                          <span className="text-[10px] uppercase tracking-[0.2em] font-semibold" style={{ color: service.color }}>
                            {num} · Project Management
                          </span>
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-black text-foreground mb-3 leading-tight">
                          {service.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-lg">
                          {service.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-8">
                          {service.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide"
                              style={{
                                background: `${service.color}12`,
                                color: service.color,
                                border: `1px solid ${service.color}20`,
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={scrollToContact}
                        className="self-start flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest transition-all duration-300 group/btn"
                        style={{ color: service.color }}
                      >
                        Start a Project
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            }

            // ── Standard card ──
            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                className={`${layout.span} group relative glass-card rounded-2xl overflow-hidden flex flex-col`}
                style={{ border: `1px solid ${service.color}18` }}
                whileHover={{ borderColor: `${service.color}40`, y: -4 }}
                transition={{ duration: 0.3 }}
              >
                {/* Top accent line */}
                <div className="h-[1px] w-full flex-shrink-0" style={{ background: `linear-gradient(90deg, ${service.color}, transparent 60%)` }} />

                {/* Hover bg */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at top left, ${service.color}08, transparent 70%)` }}
                />

                {/* Mosaic */}
                {service.mosaicImages && (
                  <ImageMosaic
                    images={service.mosaicImages}
                    alt={service.title}
                    color={service.color}
                    onOpenGallery={(index) =>
                      setGallery({ images: service.mosaicImages!, alt: service.title, index })
                    }
                  />
                )}
                {service.image && !service.mosaicImages && (
                  <div className={`relative ${layout.featured ? "h-56" : "h-44"} w-full overflow-hidden flex-shrink-0`}>
                    <Image src={service.image} alt={service.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-[#0D0D14]/80" />
                  </div>
                )}

                {/* Content */}
                <div className="relative flex flex-col flex-1 p-6 sm:p-7">
                  {/* Background number */}
                  <span className="card-number absolute top-2 right-4 select-none">{num}</span>

                  {/* Label + Icon row */}
                  <div className="flex items-center gap-2.5 mb-5">
                    <div
                      className="inline-flex w-8 h-8 items-center justify-center rounded-lg flex-shrink-0"
                      style={{ background: `${service.color}18`, border: `1px solid ${service.color}25` }}
                    >
                      <service.icon className="w-3.5 h-3.5" style={{ color: service.color }} />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.18em] font-semibold" style={{ color: service.color }}>
                      {num}
                    </span>
                  </div>

                  <h3 className={`font-black text-foreground mb-2.5 leading-tight ${layout.featured ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"}`}>
                    {service.title}
                  </h3>

                  <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1 group-hover:text-gray-400 transition-colors">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide"
                        style={{
                          background: `${service.color}10`,
                          color: service.color,
                          border: `1px solid ${service.color}18`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={scrollToContact}
                    className="self-start flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest transition-all duration-300 group/btn"
                    style={{ color: service.color }}
                  >
                    Get Started
                    <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t dark:border-white/5 border-black/5"
        >
          <p className="text-gray-500 text-sm">
            Don&apos;t see exactly what you need? Let&apos;s talk.
          </p>
          <button
            onClick={scrollToContact}
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#8B0000] to-[#A52020] text-white font-bold text-[12px] uppercase tracking-widest hover:from-[#A52020] hover:to-[#DC2626] transition-all duration-300 shadow-xl shadow-red-900/20 hover:-translate-y-0.5"
          >
            Discuss Your Project
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      </div>

      {/* Lightbox */}
      {gallery && (
        <Lightbox
          images={gallery.images}
          alt={gallery.alt}
          initialIndex={gallery.index}
          onClose={() => setGallery(null)}
        />
      )}
    </section>
  );
}
