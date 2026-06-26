"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { ExternalLink } from "lucide-react";

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

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image?: string;
  gradient: string;
  initials: string;
  linkedin?: string;
  github?: string;
  tags: string[];
  flag?: string;
  location?: string;
}

const engineers: TeamMember[] = [
  {
    name: "Nyasha Musanhu",
    role: "Lead Software Engineer",
    bio: "Full-stack engineer with 8+ years across enterprise systems, cloud infrastructure, GIS platforms, and AI automation. MSc Computer Science with Distinction (University of East London, UK). ERPNext Certified. AWS & Azure practitioner. Specialist in spatial data systems, LangChain pipelines, and Next.js architecture.",
    image: "/daniel-1.jpg",
    gradient: "from-[#8B0000] to-[#DC2626]",
    initials: "NM",
    linkedin: "https://www.linkedin.com/in/nyasha-musanhu-aa164794/",
    github: "https://github.com/danielsnyasha",
    tags: ["Full-Stack", "ERPNext", "GIS", "AI/LLM", "Azure", "AWS"],
    location: "London, UK",
    flag: "🇬🇧",
  },
  {
    name: "Tariro Chikwanda",
    role: "Senior Software Engineer",
    bio: "Backend specialist with deep expertise in distributed systems, RESTful API design, and high-throughput data pipelines. BSc Computer Science (University of Cape Town). Proficient in Node.js, Python, PostgreSQL, and Docker.",
    image: "/afro-american-woman-model-studio.jpg",
    gradient: "from-[#1E3A8A] to-[#2563EB]",
    initials: "TC",
    tags: ["Node.js", "Python", "PostgreSQL", "Docker", "APIs"],
    location: "Amsterdam, NL",
    flag: "🇳🇱",
  },
  {
    name: "James Osei",
    role: "Software Engineer, GIS & Spatial",
    bio: "Geospatial systems engineer specialising in PostGIS, QGIS, Mapbox GL, and satellite imagery pipelines. BSc Geographic Information Systems (University of Ghana). Experienced in building spatial analytics platforms for land management and urban planning.",
    image: "/african-american-business-man-suit.jpg",
    gradient: "from-[#059669] to-[#10B981]",
    initials: "JO",
    tags: ["PostGIS", "QGIS", "Mapbox", "Leaflet", "Spatial Analytics"],
    location: "Accra, Ghana",
    flag: "🇬🇭",
  },
  {
    name: "Priya Nair",
    role: "Software Engineer, AI & Automation",
    bio: "Machine learning engineer and automation architect building intelligent pipelines, LangChain-powered workflows, and production-grade ML systems. MSc Artificial Intelligence (University of Edinburgh). Proficient in Python, FastAPI, LangChain, and HuggingFace.",
    image: "/indian-woman-posing-cute-stylish-outfit-camera-smiling.jpg",
    gradient: "from-[#7C3AED] to-[#A78BFA]",
    initials: "PN",
    tags: ["LangChain", "ML", "FastAPI", "Python", "HuggingFace"],
    location: "Edinburgh, UK",
    flag: "🇬🇧",
  },
  {
    name: "Luca Ferreira",
    role: "Software Engineer, Frontend & Mobile",
    bio: "Frontend and mobile engineer crafting pixel-perfect interfaces and high-performance React Native applications. BSc Software Engineering (Instituto Superior Técnico, Lisbon). Expert in Next.js, TypeScript, Tailwind CSS, and cross-platform mobile development.",
    image: "/young-successful-businessman-thinking-with-hand-chin.jpg",
    gradient: "from-[#0EA5E9] to-[#38BDF8]",
    initials: "LF",
    tags: ["React Native", "Next.js", "TypeScript", "Tailwind", "UI/UX"],
    location: "Lisbon, PT",
    flag: "🇵🇹",
  },
];

const otherRoles: TeamMember[] = [
  {
    name: "Sipho Dlamini",
    role: "ERP Implementation Consultant",
    bio: "ERPNext and Frappe framework specialist with 6+ years implementing end-to-end ERP systems for manufacturing, retail, and services companies across Southern Africa and Europe.",
    image: "/medium-shot-male-flight-attendant-posing.jpg",
    gradient: "from-[#D97706] to-[#F59E0B]",
    initials: "SD",
    tags: ["ERPNext", "Frappe", "ERP", "Business Analysis"],
    location: "Pretoria, ZA",
    flag: "🇿🇦",
  },
  {
    name: "Amara Diallo",
    role: "Client Success & Project Manager",
    bio: "PMP-certified project manager ensuring every Apex Circuit engagement runs smoothly from kickoff to handover. Background in technology consulting and stakeholder management across multinational organisations.",
    image: "/37XCcAGZniGEub-uzaM0G.jpg",
    gradient: "from-[#DB2777] to-[#EC4899]",
    initials: "AD",
    tags: ["PMP", "Agile", "Client Success", "Stakeholder Mgmt"],
    location: "Paris, FR",
    flag: "🇫🇷",
  },
  {
    name: "Marcus Vogt",
    role: "Business Development Manager",
    bio: "Drives strategic partnerships and client acquisition across European markets. 7+ years in enterprise software sales and business development with a strong network across the DACH region and the UK.",
    image: "/young-handsome-man-classy-suit.jpg",
    gradient: "from-[#374151] to-[#6B7280]",
    initials: "MV",
    tags: ["Business Dev", "Partnerships", "Sales", "Strategy"],
    location: "Vienna, AT",
    flag: "🇦🇹",
  },
  {
    name: "Sophie Hartmann",
    role: "Project Manager",
    bio: "PMP-certified project manager with a track record of delivering complex software projects on time and within budget. Proficient in Agile, Scrum, and cross-functional stakeholder management.",
    image: "/smiling-woman-with-brown-jacket.jpg",
    gradient: "from-[#0891B2] to-[#06B6D4]",
    initials: "SH",
    tags: ["PMP", "Agile", "Scrum", "Delivery"],
    location: "Berlin, DE",
    flag: "🇩🇪",
  },
  {
    name: "Yasmine Benali",
    role: "UX Designer & Brand Strategist",
    bio: "Creative designer specialising in user experience, brand identity, and digital product design. Brings a sharp eye for detail and a deep understanding of how design drives business outcomes.",
    image: "/smiling-african-businesswoman-standing-near-window.jpg",
    gradient: "from-[#7C3AED] to-[#C084FC]",
    initials: "YB",
    tags: ["UX Design", "Brand Strategy", "Figma", "Design Systems"],
    location: "Casablanca, MA",
    flag: "🇲🇦",
  },
];

