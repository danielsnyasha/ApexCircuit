"use client";

import { motion } from "framer-motion";

interface TechItem {
  name: string;
  slug?: string;
  iconColor?: string;
  customIcon?: React.ReactNode;
}

// iconColor overrides the simpleicons fill color — needed for dark icons on dark bg
const row1: TechItem[] = [
  { name: "Next.js",      slug: "nextdotjs",   iconColor: "ffffff" },
  { name: "React",        slug: "react",        iconColor: "61DAFB" },
  { name: "TypeScript",   slug: "typescript",   iconColor: "3178C6" },
  { name: "Python",       slug: "python",       iconColor: "FFD43B" },
  { name: "Node.js",      slug: "nodedotjs",    iconColor: "339933" },
  { name: "Django",       slug: "django",       iconColor: "44b78b" },
  { name: "Tailwind CSS", slug: "tailwindcss",  iconColor: "38BDF8" },
  { name: "GraphQL",      slug: "graphql",      iconColor: "E10098" },
  { name: "Prisma",       slug: "prisma",       iconColor: "a78bfa" },
  { name: "Redis",        slug: "redis",        iconColor: "FF4438" },
  { name: "Docker",       slug: "docker",       iconColor: "2496ED" },
  { name: "Vercel",       slug: "vercel",       iconColor: "ffffff" },
];

// Custom branded icons for brands removed from SimpleIcons
const AwsIcon = () => (
  <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ background: "#232F3E" }}>
    <svg viewBox="0 0 80 40" className="w-7 h-auto" fill="none">
      <text x="4" y="28" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="26" fill="#FF9900">AWS</text>
      <path d="M6 34 Q40 42 74 34" stroke="#FF9900" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <polygon points="72,30 74,34 70,34" fill="#FF9900"/>
    </svg>
  </div>
);

const AzureIcon = () => (
  <div className="w-8 h-8 rounded-md overflow-hidden flex items-center justify-center" style={{ background: "linear-gradient(135deg,#0078D4 0%,#00BCF2 100%)" }}>
    <svg viewBox="0 0 18 18" className="w-5 h-5" fill="white">
      <path d="M6.5 1.5 L1 16.5 H6.5 L9.5 9 L14 16.5 H17 L10.5 5 Z" />
      <path d="M9 3 L11.5 9.5 H14.5 L9 3Z" opacity="0.7"/>
    </svg>
  </div>
);

const OpenAiIcon = () => (
  <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ background: "#000000", border: "1px solid rgba(255,255,255,0.15)" }}>
    <svg viewBox="0 0 41 41" className="w-5 h-5" fill="white">
      <path d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835 9.964 9.964 0 0 0-6.99-3.108 10.079 10.079 0 0 0-9.617 6.977 9.967 9.967 0 0 0-6.69 4.839 10.081 10.081 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 6.99 3.108 10.079 10.079 0 0 0 9.617-6.976 9.967 9.967 0 0 0 6.691-4.839 10.079 10.079 0 0 0-1.241-11.817ZM22.498 37.886a7.474 7.474 0 0 1-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.49 7.496ZM6.392 31.006a7.471 7.471 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103l-8.051 4.649a7.504 7.504 0 0 1-10.24-2.744ZM4.297 13.62A7.469 7.469 0 0 1 8.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 0 0 .654 1.132l9.723 5.614-3.366 1.944a.12.12 0 0 1-.114.012L7.044 23.86a7.504 7.504 0 0 1-2.747-10.24Zm27.658 6.437-9.724-5.615 3.367-1.943a.121.121 0 0 1 .114-.012l8.048 4.648a7.498 7.498 0 0 1-1.158 13.528v-9.476a1.293 1.293 0 0 0-.647-1.13Zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 0 0-1.308 0l-9.723 5.614v-3.888a.12.12 0 0 1 .048-.103l8.05-4.645a7.497 7.497 0 0 1 11.135 7.763Zm-21.063 6.929-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.497 7.497 0 0 1 12.293-5.756 6.94 6.94 0 0 0-.236.134l-7.965 4.6a1.294 1.294 0 0 0-.654 1.132l-.006 11.225Zm1.829-3.943 4.33-2.501 4.332 2.5v4.999l-4.331 2.5-4.331-2.5V18Z"/>
    </svg>
  </div>
);

const VsCodeIcon = () => (
  <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ background: "#007ACC" }}>
    <svg viewBox="0 0 100 100" className="w-5 h-5" fill="white">
      <path d="M74.9 10.4 L50.4 34.8 L27.4 15.3 L14.9 22.1 L36.3 50 L14.9 77.9 L27.4 84.7 L50.4 65.2 L74.9 89.6 L89.1 82 L89.1 18 Z"/>
      <path d="M74.9 10.4 L50.4 34.8 L50.4 65.2 L74.9 89.6 L89.1 82 L89.1 18 Z" opacity="0.5"/>
    </svg>
  </div>
);

