import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Clock, Tag, Calendar } from "lucide-react";

type Block =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "code"; lang: string; code: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "hr" };

interface Article {
  slug: string;
  category: string;
  categoryColor: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  gradient: string;
  blocks: Block[];
}

const articles: Record<string, Article> = {
  "erpnext-implementation-guide": {
    slug: "erpnext-implementation-guide",
    category: "ERP",
    categoryColor: "text-cyan-400",
    title: "ERPNext in 90 Days: Our Proven Implementation Framework",
    excerpt: "Most ERP projects run over budget and over time. Here is the exact phased approach we use to get organisations fully live in 90 days, from requirements through go-live and adoption.",
    readTime: "8 min read",
    date: "Jan 2025",
    gradient: "from-[#0891B2] to-[#06B6D4]",
    blocks: [
      { type: "h2", text: "Why Most ERP Projects Fail" },
      { type: "p", text: "Most ERP implementations run 2-3x over the original timeline. The reason is almost always the same: insufficient requirements definition upfront, scope creep during build, and a go-live strategy that underestimates change management." },
      { type: "p", text: "At Apex Circuit, we have developed a 90-day framework that eliminates all three failure modes. Here is exactly how it works." },
      { type: "h2", text: "Phase 1: Discovery & Requirements (Weeks 1-2)" },
      { type: "p", text: "The first two weeks are the most important of the entire engagement. We run a structured discovery workshop covering:" },
      { type: "ul", items: [
        "Current state mapping — document every process, every spreadsheet, every workaround currently in use",
        "Data audit — identify what data exists, what needs migrating, what can be left behind",
        "Stakeholder interviews — talk to every department head, not just IT",
        "Gap analysis — what ERPNext does out of the box versus what needs custom development",
        "Go-live criteria — define upfront exactly what done means",
      ]},
      { type: "p", text: "The output is a signed-off requirements document and a fixed-scope statement of work. No surprises later." },
      { type: "h2", text: "Phase 2: Configuration & Build (Weeks 3-8)" },
      { type: "p", text: "With signed-off requirements, we move into configuration. ERPNext is highly configurable out of the box — most businesses need less custom code than they think." },
      { type: "ul", items: [
        "Chart of accounts, cost centres, fiscal year setup",
        "Warehouse and inventory structure",
        "Customer and supplier groups",
        "Item catalogue and price lists",
        "Workflow rules and approval chains",
        "Custom doctypes for industry-specific fields",
      ]},
      { type: "h2", text: "Phase 3: Data Migration (Weeks 6-9, parallel)" },
      { type: "p", text: "Data migration runs parallel to configuration. We export all legacy data, map fields to ERPNext, build migration scripts with validation rules, run a test migration into staging, get stakeholder sign-off, then execute the final production migration on go-live day." },
      { type: "p", text: "The biggest mistake we see: teams that leave data migration to the last two weeks. It always takes longer than expected." },
      { type: "h2", text: "Phase 4: Training (Weeks 8-10)" },
      { type: "p", text: "Training is embedded throughout the engagement, not bolted on at the end. We train users as each module is completed so they are familiar with the system long before go-live. Final training covers role-based walkthroughs, common scenarios, edge cases, and support procedures." },
      { type: "h2", text: "Phase 5: Go-Live & Hypercare (Weeks 11-13)" },
      { type: "p", text: "Go-live day is deliberately low-risk. We run parallel operations for one payroll cycle, have an engineer on-site or on-call for the first week, and fix any configuration issues within 24 hours. The 30-day hypercare period is included in every engagement." },
      { type: "h2", text: "The Results" },
      { type: "ul", items: [
        "Full adoption within 6 weeks of go-live",
        "Zero critical issues on go-live day",
        "Less than 10% scope change from original requirements",
      ]},
      { type: "hr" },
      { type: "p", text: "Want to discuss your ERP requirements? Get in touch and we will run a free scoping session." },
    ],
  },
  "postgis-spatial-queries": {
    slug: "postgis-spatial-queries",
    category: "GIS",
    categoryColor: "text-yellow-400",
    title: "PostGIS for Developers: Spatial Queries That Actually Scale",
    excerpt: "ST_DWithin, spatial indexes, and why most GIS implementations are 10x slower than they need to be. A practical deep-dive for backend engineers building location-aware systems.",
    readTime: "11 min read",
    date: "Feb 2025",
    gradient: "from-[#D97706] to-[#F59E0B]",
    blocks: [
      { type: "h2", text: "The Performance Problem Nobody Talks About" },
      { type: "p", text: "Most GIS applications work fine with a few thousand records. They fall apart at 100,000. By a million, they are unusable. The cause is almost always the same: developers use PostGIS functions without spatial indexes, and they use the wrong functions for the job." },
      { type: "h2", text: "The Most Important Thing: Spatial Indexes" },
      { type: "p", text: "Before anything else, every geometry column needs a GiST index. Without this, every spatial query is a full table scan. With 1 million rows, that is catastrophic." },
      { type: "code", lang: "sql", code: "CREATE INDEX idx_locations_geom ON locations USING GIST (geom);" },
      { type: "p", text: "Verify your indexes are being used with EXPLAIN ANALYZE and look for 'Index Scan using idx_locations_geom'. If you see 'Seq Scan', you have a problem." },
      { type: "h2", text: "ST_DWithin vs ST_Distance" },
      { type: "p", text: "This is the single most common mistake in PostGIS applications. ST_Distance calculates the distance for every row before filtering. ST_DWithin uses the spatial index to eliminate candidates first, then verifies. On a million-row table, this is the difference between 200ms and 15 seconds." },
      { type: "code", lang: "sql", code: "-- Wrong (slow):\nSELECT * FROM locations\nWHERE ST_Distance(geom, ST_MakePoint(-1.5, 51.5)::geography) < 5000;\n\n-- Right (fast):\nSELECT * FROM locations\nWHERE ST_DWithin(geom::geography, ST_MakePoint(-1.5, 51.5)::geography, 5000);" },
      { type: "h2", text: "Geometry vs Geography" },
      { type: "p", text: "PostGIS has two coordinate systems: geometry (flat plane, projected coordinate systems) and geography (spheroid, WGS84 lat/lng). For distance calculations on a globe, always use geography or your distances will be wrong — a query using geometry with lat/lng coordinates calculates distance in degrees, not metres." },
      { type: "h2", text: "Clustering for Better Index Performance" },
      { type: "p", text: "If your data is frequently queried by proximity, cluster the table by the spatial index. This physically reorders the table to match the index, improving cache hit rates for spatial range queries. Run it after bulk inserts." },
      { type: "code", lang: "sql", code: "CLUSTER locations USING idx_locations_geom;" },
      { type: "h2", text: "Simplifying Complex Geometries for Web Display" },
      { type: "p", text: "Never send full-resolution geometries to the browser. A detailed county boundary can have 50,000 vertices. Simplify for display using ST_Simplify, adjusting the tolerance parameter based on your zoom level." },
      { type: "code", lang: "sql", code: "SELECT ST_AsGeoJSON(ST_Simplify(geom, 0.001)) FROM boundaries;" },
      { type: "hr" },
      { type: "p", text: "Building a GIS application? Our spatial engineering team has shipped PostGIS platforms for government, logistics, and real estate clients. Talk to us." },
    ],
  },
  "react-native-offline-first": {
    slug: "react-native-offline-first",
    category: "Mobile",
    categoryColor: "text-red-400",
    title: "Building Offline-First React Native Apps for Enterprise",
    excerpt: "Field agents don't have 5G. Here's how we architect sync engines, conflict resolution, and optimistic UI in React Native to keep enterprise apps working in any connectivity environment.",
    readTime: "9 min read",
    date: "Mar 2025",
    gradient: "from-[#8B0000] to-[#DC2626]",
    blocks: [
      { type: "h2", text: "The Problem With Network-First Mobile Apps" },
      { type: "p", text: "Most mobile apps are built with an assumption: the network is always available. For consumer apps, that is mostly fine. For enterprise field apps used in warehouses, mine sites, rural areas, or buildings with poor signal, it is a disaster. The solution is offline-first architecture: design the app to work without a network connection and sync when one becomes available." },
      { type: "h2", text: "Core Principle: Local Database as Source of Truth" },
      { type: "p", text: "In an offline-first app, the local database is the source of truth, not the server. The app always reads from and writes to the local database. Sync is a background process. We use WatermelonDB for React Native — it is purpose-built for this pattern, uses SQLite under the hood, and has excellent performance on mobile." },
      { type: "h2", text: "Optimistic UI" },
      { type: "p", text: "Never make the user wait for a network round-trip. Apply changes to the local database immediately and show them in the UI. Sync to the server in the background. This makes the app feel instant regardless of connectivity." },
      { type: "h2", text: "Conflict Resolution" },
      { type: "p", text: "When a record is modified on two devices while offline, you have a conflict. Common strategies include last-write-wins (simplest, acceptable for most cases), server-wins, client-wins, and field-level merge (complex but sometimes necessary). We implement conflict resolution at the sync layer, not the UI layer." },
      { type: "h2", text: "Sync Architecture" },
      { type: "p", text: "Our standard sync flow: push all local changes with syncStatus pending to the server, pull all server changes since last sync timestamp, apply server changes resolving conflicts, mark synced records and update the last sync timestamp." },
      { type: "h2", text: "Network State Detection" },
      { type: "p", text: "React Native's NetInfo library detects connectivity changes. We trigger sync automatically when the device comes back online, with exponential backoff for failed syncs and a manual sync button for user control." },
      { type: "h2", text: "Biometric Authentication for Offline Login" },
      { type: "p", text: "Field apps often need to authenticate users when offline. On first login (online) we generate and store a device token. On subsequent logins (offline) we verify with biometrics and retrieve the stored token. The token is validated against the server on the next successful sync." },
      { type: "hr" },
      { type: "p", text: "We have shipped offline-first field apps for enterprise clients across 5 regions. Talk to our mobile team." },
    ],
  },
  "ai-automation-business-case": {
    slug: "ai-automation-business-case",
    category: "AI & Automation",
    categoryColor: "text-purple-400",
    title: "How to Build a Business Case for AI Automation in 2025",
    excerpt: "CFOs don't buy AI. They buy ROI. We break down how to quantify automation value — from hours saved to error rate reduction — and present it in a language that gets sign-off.",
    readTime: "7 min read",
    date: "Apr 2025",
    gradient: "from-[#7C3AED] to-[#A78BFA]",
    blocks: [
      { type: "h2", text: "The Problem With We Need AI" },
      { type: "p", text: "Every executive has heard the pitch: we need to invest in AI. Most of them have also seen that pitch produce nothing useful. The reason AI projects fail to get sign-off is that the business case was built on hype instead of numbers. Here is how to build one that actually gets approved." },
      { type: "h2", text: "Start With a Specific Problem, Not a Technology" },
      { type: "p", text: "Never start with we want to implement AI. Start with a problem. Our estimating team takes 5 days to produce a quote and competitors turn around in 24 hours. We manually reconcile 3,000 invoices per month requiring 2 FTEs with a 3% error rate. Each of these has a measurable cost. AI is the solution, not the starting point." },
      { type: "h2", text: "Quantify the Current State" },
      { type: "p", text: "For each problem, calculate the real cost: hours per week multiplied by fully-loaded hourly rate, error rate multiplied by average cost per error, and the opportunity cost of slow turnaround or lost contracts." },
      { type: "ul", items: [
        "Quoting team: 3 estimators x 35 hours/week x £45/hour = £21,000/month",
        "Error rate: 4% x average £2,000 rework cost x 200 quotes/month = £16,000/month",
        "Lost contracts from slow turnaround: estimated £40,000/month",
        "Total cost of current state: £77,000/month",
      ]},
      { type: "h2", text: "Model the Future State" },
      { type: "p", text: "Quantify what automation achieves: time reduction (hours the automated process takes), error reduction (expected error rate of the automated system), and throughput increase (more volume with the same team)." },
      { type: "ul", items: [
        "AI handles 80% of quotes automatically",
        "Estimator hours drop from 35 to 8 per week per person",
        "Error rate drops from 4% to 0.5%",
        "Turnaround: 5 days reduced to 2 hours for standard quotes",
        "Monthly saving: over £50,000",
      ]},
      { type: "h2", text: "Calculate ROI and Payback Period" },
      { type: "p", text: "With a project cost of £80,000 and monthly benefit of £50,000, the payback period is 1.6 months and the 12-month ROI exceeds 600%. These are the numbers that get CFO sign-off." },
      { type: "h2", text: "Present Risks Honestly" },
      { type: "p", text: "A credible business case includes risks: data quality issues (the model is only as good as the training data), change management (staff adoption is often harder than the technology), and edge cases (automation handles 80% well — the other 20% needs human review). Show you have thought about these and have mitigation plans." },
      { type: "h2", text: "The One-Page Executive Summary" },
      { type: "ul", items: [
        "Problem statement (one sentence)",
        "Proposed solution (one sentence)",
        "Investment required",
        "Expected monthly benefit and payback period",
        "Top 2 risks and mitigations",
      ]},
      { type: "hr" },
      { type: "p", text: "We help clients identify, scope, and build the ROI case for AI automation projects. Start a conversation with our team." },
    ],
  },
  "nextjs-ssr-performance": {
    slug: "nextjs-ssr-performance",
    category: "Web Dev",
    categoryColor: "text-green-400",
    title: "Next.js App Router: SSR vs SSG vs ISR — When to Use Each",
    excerpt: "The App Router changed the rendering model fundamentally. This guide cuts through the confusion and shows exactly when to reach for each strategy in production applications.",
    readTime: "10 min read",
    date: "May 2025",
    gradient: "from-[#059669] to-[#10B981]",
    blocks: [
      { type: "h2", text: "The App Router Changed Everything" },
      { type: "p", text: "The Next.js Pages Router had three rendering modes: SSR, SSG, ISR. The App Router has the same concepts but implements them completely differently — and the mental model shift trips up a lot of experienced Next.js developers. This guide will make the decision clear." },
      { type: "h2", text: "Server Components: The New Default" },
      { type: "p", text: "In the App Router, every component is a Server Component by default. Server Components run only on the server, can directly access databases and environment variables, do not add to the JavaScript bundle, and cannot use browser APIs, useState, or event handlers. You no longer need getServerSideProps — you just await data directly in the component." },
      { type: "h2", text: "Static Rendering (SSG equivalent)" },
      { type: "p", text: "By default, Server Components that do not use dynamic data are statically rendered at build time. Use this for marketing pages, blog posts, documentation — anything that does not change per-request." },
      { type: "h2", text: "Dynamic Rendering (SSR equivalent)" },
      { type: "p", text: "As soon as you use cookies(), headers(), or searchParams, Next.js switches to dynamic rendering. You can also force it with export const dynamic = 'force-dynamic'. Use this for authenticated pages, personalised content, and real-time data." },
      { type: "h2", text: "ISR: Revalidate on a Schedule" },
      { type: "p", text: "Revalidate cached pages on a time interval with export const revalidate = 3600. Or revalidate on demand when a CMS publishes using the revalidatePath API. Use ISR for product catalogues, blog listings, pricing pages — content that changes occasionally but does not need to be real-time." },
      { type: "h2", text: "The Decision Framework" },
      { type: "table", headers: ["Content Type", "Strategy", "Why"], rows: [
        ["Marketing pages", "Static", "Never changes, fast"],
        ["Blog posts", "Static + ISR", "Rarely changes"],
        ["Product listings", "ISR (1h)", "Changes occasionally"],
        ["User dashboards", "Dynamic", "Per-user data"],
        ["Real-time data", "Dynamic + streaming", "Changes constantly"],
        ["Search results", "Dynamic", "Depends on query"],
      ]},
      { type: "h2", text: "Streaming and Suspense" },
      { type: "p", text: "The App Router supports streaming with React Suspense. You can show UI immediately and stream in slow data — fast static sections render instantly while slower dynamic sections stream in. This is one of the App Router's biggest advantages over the Pages Router: mixed static and dynamic content on the same page." },
      { type: "hr" },
      { type: "p", text: "We build production Next.js applications for enterprise clients. Talk to our web team." },
    ],
  },
  "enterprise-security-checklist": {
    slug: "enterprise-security-checklist",
    category: "Security",
    categoryColor: "text-blue-400",
    title: "Enterprise Application Security: The 12-Point Checklist",
    excerpt: "From OWASP Top 10 to JWT handling, secrets management, and pen testing — the security baseline every enterprise application should meet before going to production.",
    readTime: "12 min read",
    date: "Jun 2025",
    gradient: "from-[#1E3A8A] to-[#2563EB]",
    blocks: [
      { type: "h2", text: "Why Enterprise Apps Get Breached" },
      { type: "p", text: "Most enterprise application breaches are not sophisticated zero-day exploits. They are well-known vulnerabilities that were not addressed — SQL injection, hardcoded secrets, broken authentication. This checklist covers the 12 security controls every enterprise application must implement before going to production." },
      { type: "h2", text: "1. Input Validation and SQL Injection Prevention" },
      { type: "p", text: "Never trust user input. Always use parameterised queries or an ORM like Prisma that handles this automatically. Never concatenate user input directly into SQL strings." },
      { type: "h2", text: "2. Authentication — JWT Best Practices" },
      { type: "ul", items: [
        "Store JWTs in httpOnly cookies, not localStorage (XSS vulnerable)",
        "Specify the algorithm explicitly when verifying — never trust the alg header",
        "Use short-lived access tokens (15 minutes) with refresh tokens",
        "Rotate refresh tokens on use and invalidate on logout",
      ]},
      { type: "h2", text: "3. Secrets Management" },
      { type: "p", text: "Never hardcode secrets. Never commit them to git. Use environment variables, and in production use a secrets manager (AWS Secrets Manager, Azure Key Vault, HashiCorp Vault). Audit your git history for accidentally committed secrets using git log with grep for common patterns." },
      { type: "h2", text: "4. HTTPS Everywhere" },
      { type: "p", text: "All traffic must be encrypted in transit. Redirect HTTP to HTTPS. Use HSTS headers with a minimum max-age of 31536000 seconds including subdomains." },
      { type: "h2", text: "5. Rate Limiting" },
      { type: "p", text: "Protect all endpoints — especially auth endpoints — from brute force attacks. Limit login attempts to 10 per 15-minute window. Return a 429 status with a Retry-After header." },
      { type: "h2", text: "6. CORS Configuration" },
      { type: "p", text: "Restrict cross-origin requests to known origins. Never use Access-Control-Allow-Origin: * on authenticated endpoints. Maintain an explicit allowlist of permitted origins." },
      { type: "h2", text: "7. Security Headers" },
      { type: "ul", items: [
        "Content-Security-Policy — whitelist allowed script sources",
        "X-Frame-Options: DENY — prevent clickjacking",
        "X-Content-Type-Options: nosniff — prevent MIME sniffing",
        "Referrer-Policy: strict-origin-when-cross-origin",
      ]},
      { type: "h2", text: "8. Dependency Auditing" },
      { type: "p", text: "Run npm audit or Snyk regularly. Automate this in CI and fail the build on high-severity vulnerabilities. Keep dependencies up to date — most breaches exploit known vulnerabilities in outdated packages." },
      { type: "h2", text: "9. Sensitive Data Exposure" },
      { type: "p", text: "Never log passwords, tokens, or PII. Mask sensitive fields in logs. Encrypt PII at rest. Know exactly what data you store and where — you cannot protect what you have not mapped." },
      { type: "h2", text: "10. Access Control — Principle of Least Privilege" },
      { type: "p", text: "Every user and service should have the minimum permissions required. Check authorisation on every request, not just at login. A valid session token does not mean the user is authorised for every resource." },
      { type: "h2", text: "11. Error Handling — Do Not Leak Stack Traces" },
      { type: "p", text: "Never return stack traces or internal error details to the client. Log errors internally with full context, but return only a generic error message to the browser. Stack traces reveal your technology stack, file structure, and logic to attackers." },
      { type: "h2", text: "12. Penetration Testing Before Launch" },
      { type: "p", text: "Every enterprise application should have a penetration test before production launch. At minimum run automated scanning with OWASP ZAP. For higher-risk applications, engage a professional pen testing firm. Document findings, remediate, and retest. Make this part of your launch checklist." },
      { type: "hr" },
      { type: "p", text: "We build security-first enterprise applications. Talk to our team about your project." },
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
  };
}

function renderBlock(block: Block, key: number) {
  switch (block.type) {
    case "h2":
      return <h2 key={key} className="text-2xl font-bold text-white mt-10 mb-4">{block.text}</h2>;
    case "p":
      return <p key={key} className="text-gray-300 leading-relaxed mb-4">{block.text}</p>;
    case "ul":
      return (
        <ul key={key} className="list-disc list-inside space-y-2 mb-6 text-gray-300">
          {block.items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      );
    case "code":
      return (
        <pre key={key} className="bg-white/[0.04] border border-white/10 rounded-xl p-5 overflow-x-auto mb-6 text-sm">
          <code className="text-gray-200 font-mono whitespace-pre">{block.code}</code>
        </pre>
      );
    case "table":
      return (
        <div key={key} className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                {block.headers.map((h, i) => (
                  <th key={i} className="text-left px-4 py-2.5 border border-white/10 text-white font-semibold bg-white/[0.04]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-2.5 border border-white/10 text-gray-300">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "hr":
      return <hr key={key} className="border-white/10 my-10" />;
  }
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) notFound();

  return (
    <main className="min-h-screen bg-[#0D0D14]">
      <div className={`h-1 w-full bg-gradient-to-r ${article.gradient}`} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <Link
          href="/#insights"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 transition-colors mb-10 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Insights
        </Link>

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border bg-white/[0.04] border-white/10 ${article.categoryColor}`}>
            <Tag className="w-3 h-3" />
            {article.category}
          </span>
          <span className="text-xs text-gray-500 flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            {article.readTime}
          </span>
          <span className="text-xs text-gray-500 flex items-center gap-1.5">
            <Calendar className="w-3 h-3" />
            {article.date}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-6">
          {article.title}
        </h1>

        <p className="text-lg text-gray-400 leading-relaxed mb-12 border-l-2 border-white/10 pl-5">
          {article.excerpt}
        </p>

        <article className="space-y-0">
          {article.blocks.map((block, i) => renderBlock(block, i))}
        </article>

        <div className="mt-16 p-8 rounded-2xl border border-white/8 bg-white/[0.02] text-center">
          <h3 className="text-xl font-bold text-white mb-2">Work with Apex Circuit</h3>
          <p className="text-gray-400 text-sm mb-6">Have a project in mind? Let&apos;s talk about what we can build together.</p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#8B0000] to-[#A52020] text-white font-bold text-sm hover:from-[#A52020] hover:to-[#DC2626] transition-all duration-300 shadow-lg shadow-red-900/20"
          >
            Start a Conversation
          </Link>
        </div>
      </div>
    </main>
  );
}
