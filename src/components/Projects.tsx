"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Layers,
  Cpu,
  ShoppingBag,
  MapPin,
  Zap,
  Smartphone,
  BarChart3,
  Globe,
  Truck,
  BookOpen,
  X,
  Target,
  Lightbulb,
  TrendingUp,
} from "lucide-react";

interface CaseStudy {
  challenge: string;
  approach: string;
  outcome: string;
}

interface Project {
  id: string;
  name: string;
  period: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
  tagline: string;
  description: string;
  stack: string[];
  metrics: { value: string; label: string }[];
  gradient: string;
  glow: string;
  border: string;
  accent: string;
  caseStudy: CaseStudy;
}

const projects: Project[] = [
  {
    id: "01",
    name: "Enterprise Field Force Platform",
    period: "2025 – Present",
    category: "Enterprise Mobile",
    icon: Smartphone,
    image: "/close-up-shot-man-using-tablet-data-center-ensuring-rigs-are-functioning.jpg",
    tagline: "Cross-platform mobile platform for enterprise field teams: 7 integrated modules, offline-first, biometric auth.",
    description:
      "Architected a large-scale enterprise field force management platform serving corporate clients across multiple regions. Built a modular React Native application with 7 tightly integrated modules covering Calendar, Authentication, Payments, Document Management, Campaigns, Dashboard, and Profile. Implemented offline-first capabilities with seamless real-time synchronisation, biometric authentication, and push notification handling. Championed test-driven development using Jest, Playwright, and React Testing Library, achieving 82.9% end-to-end coverage and cutting bug resolution time by 60%.",
    stack: ["React Native", "Expo", "TypeScript", "Redux Toolkit", "Jest", "Playwright", "Azure DevOps", "Node.js"],
    metrics: [
      { value: "78%", label: "Legacy Modernised" },
      { value: "82.9%", label: "E2E Test Coverage" },
      { value: "7", label: "Integrated Modules" },
      { value: "60%", label: "Faster Bug Fixes" },
    ],
    gradient: "from-[#8B0000] to-[#DC2626]",
    glow: "shadow-red-900/30",
    border: "border-red-800/30",
    accent: "dark:text-red-400 text-red-600",
    caseStudy: {
      challenge: "A large enterprise needed to replace fragmented legacy mobile tools used by 500+ field agents across five regions — tools that couldn't work offline, had no centralised auth, and produced unreliable data due to sync failures.",
      approach: "We architected an offline-first React Native platform with 7 tightly integrated modules. Redux Toolkit managed shared state, a custom sync engine handled conflict resolution, and biometric authentication replaced vulnerable password flows. Jest + Playwright test suites were introduced from sprint one.",
      outcome: "82.9% end-to-end test coverage. 60% reduction in bug resolution time. 78% of legacy functionality modernised within the engagement. The platform is now the primary operational tool for the entire field workforce.",
    },
  },
  {
    id: "02",
    name: "Digital Tipping & Payments Platform",
    period: "2025 – Present",
    category: "FinTech SaaS",
    icon: Zap,
    image: "/desola-lanre-ologun-kwzWjTnDPLk-unsplash.jpg",
    tagline: "Multi-portal contactless tipping SaaS: mobile app, customer portal, and operator dashboard in one ecosystem.",
    description:
      "Built an end-to-end multi-portal SaaS platform enabling contactless digital tipping across a nationwide network of service workers. Delivered three integrated applications: a consumer-facing Mobile App, a Customer Portal, and an Operator Admin Dashboard, covering onboarding, real-time payouts, and business analytics. Integrated a third-party payment gateway with webhook handling and real-time notifications, cutting payout processing time by 80%. Designed scalable RESTful APIs powering 80+ endpoints with sub-200ms response times under production load.",
    stack: ["React 18", "Node.js", "Express.js", "PostgreSQL", "Prisma ORM", "Payment Gateway API", "TanStack Query"],
    metrics: [
      { value: "500+", label: "Active Users" },
      { value: "3", label: "Integrated Portals" },
      { value: "80%", label: "Payout Time Cut" },
      { value: "80+", label: "API Endpoints" },
    ],
    gradient: "from-[#1E3A8A] to-[#2563EB]",
    glow: "shadow-blue-900/30",
    border: "border-blue-800/30",
    accent: "dark:text-blue-400 text-blue-600",
    caseStudy: {
      challenge: "A hospitality-sector client needed a modern digital tipping ecosystem to replace cash gratuities — covering consumer mobile payments, a worker-facing app, and a business operations dashboard — all talking to a single payment backend.",
      approach: "We built three integrated portals from a shared API layer: a React 18 consumer app, an operator dashboard with real-time analytics, and a worker portal for payout tracking. Payment webhook handling with idempotency keys ensured zero duplicate payouts. 80+ RESTful endpoints were designed contract-first.",
      outcome: "500+ active users within 90 days. 80% reduction in payout processing time. Sub-200ms API response times under production load. Three portals shipped within a single 14-week engagement.",
    },
  },
  {
    id: "03",
    name: "Luxury Retail E-commerce Platform",
    period: "2020 – 2021",
    category: "E-commerce",
    icon: ShoppingBag,
    image: "/compagnons-Fa9b57hffnM-unsplash.jpg",
    tagline: "High-performance luxury e-commerce for a London-based retail group: 99.9% uptime, thousands of daily transactions.",
    description:
      "Developed a high-performance e-commerce platform for a London-based luxury retail group. Implemented server-side rendering and static site generation for strong SEO performance, personalised shopping experiences driven by user behaviour data, real-time inventory management across multiple product lines, and multi-gateway payment processing supporting card and alternative payment methods. Delivered in a fully containerised production environment, sustaining 99.9% uptime at thousands of daily transactions during peak periods.",
    stack: ["Next.js", "React", "Django REST Framework", "PostgreSQL", "GraphQL", "Redis", "Docker"],
    metrics: [
      { value: "99.9%", label: "Uptime" },
      { value: "1000s", label: "Daily Transactions" },
      { value: "SSR/SSG", label: "SEO Optimised" },
      { value: "Multi-GW", label: "Payment Methods" },
    ],
    gradient: "from-[#059669] to-[#10B981]",
    glow: "shadow-green-900/30",
    border: "border-green-800/30",
    accent: "dark:text-green-400 text-green-600",
    caseStudy: {
      challenge: "A London luxury retail group had an outdated e-commerce platform unable to sustain peak traffic, with poor SEO and no personalisation capabilities — costing measurable revenue during high-demand periods.",
      approach: "We rebuilt the platform on Next.js with SSR and SSG, redesigned the product catalogue with schema-based SEO, implemented Redis caching for high-traffic product pages, and integrated multi-gateway checkout. Containerised with Docker for consistent deployments.",
      outcome: "99.9% uptime during peak trading. Thousands of daily transactions without degradation. Significant SEO improvement through structured data implementation. Whole platform rebuilt and relaunched within 18 weeks.",
    },
  },
  {
    id: "04",
    name: "Industrial IoT Asset Management",
    period: "2023 – Present",
    category: "IoT & GIS",
    icon: MapPin,
    image: "/futuristic-technology-concept.jpg",
    tagline: "Real-time IoT sensor and geospatial asset tracking platform for heavy manufacturing operations.",
    description:
      "Architected a real-time asset management platform integrating live IoT sensor data and geospatial tracking for a large-scale manufacturing facility. Built a responsive operational dashboard using Next.js SSR/SSG with real-time data streaming via WebSockets, enabling plant operators to monitor equipment health and location at a glance. Developed predictive maintenance algorithms that surface anomaly signals before failures occur, reducing unplanned downtime. Deployed on AWS with EC2, S3, and Lambda for scalable serverless processing. Cut dashboard page load times by 45% through code splitting, caching, and CDN optimisation.",
    stack: ["Next.js", "Django", "MongoDB", "AWS EC2/S3/Lambda", "WebSockets", "IoT Integration", "PostGIS"],
    metrics: [
      { value: "45%", label: "Load Time Reduced" },
      { value: "Real-time", label: "IoT Streaming" },
      { value: "AWS", label: "Cloud Infrastructure" },
      { value: "Predictive", label: "Maintenance AI" },
    ],
    gradient: "from-[#D97706] to-[#F59E0B]",
    glow: "shadow-yellow-900/30",
    border: "border-yellow-800/30",
    accent: "dark:text-yellow-400 text-yellow-600",
    caseStudy: {
      challenge: "A large manufacturing facility was managing critical equipment with no real-time visibility, relying on spreadsheets and manual walkarounds. Unplanned downtime was causing significant production losses.",
      approach: "We built a real-time operational dashboard ingesting live IoT sensor feeds via WebSockets, overlaid on a geospatial map of the facility. Predictive maintenance ML models analysed vibration and temperature anomalies. Deployed on AWS with Lambda for serverless sensor event processing.",
      outcome: "45% reduction in dashboard load time. Real-time visibility across all monitored assets. Predictive alerts now surface failures 48–72 hours before they occur. AWS infrastructure costs optimised by 30% through right-sizing.",
    },
  },
  {
    id: "05",
    name: "AI Auto Quoting & Estimation System",
    period: "2024 – 2025",
    category: "AI & Automation",
    icon: Cpu,
    image: "/digital-art-ai-technology-background.jpg",
    tagline: "ML-driven nesting and estimation engine: 20% material waste cut, 50% faster sales cycles.",
    description:
      "Developed an intelligent quoting and estimation system leveraging AI-driven nesting algorithms to optimise material cutting patterns for industrial fabrication. The ML model analyses job parameters and automatically computes the most efficient layout, reducing material waste by 20%. Built an automated end-to-end pipeline for quote generation, high-fidelity PDF rendering, and transactional email delivery, eliminating manual quoting effort and decreasing sales cycle time by 50%. Integrated a serverless database for low-latency data access and a cloud media platform for asset management at scale.",
    stack: ["Next.js", "Python", "MongoDB", "Neon Database", "Machine Learning", "Cloudinary", "FastAPI"],
    metrics: [
      { value: "20%", label: "Material Waste Cut" },
      { value: "50%", label: "Sales Cycle Reduced" },
      { value: "Auto", label: "PDF Generation" },
      { value: "ML", label: "Nesting Algorithm" },
    ],
    gradient: "from-[#7C3AED] to-[#A78BFA]",
    glow: "shadow-purple-900/30",
    border: "border-purple-800/30",
    accent: "dark:text-purple-400 text-purple-700",
    caseStudy: {
      challenge: "An industrial fabrication business was losing 20-25% of material per job due to inefficient manual nesting, and sales cycles stretched to 5+ days because quotes were produced by hand by a single estimator.",
      approach: "We developed an ML nesting engine in Python/FastAPI that analyses job parameters and computes optimal cutting layouts automatically. The Next.js front-end integrates the engine in real-time, generates high-fidelity PDF quotes on-demand, and dispatches them via automated transactional email. Cloudinary handles all asset management at scale.",
      outcome: "20% material waste reduction from day one. Sales cycle cut from 5 days to under 24 hours. The estimator now oversees 4x more quotes per day. ROI on the project was evident within the first quarter of operation.",
    },
  },
  {
    id: "06",
    name: "ERP Business Management Platform",
    period: "2022 – 2023",
    category: "ERP & Operations",
    icon: BarChart3,
    image: "/geralt-project-management-7140607_1920.jpg",
    tagline: "Full ERPNext implementation across finance, procurement, HR, and inventory for a mid-size manufacturing business.",
    description:
      "Led end-to-end implementation of a fully customised ERPNext platform for a mid-size manufacturing and distribution business. Configured and extended modules covering Accounts, Procurement, Sales, Inventory, Manufacturing, HR, and Payroll. Developed custom Frappe doctypes, scripts, and print formats to match the client's operational workflows. Built a real-time management dashboard surfacing KPIs across departments, integrated with third-party logistics and banking APIs for automated reconciliation. Delivered comprehensive user training and post-go-live support, achieving full adoption within 6 weeks.",
    stack: ["ERPNext", "Frappe Framework", "Python", "MariaDB", "REST APIs", "JavaScript", "Docker"],
    metrics: [
      { value: "7", label: "ERP Modules Live" },
      { value: "6 wks", label: "Full Adoption" },
      { value: "Auto", label: "Bank Reconciliation" },
      { value: "100%", label: "Process Coverage" },
    ],
    gradient: "from-[#0891B2] to-[#06B6D4]",
    glow: "shadow-cyan-900/30",
    border: "border-cyan-800/30",
    accent: "dark:text-cyan-400 text-cyan-700",
    caseStudy: {
      challenge: "A mid-size manufacturing and distribution business was running operations across 7 disconnected systems — separate tools for accounts, procurement, inventory, HR, and payroll with no integration and significant manual reconciliation overhead.",
      approach: "We led a full ERPNext implementation: configuring all core modules, building custom Frappe doctypes for industry-specific workflows, developing automated bank reconciliation via banking API integration, and creating a real-time KPI dashboard for management. User training was embedded into every sprint.",
      outcome: "Full adoption by the entire organisation within 6 weeks of go-live. 7 ERP modules live and integrated. Manual reconciliation effort eliminated. Management now has a real-time view of operations across every department.",
    },
  },
  {
    id: "07",
    name: "Property & Real Estate Portal",
    period: "2023 – 2024",
    category: "PropTech",
    icon: Globe,
    image: "/wireframe-terrain.jpg",
    tagline: "Full-stack property search and listing platform with interactive maps, filters, and agent dashboards.",
    description:
      "Designed and built a full-featured property listing and search portal serving buyers, sellers, and estate agents. Integrated interactive map search using Mapbox GL JS and PostGIS spatial queries, allowing users to search by drawn boundary, radius, or neighbourhood polygon. Implemented advanced filtering by price, property type, size, and school catchment zones. Built separate agent and admin dashboards for listing management, lead tracking, and performance analytics. Optimised for SEO with dynamic metadata, structured data (JSON-LD), and a sub-1s Largest Contentful Paint score on mobile.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "PostGIS", "Mapbox GL JS", "Prisma ORM", "Vercel"],
    metrics: [
      { value: "Sub-1s", label: "Mobile LCP" },
      { value: "Spatial", label: "Map Search" },
      { value: "3", label: "User Dashboards" },
      { value: "JSON-LD", label: "Structured SEO" },
    ],
    gradient: "from-[#DB2777] to-[#EC4899]",
    glow: "shadow-pink-900/30",
    border: "border-pink-800/30",
    accent: "dark:text-pink-400 text-pink-700",
    caseStudy: {
      challenge: "A property group's existing listing website had no map-based search, poor mobile performance, and no way for agents to manage their own listings — causing them to lose leads to competitors with better digital experiences.",
      approach: "We rebuilt the portal from scratch with Next.js, Mapbox GL JS for boundary-based map search, and PostGIS spatial queries for school catchment and proximity filtering. Separate authenticated dashboards were built for buyers, agents, and admins. JSON-LD structured data was implemented throughout for SEO.",
      outcome: "Sub-1s Largest Contentful Paint on mobile. Three fully functional user dashboards launched simultaneously. Significant increase in inbound leads from organic search within 60 days. Agents now self-manage all listings without admin intervention.",
    },
  },
  {
    id: "08",
    name: "Logistics & Fleet Management System",
    period: "2021 – 2022",
    category: "Logistics & Tracking",
    icon: Truck,
    image: "/close-up-data-center-computer-scientist-using-tablet-deploying-servers-network-hardware-it.jpg",
    tagline: "Live fleet tracking, route optimisation, and driver management for a regional logistics operator.",
    description:
      "Built a comprehensive fleet management and logistics platform for a regional transport operator managing a fleet of 120+ vehicles. Implemented real-time GPS vehicle tracking on an interactive map dashboard, automated route optimisation using spatial algorithms, and live driver status updates. Developed a mobile app for drivers covering job assignment, proof of delivery capture, and trip logging. Integrated with warehouse management systems via REST APIs and built automated reporting for fleet utilisation, fuel consumption, and on-time delivery rates, improving delivery efficiency by 35%.",
    stack: ["React.js", "Node.js", "PostgreSQL", "PostGIS", "React Native", "WebSockets", "AWS", "Mapbox GL JS"],
    metrics: [
      { value: "120+", label: "Vehicles Tracked" },
      { value: "35%", label: "Delivery Efficiency" },
      { value: "Live", label: "GPS Tracking" },
      { value: "Auto", label: "Route Optimisation" },
    ],
    gradient: "from-[#374151] to-[#6B7280]",
    glow: "shadow-gray-900/30",
    border: "border-gray-700/30",
    accent: "dark:text-gray-400 text-gray-600",
    caseStudy: {
      challenge: "A regional logistics operator managing 120+ vehicles had no digital visibility into fleet location, driver status, or route efficiency — relying entirely on phone calls and paper-based job cards to manage daily operations.",
      approach: "We built a real-time fleet management platform with live GPS tracking on an interactive Mapbox dashboard, automated route optimisation using PostGIS spatial algorithms, and a React Native driver app for job assignment and proof of delivery. REST API integration connected the platform to the existing warehouse management system.",
      outcome: "120+ vehicles tracked in real-time from a single dashboard. 35% improvement in on-time delivery rates. Paper job cards fully replaced by digital workflows. Fuel consumption reporting automated, saving significant management overhead monthly.",
    },
  },
];

