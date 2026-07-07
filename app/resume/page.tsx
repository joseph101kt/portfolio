import Image from "next/image";

import {
  Phone,
  Mail,
  Github,
  Linkedin,
  GraduationCap,
  Award,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Database,
  Smartphone,
  Brain,
  Cloud,
  Video,
  Gamepad2,
  MapPin,
  Palette,
  Server,
  GitBranch,
  Search,
  FileCode2,
  Component,
  Youtube,
} from "lucide-react";
import { CSSProperties, ElementType, ReactNode } from "react";

/**
 * Joseph Kakkassery — Resume, two printable A4 pages.
 * Fonts: Bebas Neue (display) / Inter (body) / JetBrains Mono (labels, tags, meta).
 * Palette lives in T below — change these values to retheme the whole thing.
 *
 * PDF-LINK NOTE:
 * Chrome's "Print to PDF" drops a link's clickable annotation if the <a> itself,
 * or any ancestor, has `opacity < 1` or a CSS `filter`. So "toned down" / "muted"
 * treatments below are done with explicit dimmer colors instead of opacity/filter —
 * never wrap or style a linked element with either of those two properties.
 * `.a4-page` and the CTA box also no longer use `overflow:hidden` — unnecessary,
 * since border-radius already clips an element's own background natively, and
 * overflow-hidden container are one more common way these link bugs creep in.
 */

const T = {
  bg: "#05070d",
  panel: "#0b0e1a",
  panelAlt: "#11131f",
  line: "rgba(139,92,246,0.14)",
  border: "rgba(139,92,246,0.20)",
  accent: "#8b5cf6",
  accent2: "#e879f9",
  text: "#f5f3ff",
  sub: "#948fa3",
  mono: "#c4b5fd",
  // muted variants — used instead of opacity/filter wherever a link may be nearby
  mutedBg: "#0d0e17",
  mutedBorder: "rgba(148,143,163,0.18)",
  mutedText: "#6b6578",
  mutedAccent: "#4c3d66",
};

const mono = { fontFamily: "'JetBrains Mono', monospace" };
const display = { fontFamily: "'Bebas Neue', sans-serif" };

// ---------- Icon matching for tags ----------

function getTagIcon(name: string) {
  const n = name.toLowerCase();
  if (n.includes("supabase") || n.includes("postgres") || n.includes("mongo")) return Database;
  if (n.includes("flutter") || n.includes("expo") || n.includes("react native") || n.includes("android")) return Smartphone;
  if (n.includes("gemini") || n.includes("ai")) return Brain;
  if (n.includes("cloudinary")) return Cloud;
  if (n.includes("livekit") || n.includes("webrtc") || n.includes("video")) return Video;
  if (n.includes("lua") || n.includes("love2d") || n.includes("game")) return Gamepad2;
  if (n.includes("postgis")) return MapPin;
  if (n.includes("tailwind") || n.includes("nativewind")) return Palette;
  if (n.includes("fastapi") || n.includes("express") || n.includes("node") || n.includes("django")) return Server;
  if (n.includes("git")) return GitBranch;
  if (n.includes("seo")) return Search;
  if (n.includes("typescript")) return FileCode2;
  if (n.includes("react") || n.includes("next") || n.includes("vite")) return Component;
  return undefined;
}

// ---------- Data ----------

const CONTACTS = [
  { icon: Phone, label: "+91 93970 82746", href: "tel:+919397082746" },
  { icon: Mail, label: "joseph101kt@gmail.com", href: "mailto:joseph101kt@gmail.com" },
  { icon: Github, label: "github", href: "https://github.com/joseph101kt" },
  { icon: Linkedin, label: "linkedin", href: "https://linkedin.com/in/joseph-kakkassery" },
  { icon: ExternalLink, label: "Portfolio", href: "https://josephkportfolio.netlify.app/" },

];

const ABOUT_TEXT =
  "Full-stack and React Native developer who ships production applications for real clients — not just side projects. Built and deployed cross-platform mobile apps, multi-tenant web backends, and AI-powered features using Next.js, React Native (Expo), Supabase, FastAPI, and the Gemini API. Comfortable owning the full stack: schema design, REST APIs, real-time systems, mobile UI, and deployment. Looking to bring that execution speed into an AI-native engineering team.";

