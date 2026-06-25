import { MetadataRoute } from "next";

const BASE = "https://www.apexcircuit.co.uk";
const now = new Date("2026-06-24");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE,                    lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/#about`,        lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/#services`,     lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/#process`,      lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/#projects`,     lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/#pricing`,      lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/#insights`,     lastModified: now, changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE}/#team`,         lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/#contact`,      lastModified: now, changeFrequency: "monthly", priority: 0.9 },
  ];
}
