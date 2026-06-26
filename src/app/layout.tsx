import type { Metadata } from "next";
import { Nunito, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://www.apexcircuit.co.uk";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Apex Circuit | Enterprise Technology Partner — UK",
    template: "%s | Apex Circuit",
  },
  description:
    "Apex Circuit is a global enterprise technology partner based in the UK. We deliver bespoke software development, ERPNext implementation, GIS & spatial systems, AI automation, cloud infrastructure, DevOps, QA, and mobile apps across 8+ countries.",

  keywords: [
    // Core service terms
    "enterprise software development UK",
    "bespoke software development London",
    "ERPNext implementation company",
    "ERPNext consultant UK",
    "GIS development company",
    "PostGIS developer",
    "spatial analysis software",
    "AI automation company UK",
    "AI software development",
    "LangChain development",
    // Mobile & web
    "React Native mobile app development",
    "Next.js development agency",
    "full stack web development UK",
    "enterprise web application development",
    // Cloud & DevOps
    "cloud systems integration UK",
    "DevOps consulting",
    "Azure cloud development",
    "AWS cloud solutions",
    // ERP & business
    "ERP systems implementation",
    "business analysis consulting",
    "digital transformation company UK",
    "enterprise application development",
    // Brand
    "Apex Circuit",
    "Apex Circuit technology",
    // Long-tail
    "technology partner South Africa UK",
    "enterprise technology partner",
    "quality assurance software testing UK",
    "IoT asset management software",
    "fleet management system development",
    "property portal development",
    "fintech software development",
  ],

  authors: [{ name: "Apex Circuit", url: siteUrl }],
  creator: "Apex Circuit",
  publisher: "Apex Circuit",

  alternates: {
    canonical: siteUrl,
  },

  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Apex Circuit",
    title: "Apex Circuit | Enterprise Technology Partner — UK",
    description:
      "Global enterprise technology partner. Bespoke software, ERPNext, GIS, AI automation, cloud systems, DevOps & QA. 50+ projects. 8+ countries.",
    locale: "en_GB",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Apex Circuit — Enterprise Technology Partner",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@apexcircuit",
    creator: "@apexcircuit",
    title: "Apex Circuit | Enterprise Technology Partner — UK",
    description:
      "Bespoke software, ERPNext, GIS, AI automation, cloud & DevOps. 50+ projects. 8+ countries. World-class engineering.",
    images: ["/opengraph-image"],
  },

  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/icon.svg",
    shortcut: "/icon.svg",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  // Uncomment and fill in after verifying in Google Search Console:
  // verification: {
  //   google: "YOUR_GOOGLE_VERIFICATION_CODE",
  //   yandex: "YOUR_YANDEX_CODE",
  //   bing: "YOUR_BING_CODE",
  // },

  category: "technology",
};

// ─── Structured Data (JSON-LD) ────────────────────────────────────────────────
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "Apex Circuit",
  legalName: "Apex Circuit Ltd.",
  url: siteUrl,
  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}/icon.svg`,
    width: 512,
    height: 512,
  },
  image: `${siteUrl}/opengraph-image`,
  description:
    "Global enterprise technology partner specialising in bespoke software development, ERPNext implementation, GIS & spatial systems, AI automation, cloud infrastructure, DevOps, and quality assurance.",
  foundingDate: "2019",
  numberOfEmployees: { "@type": "QuantitativeValue", value: 10 },
  address: [
    {
      "@type": "PostalAddress",
      addressLocality: "Sandton",
      addressCountry: "ZA",
    },
    {
      "@type": "PostalAddress",
      addressLocality: "London",
      addressCountry: "GB",
    },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "info@apexcircuit.co.uk",
    availableLanguage: ["English"],
  },
  sameAs: [
    "https://www.linkedin.com/in/nyasha-musanhu-aa164794/",
    "https://github.com/danielsnyasha",
  ],
  knowsAbout: [
    "Enterprise Software Development",
    "ERPNext",
    "GIS Development",
    "AI Automation",
    "Web Development",
    "React Native",
    "PostGIS",
    "LangChain",
    "Cloud Systems",
    "DevOps",
    "Business Analysis",
    "Quality Assurance",
  ],
  areaServed: [
    "United Kingdom",
    "South Africa",
    "Zimbabwe",
    "Nigeria",
    "Kenya",
    "Ghana",
    "United States",
    "European Union",
  ],
  slogan: "Your Shortcut to Excellence",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: "Apex Circuit",
  publisher: { "@id": `${siteUrl}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${siteUrl}/?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${siteUrl}/#service`,
  name: "Apex Circuit",
  url: siteUrl,
  image: `${siteUrl}/opengraph-image`,
  description:
    "Enterprise technology services: bespoke software, ERPNext, GIS, AI automation, cloud, DevOps, QA, and business analysis.",
  currenciesAccepted: "USD, GBP, ZAR",
  paymentAccepted: "Wire Transfer, Wise, Payoneer",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Technology Services",
    itemListElement: [
      "Enterprise App Development",
      "Web Development",
      "ERP Systems",
      "GIS Development",
      "AI & Automation",
      "Project Management",
      "Cloud Systems",
      "Enterprise Systems",
      "DevOps",
      "Business Analysis",
      "Quality Assurance",
    ].map((name, i) => ({
      "@type": "Offer",
      position: i + 1,
      itemOffered: { "@type": "Service", name },
    })),
  },
  areaServed: { "@type": "GeoShape", description: "Global — UK, Africa, Europe, Americas" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",     item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/#services` },
    { "@type": "ListItem", position: 3, name: "Projects", item: `${siteUrl}/#projects` },
    { "@type": "ListItem", position: 4, name: "Pricing",  item: `${siteUrl}/#pricing` },
    { "@type": "ListItem", position: 5, name: "Insights", item: `${siteUrl}/#insights` },
    { "@type": "ListItem", position: 6, name: "Contact",  item: `${siteUrl}/#contact` },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What services does Apex Circuit offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Apex Circuit offers 11 enterprise technology services: Enterprise App Development, Web Development, ERP Systems (ERPNext), GIS Development, AI & Automation, Project Management, Cloud Systems, Enterprise Systems Integration, DevOps, Business Analysis, and Quality Assurance.",
      },
    },
    {
      "@type": "Question",
      name: "Where is Apex Circuit based?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Apex Circuit is headquartered in the United Kingdom (London) with an office in Sandton, South Africa. We deliver projects globally across Europe, Africa, and the Americas.",
      },
    },
    {
      "@type": "Question",
      name: "How does pricing work at Apex Circuit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Apex Circuit offers three engagement models: Fixed Price (scoped per project), Monthly Retainer (dedicated team capacity), and Time & Materials (pay-as-you-go). Contact us to discuss your project and receive a tailored quote.",
      },
    },
    {
      "@type": "Question",
      name: "Does Apex Circuit implement ERPNext?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Apex Circuit is an ERPNext implementation partner. We configure, customise, and deploy ERPNext across accounting, procurement, HR, payroll, inventory, manufacturing, and sales modules. Full user training and post-go-live support is included.",
      },
    },
    {
      "@type": "Question",
      name: "Can Apex Circuit build GIS and spatial analysis systems?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Our GIS team specialises in PostGIS, Mapbox GL JS, and spatial data engineering. We build map-based applications, spatial dashboards, and geospatial analytics platforms for clients in property, logistics, agriculture, and government.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${nunito.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        {/* Preconnect to Google Fonts CDN for faster font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Canonical enforced via metadata above — also set the theme colour */}
        <meta name="theme-color" content="#0D0D14" />
        <meta name="color-scheme" content="dark light" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider>
          <ClerkProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