const SKILL_GROUPS = [
  {
    label: "Frontend",
    skills: [
      { name: "Next.js 14", core: true },
      { name: "React Native", core: true },
      { name: "TypeScript", core: true },
      { name: "Tailwind CSS", core: true },
      { name: "NativeWind", core: false },
      { name: "Vite", core: false },
    ],
  },
  {
    label: "Backend",
    skills: [
      { name: "Supabase", core: true },
      { name: "FastAPI", core: true },
      { name: "PostgreSQL", core: true },
      { name: "Node.js", core: false },
      { name: "Express", core: false },
      { name: "MongoDB", core: false },
      { name: "Django", core: false },
    ],
  },
  {
    label: "Mobile",
    skills: [
      { name: "React Expo", core: true },
      { name: "Flutter", core: false },
      { name: "Android Studio", core: false },
    ],
  },
  {
    label: "Other",
    skills: [
      { name: "Gemini API", core: true },
      { name: "LiveKit WebRTC", core: false },
      { name: "Cloudinary", core: false },
      { name: "Git", core: false },
      { name: "REST API Design", core: false },
      { name: "SEO", core: false },
    ],
  },
];

const FEATURED_ROLE = {
  title: "Full-Stack Web Developer",
  org: "SBMS — South India Bridal Makeover Studio",
  period: "Aug 2024 – Jan 2025",
  stack: ["Next.js", "Supabase", "Cloudinary", "PostgreSQL"],
  bullets: [
    "Designed, built, and deployed two production sites end-to-end with no senior oversight — sbmsacademy.in and simabeautyexpo.com.",
    "Owned the full event-registration pipeline: image upload → Cloudinary → instant PDF ticket → personalised email, live at real events.",
    "Built a reusable ticket/ID generator so non-technical staff could produce materials without a developer.",
    "Shipped internal dashboards for attendee management and event administration.",
  ],
};

const OTHER_ROLES = [
  {
    title: "Full-Stack Developer",
    org: "Nazaria Collective",
    period: "Jun 2025 – Present",
    stack: ["Next.js 14", "Supabase", "Gemini API", "PostgreSQL"],
    desc: "Architecting a full LMS for a youth mentorship nonprofit — 4 roles, a 22-table schema with RLS, real-time chat, Google Meet scheduling, and a PRD used to onboard stakeholders.",
    toned: false,
  },
  {
    title: "Full-Stack Mobile Developer",
    org: "Raithan — Agri Marketplace",
    period: "2025 – Present",
    stack: ["Flutter", "Supabase", "PostGIS"],
    desc: "Scoped a maintenance contract into a full backend rebuild — PostGIS-based farmer-vendor matching, fixed a broken production seeder script.",
    toned: false,
  },
  {
    title: "Product Catalogue",
    org: "Anugraha Christian World",
    period: "Retail client",
    stack: ["Next.js", "Cloudinary"],
    desc: "Product showcase for a real retail client (also worked there in-store), with slug routing, URL-driven filters, and a CRUD admin panel.",
    toned: true,
    href: "https://anugrahachristianworld.in",
    linkLabel: "Live Website",
  },
];

const FEATURED_PROJECT = {
  title: "Full-Stack Job Portal",
  stack: ["React Native", "Expo Router", "Supabase", "Gemini API", "LiveKit"],
  bullets: [
    "Supabase-powered backend: JWT auth, relational DB with full CRUD, and real-time chat via Supabase Realtime.",
    "AI resume parser combining Tesseract.js OCR, Mammoth DOCX extraction, and Gemini API — fully automatic candidate structuring.",
    "Integrated LiveKit Cloud for in-app live video interviews over WebRTC with camera/mic controls.",
  ],
  href: "https://joseph-k-mobile.expo.app",
  linkLabel: "Live Link",
};

