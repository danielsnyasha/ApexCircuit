import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/", "/sign-in", "/sign-up"],
      },
    ],
    sitemap: "https://www.apexcircuit.co.uk/sitemap.xml",
    host: "https://www.apexcircuit.co.uk",
  };
}
