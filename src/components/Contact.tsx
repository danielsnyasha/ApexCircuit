"use client";

import { useState, useRef, useCallback, type FormEvent, type DragEvent } from "react";
import { motion, type Variants } from "framer-motion";
import {
  Mail, MapPin, Send, CheckCircle2, Loader2, ExternalLink,
  Upload, X, FileText, Image as ImageIcon, File,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
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

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@apexcircuit.co.zw",
    href: "mailto:hello@apexcircuit.co.zw",
    color: "#8B0000",
    bg: "dark:bg-red-900/20 bg-red-50",
  },
  {
    icon: MapPin,
    label: "Sandton, South Africa",
    value: "Johannesburg Metro",
    href: "#",
    color: "#2563EB",
    bg: "dark:bg-blue-900/20 bg-blue-50",
  },
  {
    icon: MapPin,
    label: "London, United Kingdom",
    value: "Greater London",
    href: "#",
    color: "#60A5FA",
    bg: "dark:bg-blue-900/10 bg-blue-50/50",
  },
  {
    icon: ExternalLink,
    label: "LinkedIn",
    value: "Connect with us",
    href: "https://www.linkedin.com/in/nyasha-musanhu-aa164794/",
    color: "#0A66C2",
    bg: "dark:bg-blue-900/20 bg-blue-50",
  },
];

type AttachedFile = {
  file: File;
  preview?: string;
};

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  timeline: string;
  companySize: string;
  description: string;
  newsletter: boolean;
};

const initialState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  budget: "",
  timeline: "",
  companySize: "",
  description: "",
  newsletter: false,
};

const ACCEPTED = [
  "image/jpeg", "image/png", "image/gif", "image/webp",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
];

const MAX_FILES = 5;
const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

