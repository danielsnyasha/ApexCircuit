"use client";

import { motion, type Variants } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { TrendingUp, Users, Star, Layers } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Monthly project growth data Jan 2024 - Jun 2026
const growthData = [
  { month: "Jan '24", projects: 1, clients: 1 },
  { month: "Feb '24", projects: 2, clients: 2 },
  { month: "Mar '24", projects: 3, clients: 2 },
  { month: "Apr '24", projects: 4, clients: 3 },
  { month: "May '24", projects: 5, clients: 4 },
  { month: "Jun '24", projects: 7, clients: 5 },
  { month: "Jul '24", projects: 8, clients: 6 },
  { month: "Aug '24", projects: 10, clients: 7 },
  { month: "Sep '24", projects: 12, clients: 8 },
  { month: "Oct '24", projects: 14, clients: 9 },
  { month: "Nov '24", projects: 16, clients: 11 },
  { month: "Dec '24", projects: 20, clients: 13 },
  { month: "Jan '25", projects: 22, clients: 14 },
  { month: "Feb '25", projects: 25, clients: 16 },
  { month: "Mar '25", projects: 28, clients: 18 },
  { month: "Apr '25", projects: 32, clients: 20 },
  { month: "May '25", projects: 36, clients: 22 },
  { month: "Jun '25", projects: 41, clients: 25 },
  { month: "Jul '25", projects: 46, clients: 28 },
  { month: "Aug '25", projects: 52, clients: 31 },
  { month: "Sep '25", projects: 58, clients: 35 },
  { month: "Oct '25", projects: 65, clients: 39 },
  { month: "Nov '25", projects: 73, clients: 43 },
  { month: "Dec '25", projects: 82, clients: 48 },
  { month: "Jan '26", projects: 88, clients: 52 },
  { month: "Feb '26", projects: 93, clients: 56 },
  { month: "Mar '26", projects: 98, clients: 60 },
  { month: "Apr '26", projects: 104, clients: 64 },
  { month: "May '26", projects: 110, clients: 68 },
  { month: "Jun '26", projects: 118, clients: 73 },
];

// Show every 4th data point for readability
const sparseGrowthData = growthData.filter((_, i) => i % 4 === 0 || i === growthData.length - 1);

// Radar: service capability scores
const radarData = [
  { subject: "App Dev", score: 95 },
  { subject: "Web Dev", score: 92 },
  { subject: "ERP", score: 98 },
  { subject: "GIS", score: 90 },
  { subject: "AI/ML", score: 85 },
  { subject: "PM", score: 88 },
];

// Quarterly revenue/client data
const quarterlyData = [
  { quarter: "Q1 '24", revenue: 5, clients: 3 },
  { quarter: "Q2 '24", revenue: 12, clients: 6 },
  { quarter: "Q3 '24", revenue: 22, clients: 9 },
  { quarter: "Q4 '24", revenue: 38, clients: 14 },
  { quarter: "Q1 '25", revenue: 55, clients: 20 },
  { quarter: "Q2 '25", revenue: 78, clients: 28 },
  { quarter: "Q3 '25", revenue: 105, clients: 37 },
  { quarter: "Q4 '25", revenue: 142, clients: 50 },
  { quarter: "Q1 '26", revenue: 175, clients: 62 },
  { quarter: "Q2 '26", revenue: 210, clients: 76 },
];

const topStats = [
  { icon: TrendingUp, value: "118+", label: "Projects Completed", color: "#8B0000" },
  { icon: Star, value: "98%", label: "Client Satisfaction", color: "#F59E0B" },
  { icon: Layers, value: "6", label: "Service Lines", color: "#2563EB" },
  { icon: Users, value: "4", label: "Team Members", color: "#10B981" },
];

const tooltipStyle = {
  backgroundColor: "#13131E",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "8px",
  color: "#F0F4FF",
  fontSize: "12px",
};

export default function Stats() {
  return (
    <section className="relative py-24 sm:py-32 bg-[#0D0D14] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8B0000]/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#8B0000]/30 bg-[#8B0000]/10 text-sm text-red-300/80 mb-6">
            Our Growth Journey
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Data-Driven <span className="gradient-text">Growth</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Since our founding in 2019, we have been growing rapidly, tracking every metric and improving every quarter.
          </p>
        </motion.div>

        {/* Top Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12"
        >
          {topStats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="glass-card rounded-2xl p-5 border border-white/5 text-center"
            >
              <div
                className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center"
                style={{ background: `${stat.color}20` }}
              >
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Row 1 */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Area Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 glass-card rounded-2xl p-6 border border-white/5"
          >
            <h3 className="text-base font-bold text-white mb-1">Project Growth</h3>
            <p className="text-xs text-gray-500 mb-6">Cumulative projects since January 2024</p>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={sparseGrowthData}>
                <defs>
                  <linearGradient id="projectGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B0000" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#8B0000" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="clientGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#6B7280", fontSize: 10 }}
                  axisLine={{ stroke: "rgba(255,255,255,0.06)" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#6B7280", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend
                  wrapperStyle={{ fontSize: "11px", color: "#9CA3AF" }}
                />
                <Area
                  type="monotone"
                  dataKey="projects"
                  name="Projects"
                  stroke="#8B0000"
                  strokeWidth={2}
                  fill="url(#projectGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="clients"
                  name="Clients"
                  stroke="#2563EB"
                  strokeWidth={2}
                  fill="url(#clientGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="glass-card rounded-2xl p-6 border border-white/5"
          >
            <h3 className="text-base font-bold text-white mb-1">Service Capability</h3>
            <p className="text-xs text-gray-500 mb-4">Proficiency scores by service area</p>
            <ResponsiveContainer width="100%" height={260}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.06)" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: "#9CA3AF", fontSize: 10 }}
                />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="#8B0000"
                  fill="#8B0000"
                  fillOpacity={0.25}
                  strokeWidth={2}
                />
                <Tooltip contentStyle={tooltipStyle} />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass-card rounded-2xl p-6 border border-white/5"
        >
          <h3 className="text-base font-bold text-white mb-1">Quarterly Performance</h3>
          <p className="text-xs text-gray-500 mb-6">Revenue index and client count by quarter (2024 to 2026)</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={quarterlyData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis
                dataKey="quarter"
                tick={{ fill: "#6B7280", fontSize: 10 }}
                axisLine={{ stroke: "rgba(255,255,255,0.06)" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#6B7280", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: "11px", color: "#9CA3AF" }} />
              <Bar dataKey="revenue" name="Revenue Index" fill="#8B0000" radius={[4, 4, 0, 0]} opacity={0.85} />
              <Bar dataKey="clients" name="Clients" fill="#2563EB" radius={[4, 4, 0, 0]} opacity={0.85} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </section>
  );
}