const OTHER_PROJECTS = [
  {
    title: "MERN Mongo Visualizer",
    stack: ["MongoDB", "Express", "React"],
    desc: "Recursive React components render infinitely nested JSON. Full REST API from scratch; Mongoose schemas enforce validation in a schema-less environment.",
    href: "https://mern-stack-mongodb-database-visualize.netlify.app",
    linkLabel: "Live App",
  },
  {
    title: "Slimes vs Sorcerers",
    stack: ["Lua", "Love2D"],
    desc: "Dash/projectile mechanics with tween-based animation, 6 enemy slime types with unique behaviours, wave-based spawning, full HUD, and a lootdrop system.",
    href: "https://youtube.com/watch?v=x14loV1b6fc",
    linkLabel: "Demo video",
    linkIcon: Youtube,
  },
];

const EDUCATION = [
  { school: "Government City College, Hyderabad", detail: "B.Sc. Computer Science", period: "2023–26" },
  { school: "St. Mary's Centenary Jr. College", detail: "Intermediate (BiPC) — 914/1000", period: "2021–23" },
  { school: "St. Francis De Sales High School", detail: "SSC — 10/10 GPA", period: "2012–21" },
];

const CERTIFICATIONS = [
  "CS50x",
  "CS50P",
  "CS50 SQL",
  "Google Digital Marketing",
  "Google Ads Measurement",
  "HubSpot SEO",
];

// ---------- Building blocks ----------

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p
      style={{ ...mono, color: T.mono, letterSpacing: "0.25em" }}
      className="text-[10px] uppercase mb-1"
    >
      {children}
    </p>
  );
}

interface HeadingProps {
  children: ReactNode;
  size?: string;
}

function Heading({
  children,
  size = "text-3xl",
}: HeadingProps) {
  return (
    <h2 style={{ ...display, color: T.text, letterSpacing: "0.02em" }} className={`${size} leading-none mb-3`}>
      {children}
    </h2>
  );
}

interface SectionHeadProps {
  eyebrow: ReactNode;
  heading: ReactNode;
  size?: string;
}

function SectionHead({
  eyebrow,
  heading,
  size = "text-3xl",
}: SectionHeadProps) {

  return (
    <div className="mb-4">
      <Eyebrow>{eyebrow}</Eyebrow>
      <Heading size={size}>{heading}</Heading>
    </div>
  );
}

/**
 * Panel — use `muted` (not opacity!) to tone a card down. `muted` swaps in
 * explicit dimmer colors, so links inside stay clickable in a printed PDF.
 */
interface PanelProps {
  className?: string;
  style?: CSSProperties;
  muted?: boolean;
  children: ReactNode;
}