function fileIcon(type: string) {
  if (type.startsWith("image/")) return <ImageIcon className="w-4 h-4 text-blue-400" />;
  if (type === "application/pdf") return <FileText className="w-4 h-4 text-red-400" />;
  return <File className="w-4 h-4 text-gray-400" />;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function Contact() {
  const [form, setForm] = useState<FormState>(initialState);
  const [files, setFiles] = useState<AttachedFile[]>([]);
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [fileError, setFileError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInput = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSelect = (field: keyof FormState) => (value: string | null) =>
    setForm((prev) => ({ ...prev, [field]: value ?? "" }));

  const addFiles = useCallback((incoming: FileList | null) => {
    if (!incoming) return;
    setFileError("");
    const next = [...files];
    for (const f of Array.from(incoming)) {
      if (next.length >= MAX_FILES) { setFileError(`Maximum ${MAX_FILES} files allowed.`); break; }
      if (!ACCEPTED.includes(f.type)) { setFileError(`"${f.name}" is not a supported file type.`); continue; }
      if (f.size > MAX_SIZE) { setFileError(`"${f.name}" exceeds the 10 MB limit.`); continue; }
      const preview = f.type.startsWith("image/") ? URL.createObjectURL(f) : undefined;
      next.push({ file: f, preview });
    }
    setFiles(next);
  }, [files]);

  const removeFile = (idx: number) => {
    setFiles((prev) => {
      const copy = [...prev];
      if (copy[idx].preview) URL.revokeObjectURL(copy[idx].preview!);
      copy.splice(idx, 1);
      return copy;
    });
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)));
      files.forEach(({ file }) => fd.append("attachments", file));

      const res = await fetch("/api/enquiries", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder:text-gray-600 bg-white border-black/10 text-foreground placeholder:text-gray-400 focus:border-[#8B0000]/50 focus:ring-[#8B0000]/20 h-10 rounded-xl";

  return (
    <section className="relative py-24 sm:py-32 bg-background overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8B0000]/40 to-transparent" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-[#8B0000]/5 to-transparent" />
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-[#1E3A8A]/8 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#8B0000]/30 bg-[#8B0000]/10 text-sm dark:text-red-300/80 text-red-700 mb-6">
            Let&apos;s Build Together
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Start Your <span className="gradient-text">Project</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Tell us about your project. We&apos;ll get back within 24 hours with
            a clear plan or tell you honestly if we&apos;re not the right fit.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
          {/* Left: Contact Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold text-foreground mb-2">Get In Touch</h3>
              <p className="dark:text-gray-400 text-gray-600 text-sm leading-relaxed">
                We&apos;re a team of engineers who genuinely care about what we build.
                Reach out and let&apos;s start a conversation.
              </p>
            </motion.div>

            <div className="space-y-3">
              {contactInfo.map((info) => (
                <motion.a
                  key={info.label}
                  variants={itemVariants}
                  href={info.href}
                  target={info.href.startsWith("http") ? "_blank" : undefined}
                  rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 glass-card rounded-xl p-4 border dark:border-white/5 dark:hover:border-white/10 border-black/5 hover:border-black/10 transition-all duration-300 group"
                >
                  <div className={`w-10 h-10 rounded-lg ${info.bg} flex items-center justify-center shrink-0`}>
                    <info.icon className="w-4 h-4" style={{ color: info.color }} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{info.label}</p>
                    <p className="text-sm text-foreground font-medium group-hover:opacity-80 transition-opacity">
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.div
              variants={itemVariants}
              className="rounded-xl p-4 bg-gradient-to-br from-[#8B0000]/10 to-[#1E3A8A]/5 border border-[#8B0000]/20"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-medium text-foreground">Available for Projects</span>
              </div>
              <p className="text-xs text-gray-500">
                We respond within 24 hours. For urgent requests, reach out on LinkedIn.
              </p>
            </motion.div>

            {/* Upload hint */}
            <motion.div
              variants={itemVariants}
              className="rounded-xl p-4 bg-white/[0.02] border border-white/5"
            >
              <p className="text-xs font-semibold text-foreground mb-1.5">Share your project files</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Attach wireframes, briefs, spreadsheets, or reference images directly in the form.
                Supported: PNG, JPG, PDF, Word, Excel, PowerPoint (max 10 MB each, up to 5 files).
              </p>
            </motion.div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3"
          >
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/5">
              {status === "error" && (
                <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-800/40 bg-red-900/10 px-4 py-3 text-sm text-red-400">
                  <span>Something went wrong. Please try again or reach out on LinkedIn.</span>
                  <button onClick={() => setStatus("idle")} className="ml-auto text-xs underline">Dismiss</button>
                </div>
              )}
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Message Received!</h3>
                  <p className="text-gray-400 text-sm max-w-xs">
                    We&apos;ll review your project details and get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setStatus("idle"); setForm(initialState); setFiles([]); }}
                    className="mt-6 text-sm text-[#60A5FA] hover:text-blue-300 transition-colors"
                  >
                    Submit another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name Row */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="firstName" className="text-xs text-gray-400">
                        First Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="firstName"
                        placeholder="Alex"
                        value={form.firstName}
                        onChange={handleInput("firstName")}
                        required
                        className={inputClass}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="lastName" className="text-xs text-gray-400">
                        Last Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="lastName"
                        placeholder="Scott"
                        value={form.lastName}
                        onChange={handleInput("lastName")}
                        required
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Email / Phone */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-xs text-gray-400">
                        Email Address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        value={form.email}
                        onChange={handleInput("email")}
                        required
                        className={inputClass}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="phone" className="text-xs text-gray-400">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+263 7X XXX XXXX"
                        value={form.phone}
                        onChange={handleInput("phone")}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div className="space-y-1.5">
                    <Label htmlFor="company" className="text-xs text-gray-400">Company / Organization</Label>
                    <Input
                      id="company"
                      placeholder="Acme Corp"
                      value={form.company}
                      onChange={handleInput("company")}
                      className={inputClass}
                    />
                  </div>

                  {/* Service + Budget */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs text-gray-400">
                        Service Required <span className="text-red-500">*</span>
                      </Label>
                      <Select onValueChange={handleSelect("service")} value={form.service}>
                        <SelectTrigger className={`${inputClass} w-full`}>
                          <SelectValue placeholder="Select service..." />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-[#13131E] bg-white dark:border-white/10 border-black/10 dark:text-white text-foreground">
                          <SelectItem value="enterprise-app">Enterprise App Development</SelectItem>
                          <SelectItem value="web-dev">Web Development</SelectItem>
                          <SelectItem value="erp">ERP Systems (ERPNext)</SelectItem>
                          <SelectItem value="gis">GIS Development</SelectItem>
                          <SelectItem value="ai-automation">AI &amp; Automation</SelectItem>
                          <SelectItem value="project-management">Project Management</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs text-gray-400">Project Budget</Label>
                      <Select onValueChange={handleSelect("budget")} value={form.budget}>
                        <SelectTrigger className={`${inputClass} w-full`}>
                          <SelectValue placeholder="Select budget..." />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-[#13131E] bg-white dark:border-white/10 border-black/10 dark:text-white text-foreground">
                          <SelectItem value="under-5k">Under $5,000</SelectItem>
                          <SelectItem value="5k-20k">$5,000 to $20,000</SelectItem>
                          <SelectItem value="20k-50k">$20,000 to $50,000</SelectItem>
                          <SelectItem value="50k-100k">$50,000 to $100,000</SelectItem>
                          <SelectItem value="100k-plus">$100,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Timeline + Company Size */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs text-gray-400">Timeline</Label>
                      <Select onValueChange={handleSelect("timeline")} value={form.timeline}>
                        <SelectTrigger className={`${inputClass} w-full`}>
                          <SelectValue placeholder="Select timeline..." />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-[#13131E] bg-white dark:border-white/10 border-black/10 dark:text-white text-foreground">
                          <SelectItem value="asap">ASAP</SelectItem>
                          <SelectItem value="1-3m">1 to 3 months</SelectItem>
                          <SelectItem value="3-6m">3 to 6 months</SelectItem>
                          <SelectItem value="6-12m">6 to 12 months</SelectItem>
                          <SelectItem value="12m-plus">12+ months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs text-gray-400">Company Size</Label>
                      <Select onValueChange={handleSelect("companySize")} value={form.companySize}>
                        <SelectTrigger className={`${inputClass} w-full`}>
                          <SelectValue placeholder="Select size..." />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-[#13131E] bg-white dark:border-white/10 border-black/10 dark:text-white text-foreground">
                          <SelectItem value="1-10">1 to 10 employees</SelectItem>
                          <SelectItem value="11-50">11 to 50 employees</SelectItem>
                          <SelectItem value="51-200">51 to 200 employees</SelectItem>
                          <SelectItem value="200-1000">200 to 1,000 employees</SelectItem>
                          <SelectItem value="1000-plus">1,000+ employees</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-1.5">
                    <Label htmlFor="description" className="text-xs text-gray-400">
                      Project Description <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Tell us about your project: goals, challenges, current systems, and what success looks like..."
                      value={form.description}
                      onChange={handleInput("description")}
                      required
                      rows={4}
                      className="dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder:text-gray-600 bg-white border-black/10 text-foreground placeholder:text-gray-400 focus:border-[#8B0000]/50 focus:ring-[#8B0000]/20 rounded-xl resize-none"
                    />
                  </div>

                  {/* File Upload Zone */}
                  <div className="space-y-2">
                    <Label className="text-xs text-gray-400">
                      Attachments
                      <span className="ml-1 text-gray-600 font-normal">(images, PDFs, documents — up to 5 files, 10 MB each)</span>
                    </Label>

                    {/* Drop Zone */}
                    <div
                      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                      onDragLeave={() => setDragging(false)}
                      onDrop={onDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-6 cursor-pointer transition-all duration-200 ${
                        dragging
                          ? "border-[#8B0000]/60 bg-[#8B0000]/10"
                          : "dark:border-white/10 dark:hover:border-white/20 dark:hover:bg-white/[0.02] border-black/10 hover:border-black/20 hover:bg-black/[0.02]"
                      }`}
                    >
                      <Upload className={`w-7 h-7 ${dragging ? "text-red-400" : "text-gray-600"}`} />
                      <p className="text-xs text-gray-500 text-center">
                        <span className="text-foreground font-medium">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-[10px] text-gray-600">PNG, JPG, PDF, DOCX, XLSX, PPTX</p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept={ACCEPTED.join(",")}
                        onChange={(e) => addFiles(e.target.files)}
                        className="hidden"
                      />
                    </div>

                    {fileError && (
                      <p className="text-xs text-red-400">{fileError}</p>
                    )}

                    {/* File previews */}
                    {files.length > 0 && (
                      <div className="space-y-2 mt-1">
                        {files.map((af, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 rounded-xl dark:bg-white/[0.03] dark:border-white/5 bg-black/[0.02] border border-black/5 px-3 py-2.5"
                          >
                            {af.preview ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={af.preview}
                                alt={af.file.name}
                                className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                                {fileIcon(af.file.type)}
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-foreground font-medium truncate">{af.file.name}</p>
                              <p className="text-[10px] text-gray-500">{formatBytes(af.file.size)}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFile(idx)}
                              className="w-6 h-6 rounded-full flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Newsletter */}
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="newsletter"
                      checked={form.newsletter}
                      onChange={(e) => setForm((p) => ({ ...p, newsletter: e.target.checked }))}
                      className="mt-0.5 w-4 h-4 rounded border-white/20 bg-white/5 accent-[#8B0000] cursor-pointer"
                    />
                    <label htmlFor="newsletter" className="text-xs text-gray-500 cursor-pointer leading-relaxed">
                      Keep me updated on Apex Circuit news, technology insights, and project spotlights.
                    </label>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#8B0000] to-[#A52020] text-white font-semibold hover:from-[#A52020] hover:to-[#DC2626] transition-all duration-300 shadow-xl shadow-red-900/20 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending{files.length > 0 ? " & Uploading..." : "..."}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Enquiry{files.length > 0 ? ` with ${files.length} file${files.length > 1 ? "s" : ""}` : ""}
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
