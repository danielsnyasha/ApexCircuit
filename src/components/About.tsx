"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  ExternalLink,
  GraduationCap,
  Award,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Briefcase,
  MapPin,
} from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

/* ── Team data ─────────────────────────────────────────── */
interface TeamMember {
  name: string;
  role: string;
  location: string;
  flag: string;
  bio: string;
  images?: string[];
  gradient: string;
  initials: string;
  linkedin?: string;
  github?: string;
  tags: string[];
  experience?: { role: string; company: string; period: string; dot: string; border: string }[];
  education?: { icon: typeof GraduationCap; title: string; institution: string; color: string; bg: string; border: string }[];
  skills?: string[];
  metrics?: { value: string; label: string }[];
  openTo?: string;
}

const team: TeamMember[] = [
  {
    name: "Nyasha Musanhu",
    role: "Lead Software Engineer",
    location: "London, UK",
    flag: "🇬🇧",
    bio: "Results-driven Full Stack Developer and Software Engineer with 8+ years of hands-on experience in end-to-end software development, cloud-native architecture, and agile delivery. Proven track record building scalable web applications, cross-platform mobile apps, RESTful APIs, and microservices. Deep expertise in Next.js, .NET, Django, cloud platforms (AWS, Azure, GCP), GIS solutions, and AI-assisted engineering with LLM tooling.",
    images: ["/daniel-1.jpg", "/daniel-2.jpg", "/daniel-3.jpg"],
    gradient: "from-[#8B0000] to-[#DC2626]",
    initials: "NM",
    linkedin: "https://www.linkedin.com/in/nyasha-musanhu-aa164794/",
    github: "https://github.com/danielsnyasha",
    tags: ["Full-Stack", "ERPNext", "GIS", "AI/LLM", "Azure", "AWS"],
    experience: [
      { role: "Software Engineer", company: "Ionic Innovate Pvt Ltd", period: "Aug 2025 to Present", dot: "bg-red-500", border: "border-red-800/40" },
      { role: "Software Engineer", company: "Teleport Industries", period: "Feb 2020 to Jul 2025", dot: "bg-blue-500", border: "border-blue-800/40" },
      { role: "GIS Software Developer", company: "Environmental Management Agency", period: "Jan 2016 to Dec 2019", dot: "bg-green-500", border: "border-green-800/40" },
    ],
    education: [
      { icon: GraduationCap, title: "MSc Computer Science: Advanced Software Engineering", institution: "University of East London, UK  •  2023 to 2025  •  Distinction", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
      { icon: GraduationCap, title: "BSc Hons GIS & Remote Sensing", institution: "University of Zimbabwe, Harare  •  2013 to 2017  •  Upper 2.1", color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" },
      { icon: Award, title: "ERPNext Frappe Developer, Certified", institution: "Frappe Technologies  •  2022", color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
      { icon: Award, title: "Azure Fundamentals AZ-900", institution: "Microsoft Certified  •  Feb 2026", color: "text-sky-400", bg: "bg-sky-500/10", border: "border-sky-500/20" },
      { icon: Award, title: "Nanodegree: Full Stack Web Development", institution: "Udacity  •  2021", color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20" },
      { icon: Award, title: "Nanodegree: Robotics & Software Engineering", institution: "Udacity  •  2022", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
    ],
    skills: ["TypeScript", "Next.js", "React.js", "Node.js", "ASP.NET Core / C#", "Django / Python", "React Native", "PostgreSQL", "MongoDB", "Prisma ORM", "GraphQL", "AWS", "Azure", "GCP", "Docker", "CI/CD", "ERPNext / Frappe", "PostGIS", "Leaflet / Mapbox GL", "LangChain", "Claude API", "RAG / Vector DBs", "MCP Servers"],
    metrics: [
      { value: "82.9%", label: "E2E Test Coverage" },
      { value: "80%", label: "Payout Time Cut" },
      { value: "78%", label: "Legacy Modernised" },
      { value: "50%", label: "Sales Cycle Cut" },
    ],
    openTo: "Open to global opportunities",
  },
  {
    name: "Tariro Chikwanda",
    role: "Senior Software Engineer",
    location: "Amsterdam, NL",
    flag: "🇳🇱",
    bio: "Backend specialist with deep expertise in distributed systems, RESTful API design, and high-throughput data pipelines. BSc Computer Science (University of Cape Town). Proficient in Node.js, Python, PostgreSQL, and Docker. Experienced building resilient microservices and cloud-native architectures for fintech and logistics clients.",
    images: ["/afro-american-woman-model-studio.jpg"],
    gradient: "from-[#1E3A8A] to-[#2563EB]",
    initials: "TC",
    tags: ["Node.js", "Python", "PostgreSQL", "Docker", "Microservices", "APIs"],
    experience: [
      { role: "Senior Backend Engineer", company: "Fintech Scale-up", period: "2022 to Present", dot: "bg-blue-500", border: "border-blue-800/40" },
      { role: "Software Engineer", company: "Logistics Platform", period: "2019 to 2022", dot: "bg-indigo-500", border: "border-indigo-800/40" },
    ],
    education: [
      { icon: GraduationCap, title: "BSc Computer Science", institution: "University of Cape Town  •  2015 to 2019  •  First Class", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
      { icon: Award, title: "AWS Certified Developer, Associate", institution: "Amazon Web Services  •  2021", color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20" },
    ],
    skills: ["Node.js", "Python", "PostgreSQL", "Redis", "Docker", "Kubernetes", "REST APIs", "GraphQL", "CI/CD", "AWS"],
  },
  {
    name: "James Osei",
    role: "Software Engineer, GIS & Spatial",
    location: "Accra, Ghana",
    flag: "🇬🇭",
    bio: "Geospatial systems engineer specialising in PostGIS, QGIS, Mapbox GL, and satellite imagery pipelines. BSc Geographic Information Systems (University of Ghana). Experienced in building spatial analytics platforms for land management, urban planning, and environmental monitoring across Africa and Europe.",
    images: ["/african-american-business-man-suit.jpg"],
    gradient: "from-[#059669] to-[#10B981]",
    initials: "JO",
    tags: ["PostGIS", "QGIS", "Mapbox GL", "Leaflet", "Spatial Analytics", "Python"],
    experience: [
      { role: "GIS Engineer", company: "Urban Planning Agency", period: "2021 to Present", dot: "bg-green-500", border: "border-green-800/40" },
      { role: "Spatial Data Analyst", company: "Environmental Consultancy", period: "2017 to 2021", dot: "bg-teal-500", border: "border-teal-800/40" },
    ],
    education: [
      { icon: GraduationCap, title: "BSc Geographic Information Systems", institution: "University of Ghana  •  2013 to 2017  •  First Class Honours", color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" },
      { icon: Award, title: "PostGIS Spatial Database Specialist", institution: "OSGeo Foundation  •  2020", color: "text-teal-400", bg: "bg-teal-500/10", border: "border-teal-500/20" },
    ],
    skills: ["PostGIS", "QGIS", "Mapbox GL", "Leaflet", "Python", "GeoPandas", "GDAL", "Remote Sensing", "PostgreSQL"],
  },
  {
    name: "Priya Nair",
    role: "Software Engineer, AI & Automation",
    location: "Edinburgh, UK",
    flag: "🇬🇧",
    bio: "Machine learning engineer and automation architect building intelligent pipelines, LangChain-powered workflows, and production-grade ML systems. MSc Artificial Intelligence (University of Edinburgh). Proficient in Python, FastAPI, LangChain, and HuggingFace. Passionate about applying LLMs to real enterprise problems.",
    images: ["/indian-woman-posing-cute-stylish-outfit-camera-smiling.jpg"],
    gradient: "from-[#7C3AED] to-[#A78BFA]",
    initials: "PN",
    tags: ["LangChain", "ML Pipelines", "FastAPI", "Python", "HuggingFace", "RAG"],
    experience: [
      { role: "ML Engineer", company: "AI Research Lab", period: "2023 to Present", dot: "bg-purple-500", border: "border-purple-800/40" },
      { role: "Data Scientist", company: "Enterprise SaaS", period: "2020 to 2023", dot: "bg-violet-500", border: "border-violet-800/40" },
    ],
    education: [
      { icon: GraduationCap, title: "MSc Artificial Intelligence", institution: "University of Edinburgh  •  2019 to 2020  •  Distinction", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
      { icon: GraduationCap, title: "BSc Computer Science & Mathematics", institution: "University of Manchester  •  2016 to 2019", color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20" },
      { icon: Award, title: "TensorFlow Developer Certificate", institution: "Google  •  2022", color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20" },
    ],
    skills: ["Python", "LangChain", "FastAPI", "HuggingFace", "PyTorch", "RAG", "Vector DBs", "Claude API", "OpenAI API", "Docker"],
  },
  {
    name: "Luca Ferreira",
    role: "Software Engineer, Frontend & Mobile",
    location: "Lisbon, PT",
    flag: "🇵🇹",
    bio: "Frontend and mobile engineer crafting pixel-perfect interfaces and high-performance React Native applications. BSc Software Engineering (Instituto Superior Técnico, Lisbon). Expert in Next.js, TypeScript, Tailwind CSS, and cross-platform mobile development. Strong eye for UI/UX detail and design systems.",
    images: ["/young-successful-businessman-thinking-with-hand-chin.jpg"],
    gradient: "from-[#0EA5E9] to-[#38BDF8]",
    initials: "LF",
    tags: ["React Native", "Next.js", "TypeScript", "Tailwind CSS", "UI/UX", "Figma"],
    experience: [
      { role: "Frontend Engineer", company: "Product Studio", period: "2022 to Present", dot: "bg-sky-500", border: "border-sky-800/40" },
      { role: "Mobile Developer", company: "Travel Tech Start-up", period: "2019 to 2022", dot: "bg-cyan-500", border: "border-cyan-800/40" },
    ],
    education: [
      { icon: GraduationCap, title: "BSc Software Engineering", institution: "Instituto Superior Técnico, Lisbon  •  2015 to 2019  •  Merit", color: "text-sky-400", bg: "bg-sky-500/10", border: "border-sky-500/20" },
      { icon: Award, title: "Meta React Native Developer Certificate", institution: "Meta / Coursera  •  2021", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
    ],
    skills: ["Next.js", "React Native", "TypeScript", "Tailwind CSS", "Figma", "Framer Motion", "Expo", "Redux", "Zustand", "Storybook"],
  },
  {
    name: "Sipho Dlamini",
    role: "ERP Implementation Consultant",
    location: "Pretoria, ZA",
    flag: "🇿🇦",
    images: ["/medium-shot-male-flight-attendant-posing.jpg"],
    bio: "ERP consultant with 6+ years delivering end-to-end ERPNext and Frappe framework implementations for manufacturing, retail, and services businesses across Southern Africa and Europe. Skilled in business process analysis, system configuration, user training, and post-go-live support. Fluent in English and Zulu.",
    gradient: "from-[#D97706] to-[#F59E0B]",
    initials: "SD",
    tags: ["ERPNext", "Frappe", "Business Analysis", "ERP Rollout", "Training"],
    experience: [
      { role: "ERP Implementation Consultant", company: "Enterprise Solutions Firm", period: "2021 to Present", dot: "bg-yellow-500", border: "border-yellow-800/40" },
      { role: "Business Systems Analyst", company: "Retail Group", period: "2018 to 2021", dot: "bg-orange-500", border: "border-orange-800/40" },
    ],
    education: [
      { icon: GraduationCap, title: "BCom Information Systems", institution: "University of Pretoria  •  2014 to 2018  •  Cum Laude", color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
      { icon: Award, title: "ERPNext Certified Consultant", institution: "Frappe Technologies  •  2020", color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20" },
    ],
    skills: ["ERPNext", "Frappe", "Python", "Business Analysis", "SQL", "Process Mapping", "Change Management"],
  },
  {
    name: "Amara Diallo",
    role: "Client Success & Project Manager",
    location: "Paris, FR",
    flag: "🇫🇷",
    bio: "Client success manager and project delivery specialist ensuring every Apex Circuit engagement runs smoothly from kickoff to handover. PMP-certified with a background in technology consulting and stakeholder management across multinational organisations. Known for bridging the gap between technical teams and business decision-makers.",
    images: ["/37XCcAGZniGEub-uzaM0G.jpg"],
    gradient: "from-[#DB2777] to-[#EC4899]",
    initials: "AD",
    tags: ["Project Management", "Client Success", "PMP", "Agile", "Stakeholder Mgmt"],
    experience: [
      { role: "Senior Project Manager", company: "Tech Consultancy", period: "2022 to Present", dot: "bg-pink-500", border: "border-pink-800/40" },
      { role: "Client Success Manager", company: "SaaS Platform", period: "2019 to 2022", dot: "bg-rose-500", border: "border-rose-800/40" },
    ],
    education: [
      { icon: GraduationCap, title: "MSc International Business Management", institution: "ESCP Business School, Paris  •  2017 to 2019", color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20" },
      { icon: Award, title: "PMP: Project Management Professional", institution: "PMI  •  2021", color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20" },
    ],
    skills: ["Agile", "Scrum", "Stakeholder Management", "Risk Management", "JIRA", "Notion", "Client Relations"],
  },
  {
    name: "Marcus Vogt",
    role: "Business Development Manager",
    location: "Vienna, AT",
    flag: "🇦🇹",
    bio: "Drives strategic partnerships and client acquisition across European markets. 7+ years in enterprise software sales and business development with a strong network across the DACH region and the UK. Skilled at identifying growth opportunities and converting them into long-term client relationships.",
    images: ["/young-handsome-man-classy-suit.jpg"],
    gradient: "from-[#374151] to-[#6B7280]",
    initials: "MV",
    tags: ["Business Development", "Partnerships", "Enterprise Sales", "Strategy", "DACH"],
    experience: [
      { role: "Business Development Manager", company: "Enterprise Software Firm", period: "2021 to Present", dot: "bg-gray-400", border: "border-gray-700/40" },
      { role: "Account Executive", company: "SaaS Scale-up", period: "2017 to 2021", dot: "bg-slate-500", border: "border-slate-700/40" },
    ],
    education: [
      { icon: GraduationCap, title: "MSc International Business", institution: "WU Vienna University of Economics  •  2014 to 2016", color: "text-gray-400", bg: "bg-gray-500/10", border: "border-gray-500/20" },
      { icon: Award, title: "Certified Sales Professional", institution: "Sales Management Association  •  2019", color: "text-slate-400", bg: "bg-slate-500/10", border: "border-slate-500/20" },
    ],
    skills: ["Business Development", "Enterprise Sales", "CRM", "Partnerships", "Market Strategy", "Negotiation", "Key Account Management"],
  },
  {
    name: "Sophie Hartmann",
    role: "Project Manager",
    location: "Berlin, DE",
    flag: "🇩🇪",
    bio: "PMP-certified project manager with a track record of delivering complex software projects on time and within budget. Proficient in Agile, Scrum, and cross-functional stakeholder management. Excels at keeping distributed teams aligned and clients informed throughout every stage of delivery.",
    images: ["/smiling-woman-with-brown-jacket.jpg"],
    gradient: "from-[#0891B2] to-[#06B6D4]",
    initials: "SH",
    tags: ["PMP", "Agile", "Scrum", "Project Delivery", "Risk Management"],
    experience: [
      { role: "Senior Project Manager", company: "Digital Agency", period: "2022 to Present", dot: "bg-cyan-500", border: "border-cyan-800/40" },
      { role: "Project Manager", company: "Enterprise Consultancy", period: "2018 to 2022", dot: "bg-teal-500", border: "border-teal-800/40" },
    ],
    education: [
      { icon: GraduationCap, title: "BSc Business Informatics", institution: "Humboldt University Berlin  •  2014 to 2018", color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
      { icon: Award, title: "PMP: Project Management Professional", institution: "PMI  •  2020", color: "text-teal-400", bg: "bg-teal-500/10", border: "border-teal-500/20" },
      { icon: Award, title: "Certified Scrum Master", institution: "Scrum Alliance  •  2019", color: "text-sky-400", bg: "bg-sky-500/10", border: "border-sky-500/20" },
    ],
    skills: ["Agile", "Scrum", "JIRA", "Confluence", "Risk Management", "Stakeholder Management", "Budget Management", "MS Project"],
  },
  {
    name: "Yasmine Benali",
    role: "UX Designer & Brand Strategist",
    location: "Casablanca, MA",
    flag: "🇲🇦",
    bio: "Creative designer specialising in user experience, brand identity, and digital product design. Brings a sharp eye for detail and a deep understanding of how design drives business outcomes. Has led brand refreshes and digital product design for clients across Europe and North Africa.",
    images: ["/smiling-african-businesswoman-standing-near-window.jpg"],
    gradient: "from-[#7C3AED] to-[#C084FC]",
    initials: "YB",
    tags: ["UX Design", "Brand Strategy", "Figma", "Design Systems", "Prototyping"],
    experience: [
      { role: "Lead UX Designer", company: "Creative Agency", period: "2022 to Present", dot: "bg-purple-500", border: "border-purple-800/40" },
      { role: "UI/UX Designer", company: "Tech Start-up", period: "2019 to 2022", dot: "bg-violet-500", border: "border-violet-800/40" },
    ],
    education: [
      { icon: GraduationCap, title: "BA Graphic Design & Visual Communication", institution: "École des Beaux-Arts, Casablanca  •  2015 to 2019", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
      { icon: Award, title: "Google UX Design Certificate", institution: "Google  •  2021", color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20" },
    ],
    skills: ["Figma", "Adobe XD", "Illustrator", "Photoshop", "Design Systems", "Prototyping", "User Research", "Brand Identity", "Framer"],
  },
];

/* ── Gradient Avatar ─────────────────────────────────────── */
function GradientAvatar({ gradient, initials }: { gradient: string; initials: string }) {
  return (
    <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
      <span className="text-6xl font-black text-white/70">{initials}</span>
    </div>
  );
}

/* ── Main Component ──────────────────────────────────────── */
export default function About() {
  const [activeMember, setActiveMember] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const member = team[activeMember];
  const images = member.images ?? [];

  // Reset image index when member changes
  useEffect(() => { setCurrentImage(0); }, [activeMember]);

  // Auto-advance team members
  useEffect(() => {
    if (isHovered) return;
    const id = setInterval(() => {
      setActiveMember((p) => (p + 1) % team.length);
    }, 5000);
    return () => clearInterval(id);
  }, [isHovered]);

  // Auto-advance images within current member
  useEffect(() => {
    if (images.length <= 1 || isHovered) return;
    const id = setInterval(() => {
      setCurrentImage((p) => (p + 1) % images.length);
    }, 3500);
    return () => clearInterval(id);
  }, [images, isHovered]);

  const prevMember = useCallback(() => setActiveMember((p) => (p - 1 + team.length) % team.length), []);
  const nextMember = useCallback(() => setActiveMember((p) => (p + 1) % team.length), []);

  return (
    <section className="relative py-20 sm:py-28 bg-background overflow-x-hidden">
      <div className="absolute inset-0 dot-grid opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-[#8B0000]/40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Company intro */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#8B0000]/30 bg-[#8B0000]/10 text-sm dark:text-red-300/80 text-red-700 mb-6">
            About Apex Circuit
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            We Don&apos;t Consult.{" "}
            <span className="gradient-text">We Deliver.</span>
          </h2>
          <p className="text-lg dark:text-gray-400 text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Founded in 2019, Apex Circuit is a technology company built on a simple
            belief: organizations deserve more than advice. They deserve results.
            We build enterprise-grade systems, from ERP deployments to AI pipelines,
            that transform how businesses operate, serving clients across Europe, the UK, and beyond.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 max-w-2xl mx-auto">
            {[
              { value: "2019", label: "Founded" },
              { value: "6+", label: "Services" },
              { value: "100%", label: "Delivery Focus" },
              { value: "Global", label: "Reach" },
            ].map((s) => (
              <div key={s.label} className="glass-card rounded-xl p-4 text-center">
                <div className="text-2xl font-bold gradient-text">{s.value}</div>
                <div className="text-xs dark:text-gray-500 text-gray-600 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Meet the team label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2563EB]/30 bg-[#2563EB]/10 text-sm dark:text-blue-300/80 text-blue-700">
            Meet The Team
          </div>
          <div className="flex-1 h-px dark:bg-white/5 bg-black/5" />
          {/* Member tab pills */}
          <div className="hidden sm:flex items-center gap-2">
            {team.map((m, i) => (
              <button
                key={m.name}
                onClick={() => setActiveMember(i)}
                className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all duration-200 ${
                  i === activeMember
                    ? "dark:bg-white/10 dark:text-white dark:border-white/20 bg-black/10 text-gray-900 border-black/20"
                    : "text-gray-600 hover:dark:text-gray-300 text-gray-700"
                }`}
              >
                {m.name.split(" ")[0]}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* LEFT: Photo / Avatar */}
          <div
            className="lg:sticky lg:top-28 lg:self-start"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[3/4] max-w-sm mx-auto cursor-pointer">
              {/* Glow border */}
              <div className={`absolute -inset-1 bg-gradient-to-br ${member.gradient} rounded-2xl blur-sm opacity-40 transition-all duration-700`} />

              <div className="relative rounded-2xl overflow-hidden h-full border border-white/10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeMember}-${currentImage}`}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    {images.length > 0 ? (
                      <Image
                        src={images[currentImage]}
                        alt={member.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover"
                        priority
                      />
                    ) : (
                      <GradientAvatar gradient={member.gradient} initials={member.initials} />
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D14]/80 via-transparent to-transparent" />

                {/* Badges */}
                <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 items-end">
                  <div className="flex items-center gap-1.5 dark:bg-black/50 bg-white/85 backdrop-blur-md rounded-lg px-3 py-1.5 border dark:border-white/10 border-black/10">
                    <span className="text-base">{member.flag}</span>
                    <span className="text-[11px] dark:text-white text-gray-800 font-medium whitespace-nowrap">{member.location}</span>
                  </div>
                </div>

                {/* Bottom: name + prev/next */}
                <div className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-4">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-white font-bold text-base leading-tight">{member.name}</p>
                      <p className="text-[11px] dark:text-gray-400 text-gray-600">{member.role}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={prevMember}
                        className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={nextMember}
                        className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Dot indicators */}
                  <div className="flex gap-1.5 mt-3 justify-center">
                    {team.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveMember(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === activeMember ? "bg-white w-6" : "bg-white/30 w-1.5"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics (only for Nyasha) */}
            {member.metrics && (
              <div className="grid grid-cols-2 gap-2 mt-3 max-w-sm mx-auto">
                {member.metrics.map((m) => (
                  <div key={m.label} className="glass-card rounded-xl p-3 text-center border border-white/5">
                    <div className="text-lg font-bold gradient-text">{m.value}</div>
                    <div className="text-[10px] dark:text-gray-500 text-gray-600 mt-0.5">{m.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Member details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMember}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -10 }}
              className="space-y-7"
            >
              {/* Name + Role */}
              <motion.div variants={itemVariants}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#8B0000]/30 bg-[#8B0000]/10 text-xs dark:text-red-300/80 text-red-700 mb-4">
                  Team Member
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">{member.name}</h3>
                <p className="text-[#60A5FA] font-medium text-base mb-2">{member.role}</p>
                <div className="flex flex-wrap items-center gap-3 text-xs dark:text-gray-500 text-gray-600 mb-4">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {member.location}</span>
                  {member.experience && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" /> {member.experience.length}+ Roles</span>
                    </>
                  )}
                </div>
                <p className="dark:text-gray-400 text-gray-600 leading-relaxed text-sm">{member.bio}</p>
              </motion.div>

              {/* Experience */}
              {member.experience && (
                <motion.div variants={itemVariants}>
                  <h4 className="text-xs font-semibold dark:text-gray-500 text-gray-600 uppercase tracking-wider mb-3">Professional Experience</h4>
                  <div className="space-y-2">
                    {member.experience.map((exp) => (
                      <div key={exp.company} className={`flex items-start gap-3 rounded-xl p-3 dark:bg-white/[0.02] bg-black/[0.02] border ${exp.border}`}>
                        <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${exp.dot}`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                            <p className="text-sm font-semibold text-foreground">{exp.role}</p>
                            <span className="text-[10px] dark:text-gray-600 text-gray-500 shrink-0">{exp.period}</span>
                          </div>
                          <p className="text-[11px] dark:text-gray-500 text-gray-600 mt-0.5">{exp.company}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Education & Certs */}
              {member.education && (
                <motion.div variants={itemVariants}>
                  <h4 className="text-xs font-semibold dark:text-gray-500 text-gray-600 uppercase tracking-wider mb-3">Education &amp; Certifications</h4>
                  <div className="grid gap-2">
                    {member.education.map((edu) => (
                      <div key={edu.title} className={`flex items-start gap-3 rounded-xl p-3 ${edu.bg} border ${edu.border}`}>
                        <edu.icon className={`w-4 h-4 mt-0.5 shrink-0 ${edu.color}`} />
                        <div>
                          <p className="text-xs font-semibold text-foreground leading-snug">{edu.title}</p>
                          <p className="text-[10px] dark:text-gray-500 text-gray-600 mt-0.5">{edu.institution}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Skills */}
              {member.skills && (
                <motion.div variants={itemVariants}>
                  <h4 className="text-xs font-semibold dark:text-gray-500 text-gray-600 uppercase tracking-wider mb-3">Technical Stack</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {member.skills.map((skill) => (
                      <span key={skill} className="px-2.5 py-1 rounded-full text-[11px] font-medium dark:bg-white/5 dark:border-white/10 dark:text-gray-300 text-gray-700 bg-black/5 border border-black/10 hover:border-[#8B0000]/40 dark:hover:text-white hover:text-gray-900 transition-colors duration-200">
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Links */}
              <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
                {member.linkedin && (
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0A66C2]/15 border border-[#0A66C2]/30 text-[#60A5FA] text-sm font-medium hover:bg-[#0A66C2]/25 transition-all duration-300">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                    LinkedIn
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {member.github && (
                  <a href={member.github} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl dark:bg-white/5 dark:border-white/10 dark:text-gray-300 bg-black/5 border border-black/10 text-gray-700 text-sm font-medium dark:hover:bg-white/10 dark:hover:text-white hover:bg-black/10 hover:text-gray-900 transition-all duration-300">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>
                    GitHub
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {member.openTo && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl dark:bg-white/[0.03] dark:border-white/5 bg-black/[0.03] border border-black/5 dark:text-gray-500 text-gray-600 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-xs">{member.openTo}</span>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
