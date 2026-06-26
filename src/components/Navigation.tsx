"use client";

import { useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { Zap, Menu, LayoutDashboard } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Show, UserButton, SignInButton } from "@clerk/nextjs";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Projects", href: "#projects" },
  { label: "Insights", href: "#insights" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

const navVariants: Variants = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleMobileNav = (href: string) => {
    setMobileOpen(false);
    setTimeout(() => scrollTo(href), 150);
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "dark:bg-[#0D0D14]/90 bg-white/90 backdrop-blur-xl border-b dark:border-white/5 border-black/5 shadow-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => scrollTo("#home")}
            className="flex items-center gap-2 group"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8B0000] to-[#DC2626] flex items-center justify-center glow-maroon group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-[#8B0000] to-[#DC2626] rounded-lg blur opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
            </div>
            <span className="text-xl font-bold text-foreground tracking-tight">
              Apex<span className="gradient-text"> Circuit</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    isActive ? "text-foreground" : "dark:text-gray-400 dark:hover:text-white text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/5 rounded-lg border border-white/10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </button>
              );
            })}
          </div>

          {/* CTA + Mobile Menu */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Dashboard + avatar — only visible when signed in */}
            <Show when="signed-in">
              <a
                href="/admin"
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border dark:border-white/10 border-black/10 dark:text-gray-400 dark:hover:text-white dark:hover:border-white/20 text-gray-600 hover:text-gray-900 hover:border-black/20 text-xs font-medium transition-all duration-200"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                Dashboard
              </a>
              <UserButton
                appearance={{
                  variables: { colorPrimary: "#8B0000" },
                  elements: { avatarBox: "w-7 h-7" },
                }}
              />
            </Show>

            {/* Sign In — only visible when signed out */}
            <Show when="signed-out">
              <SignInButton mode="redirect">
                <button className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border dark:border-white/10 border-black/10 dark:text-gray-400 dark:hover:text-white dark:hover:border-white/20 text-gray-600 hover:text-gray-900 hover:border-black/20 text-xs font-medium transition-all duration-200">
                  Sign In
                </button>
              </SignInButton>
            </Show>

            <button
              onClick={() => scrollTo("#contact")}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#8B0000] to-[#A52020] text-white text-sm font-semibold hover:from-[#A52020] hover:to-[#DC2626] transition-all duration-300 shadow-lg shadow-red-900/20"
            >
              Get Started
            </button>

            {/* Mobile Menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                <Menu className="w-5 h-5" />
                <span className="sr-only">Open menu</span>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-72 dark:bg-[#0D0D14] bg-white dark:border-white/10 border-black/10 p-0"
              >
                <div className="flex flex-col h-full p-6 pt-12">
                  <div className="flex items-center gap-2 mb-8">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8B0000] to-[#DC2626] flex items-center justify-center">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xl font-bold text-foreground">
                      Apex<span className="gradient-text"> Circuit</span>
                    </span>
                  </div>

                  <nav className="flex flex-col gap-1">
                    {navLinks.map((link) => (
                      <button
                        key={link.label}
                        onClick={() => handleMobileNav(link.href)}
                        className="text-left px-4 py-3 dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/5 text-gray-700 hover:text-gray-900 hover:bg-black/5 rounded-lg transition-all duration-200 text-sm font-medium"
                      >
                        {link.label}
                      </button>
                    ))}
                  </nav>

                  <div className="mt-auto flex flex-col gap-2">
                    <div className="flex justify-center"><ThemeToggle /></div>
                    <Show when="signed-out">
                      <SignInButton mode="redirect">
                        <button className="w-full px-4 py-3 rounded-lg border dark:border-white/10 border-black/10 dark:text-gray-300 dark:hover:text-white dark:hover:border-white/20 text-gray-700 hover:text-gray-900 hover:border-black/20 text-sm font-medium transition-all duration-200">
                          Sign In
                        </button>
                      </SignInButton>
                    </Show>
                    <Show when="signed-in">
                      <a
                        href="/admin"
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border dark:border-white/10 border-black/10 dark:text-gray-300 dark:hover:text-white text-gray-700 hover:text-gray-900 text-sm font-medium transition-all duration-200"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                      </a>
                    </Show>
                    <button
                      onClick={() => handleMobileNav("#contact")}
                      className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-[#8B0000] to-[#A52020] text-white text-sm font-semibold hover:from-[#A52020] hover:to-[#DC2626] transition-all duration-300"
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