const row2: TechItem[] = [
  { name: "AWS",             customIcon: <AwsIcon /> },
  { name: "Microsoft Azure", customIcon: <AzureIcon /> },
  { name: "Google Cloud",    slug: "googlecloud",      iconColor: "4285F4" },
  { name: "GitHub",          slug: "github",           iconColor: "ffffff" },
  { name: "MongoDB",         slug: "mongodb",          iconColor: "47A248" },
  { name: "PostgreSQL",      slug: "postgresql",       iconColor: "4169E1" },
  { name: "Figma",           slug: "figma",            iconColor: "F24E1E" },
  { name: "Kubernetes",      slug: "kubernetes",       iconColor: "326CE5" },
  { name: "OpenAI",          customIcon: <OpenAiIcon /> },
  { name: "VS Code",         customIcon: <VsCodeIcon /> },
  { name: "Anthropic",       slug: "anthropic",        iconColor: "d97706" },
  { name: "DigitalOcean",    slug: "digitalocean",     iconColor: "0080FF" },
];

const row3: TechItem[] = [
  { name: "Linux",        slug: "linux",       iconColor: "FCC624" },
  { name: "Nginx",        slug: "nginx",       iconColor: "009639" },
  { name: "ERPNext",      slug: "frappe",      iconColor: "ffffff" },
  { name: "QGIS",         slug: "qgis",        iconColor: "91C24C" },
  { name: "Mapbox",       slug: "mapbox",      iconColor: "4264FB" },
  { name: "Leaflet",      slug: "leaflet",     iconColor: "199900" },
  { name: "React Native", slug: "react",       iconColor: "61DAFB" },
  { name: "LangChain",    slug: "langchain",   iconColor: "60a5fa" },
  { name: "PostGIS",      slug: "postgresql",  iconColor: "4ade80" },
  { name: "Supabase",     slug: "supabase",    iconColor: "3ECF8E" },
  { name: "Stripe",       slug: "stripe",      iconColor: "7c3aed" },
  { name: "FastAPI",      slug: "fastapi",     iconColor: "009688" },
  { name: "Jest",         slug: "jest",        iconColor: "C21325" },
  { name: "Terraform",    slug: "terraform",   iconColor: "7B42BC" },
];

function TechCard({ item }: { item: TechItem }) {
  return (
    <div className="flex items-center gap-3.5 px-5 py-3.5 rounded-xl border dark:border-white/[0.07] border-black/[0.07] flex-shrink-0 group dark:hover:border-white/20 dark:hover:bg-white/[0.05] hover:border-black/20 hover:bg-black/[0.03] transition-all duration-300 dark:bg-[#13131E] bg-white min-w-[160px]">
      <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
        {item.customIcon ? (
          item.customIcon
        ) : item.slug ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`https://cdn.simpleicons.org/${item.slug}/${item.iconColor ?? "ffffff"}`}
            alt={item.name}
            width={32}
            height={32}
            className="w-8 h-8 object-contain"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = "none";
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `<span style="font-size:11px;font-weight:700;color:#9ca3af">${item.name.slice(0,2).toUpperCase()}</span>`;
              }
            }}
          />
        ) : null}
      </div>
      <span className="text-[14px] font-medium dark:dark:text-gray-300 text-gray-700 text-gray-700 whitespace-nowrap dark:group-hover:text-white group-hover:text-gray-900 transition-colors duration-300">
        {item.name}
      </span>
    </div>
  );
}

function MarqueeRow({
  items,
  reverse = false,
  speed = 50,
}: {
  items: TechItem[];
  reverse?: boolean;
  speed?: number;
}) {
  const doubled = [...items, ...items];
  const cls = reverse ? "marquee-inner-reverse" : "marquee-inner";

  return (
    <div className="py-2 overflow-hidden">
      <div
        className={`flex gap-3 w-max ${cls}`}
        style={{ "--marquee-speed": `${speed}s` } as React.CSSProperties}
      >
        {doubled.map((item, i) => (
          <TechCard key={i} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function TechStack() {
  return (
    <section className="relative py-20 sm:py-28 bg-background overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full bg-[#1E3A8A]/5 blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#1E3A8A]/40 bg-[#1E3A8A]/10 text-[11px] dark:text-blue-300/90 text-blue-700 mb-6 uppercase tracking-[0.18em] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse flex-shrink-0" />
            Our Tech Arsenal
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground mb-4 tracking-tight">
            Built with the{" "}
            <span className="gradient-text-blue">world&apos;s best</span>{" "}
            tools
          </h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto">
            Enterprise-grade technology stack powering every solution we deliver.
          </p>
        </motion.div>
      </div>

      {/* Marquee rows — faded left/right edges */}
      <div
        className="relative z-10 flex flex-col gap-1"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)",
        }}
      >
        <MarqueeRow items={row1} speed={55} />
        <MarqueeRow items={row2} reverse speed={45} />
        <MarqueeRow items={row3} speed={60} />
      </div>
    </section>
  );
}
