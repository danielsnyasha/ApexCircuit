"use client";

import { useState, useTransition } from "react";
import { UserPlus, Trash2, ShieldOff, ShieldCheck, Clock, Loader2, ChevronDown } from "lucide-react";
import {
  addAdminEmail,
  suspendAdminEmail,
  activateAdminEmail,
  grantTemporaryAccess,
  removeAdminEmail,
} from "@/app/admin/actions";

type AllowlistEntry = {
  id: string;
  email: string;
  label: string | null;
  status: string;
  expiresAt: Date | string | null;
  createdAt: Date | string;
};

const statusStyle: Record<string, string> = {
  active:    "bg-green-500/15 text-green-300 border-green-500/25",
  suspended: "bg-red-500/15 text-red-300 border-red-500/25",
  temporary: "bg-yellow-500/15 text-yellow-300 border-yellow-500/25",
};

function StatusBadge({ entry }: { entry: AllowlistEntry }) {
  const expired =
    entry.status === "temporary" &&
    entry.expiresAt &&
    new Date(entry.expiresAt) < new Date();
  const label = expired ? "expired" : entry.status;
  const style = expired ? "bg-gray-500/15 text-gray-400 border-gray-500/25" : statusStyle[entry.status];
  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border uppercase tracking-wide ${style}`}>
      {label}
      {entry.status === "temporary" && entry.expiresAt && !expired && (
        <span className="ml-1 font-normal normal-case">
          until {new Date(entry.expiresAt).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
        </span>
      )}
    </span>
  );
}

function ActionButton({
  onClick,
  icon: Icon,
  label,
  danger,
}: {
  onClick: () => void;
  icon: React.ElementType;
  label: string;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      title={label}
      className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all duration-200 border ${
        danger
          ? "border-red-800/30 text-red-400 hover:bg-red-900/20"
          : "border-white/10 text-gray-400 hover:text-white hover:bg-white/5"
      }`}
    >
      <Icon className="w-3 h-3" />
      {label}
    </button>
  );
}

export default function AdminAllowlist({ entries }: { entries: AllowlistEntry[] }) {
  const [pending, startTransition] = useTransition();
  const [showAdd, setShowAdd] = useState(false);
  const [tempHours, setTempHours] = useState<Record<string, number>>({});
  const [showTempFor, setShowTempFor] = useState<string | null>(null);

  const run = (fn: () => Promise<void>) => startTransition(() => { fn(); });

  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-sm font-bold text-white">Admin Access Control</h2>
          <p className="text-xs text-gray-500 mt-0.5">Only these email addresses can access this portal.</p>
        </div>
        <button
          onClick={() => setShowAdd((v) => !v)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-[#8B0000] to-[#A52020] text-white text-xs font-semibold hover:from-[#A52020] hover:to-[#DC2626] transition-all duration-200"
        >
          <UserPlus className="w-3.5 h-3.5" />
          Add Email
        </button>
      </div>

      {/* Add form */}
      {showAdd && (
        <form
          action={async (fd) => {
            await addAdminEmail(fd);
            setShowAdd(false);
          }}
          className="mb-5 flex flex-col sm:flex-row gap-2 p-4 rounded-xl bg-white/[0.03] border border-white/5"
        >
          <input
            name="email"
            type="email"
            required
            placeholder="email@example.com"
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-white/20"
          />
          <input
            name="label"
            type="text"
            placeholder="Label (optional)"
            className="w-36 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-white/20"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-[#8B0000] text-white text-xs font-semibold hover:bg-[#A52020] transition-colors"
          >
            {pending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Grant Access"}
          </button>
          <button
            type="button"
            onClick={() => setShowAdd(false)}
            className="px-3 py-2 rounded-lg border border-white/10 text-gray-400 text-xs hover:text-white transition-colors"
          >
            Cancel
          </button>
        </form>
      )}

      {/* Entries */}
      {entries.length === 0 ? (
        <p className="text-xs text-gray-500 py-4 text-center">No entries yet.</p>
      ) : (
        <div className="space-y-2">
          {entries.map((entry) => {
            const isExpired =
              entry.status === "temporary" &&
              entry.expiresAt &&
              new Date(entry.expiresAt) < new Date();

            return (
              <div
                key={entry.id}
                className="flex flex-wrap items-center gap-3 rounded-xl bg-white/[0.02] border border-white/5 px-4 py-3"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white font-medium truncate">{entry.email}</p>
                  {entry.label && (
                    <p className="text-[10px] text-gray-500">{entry.label}</p>
                  )}
                </div>

                <StatusBadge entry={entry} />

                {/* Actions */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {(entry.status === "suspended" || isExpired) && (
                    <ActionButton
                      onClick={() => run(() => activateAdminEmail(entry.id))}
                      icon={ShieldCheck}
                      label="Activate"
                    />
                  )}
                  {entry.status === "active" && (
                    <ActionButton
                      onClick={() => run(() => suspendAdminEmail(entry.id))}
                      icon={ShieldOff}
                      label="Suspend"
                      danger
                    />
                  )}

                  {/* Temporary access picker */}
                  <div className="relative">
                    <button
                      onClick={() => setShowTempFor(showTempFor === entry.id ? null : entry.id)}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-medium border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200"
                    >
                      <Clock className="w-3 h-3" />
                      Temp
                      <ChevronDown className="w-3 h-3" />
                    </button>
                    {showTempFor === entry.id && (
                      <div className="absolute right-0 top-full mt-1 z-20 bg-[#1A1A2E] border border-white/10 rounded-xl p-3 shadow-2xl w-48">
                        <p className="text-[10px] text-gray-500 mb-2">Grant temporary access for:</p>
                        {[1, 6, 24, 72].map((h) => (
                          <button
                            key={h}
                            onClick={() => {
                              run(() => grantTemporaryAccess(entry.id, h));
                              setShowTempFor(null);
                            }}
                            className="w-full text-left px-3 py-1.5 text-xs text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                          >
                            {h < 24 ? `${h} hour${h > 1 ? "s" : ""}` : `${h / 24} day${h > 24 ? "s" : ""}`}
                          </button>
                        ))}
                        <div className="flex items-center gap-1 mt-2 pt-2 border-t border-white/5">
                          <input
                            type="number"
                            min={1}
                            max={720}
                            value={tempHours[entry.id] ?? ""}
                            onChange={(e) => setTempHours((p) => ({ ...p, [entry.id]: Number(e.target.value) }))}
                            placeholder="hrs"
                            className="w-16 bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs text-white focus:outline-none"
                          />
                          <button
                            onClick={() => {
                              const h = tempHours[entry.id];
                              if (!h) return;
                              run(() => grantTemporaryAccess(entry.id, h));
                              setShowTempFor(null);
                            }}
                            className="flex-1 px-2 py-1 rounded-lg bg-[#8B0000] text-white text-xs font-medium hover:bg-[#A52020] transition-colors"
                          >
                            Set
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <ActionButton
                    onClick={() => {
                      if (confirm(`Remove ${entry.email} from admin access?`)) {
                        run(() => removeAdminEmail(entry.id));
                      }
                    }}
                    icon={Trash2}
                    label="Remove"
                    danger
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {pending && (
        <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          Updating...
        </div>
      )}
    </div>
  );
}
