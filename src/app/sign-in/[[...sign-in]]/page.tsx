import { prisma } from "@/lib/prisma";
import { Enquiry, AdminAllowlist, AccessDeniedLog } from "@prisma/client";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { FileText, Image as ImageIcon, File, Download, ExternalLink } from "lucide-react";
import AdminAllowlistManager from "@/components/AdminAllowlist";
import AccessDeniedScreen from "@/components/AccessDeniedScreen";

type Attachment = {
  url: string;
  publicId: string;
  fileName: string;
  fileType: string;
  resourceType: string;
};

const serviceLabels: Record<string, string> = {
  "enterprise-app": "Enterprise App Dev",
  "web-dev": "Web Development",
  "erp": "ERP Systems",
  "gis": "GIS Development",
  "ai-automation": "AI & Automation",
  "project-management": "Project Management",
};

const budgetLabels: Record<string, string> = {
  "under-5k": "Under $5,000",
  "5k-20k": "$5,000 to $20,000",
  "20k-50k": "$20,000 to $50,000",
  "50k-100k": "$50,000 to $100,000",
  "100k-plus": "$100,000+",
};

const statusColors: Record<string, string> = {
  new: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  read: "bg-gray-500/20 text-gray-300 border-gray-500/30",
  replied: "bg-green-500/20 text-green-300 border-green-500/30",
  archived: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
};

export const dynamic = "force-dynamic";

// ─── Access check ────────────────────────────────────────────────────────────
async function checkAccess(email: string): Promise<{ allowed: boolean; reason?: string }> {
  if (!email) return { allowed: false, reason: "No email address found on your account." };

  try {
    // Seed allowlist on first boot
    const count = await prisma.adminAllowlist.count();
    if (count === 0) {
      const seeds = (process.env.ADMIN_SEED_EMAILS ?? "")
        .split(",")
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean);
      if (seeds.length > 0) {
        await Promise.all(
          seeds.map((e) =>
            prisma.adminAllowlist.upsert({
              where: { email: e },
              update: {},
              create: { email: e, status: "active" },
            })
          )
        );
      }
    }

    const entry = await prisma.adminAllowlist.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!entry) return { allowed: false, reason: "Your email is not on the admin access list." };
    if (entry.status === "suspended") return { allowed: false, reason: "Your access has been suspended." };
    if (entry.status === "temporary" && entry.expiresAt && entry.expiresAt < new Date())
      return { allowed: false, reason: "Your temporary access has expired." };

    return { allowed: true };
  } catch (err) {
    console.error("[checkAccess] error, denying access:", err);
    return { allowed: false, reason: "Access check failed. Contact the system administrator." };
  }
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function AttachmentIcon({ fileType }: { fileType: string }) {
  if (fileType.startsWith("image/")) return <ImageIcon className="w-3.5 h-3.5 text-blue-400" />;
  if (fileType === "application/pdf") return <FileText className="w-3.5 h-3.5 text-red-400" />;
  return <File className="w-3.5 h-3.5 text-gray-400" />;
}

