"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, ExternalLink, ArrowUp, ArrowRight, CheckCircle2 } from "lucide-react";

const footerLinks = {
  Company: [
    { label: "About", href: "#about" },
    { label: "Team", href: "#team" },
    { label: "Vision", href: "#vision" },
    { label: "Contact", href: "#contact" },
  ],
  Services: [
    { label: "Enterprise Apps", href: "#services" },
    { label: "Web Development", href: "#services" },
    { label: "ERP Systems", href: "#services" },
    { label: "GIS Development", href: "#services" },
  ],
  Solutions: [
    { label: "AI Automation", href: "#services" },
    { label: "Project Management", href: "#services" },
    { label: "Digital Transformation", href: "#contact" },
    { label: "Tech Consulting", href: "#contact" },
  ],
  Connect: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/nyasha-musanhu-aa164794/",
      external: true,
    },
    { label: "Get Started", href: "#contact" },
    { label: "Careers", href: "#contact" },
    { label: "Sandton, South Africa", href: "#", noLink: true },
    { label: "London, United Kingdom", href: "#", noLink: true },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubscribed(true);
    setLoading(false);
  };

  const scrollTo = (href: string) => {
    if (href.startsWith("http")) {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }
    const id = href.replace("#", "");
    if (id) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-background border-t dark:border-white/5 border-black/5 overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8B0000]/40 to-transparent" />

      {/* Background */}
      <div className="absolute inset-0 dot-grid opacity-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-14 grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 mb-4 group"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8B0000] to-[#DC2626] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">
                Apex<span className="gradient-text"> Circuit</span>
              </span>
            </button>

            <p className="text-sm text-gray-500 leading-relaxed mb-5 max-w-xs">
              A global enterprise technology partner serving clients across Europe, the UK, and beyond. We don&apos;t consult.
              We deliver solutions that transform how organizations operate.
            </p>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs text-gray-600 italic">
                &ldquo;Your Shortcut to Excellence&rdquo;
              </span>
            </div>

            <a
              href="https://www.linkedin.com/in/nyasha-musanhu-aa164794/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0A66C2]/15 border border-[#0A66C2]/20 text-[#60A5FA] text-xs font-medium hover:bg-[#0A66C2]/25 transition-all duration-300"
            >
              <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              Follow on LinkedIn
            </a>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="col-span-1">
              <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    {"noLink" in link && link.noLink ? (
                      <span className="text-sm text-gray-600">{link.label}</span>
                    ) : (
                      <button
                        onClick={() => scrollTo(link.href)}
                        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300 transition-colors duration-200 group"
                      >
                        {link.label}
                        {"external" in link && link.external && (
                          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border-t dark:border-white/5 border-black/5 py-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <h4 className="text-sm font-bold text-foreground mb-1">Monthly tech insights — no spam.</h4>
              <p className="text-xs text-gray-500">Deep dives on ERP, GIS, AI automation, and enterprise engineering. One email per month.</p>
            </div>
            {subscribed ? (
              <div className="flex items-center gap-2 text-green-400 text-sm font-semibold shrink-0">
                <CheckCircle2 className="w-4 h-4" />
                You&apos;re subscribed!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 shrink-0">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="px-4 py-2.5 rounded-xl dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder-gray-600 bg-white border-black/10 text-foreground placeholder-gray-400 focus:outline-none focus:border-[#8B0000]/50 transition-all duration-200 w-56"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#8B0000] to-[#A52020] text-white text-sm font-bold hover:from-[#A52020] hover:to-[#DC2626] transition-all duration-300 disabled:opacity-60 group"
                >
                  {loading ? "..." : (
                    <>
                      Subscribe
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t dark:border-white/5 border-black/5 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-xs text-gray-600">
            <span>© 2019–2026 Apex Circuit. All rights reserved.</span>
            <span className="hidden sm:block">·</span>
            <span>Crafted with precision. Delivered globally.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-700">Apex Circuit Ltd.</span>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 transition-all duration-300"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
