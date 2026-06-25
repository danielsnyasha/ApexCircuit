"use client";

import { useEffect, useState } from "react";
import { ShieldX } from "lucide-react";

export default function AccessDeniedScreen({
  email,
  reason,
}: {
  email: string;
  reason: string;
}) {
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    if (seconds <= 0) {
      window.location.href = "/";
      return;
    }
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  return (
    <div className="min-h-screen bg-[#0D0D14] flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-full bg-red-900/20 flex items-center justify-center mx-auto mb-5">
          <ShieldX className="w-8 h-8 text-red-400" />
        </div>

        <h1 className="text-xl font-bold text-white mb-2">Access Denied</h1>
        <p className="text-gray-400 text-sm mb-3">{reason}</p>
        <p className="text-xs text-gray-600 mb-6">Signed in as: {email}</p>

        {/* Countdown ring */}
        <div className="flex flex-col items-center gap-3 mb-6">
          <div className="relative w-16 h-16">
            <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
              <circle
                cx="32" cy="32" r="28"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="4"
              />
              <circle
                cx="32" cy="32" r="28"
                fill="none"
                stroke="#8B0000"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 28}`}
                strokeDashoffset={`${2 * Math.PI * 28 * (1 - seconds / 10)}`}
                style={{ transition: "stroke-dashoffset 1s linear" }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">
              {seconds}
            </span>
          </div>
          <p className="text-xs text-gray-500">
            Redirecting to site in {seconds} second{seconds !== 1 ? "s" : ""}...
          </p>
        </div>

        <a
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 text-gray-400 hover:text-white text-sm transition-colors"
        >
          Back to site now
        </a>
      </div>
    </div>
  );
}