function GradientAvatar({ gradient, initials }: { gradient: string; initials: string }) {
  return (
    <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
      <span className="text-4xl font-bold text-white/80">{initials}</span>
    </div>
  );
}

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <motion.div
      variants={cardVariants}
      className="group glass-card rounded-2xl overflow-hidden border dark:border-white/5 dark:hover:border-white/10 border-black/5 hover:border-black/10 transition-all duration-400 hover:-translate-y-2 flex flex-col"
    >
      {/* Photo / Avatar */}
      <div className="relative h-64 overflow-hidden flex-shrink-0">
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 20vw"
            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <GradientAvatar gradient={member.gradient} initials={member.initials} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#13131E] via-transparent to-transparent" />

        {/* Location badge */}
        {member.location && (
          <div className="absolute top-3 left-3 flex items-center gap-1 dark:bg-black/50 bg-white/85 backdrop-blur-md rounded-full px-2.5 py-1 border dark:border-white/10 border-black/10">
            <span className="text-[11px]">{member.flag}</span>
            <span className="text-[10px] dark:text-gray-200 text-gray-700 font-medium">{member.location}</span>
          </div>
        )}

        {/* Social links */}
        <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-lg bg-[#0A66C2]/80 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#0A66C2] transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
          {member.github && (
            <a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-base font-bold text-foreground mb-0.5">{member.name}</h3>
        <p className="text-xs text-[#60A5FA] font-medium mb-3">{member.role}</p>
        <p className="text-xs dark:text-gray-500 text-gray-600 leading-relaxed mb-4 flex-1">{member.bio}</p>
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {member.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md text-[10px] dark:bg-white/5 dark:border-white/5 bg-black/5 border border-black/10 dark:text-gray-400 text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Team() {
  return (
    <section className="relative py-24 sm:py-32 bg-background overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2563EB]/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2563EB]/30 bg-[#2563EB]/10 text-sm dark:text-blue-300/80 text-blue-700 mb-6">
            Our Team
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            The Minds Behind{" "}
            <span className="gradient-text">Apex Circuit</span>
          </h2>
          <p className="text-lg dark:text-gray-400 text-gray-600 max-w-2xl mx-auto">
            A distributed team of engineers and technologists spanning the UK, Europe, and beyond,
            building enterprise-grade software with precision.
          </p>
        </motion.div>

        {/* Engineers, label */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] dark:text-gray-500 text-gray-600">Engineering</span>
          <div className="flex-1 h-px dark:bg-white/5 bg-black/5" />
        </motion.div>

        {/* Engineers Grid, 5 cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-14"
        >
          {engineers.map((member) => (
            <MemberCard key={member.name} member={member} />
          ))}
        </motion.div>

        {/* Other Roles, label */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] dark:text-gray-500 text-gray-600">Consulting &amp; Operations</span>
          <div className="flex-1 h-px dark:bg-white/5 bg-black/5" />
        </motion.div>

        {/* Other Roles Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5 max-w-2xl mb-14"
        >
          {otherRoles.map((member) => (
            <MemberCard key={member.name} member={member} />
          ))}
        </motion.div>

        {/* Join CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <div className="glass-card rounded-2xl p-8 max-w-2xl mx-auto border dark:border-white/5 border-black/5">
            <h3 className="text-xl font-bold text-foreground mb-2">
              Want to join the team?
            </h3>
            <p className="dark:text-gray-400 text-gray-600 text-sm mb-6">
              We&apos;re always looking for exceptional engineers who build with care and deliver with pride.
              Remote-first, globally distributed.
            </p>
            <a
              href="https://www.linkedin.com/in/nyasha-musanhu-aa164794/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#8B0000] to-[#A52020] text-white text-sm font-semibold hover:from-[#A52020] hover:to-[#DC2626] transition-all duration-300"
            >
              Get In Touch on LinkedIn
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