function Panel({
  className = "",
  style = {},
  muted = false,
  children,
}: PanelProps) {
  return (
    <div
      className={`rounded-lg border p-4 ${className}`}
      style={{
        backgroundColor: muted ? T.mutedBg : T.panelAlt,
        borderColor: muted ? T.mutedBorder : T.border,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/**
 * Tag — generalized chip.
 * props:
 *  - icon: optional Lucide icon component
 *  - color: optional "primary" | "accent" — filled treatment; omit for outline style
 *  - reducedSaturation: optional bool — mutes the chip via explicit dimmer colors
 *    (never opacity/filter — those break a wrapped <a>'s PDF link annotation)
 *  - href: optional link — renders as <a> instead of <span>
 *  - small: optional bool — compact sizing
 */
interface TagProps {
  children: ReactNode;
  icon?: ElementType;
  color?: string;
  reducedSaturation?: boolean;
  href?: string; // Optional
  small?: boolean;
}

function Tag({
  children,
  icon: Icon,
  color,
  reducedSaturation = false,
  href,
  small = false,
}: TagProps) {
  const filled = color === "primary" || color === "accent";
  const vividFill = color === "accent" ? T.accent2 : T.accent;

  let backgroundColor = "transparent";
  let borderColor = T.border;
  let textColor = T.sub;

  if (filled && reducedSaturation) {
    backgroundColor = T.mutedAccent;
    borderColor = T.mutedAccent;
    textColor = "#ece8f2";
  } else if (filled) {
    backgroundColor = vividFill;
    borderColor = vividFill;
    textColor = "#05070d";
  } else if (reducedSaturation) {
    borderColor = T.mutedBorder;
    textColor = T.mutedText;
  }

  const style = { ...mono, backgroundColor, borderColor, color: textColor };

  const className = `inline-flex items-center gap-1 rounded-md border ${
    small ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-[11px]"
  } ${filled ? "font-semibold" : ""}`;

  return (
    <span style={style} className={`${className} relative`}>
      {/* 1. Visual Presentation Layer (Safe from layout engines) */}
      {Icon && <Icon size={small ? 10 : 12} />}
      {children}

      {/* 2. Invisible, Flat Print-Link Overlay Layer */}
      {href && (
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel="noreferrer"
          className="absolute inset-0 block w-full h-full text-transparent select-none"
          style={{
            zIndex: 50,
            backgroundColor: "rgba(0,0,0,0)", /* Invisible but occupies explicit space */
            opacity: 1, /* MUST BE 1 - Do not use opacity 0 here! */
          }}
        >
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </a>
      )}
    </span>
  );
}

function StampQR() {
  return (
    <div>
        <div
        className="rounded-md border w-full aspect-square"
        style={{
            backgroundColor: T.panelAlt,
            borderColor: T.border,
        }}
        >
        <div className="relative w-full h-full">
            <a href="https://josephkportfolio.netlify.app/"><Image src="/qr_portfolio_page.png" alt="Portfolio QR Code" fill className="object-contain" priority /></a>
        </div>
        </div>
    </div>
  );
}

export interface FeaturedRole {
  title: string;
  org?: string;
  period?: string;
  stack: string[];
  bullets: string[];
  href?: string;
  linkLabel?: string;
}

interface FeaturedPanelProps {
  data: FeaturedRole;
  badge?: ReactNode;
}

function FeaturedPanel({
  data,
  badge,
}: FeaturedPanelProps) {
  return (
    <Panel>
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          {data.period && (
            <p style={{ ...mono, color: T.sub }} className="text-[10px] mb-1">
              {data.period}
            </p>
          )}
          <h3 style={{ color: T.text }} className="text-base font-semibold flex items-center gap-2">
            {data.title}
            {badge && (
              <span
                style={{ ...mono, backgroundColor: T.accent, color: "#05070d" }}
                className="px-1.5 py-0.5 rounded text-[8px] font-bold inline-flex items-center gap-1"
              >
                <Sparkles size={8} /> FAVORITE
              </span>
            )}
          </h3>
          {data.org && (
            <p style={{ color: T.sub }} className="text-xs">
              {data.org}
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {data.stack.map((s) => (
            <Tag key={s} icon={getTagIcon(s)} color="primary" small>
              {s}
            </Tag>
          ))}
          {data.href && (
            <Tag icon={ExternalLink} color="accent" href={data.href} small>
              {data.linkLabel || "live"}
            </Tag>
          )}
        </div>
      </div>
      <ul className="mt-3 space-y-1.5">
        {data.bullets.map((b, i) => (
          <li key={i} style={{ color: T.sub }} className="text-xs leading-relaxed pl-3 relative">
            <span className="absolute left-0 top-[6px] w-1 h-1 rounded-full" style={{ backgroundColor: T.accent }} />
            {b}
          </li>
        ))}
      </ul>
    </Panel>
  );
}

// ---------- Page One ----------

function PageOne() {
  return (
    <div className="a4-page" style={{ backgroundColor: T.panel }}>
      <div className="p-9 flex-1 flex flex-col gap-6">
        {/* Row 1 — name / tagline (80%) + stamp (20%) */}
        <div className="grid grid-cols-5 gap-6 items-start">
          <div className="col-span-4">
            <p style={{ ...mono, color: T.mono }} className="text-[11px] tracking-[0.3em] uppercase mb-2">
              Full-Stack &amp; React Native Developer
            </p>
            <h1 style={{ ...display, color: T.text, letterSpacing: "0.01em" }} className="text-6xl leading-[0.9]">
              JOSEPH KAKKASSERY
            </h1>
            <p style={{ color: T.sub }} className="text-sm mt-3 max-w-md leading-relaxed">
              Building fast, scalable web &amp; mobile applications — from schema design to shipped product. Based in
              Hyderabad, India.
            </p>
          </div>
          <div className="col-span-1">
            <StampQR />
          </div>
        </div>

        {/* Row 2 — contacts */}
        <div className="flex flex-wrap gap-2">
          {CONTACTS.map(({ icon: Icon, label, href }) => (
            <Tag key={label} icon={Icon} href={href}>
              {label}
            </Tag>
          ))}
        </div>

        <div style={{ height: 1, backgroundColor: T.line }} />

        {/* Row 3 — about: image (20%) then text (80%) */}
        <div className="grid grid-cols-5 gap-6 items-center">
          <div className="col-span-1">
            <div className="relative w-full aspect-square rounded-lg overflow-hidden">
              <Image src="/stylized_avatar1.png" alt="Joseph Kakkassery" fill priority className="object-cover" />
            </div>
          </div>
          <div className="col-span-4">
            <Eyebrow>About</Eyebrow>
            <p style={{ color: T.text }} className="text-sm leading-relaxed">
              {ABOUT_TEXT}
            </p>
          </div>
        </div>

        <div style={{ height: 1, backgroundColor: T.line }} />

        {/* Skills */}
        <div>
          <SectionHead eyebrow="Toolbox" heading="Skills" size="text-3xl" />
          <div className="flex flex-col gap-2.5">
            {SKILL_GROUPS.map((group) => (
              <div
                key={group.label}
                className="rounded-lg border p-2.5 flex flex-wrap items-center gap-2"
                style={{ backgroundColor: T.panelAlt, borderColor: T.border }}
              >
                <span style={{ ...mono, color: T.accent }} className="text-[11px] uppercase tracking-wider font-semibold mr-1 shrink-0">
                  {group.label}
                </span>
                {group.skills.map((s) => (
                  <Tag key={s.name} icon={getTagIcon(s.name)} color={s.core ? "primary" : undefined} small>
                    {s.name}
                  </Tag>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Featured role */}
        <div>
          <SectionHead eyebrow="Experience" heading="Roles I Have Taken On" size="text-3xl" />
          <FeaturedPanel data={FEATURED_ROLE} />
        </div>
      </div>
    </div>
  );
}

// ---------- Page Two ----------

function PageTwo() {
  return (
    <div className="a4-page page-break" style={{ backgroundColor: T.panel }}>
      <div className="p-9 flex-1 flex flex-col gap-5">
        {/* Other roles */}
        <div className="flex flex-row gap-3">
          {OTHER_ROLES.map((role) => (
            <Panel key={role.title} className="flex-1 min-w-0 relative" muted={role.toned}>
              <p style={{ ...mono, color: role.toned ? T.mutedText : T.sub }} className="text-[9px] mb-1">
                {role.period}
              </p>
              <h4 style={{ color: role.toned ? T.sub : T.text }} className="text-xs font-semibold leading-snug">
                {role.title}
              </h4>
              <p style={{ color: role.toned ? T.mutedText : T.sub }} className="text-[10px] mb-1.5">
                {role.org}
              </p>
              <p style={{ color: role.toned ? T.mutedText : T.sub }} className="text-[10px] leading-relaxed mb-2">
                {role.desc}
              </p>
              <div className="flex flex-wrap gap-1">
                {role.stack.map((s) => (
                  <Tag key={s} icon={getTagIcon(s)} reducedSaturation={role.toned} small>
                    {s}
                  </Tag>
                ))}
                {role.href && (
                  <Tag icon={ExternalLink} color="accent" href={role.href} reducedSaturation={role.toned} small>
                    {role.linkLabel || "live"}
                  </Tag>
                )}
              </div>
            </Panel>
          ))}
        </div>

        {/* Curiosity — mirrors the Experience layout, Job Portal as the featured build */}
        <div>
          <SectionHead eyebrow="Side Projects" heading="Built For Curiosity" size="text-2xl" />
          <div className="flex flex-col gap-3">
            <FeaturedPanel data={FEATURED_PROJECT} badge />
            <div className="flex flex-row gap-3">
              {OTHER_PROJECTS.map((p) => (
                <Panel key={p.title} className="flex-1 min-w-0">
                  <h4 style={{ color: T.text }} className="text-xs font-semibold leading-snug">
                    {p.title}
                  </h4>
                  <p style={{ color: T.sub }} className="text-[10px] leading-relaxed mb-2">
                    {p.desc}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {p.stack.map((s) => (
                      <Tag key={s} icon={getTagIcon(s)} small>
                        {s}
                      </Tag>
                    ))}
                    {p.href && (
                      <Tag icon={p.linkIcon || ExternalLink} href={p.href} small>
                        {p.linkLabel || "live"}
                      </Tag>
                    )}
                  </div>
                </Panel>
              ))}
            </div>
          </div>
        </div>

        {/* Education + Certifications */}
        <div className="flex flex-row gap-3">
          <Panel className="flex-1">
            <div className="flex items-center gap-1.5 mb-2.5">
              <GraduationCap size={14} style={{ color: T.accent }} />
              <span style={{ color: T.text }} className="text-sm font-semibold">
                Education
              </span>
            </div>
            <div className="space-y-2">
              {EDUCATION.map((e) => (
                <div key={e.school} className="flex items-start justify-between gap-2">
                  <div>
                    <p style={{ color: T.text }} className="text-[11px] font-medium leading-snug">
                      {e.school}
                    </p>
                    <p style={{ color: T.sub }} className="text-[10px]">
                      {e.detail}
                    </p>
                  </div>
                  {e.period && (
                    <span style={{ ...mono, color: T.mono }} className="text-[9px] whitespace-nowrap pt-0.5">
                      {e.period}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </Panel>

          <Panel className="flex-1">
            <div className="flex items-center gap-1.5 mb-2.5">
              <Award size={14} style={{ color: T.accent }} />
              <span style={{ color: T.text }} className="text-sm font-semibold">
                Certifications
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {CERTIFICATIONS.map((c) => (
                <Tag key={c} small>
                  {c}
                </Tag>
              ))}
            </div>
          </Panel>
        </div>

        {/* CTA — no overflow-hidden on this wrapper; the stripe layer below carries its own radius */}
        <div
          className="rounded-lg p-6 relative mt-1"
          style={{ background: `linear-gradient(115deg, ${T.accent}, ${T.accent2})` }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              borderRadius: 8,
              opacity: 0.2,
              backgroundImage: `repeating-linear-gradient(115deg, #05070d 0px, #05070d 1px, transparent 1px, transparent 14px)`,
            }}
          />
          <div className="relative">
            <p style={{ ...mono, color: "#05070d" }} className="text-[10px] tracking-[0.3em] uppercase font-bold mb-1">
              Open to opportunities
            </p>
            <h3
              style={{ ...display, color: "#05070d", letterSpacing: "0.01em" }}
              className="text-4xl leading-[0.95] mb-3 max-w-lg"
            >
              LET`S SHIP SOMETHING THAT ACTUALLY MATTERS.
            </h3>
            <div className="flex flex-wrap gap-2.5">
              <a
                href="mailto:joseph101kt@gmail.com"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-xs font-bold hover:-translate-y-0.5 transition-transform"
                style={{ backgroundColor: "#05070d", color: T.mono }}
              >
                <Mail size={14} /> joseph101kt@gmail.com <ArrowRight size={14} />
              </a>
              <a
                href="https://github.com/joseph101kt"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border-2 text-xs font-bold hover:bg-black/10 transition-colors"
                style={{ borderColor: "#05070d", color: "#05070d" }}
              >
                <ExternalLink size={14} /> GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Root ----------

export default function ResumePage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        body {
          font-family: 'Inter', system-ui, sans-serif;
          background: ${T.bg};
          margin: 0;
          padding: 32px 0;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        .a4-page {
          width: 794px;
          min-height: 1123px;
          margin: 0 auto 32px;
          display: flex;
          flex-direction: column;
          border-radius: 6px;
          background-image: radial-gradient(${T.line} 1px, transparent 1px);
          background-size: 22px 22px;
        }

        @media print {
          body { background: ${T.bg}; padding: 0; }
          .a4-page {
            width: 210mm;
            min-height: 297mm;
            margin: 0;
            box-shadow: none;
            border-radius: 0;
          }
          .page-break { page-break-before: always; }
        }

        @page { size: A4; margin: 0; }
      `}</style>

      <PageOne />
      <PageTwo />
    </>
  );
}