// ─── Case Study Drawer ────────────────────────────────────────────────────────
function CaseStudyDrawer({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[8000] bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 280 }}
        className="fixed right-0 top-0 bottom-0 z-[8001] w-full max-w-xl dark:bg-[#13131E] bg-white dark:border-white/10 border-black/10 border-l overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`relative h-36 overflow-hidden flex-shrink-0`}>
          <Image src={project.image} alt={project.name} fill sizes="560px" className="object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#13131E] via-[#13131E]/60 to-transparent" />
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-15`} />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-4 left-6 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center shadow-lg`}>
              <project.icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className={`text-[10px] font-semibold uppercase tracking-wider ${project.accent}`}>{project.category}</p>
              <h3 className="text-white font-bold text-base leading-tight">{project.name}</h3>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          {/* Badge row */}
          <div className="flex flex-wrap gap-2">
            <span className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400">{project.period}</span>
            <span className={`text-[10px] px-2.5 py-1 rounded-full border ${project.border} ${project.accent} bg-white/[0.02]`}>
              Case Study
            </span>
          </div>

          {/* Challenge */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg dark:bg-red-900/20 bg-red-50 flex items-center justify-center">
                <Target className="w-3.5 h-3.5 dark:text-red-400 text-red-600" />
              </div>
              <h4 className="text-sm font-bold text-foreground">The Challenge</h4>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">{project.caseStudy.challenge}</p>
          </div>

          {/* Approach */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg dark:bg-blue-900/20 bg-blue-50 flex items-center justify-center">
                <Lightbulb className="w-3.5 h-3.5 dark:text-blue-400 text-blue-600" />
              </div>
              <h4 className="text-sm font-bold text-foreground">Our Approach</h4>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">{project.caseStudy.approach}</p>
          </div>

          {/* Outcome */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg dark:bg-green-900/20 bg-green-50 flex items-center justify-center">
                <TrendingUp className="w-3.5 h-3.5 dark:text-green-400 text-green-600" />
              </div>
              <h4 className="text-sm font-bold text-foreground">The Outcome</h4>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">{project.caseStudy.outcome}</p>
          </div>

          {/* Metrics */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-600 mb-3">Key Results</p>
            <div className="grid grid-cols-2 gap-3">
              {project.metrics.map((m) => (
                <div key={m.label} className={`rounded-xl p-4 bg-white/[0.03] border ${project.border} text-center`}>
                  <div className={`text-xl font-black ${project.accent}`}>{m.value}</div>
                  <div className="text-[11px] text-gray-500 mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-600 mb-3">Tech Stack</p>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <span key={tech} className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/[0.04] border border-white/[0.07] text-gray-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() => { onClose(); setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 300); }}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#8B0000] to-[#A52020] text-white font-semibold text-sm hover:from-[#A52020] hover:to-[#DC2626] transition-all duration-300 shadow-lg shadow-red-900/20"
          >
            Start a Similar Project
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

const contentVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.07 } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.3 } },
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const ALL_CATEGORIES = ["All", "Enterprise Mobile", "FinTech SaaS", "E-commerce", "IoT & GIS", "AI & Automation", "ERP & Operations", "PropTech", "Logistics & Tracking"];

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [caseStudyOpen, setCaseStudyOpen] = useState(false);

  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);
  const safeActive = Math.min(active, filtered.length - 1);
  const project = filtered[safeActive];

  const prev = useCallback(() => setActive((p) => (p - 1 + filtered.length) % filtered.length), [filtered.length]);
  const next = useCallback(() => setActive((p) => (p + 1) % filtered.length), [filtered.length]);

  useEffect(() => { setActive(0); }, [filter]);

  useEffect(() => {
    if (hovered) return;
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [hovered, next]);

  return (
    <section className="relative py-24 sm:py-32 bg-background overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8B0000]/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

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
            <Layers className="w-3.5 h-3.5" />
            Our Work
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Projects That{" "}
            <span className="gradient-text">Ship & Scale</span>
          </h2>
          <p className="text-lg dark:text-gray-400 text-gray-600 max-w-2xl mx-auto">
            Real systems built for real businesses: from fintech SaaS and luxury e-commerce to AI automation, ERP, and geospatial platforms.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap gap-2 mb-8 justify-center"
        >
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
                filter === cat
                  ? "dark:bg-[#8B0000]/20 dark:border-[#8B0000]/50 dark:text-red-300 bg-red-50 border-red-300 text-red-700"
                  : "border-white/10 text-gray-500 hover:text-gray-300 hover:border-white/20"
              }`}
            >
              {cat}
              {cat !== "All" && (
                <span className="ml-1.5 opacity-50">
                  {projects.filter((p) => p.category === cat).length}
                </span>
              )}
            </button>
          ))}
        </motion.div>

        {/* Main layout */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid lg:grid-cols-[280px_1fr] gap-6 lg:gap-10"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* LEFT: Project selector */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-none">
            {filtered.map((p, i) => {
              const Icon = p.icon;
              const isActive = i === safeActive;
              return (
                <button
                  key={p.id}
                  onClick={() => setActive(i)}
                  className={`group flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 shrink-0 lg:shrink border ${
                    isActive
                      ? `dark:bg-white/[0.06] bg-black/[0.03] ${p.border} shadow-lg ${p.glow}`
                      : "border-transparent dark:hover:bg-white/[0.03] dark:hover:border-white/5 hover:bg-black/[0.02] hover:border-black/5"
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isActive ? `bg-gradient-to-br ${p.gradient}` : "bg-white/5 group-hover:bg-white/10"
                  }`}>
                    <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-gray-500 group-hover:text-gray-300"}`} />
                  </div>
                  <div className="min-w-0">
                    <p className={`text-[11px] font-semibold truncate transition-colors duration-200 ${isActive ? "text-white" : "text-gray-500 group-hover:text-gray-300"}`}>
                      {p.name}
                    </p>
                    <p className={`text-[10px] transition-colors duration-200 ${isActive ? p.accent : "text-gray-600"}`}>
                      {p.category}
                    </p>
                  </div>
                  {isActive && (
                    <div className="ml-auto hidden lg:block shrink-0">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${p.gradient}`} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* RIGHT: Project detail card */}
          <div className="relative glass-card rounded-2xl border dark:border-white/5 border-black/5 overflow-hidden min-h-[540px]">

            {/* Hero image banner */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`img-${safeActive}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="relative h-44 sm:h-52 w-full overflow-hidden"
              >
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center scale-105"
                  priority
                />
                {/* Gradient overlay — blends into card below */}
                <div className={`absolute inset-0 bg-gradient-to-t from-[#13131E] via-[#13131E]/40 to-transparent`} />
                {/* Gradient tint from project colour */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-10`} />
                {/* Category + period badge top-left */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-semibold uppercase tracking-[0.12em] ${project.accent}`}>
                    <project.icon className="w-3 h-3" />
                    {project.category}
                  </div>
                </div>
                {/* Project number watermark */}
                <div className="absolute bottom-3 right-4 text-5xl font-black text-white/10 select-none leading-none">{project.id}</div>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={safeActive}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="px-7 sm:px-10 pt-5 pb-20 flex flex-col"
              >
                {/* Top row */}
                <motion.div variants={childVariants} className="flex items-start justify-between gap-4 mb-5">
                  <div className="flex items-center gap-4">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center shadow-lg shrink-0`}>
                      <project.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 mb-0.5">{project.period}</p>
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">{project.name}</h3>
                    </div>
                  </div>
                  <button
                    onClick={() => setCaseStudyOpen(true)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] font-semibold transition-all duration-200 shrink-0 ${project.border} ${project.accent} hover:bg-white/5`}
                  >
                    <BookOpen className="w-3 h-3" />
                    Case Study
                  </button>
                </motion.div>

                {/* Tagline */}
                <motion.p variants={childVariants} className={`text-sm font-semibold mb-4 ${project.accent} leading-relaxed`}>
                  {project.tagline}
                </motion.p>

                {/* Description */}
                <motion.p variants={childVariants} className="text-sm text-gray-400 leading-relaxed mb-7">
                  {project.description}
                </motion.p>

                {/* Metrics */}
                <motion.div variants={childVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7">
                  {project.metrics.map((m) => (
                    <div key={m.label} className={`rounded-xl p-3 bg-white/[0.03] border ${project.border} text-center`}>
                      <div className={`text-lg font-black ${project.accent}`}>{m.value}</div>
                      <div className="text-[10px] text-gray-600 mt-0.5 leading-tight">{m.label}</div>
                    </div>
                  ))}
                </motion.div>

                {/* Stack */}
                <motion.div variants={childVariants}>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-600 mb-2.5">Tech Stack</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/[0.04] border border-white/[0.07] text-gray-300 hover:text-white hover:border-white/15 transition-colors duration-150"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom nav bar */}
            <div className="absolute bottom-0 left-0 right-0 px-7 sm:px-10 py-4 border-t dark:border-white/5 border-black/5 flex items-center justify-between dark:bg-[#0D0D14]/70 bg-white/70 backdrop-blur-sm">
              <div className="flex gap-1.5">
                {filtered.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === safeActive
                        ? `w-6 bg-gradient-to-r ${project.gradient}`
                        : "w-1.5 bg-white/15 hover:bg-white/30"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-gray-600 mr-1">{safeActive + 1} / {filtered.length}</span>
                <button
                  onClick={prev}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={next}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center mt-12"
        >
          <a
            href="https://github.com/danielsnyasha"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-gray-300 text-sm font-medium hover:text-white hover:border-white/20 hover:bg-white/5 transition-all duration-300 group"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            View More on GitHub
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
          </a>
        </motion.div>
      </div>

      {/* Case Study Drawer */}
      {caseStudyOpen && (
        <CaseStudyDrawer project={project} onClose={() => setCaseStudyOpen(false)} />
      )}
    </section>
  );
}