function AttachmentsSection({ attachments }: { attachments: Attachment[] }) {
  if (!attachments || attachments.length === 0) return null;
  const images = attachments.filter((a) => a.fileType.startsWith("image/"));
  const docs = attachments.filter((a) => !a.fileType.startsWith("image/"));

  return (
    <div className="mt-4 pt-4 border-t border-white/5">
      <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-3">
        Attachments ({attachments.length})
      </p>
      {images.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {images.map((att, i) => (
            <a key={i} href={att.url} target="_blank" rel="noopener noreferrer"
              className="group relative w-20 h-20 rounded-xl overflow-hidden border border-white/10 hover:border-white/25 transition-all flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={att.url} alt={att.fileName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <ExternalLink className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </a>
          ))}
        </div>
      )}
      {docs.length > 0 && (
        <div className="space-y-1.5">
          {docs.map((att, i) => (
            <a key={i} href={att.url} target="_blank" rel="noopener noreferrer" download={att.fileName}
              className="flex items-center gap-2.5 rounded-lg bg-white/[0.03] border border-white/5 hover:border-white/15 px-3 py-2 group transition-all">
              <AttachmentIcon fileType={att.fileType} />
              <span className="text-xs text-gray-300 flex-1 truncate group-hover:text-white transition-colors">{att.fileName}</span>
              <Download className="w-3.5 h-3.5 text-gray-600 group-hover:text-gray-400 transition-colors flex-shrink-0" />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function AdminPage() {
  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress ?? "";

  const { allowed, reason } = await checkAccess(email);

  if (!allowed) {
    // Log the denied attempt (fire and forget, don't block render)
    const deniedReason = reason ?? "Not authorised";
    prisma.accessDeniedLog?.create({
      data: { email: email || "unknown", reason: deniedReason },
    }).catch(() => {});

    return (
      <AccessDeniedScreen
        email={email || "unknown"}
        reason={deniedReason}
      />
    );
  }

  const [enquiries, allowlist, deniedLogs] = await Promise.all([
    prisma.enquiry.findMany({ orderBy: { createdAt: "desc" } }) as Promise<Enquiry[]>,
    prisma.adminAllowlist.findMany({ orderBy: { createdAt: "asc" } }) as Promise<AdminAllowlist[]>,
    (prisma.accessDeniedLog?.findMany({ orderBy: { attemptAt: "desc" }, take: 100 }) ?? Promise.resolve([])) as Promise<AccessDeniedLog[]>,
  ]);

  const stats = {
    total: enquiries.length,
    new: enquiries.filter((e) => e.status === "new").length,
    replied: enquiries.filter((e) => e.status === "replied").length,
    withFiles: enquiries.filter((e) => {
      const att = e.attachments as Attachment[] | null;
      return att && att.length > 0;
    }).length,
  };

  return (
    <div className="min-h-screen bg-[#0D0D14] text-[#F0F4FF] p-6 sm:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#8B0000] to-[#A52020] flex items-center justify-center">
              <span className="text-white font-black text-sm">A</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white leading-none">Apex Circuit</h1>
              <p className="text-xs text-gray-500 mt-0.5">Admin Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {user && (
              <span className="text-xs text-gray-500 hidden sm:block">
                {email}
              </span>
            )}
            <a href="/" className="text-xs text-gray-500 hover:text-white transition-colors border border-white/10 rounded-lg px-3 py-1.5">
              Back to site
            </a>
            <UserButton appearance={{ variables: { colorPrimary: "#8B0000" }, elements: { avatarBox: "w-8 h-8" } }} />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Enquiries", value: stats.total, color: "text-white" },
            { label: "New", value: stats.new, color: "text-blue-400" },
            { label: "Replied", value: stats.replied, color: "text-green-400" },
            { label: "With Files", value: stats.withFiles, color: "text-purple-400" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
              <div className={`text-3xl font-bold mb-1 ${s.color}`}>{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Enquiries */}
        <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          Enquiries
          <span className="text-xs text-gray-600 font-normal">({enquiries.length})</span>
        </h2>
        {enquiries.length === 0 ? (
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-16 text-center mb-10">
            <p className="text-gray-500">No enquiries yet.</p>
          </div>
        ) : (
          <div className="space-y-4 mb-12">
            {enquiries.map((e) => {
              const attachments = (e.attachments as Attachment[] | null) ?? [];
              return (
                <div key={e.id} className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 hover:border-white/10 transition-colors">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <p className="font-semibold text-white text-sm">{e.firstName} {e.lastName}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        <a href={`mailto:${e.email}`} className="hover:text-blue-400 transition-colors">{e.email}</a>
                        {e.phone && <span className="ml-2">· {e.phone}</span>}
                        {e.company && <span className="ml-2">· {e.company}</span>}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {attachments.length > 0 && (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full border bg-purple-500/10 text-purple-300 border-purple-500/20">
                          {attachments.length} file{attachments.length > 1 ? "s" : ""}
                        </span>
                      )}
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${statusColors[e.status] ?? statusColors.new}`}>
                        {e.status.toUpperCase()}
                      </span>
                      <span className="text-[10px] text-gray-600">
                        {new Date(e.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {e.service && <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#8B0000]/20 text-red-300 border border-[#8B0000]/30">{serviceLabels[e.service] ?? e.service}</span>}
                    {e.budget && <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-900/20 text-blue-300 border border-blue-800/30">{budgetLabels[e.budget] ?? e.budget}</span>}
                    {e.timeline && <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-400 border border-white/10">{e.timeline}</span>}
                    {e.companySize && <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-400 border border-white/10">{e.companySize} employees</span>}
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">{e.description}</p>
                  <AttachmentsSection attachments={attachments} />
                </div>
              );
            })}
          </div>
        )}

        {/* Allowlist Manager */}
        <AdminAllowlistManager entries={allowlist} />

        {/* Denied Access Log */}
        <div className="mt-8 rounded-2xl border border-white/5 bg-white/[0.02] p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-sm font-bold text-white">Denied Access Attempts</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Emails that tried to access the portal but were blocked.
              </p>
            </div>
            <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-red-900/20 text-red-300 border border-red-800/20">
              {deniedLogs.length} attempt{deniedLogs.length !== 1 ? "s" : ""}
            </span>
          </div>

          {deniedLogs.length === 0 ? (
            <p className="text-xs text-gray-600 py-4 text-center">No denied attempts recorded yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left text-[10px] text-gray-500 uppercase tracking-wider pb-2 pr-4">Email</th>
                    <th className="text-left text-[10px] text-gray-500 uppercase tracking-wider pb-2 pr-4">Reason</th>
                    <th className="text-left text-[10px] text-gray-500 uppercase tracking-wider pb-2">When</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.03]">
                  {deniedLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-2.5 pr-4 font-medium text-white">{log.email}</td>
                      <td className="py-2.5 pr-4 text-gray-400">{log.reason}</td>
                      <td className="py-2.5 text-gray-600 whitespace-nowrap">
                        {new Date(log.attemptAt).toLocaleDateString("en-GB", {
                          day: "numeric", month: "short", year: "numeric",
                          hour: "2-digit", minute: "2-digit",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
