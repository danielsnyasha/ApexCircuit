"use client";

import { motion } from "framer-motion";
import { BookOpen, ArrowRight, Clock, Tag } from "lucide-react";

const articles = [
  {
    slug: "erpnext-implementation-guide",
    category: "ERP",
    categoryColor: "text-cyan-400",
    categoryBg: "bg-cyan-900/20 border-cyan-800/30",
    title: "ERPNext in 90 Days: Our Proven Implementation Framework",
    excerpt:
      "Most ERP projects run over budget and over time. Here's the exact phased approach we use to get organisations fully live in 90 days — from requirements through go-live and adoption.",
    readTime: "8 min read",
    date: "Jan 2025",
    gradient: "from-[#0891B2] to-[#06B6D4]",
  },
  {
    slug: "postgis-spatial-queries",
    category: "GIS",
    categoryColor: "text-yellow-400",
    categoryBg: "bg-yellow-900/20 border-yellow-800/30",
    title: "PostGIS for Developers: Spatial Queries That Actually Scale",
    excerpt:
      "ST_DWithin, spatial indexes, and why most GIS implementations are 10x slower than they need to be. A practical deep-dive for backend engineers building location-aware systems.",
    readTime: "11 min read",
    date: "Feb 2025",
    gradient: "from-[#D97706] to-[#F59E0B]",
  },
  {
    slug: "react-native-offline-first",
    category: "Mobile",
    categoryColor: "text-red-400",
    categoryBg: "bg-red-900/20 border-red-800/30",
    title: "Building Offline-First React Native Apps for Enterprise",
    excerpt:
      "Field agents don't have 5G. Here's how we architect sync engines, conflict resolution, and optimistic UI in React Native to keep enterprise apps working in any connectivity environment.",
    readTime: "9 min read",
    date: "Mar 2025",
    gradient: "from-[#8B0000] to-[#DC2626]",
  },
  {
    slug: "ai-automation-business-case",
    category: "AI & Automation",
    categoryColor: "text-purple-400",
    categoryBg: "bg-purple-900/20 border-purple-800/30",
    title: "How to Build a Business Case for AI Automation in 2025",
    excerpt:
      "CFOs don't buy 'AI'. They buy ROI. We break down how to quantify automation value — from hours saved to error rate reduction — and present it in a language that gets sign-off.",
    readTime: "7 min read",
    date: "Apr 2025",
    gradient: "from-[#7C3AED] to-[#A78BFA]",
  },
  {
    slug: "nextjs-ssr-performance",
    category: "Web Dev",
    categoryColor: "text-green-400",
    categoryBg: "bg-green-900/20 border-green-800/30",
    title: "Next.js App Router: SSR vs SSG vs ISR — When to Use Each",
    excerpt:
      "The App Router changed the rendering model fundamentally. This guide cuts through the confusion and shows exactly when to reach for each strategy in production applications.",
    readTime: "10 min read",
    date: "May 2025",
    gradient: "from-[#059669] to-[#10B981]",
  },
  {
    slug: "enterprise-security-checklist",
    category: "Security",
    categoryColor: "text-blue-400",
    categoryBg: "bg-blue-900/20 border-blue-800/30",
    title: "Enterprise Application Security: The 12-Point Checklist",
    excerpt:
      "From OWASP Top 10 to JWT handling, secrets management, and pen testing — the security baseline every enterprise application should meet before going to production.",
    readTime: "12 min read",
    date: "Jun 2025",
    gradient: "from-[#1E3A8A] to-[#2563EB]",
  },
];

export default function Insights() {
  return (
    <section id="insights" className="relative py-24 sm:py-32 bg-[#0D0D14] overflow-hidden">
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
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#8B0000]/30 bg-[#8B0000]/10 text-sm text-red-300/80 mb-6">
              <BookOpen className="w-3.5 h-3.5" />
              Insights
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Engineering{" "}
              <span className="gradient-text">Knowledge</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-xl">
              Deep technical writing from practitioners. No fluff — just the hard-won
              lessons from real enterprise projects.
            </p>
          </div>
          <div className="shrink-0">
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-gray-300 text-sm font-medium hover:text-white hover:border-white/20 hover:bg-white/5 transition-all duration-300 group"
            >
              Get articles by email
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Featured article (first) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 rounded-2xl border border-white/8 bg-white/[0.02] overflow-hidden group hover:border-white/15 transition-colors duration-300"
        >
          <div className="grid sm:grid-cols-5">
            {/* Color band */}
            <div className={`sm:col-span-1 h-2 sm:h-auto bg-gradient-to-br ${articles[0].gradient} opacity-70`} />
            <div className="sm:col-span-4 p-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border ${articles[0].categoryBg} ${articles[0].categoryColor}`}>
                  <Tag className="w-3 h-3" />
                  {articles[0].category}
                </span>
                <span className="text-xs text-gray-600 flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  {articles[0].readTime}
                </span>
                <span className="text-xs text-gray-600">{articles[0].date}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-gray-100 transition-colors">
                {articles[0].title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-5">{articles[0].excerpt}</p>
              <span className={`inline-flex items-center gap-1.5 text-sm font-semibold ${articles[0].categoryColor} group-hover:gap-2.5 transition-all duration-200`}>
                Read article
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </motion.div>

        {/* Grid of remaining articles */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.slice(1).map((article, i) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group rounded-2xl border border-white/8 bg-white/[0.02] overflow-hidden hover:border-white/15 transition-colors duration-300 flex flex-col"
            >
              {/* Top gradient band */}
              <div className={`h-1.5 bg-gradient-to-r ${article.gradient}`} />

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold border ${article.categoryBg} ${article.categoryColor}`}>
                    <Tag className="w-2.5 h-2.5" />
                    {article.category}
                  </span>
                  <span className="text-[11px] text-gray-600 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-gray-100 transition-colors flex-1">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-5 line-clamp-3">{article.excerpt}</p>

                <div className="flex items-center justify-between mt-auto">
                  <span className="text-[11px] text-gray-600">{article.date}</span>
                  <span className={`inline-flex items-center gap-1 text-[11px] font-semibold ${article.categoryColor} group-hover:gap-1.5 transition-all duration-200`}>
                    Read
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-gray-500 mb-4">
            New articles published monthly. Get them straight to your inbox.
          </p>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#8B0000] to-[#A52020] text-white font-bold text-sm hover:from-[#A52020] hover:to-[#DC2626] transition-all duration-300 shadow-lg shadow-red-900/20 group"
          >
            Subscribe to Insights
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
