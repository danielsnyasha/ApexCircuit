"use client";

import { useState } from "react";
import { MessageCircle, X, Mail, Phone, ExternalLink, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP_NUMBER = "447XXXXXXXXX"; // Replace with your WhatsApp number (no + or spaces)
const EMAIL = "hello@apexcircuit.co.zw";
const LINKEDIN = "https://www.linkedin.com/in/nyasha-musanhu-aa164794/";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[9000] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="w-72 rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60"
            style={{ background: "#13131E" }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#8B0000] to-[#A52020] px-5 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
                    <span className="text-white font-black text-sm">A</span>
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm leading-none">Apex Circuit</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-white/70 text-[10px]">Available now</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-5">
              <p className="text-gray-400 text-xs leading-relaxed mb-5">
                Hi there! Ready to start your project? Reach out directly and we&apos;ll get back to you within a few hours.
              </p>

              <div className="space-y-2.5">
                {/* Email */}
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-center gap-3 p-3 rounded-xl border border-white/5 hover:border-white/15 hover:bg-white/[0.03] transition-all duration-200 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#8B0000]/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-3.5 h-3.5 text-red-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-gray-500">Email us</p>
                    <p className="text-xs text-white truncate">{EMAIL}</p>
                  </div>
                  <Send className="w-3 h-3 text-gray-600 group-hover:text-gray-400 transition-colors" />
                </a>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Apex%20Circuit%2C%20I%27d%20like%20to%20discuss%20a%20project.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl border dark:border-white/5 border-black/5 hover:border-green-500/30 dark:hover:bg-green-900/10 hover:bg-green-50/80 transition-all duration-200 group"
                >
                  <div className="w-8 h-8 rounded-lg dark:bg-green-900/20 bg-green-50 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-3.5 h-3.5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-500">WhatsApp</p>
                    <p className="text-xs text-white">Chat instantly</p>
                  </div>
                  <Send className="w-3 h-3 text-gray-600 group-hover:text-green-400 transition-colors ml-auto" />
                </a>

                {/* LinkedIn */}
                <a
                  href={LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl border dark:border-white/5 border-black/5 hover:border-blue-500/30 dark:hover:bg-blue-900/10 hover:bg-blue-50/80 transition-all duration-200 group"
                >
                  <div className="w-8 h-8 rounded-lg dark:bg-blue-900/20 bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-500">LinkedIn</p>
                    <p className="text-xs text-white">Connect with us</p>
                  </div>
                  <Send className="w-3 h-3 text-gray-600 group-hover:text-blue-400 transition-colors ml-auto" />
                </a>
              </div>

              <button
                onClick={() => {
                  setOpen(false);
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full mt-4 py-2.5 rounded-xl bg-gradient-to-r from-[#8B0000] to-[#A52020] text-white text-xs font-semibold hover:from-[#A52020] hover:to-[#DC2626] transition-all duration-300"
              >
                Send a Detailed Enquiry
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8B0000] to-[#A52020] flex items-center justify-center shadow-2xl shadow-red-900/40 hover:from-[#A52020] hover:to-[#DC2626] transition-all duration-300"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
        {/* Pulse ring */}
        {!open && (
          <span className="absolute inset-0 rounded-2xl animate-ping bg-[#8B0000]/30 pointer-events-none" />
        )}
      </motion.button>
    </div>
  );
}
