"use client";

import Image from "next/image";

import {
  BadgeDollarSign,
  Code2,
  BarChart3,
  LineChart,
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
  Sun,
  Moon,
  Printer,
  Download,
} from "lucide-react";
import { CSSProperties, ElementType, ReactNode, useEffect, useState } from "react";

/**
 * Joseph Kakkassery — Resume, two printable A4 pages.
 * Fonts: Bebas Neue (display) / Inter (body) / JetBrains Mono (labels, tags, meta).
 *
 * THEMING:
 * Colors live entirely in CSS custom properties (--color-*), defined once in the
 * <style> block below and toggled via a `data-theme` attribute on <html>. Every
 * component reads colors through the `C` map (plain strings like "var(--color-text)"),
 * so flipping the theme is a single DOM-attribute change — no re-render plumbing needed.
 *
 * PRINT BEHAVIOUR:
 * - `@media print` forces the light/white palette regardless of the on-screen theme,
 *   so physical prints never waste ink on a dark background.
 * - Chips that carry an `href` are real <a> tags (no invisible overlay trick). As long
 *   as no ancestor of a link uses `opacity < 1` or a CSS `filter` — Chrome's Print to PDF
 *   silently drops link annotations in that case — the link stays clickable in an
 *   exported PDF. "Muted" treatments therefore always use explicit dimmer colors
 *   instead of opacity/filter.
 * - For links whose visible label isn't the destination itself (GitHub, certificates,
 *   project pages, etc.), the actual URL is appended as small print-only text via
 *   `a[data-print-url]::after`, so anyone reading a physical printout can still see
 *   and copy the address. Phone/email chips already show the real contact detail, so
 *   they're skipped to avoid redundant clutter.
 * - The FAB controls (theme toggle, print, download) are fixed-position overlays
 *   outside the page flow, so they never affect the two-page A4 layout, and are
 *   hidden entirely on print via `.no-print`.
 */

type TagColor = "primary" | "accent";
type ThemeMode = "dark" | "light";

const PORTFOLIO_URL = "https://josephkportfolio.netlify.app/";
const RESUME_PDF_URL = "https://josephkportfolio.netlify.app/joseph_kakkassery_resume.pdf";

// CSS-variable references — every color in this file flows through here.
const C = {
  bg: "var(--color-bg)",
  panel: "var(--color-panel)",
  panelAlt: "var(--color-panel-alt)",
  line: "var(--color-line)",
  border: "var(--color-border)",
  accent: "var(--color-accent)",
  accent2: "var(--color-accent2)",
  text: "var(--color-text)",
  sub: "var(--color-sub)",
  mono: "var(--color-mono)",
  mutedBg: "var(--color-muted-bg)",
  mutedBorder: "var(--color-muted-border)",
  mutedText: "var(--color-muted-text)",
  mutedAccent: "var(--color-muted-accent)",
  onAccent: "var(--color-on-accent)",
  onMutedAccent: "var(--color-on-muted-accent)",
} as const;

const mono = { fontFamily: "'JetBrains Mono', monospace" };
const display = { fontFamily: "'Bebas Neue', sans-serif" };

// ---------- Icon matching for tags ----------

function getTagIcon(name: string): ElementType | undefined {
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

interface ContactItem {
  icon: ElementType;
  label: string;
  href: string;
}

const CONTACTS: ContactItem[] = [
  { icon: Phone, label: "+91 93970 82746", href: "tel:+919397082746" },
  { icon: Mail, label: "joseph101kt@gmail.com", href: "mailto:joseph101kt@gmail.com" },
  { icon: Github, label: "github", href: "https://github.com/joseph101kt" },
  { icon: Linkedin, label: "linkedin", href: "https://linkedin.com/in/joseph-kakkassery" },
  { icon: ExternalLink, label: "Portfolio", href: PORTFOLIO_URL },
];

const ABOUT_TEXT =
  "Full-stack and React Native developer who ships production applications for real clients — not just side projects. Built and deployed cross-platform mobile apps, multi-tenant web backends, and AI-powered features using Next.js, React Native (Expo), Supabase, FastAPI, and the Gemini API. Comfortable owning the full stack: schema design, REST APIs, real-time systems, mobile UI, and deployment. Looking to bring that execution speed into an AI-native engineering team.";

interface SkillItem {
  name: string;
  core: boolean;
}

interface SkillGroup {
  label: string;
  skills: SkillItem[];
}

const SKILL_GROUPS: SkillGroup[] = [
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

export interface FeaturedRole {
  title: string;
  org?: string;
  period?: string;
  stack: string[];
  bullets: string[];
  href?: string;
  linkLabel?: string;
}

const FEATURED_ROLE: FeaturedRole = {
  title: "Full-Stack Web Developer",
  org: "SBMS — South India Bridal Makeover Studio",
  period: "Aug 2025 – Jan 2026",
  stack: ["Next.js", "Supabase", "Cloudinary", "PostgreSQL"],
  bullets: [
    "Designed, built, and deployed three production sites end-to-end with no senior oversight — sbmsacademy.in,  simabeautyexpo.com and beyondbeautynetwork.in .",
    "Owned the full event-registration pipeline: image upload → Cloudinary → instant PDF ticket → personalised email, at real events.",
    "Built a reusable ticket/ID generator so non-technical staff could produce materials without a developer.",
    "Shipped internal dashboards for attendee management and event administration.",
    "Live Links: sbmsacademy.in, simabeautyexpo.com and beyondbeautynetwork.in",
  ],
};

interface Role {
  title: string;
  org: string;
  period: string;
  stack: string[];
  desc: string;
  toned: boolean;
  href?: string;
  linkLabel?: string;
}

const OTHER_ROLES: Role[] = [
  {
    title: "Full-Stack Web App Developer",
    org: "Nazaria Collective",
    period: "Jun 2026 – Present",
    stack: ["Next.js 14", "Supabase", "Gemini API", "PostgreSQL"],
    desc: "Architecting a full LMS for a youth mentorship nonprofit — 4 roles, a 22-table schema with RLS, real-time chat, Google Meet scheduling, and a PRD used to onboard stakeholders.",
    toned: false,
  },
  {
    title: "Full-Stack Mobile Developer",
    org: "Raithan — Agri Marketplace",
    period: "May 2026 – June 2026",
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
    toned: false,
    href: "https://anugrahachristianworld.in",
    linkLabel: "Live Website",
  },
];

const FEATURED_PROJECT: FeaturedRole = {
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

interface Project {
  title: string;
  stack: string[];
  desc: string;
  href?: string;
  linkLabel?: string;
  linkIcon?: ElementType;
}

const OTHER_PROJECTS: Project[] = [
  {
    title: "MERN Mongo Visualizer",
    stack: ["MongoDB", "Express", "React"],
    desc: "Recursive React components render infinitely nested JSON. Full REST API from scratch; With Mongoose schemas validation.",
    href: "https://mern-stack-mongodb-database-visualize.netlify.app",
    linkLabel: "Live App",
  },
  {
    title: "Slimes vs Sorcerers",
    stack: ["Lua", "Love2D"],
    desc: "Created a feature-complete Lua/LÖVE2D action game with fluid combat, modular enemy objects, adaptive wave spawning, pathfinding, polished UI, and collectible health/XP loot systems.",
    href: "https://youtube.com/watch?v=x14loV1b6fc",
    linkLabel: "Demo video",
    linkIcon: Youtube,
  },
];

interface EducationItem {
  school: string;
  detail: string;
  period: string;
}

const EDUCATION: EducationItem[] = [
  { school: "Government City College, Hyderabad", detail: "B.Sc. Computer Science", period: "2023–26" },
  { school: "St. Mary's Centenary Jr. College", detail: "Intermediate (BiPC) — 914/1000", period: "2021–23" },
  { school: "St. Francis De Sales High School", detail: "SSC — 10/10 GPA", period: "2012–21" },
];

interface Certification {
  name: string;
  href: string;
  icon: ElementType;
  color?: TagColor;
}

export const CERTIFICATIONS: Certification[] = [
  {
    name: "CS50x",
    href: "https://certificates.cs50.io/844ee161-92e1-42b6-adfb-05121360edc8.pdf?size=letter",
    icon: GraduationCap,
    color: "accent",
  },
  {
    name: "CS50P",
    href: "https://certificates.cs50.io/f0f8d9db-7cdd-45ba-9ad7-d53816e65398.pdf?size=letter",
    icon: Code2,
    color: "accent",
  },
  {
    name: "CS50 SQL",
    href: "https://certificates.cs50.io/8d6c85a6-877b-4487-8128-b8ef961e0341.pdf?size=letter",
    icon: Database,
    color: "accent",
  },
  {
    name: "Google Digital Marketing",
    href: "https://skillshop.credential.net/3b3bcd09-aad8-41f4-88a8-88de610d3339#acc.EA4L2xus",
    icon: BarChart3,
  },
  {
    name: "Google Ads Measurement",
    href: "https://skillshop.credential.net/3b3bcd09-aad8-41f4-88a8-88de610d3339#acc.EA4L2xus",
    icon: LineChart,
  },
  {
    name: "HubSpot SEO",
    href: "https://drive.google.com/file/d/1kBRpp72N0HwOqH0eux2Ntq9VBrkA_2u9/view",
    icon: Search,
  },
  {
    name: "Paid Ads",
    href: "http://drive.google.com/file/d/1q6_YfBcIpnPk3WjkE2wo8MFLK33jM8LD/view",
    icon: BadgeDollarSign,
  },
];

// ---------- Building blocks ----------

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p style={{ ...mono, color: C.mono, letterSpacing: "0.25em" }} className="text-[10px] uppercase mb-1">
      {children}
    </p>
  );
}

interface HeadingProps {
  children: ReactNode;
  size?: string;
}

function Heading({ children, size = "text-3xl" }: HeadingProps) {
  return (
    <h2 style={{ ...display, color: C.text, letterSpacing: "0.02em" }} className={`${size} leading-none mb-3`}>
      {children}
    </h2>
  );
}

interface SectionHeadProps {
  eyebrow: ReactNode;
  heading: ReactNode;
  size?: string;
}

function SectionHead({ eyebrow, heading, size = "text-3xl" }: SectionHeadProps) {
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

function Panel({ className = "", style = {}, muted = false, children }: PanelProps) {
  return (
    <div
      className={`rounded-lg border p-4 ${className}`}
      style={{
        backgroundColor: muted ? C.mutedBg : C.panelAlt,
        borderColor: muted ? C.mutedBorder : C.border,
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
 *    (never opacity/filter — those break a link's PDF annotation)
 *  - href: optional link — renders as a real <a> instead of a <span>. Links whose
 *    label isn't the destination itself get the raw URL appended as visible text
 *    when printed (see `a[data-print-url]::after` in the stylesheet), so a physical
 *    printout stays useful even though it isn't clickable.
 *  - small: optional bool — compact sizing
 */
interface TagProps {
  children: ReactNode;
  icon?: ElementType;
  color?: TagColor;
  reducedSaturation?: boolean;
  href?: string;
  small?: boolean;
}

function Tag({ children, icon: Icon, color, reducedSaturation = false, href, small = false }: TagProps) {
  const filled = color !== undefined;
  const vividFill: string = color === "accent" ? C.accent2 : C.accent;

  let backgroundColor: string = "transparent";
  let borderColor: string = C.border;
  let textColor: string = C.sub;

  if (filled && reducedSaturation) {
    backgroundColor = C.mutedAccent;
    borderColor = C.mutedAccent;
    textColor = C.onMutedAccent;
  } else if (filled) {
    backgroundColor = vividFill;
    borderColor = vividFill;
    textColor = C.onAccent;
  } else if (reducedSaturation) {
    borderColor = C.mutedBorder;
    textColor = C.mutedText;
  }

  const style: CSSProperties = { ...mono, backgroundColor, borderColor, color: textColor };

  const className = `tag-chip inline-flex items-center gap-1 rounded-md border ${
    small ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-[11px]"
  } ${filled ? "font-semibold" : ""}`;

  const content = (
    <>
      {Icon && <Icon size={small ? 10 : 12} />}
      {children}
    </>
  );

  if (href) {
    const isExternal = href.startsWith("http");
    // Phone/email chips already display the real contact detail, so skip the
    // print suffix there to avoid showing "mailto:x" right next to the same address.
//    const showPrintUrl = !href.startsWith("tel:") && !href.startsWith("mailto:");

    return (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
        style={style}
        className={className}
//        data-print-url={showPrintUrl ? href : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <span style={style} className={className}>
      {content}
    </span>
  );
}

function StampQR() {
  return (
    <div>
      <div className="rounded-md border w-full aspect-square" style={{ backgroundColor: C.panelAlt, borderColor: C.border }}>
        <div className="relative w-full h-full">
          <a href={PORTFOLIO_URL} target="_blank" rel="noreferrer">
            <Image src="/qr_portfolio_page.png" alt="Portfolio QR Code" fill className="object-contain" priority />
          </a>
        </div>
      </div>
    </div>
  );
}

interface FeaturedPanelProps {
  data: FeaturedRole;
  badge?: boolean;
  isPrinting?: boolean;
}

function FeaturedPanel({ data, badge, isPrinting = false }: FeaturedPanelProps) {
  return (
    <Panel>
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          {data.period && (
            <p style={{ ...mono, color: C.sub }} className="text-[10px] mb-1">
              {data.period}
            </p>
          )}
          <h3 style={{ color: C.text }} className="text-base font-semibold flex items-center gap-2">
            {data.title}
            {/* Show link in heading during print mode */}
            {isPrinting && data.href && (
              <span className="font-normal text-xs opacity-80">
                ({data.href})
              </span>
            )}
            {badge && (
              <span
                style={{ ...mono, backgroundColor: C.accent, color: C.onAccent }}
                className="px-1.5 py-0.5 rounded text-[8px] font-bold inline-flex items-center gap-1"
              >
                <Sparkles size={8} /> FAVORITE
              </span>
            )}
          </h3>
          {data.org && (
            <p style={{ color: C.sub }} className="text-xs">
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
          {/* Hide link tag in print mode */}
          {!isPrinting && data.href && (
            <Tag icon={ExternalLink} color="accent" href={data.href} small>
              {data.linkLabel || "live"}
            </Tag>
          )}
        </div>
      </div>
      <ul className="mt-3 space-y-1.5">
        {data.bullets.map((b, i) => (
          <li key={i} style={{ color: C.sub }} className="text-xs leading-relaxed pl-3 relative">
            <span className="absolute left-0 top-[6px] w-1 h-1 rounded-full" style={{ backgroundColor: C.accent }} />
            {b}
          </li>
        ))}
      </ul>
    </Panel>
  );
}
// ---------- Page One ----------

interface PageProps {
  isPrinting?: boolean;
}

function PageOne({ isPrinting = false }: PageProps) {
  return (
    <div className="a4-page" style={{ backgroundColor: C.panel }}>
      <div className="p-9 flex-1 flex flex-col gap-6">
        {/* Row 1 — name / tagline (80%) + stamp (20%) */}
        <div className="grid grid-cols-5 gap-6 items-start">
          <div className="col-span-4">
            <p style={{ ...mono, color: C.mono }} className="text-[11px] tracking-[0.3em] uppercase mb-2">
              Full-Stack &amp; React Native Developer
            </p>
            <h1 style={{ ...display, color: C.text, letterSpacing: "0.01em" }} className="text-6xl leading-[0.9]">
              JOSEPH KAKKASSERY
            </h1>
            <p style={{ color: C.sub }} className="text-sm mt-3 max-w-md leading-relaxed">
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
          {CONTACTS.map(({ icon: Icon, label, href }) => {
            const isGithub = href.includes("github.com");
            const isLinkedin = href.includes("linkedin.com");
            const isPortfolio = href === PORTFOLIO_URL;

            // 1. Hide GitHub tag completely when printing
            if (isPrinting && isGithub) {
              return null;
            }
            if (isPrinting && isLinkedin) {
              return null;
            }

            const cleanUrl = (url: string) => {
            return url
                .replace(/^https?:\/\//, "") // Remove http:// or https://
                .replace(/\/.*$/, "");       // Remove trailing slashes and path/query params
            };
            // 2. Show the link instead of label for LinkedIn and Portfolio during printing
            const displayLabel =
              isPrinting && (isLinkedin || isPortfolio) ? cleanUrl(href) : label;

            return (
              <Tag key={href} icon={Icon} href={href}>
                {displayLabel}
              </Tag>
            );
          })}
        </div>

        <div style={{ height: 1, backgroundColor: C.line }} />

        {/* Row 3 — about: image (20%) then text (80%) */}
        <div className="grid grid-cols-5 gap-6 items-center">
          <div className="col-span-1">
            <div className="relative w-full aspect-square rounded-lg overflow-hidden">
              <Image src="/stylized_avatar1.png" alt="Joseph Kakkassery" fill priority className="object-cover" />
            </div>
          </div>
          <div className="col-span-4">
            <Eyebrow>About</Eyebrow>
            <p style={{ color: C.text }} className="text-sm leading-relaxed">
              {ABOUT_TEXT}
            </p>
          </div>
        </div>

        <div style={{ height: 1, backgroundColor: C.line }} />

        {/* Skills */}
        <div>
          <SectionHead eyebrow="Toolbox" heading="Skills" size="text-3xl" />
          <div className="flex flex-col gap-2.5">
            {SKILL_GROUPS.map((group) => (
<div
  key={group.label}
  className="rounded-lg border p-2.5 grid gap-2 items-start"
  style={{
    backgroundColor: C.panelAlt,
    borderColor: C.border,
    gridTemplateColumns: "80px 1fr",
  }}
>
  <span
    className="text-[11px] uppercase tracking-wider font-semibold"
    style={{ ...mono, color: C.accent }}
  >
    {group.label}
  </span>

  <div className="flex flex-wrap gap-2">
    {group.skills.map((s) => (
      <Tag
        key={s.name}
        icon={getTagIcon(s.name)}
        color={s.core ? "primary" : undefined}
        small
      >
        {s.name}
      </Tag>
    ))}
  </div>
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

function PageTwo({ isPrinting = false }: PageProps) {
  return (
    <div className="a4-page page-break" style={{ backgroundColor: C.panel }}>
      <div className="p-9 flex-1 flex flex-col gap-5">
        {/* Other roles */}
        <div className="flex flex-row gap-2">
          {OTHER_ROLES.map((role) => {
            // Customize link label during print (e.g., for Product Catalogue)
            const linkLabel =
              isPrinting && role.href ? role.href : role.linkLabel || "live";

            return (
              <Panel
                key={role.title}
                className="flex-1 min-w-0 relative"
                muted={role.toned}
              >
                <p style={{ ...mono, color: role.toned ? C.mutedText : C.sub }} className="text-[9px] mb-1">
                  {role.period}
                </p>
                <h4 style={{ color: role.toned ? C.sub : C.text }} className="text-xs font-semibold leading-snug">
                  {role.title}
                  {/* Append link in title during print mode */}
                  {isPrinting && role.href && (
                    <span className="font-normal text-[10px] ml-1 opacity-80">
                      ({role.href})
                    </span>
                  )}
                </h4>
                <p style={{ color: role.toned ? C.mutedText : C.sub }} className="text-[10px] mb-1.5">
                  {role.org}
                </p>
                <p style={{ color: role.toned ? C.mutedText : C.sub }} className="text-[10px] leading-relaxed mb-2">
                  {role.desc}
                </p>
                <div className="flex flex-wrap gap-1">
                  {role.stack.map((s) => (
                    <Tag key={s} icon={getTagIcon(s)} reducedSaturation={role.toned} small>
                      {s}
                    </Tag>
                  ))}
                  {/* Hide tag if printing since link is in title */}
                  {!isPrinting && role.href && (
                    <Tag icon={ExternalLink} color="accent" href={role.href} reducedSaturation={role.toned} small>
                      {linkLabel}
                    </Tag>
                  )}
                </div>
              </Panel>
            );
          })}
        </div>

        {/* Curiosity — mirrors the Experience layout, Job Portal as the featured build */}
        <div>
          <SectionHead eyebrow="Side Projects" heading="Built For Curiosity" size="text-2xl" />
          <div className="flex flex-col gap-3">
            <FeaturedPanel data={FEATURED_PROJECT} badge isPrinting={isPrinting} />
            <div className="flex flex-row gap-3">
              {OTHER_PROJECTS.map((p) => {
                const linkLabel =
                  isPrinting && p.href ? p.href : p.linkLabel || "live";

                return (
                  <Panel key={p.title} className="flex-1 min-w-0">
                    <h4 style={{ color: C.text }} className="text-xs font-semibold leading-snug">
                      {p.title}
                      {/* Append link in title during print mode for other projects */}
                      {isPrinting && p.href && (
                        <span className="font-normal text-[10px] ml-1 opacity-80">
                          ({p.href})
                        </span>
                      )}
                    </h4>
                    <p style={{ color: C.sub }} className="text-[10px] leading-relaxed mb-2">
                      {p.desc}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {p.stack.map((s) => (
                        <Tag key={s} icon={getTagIcon(s)} small>
                          {s}
                        </Tag>
                      ))}
                      {!isPrinting && p.href && (
                        <Tag icon={p.linkIcon || ExternalLink} href={p.href} small>
                          {linkLabel}
                        </Tag>
                      )}
                    </div>
                  </Panel>
                );
              })}
            </div>
          </div>
        </div>

        {/* Education + Certifications */}
        <div className="flex flex-row gap-3">
          <Panel className="flex-1">
            <div className="flex items-center gap-1.5 mb-2.5">
              <GraduationCap size={14} style={{ color: C.accent }} />
              <span style={{ color: C.text }} className="text-sm font-semibold">
                Education
              </span>
            </div>
            <div className="space-y-2">
              {EDUCATION.map((e) => (
                <div key={e.school} className="flex items-start justify-between gap-2">
                  <div>
                    <p style={{ color: C.text }} className="text-[11px] font-medium leading-snug">
                      {e.school}
                    </p>
                    <p style={{ color: C.sub }} className="text-[10px]">
                      {e.detail}
                    </p>
                  </div>
                  {e.period && (
                    <span style={{ ...mono, color: C.mono }} className="text-[9px] whitespace-nowrap pt-0.5">
                      {e.period}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </Panel>

          <Panel className="flex-1">
            <div className="flex items-center gap-1.5 mb-2.5">
              <Award size={14} style={{ color: C.accent }} />
              <span style={{ color: C.text }} className="text-sm font-semibold">
                Certifications
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {CERTIFICATIONS.map((cert) => (
                <Tag key={cert.name} href={cert.href} icon={cert.icon} color={cert.color} small>
                  {cert.name}
                </Tag>
              ))}
            </div>
          </Panel>
        </div>

        {/* CTA */}
        <div className="rounded-lg p-6 relative mt-1" style={{ background: `linear-gradient(115deg, ${C.accent}, ${C.accent2})` }}>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              borderRadius: 8,
              opacity: 0.2,
              backgroundImage: "repeating-linear-gradient(115deg, #05070d 0px, #05070d 1px, transparent 1px, transparent 14px)",
            }}
          />
          <div className="relative">
            <p style={{ ...mono, color: C.onAccent }} className="text-[10px] tracking-[0.3em] uppercase font-bold mb-1">
              Open to opportunities
            </p>
            <h3 style={{ ...display, color: C.onAccent, letterSpacing: "0.01em" }} className="text-4xl leading-[0.95] mb-3 max-w-lg">
              LET&apos;S SHIP SOMETHING THAT ACTUALLY MATTERS.
            </h3>
<div className="flex flex-wrap gap-2.5">
  <a
    href="mailto:joseph101kt@gmail.com"
    className="cta-btn-primary inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-xs font-bold hover:-translate-y-0.5 transition-transform"
    style={{ backgroundColor: "#05070d", color: C.mono }}
  >
    <Mail size={14} /> joseph101kt@gmail.com <ArrowRight size={14} />
  </a>
<a
  href="https://github.com/joseph101kt"
  target="_blank"
  rel="noreferrer"
  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border-2 text-xs font-bold hover:bg-black/10 transition-colors"
  style={{ borderColor: "#ffffff", color: "#ffffff" }}
>
  <ExternalLink size={14} />
  <span>
    {isPrinting ? "GitHub (github.com/joseph101kt)" : "GitHub"}
  </span>
</a>
</div>
          </div>
        </div>
      </div>
    </div>
  );
}
// ---------- Floating controls (never printed) ----------

interface FabBarProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
}
function FabBar({ theme, onToggleTheme, onPrint }: FabBarProps & { onPrint: () => void }) {
  return (
    <div className="fab-bar no-print">
      <button
        type="button"
        onClick={onToggleTheme}
        className="fab-button"
        title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      >
        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      </button>
      <button
        type="button"
        onClick={onPrint} // 👈 Call the custom print handler
        className="fab-button"
        title="Print on paper"
        aria-label="Print resume"
      >
        <Printer size={18} />
      </button>
      <a
        href={RESUME_PDF_URL}
        target="_blank"
        rel="noreferrer"
        className="fab-button"
        title="Download PDF"
        aria-label="Download PDF resume"
      >
        <Download size={18} />
      </a>
    </div>
  );
}
// ---------- Root ----------

export default function ResumePage() {
  const [theme, setTheme] = useState<ThemeMode>("dark");

  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = () => {
    setIsPrinting(true);
  };

  // Trigger print AFTER React re-renders with isPrinting = true
  useEffect(() => {
    if (!isPrinting) return;

    // Small delay ensures DOM painting is complete before blocking window.print()
    const timer = setTimeout(() => {
      window.print();
      setIsPrinting(false); // Reset state when print dialog closes
    }, 100);

    return () => clearTimeout(timer);
  }, [isPrinting]);

  useEffect(() => {
    const handleAfterPrint = () => setIsPrinting(false);
    window.addEventListener("afterprint", handleAfterPrint);
    return () => window.removeEventListener("afterprint", handleAfterPrint);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <>
<style>{`
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

  :root {
    --color-bg: #05070d;
    --color-panel: #0b0e1a;
    --color-panel-alt: #11131f;
    --color-line: rgba(139,92,246,0.14);
    --color-border: rgba(139,92,246,0.20);
    --color-accent: #8b5cf6;
    --color-accent2: #e879f9;
    --color-text: #f5f3ff;
    --color-sub: #948fa3;
    --color-mono: #c4b5fd;
    --color-muted-bg: #0d0e17;
    --color-muted-border: rgba(148,143,163,0.18);
    --color-muted-text: #6b6578;
    --color-muted-accent: #4c3d66;
    --color-on-accent: #05070d;
    --color-on-muted-accent: #ece8f2;
  }

  html[data-theme='light'] {
    --color-bg: #eef0f6;
    --color-panel: #ffffff;
    --color-panel-alt: #f6f5fa;
    --color-line: rgba(124,58,237,0.10);
    --color-border: rgba(124,58,237,0.22);
    --color-accent: #7c3aed;
    --color-accent2: #c026d3;
    --color-text: #191527;
    --color-sub: #5b5570;
    --color-mono: #6d28d9;
    --color-muted-bg: #f3f2f7;
    --color-muted-border: rgba(91,85,112,0.18);
    --color-muted-text: #8a8499;
    --color-muted-accent: #e3daf2;
    --color-on-accent: #ffffff;
    --color-on-muted-accent: #3a3350;
  }

  body {
    font-family: 'Inter', system-ui, sans-serif;
    background: var(--color-bg);
    margin: 0;
    padding: 24px 0;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    transition: background 0.2s ease;
  }

  .a4-page {
    width: 794px;
    min-height: 1123px;
    margin: 0 auto 24px;
    display: flex;
    flex-direction: column;
    border-radius: 6px;
    background-image: radial-gradient(var(--color-line) 1px, transparent 1px);
    background-size: 22px 22px;
    transition: background 0.2s ease;
  }


  .fab-bar {
    position: fixed;
    right: 24px;
    bottom: 24px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    z-index: 1000;
  }

  .fab-button {
    width: 46px;
    height: 46px;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--color-border);
    background: var(--color-panel-alt);
    color: var(--color-text);
    cursor: pointer;
    box-shadow: 0 8px 20px rgba(0,0,0,0.28);
    text-decoration: none;
    transition: transform 0.15s ease, background 0.15s ease, color 0.15s ease;
  }

  .fab-button:hover,
  .fab-button:focus-visible {
    transform: translateY(-2px);
    background: var(--color-accent);
    color: var(--color-on-accent);
    border-color: var(--color-accent);
    outline: none;
  }

  @media print {
    html, body {
      background: #ffffff !important;
      padding: 0 !important;
      margin: 0 !important;
      height: auto !important;
      overflow: visible !important;
    }


    :root,
    html[data-theme='light'],
    html[data-theme='dark'] {
      --color-bg: #ffffff !important;
      --color-panel: #ffffff !important;
      --color-panel-alt: #f7f6fb !important;
      --color-line: rgba(124,58,237,0.08) !important;
      --color-border: rgba(124,58,237,0.25) !important;
      --color-accent: #7c3aed !important;
      --color-accent2: #c026d3 !important;
      --color-text: #14101f !important;
      --color-sub: #524c66 !important;
      --color-mono: #6d28d9 !important;
      --color-muted-bg: #f3f2f7 !important;
      --color-muted-border: rgba(91,85,112,0.2) !important;
      --color-muted-text: #837d92 !important;
      --color-muted-accent: #e3daf2 !important;
      --color-on-accent: #ffffff !important;
      --color-on-muted-accent: #3a3350 !important;
    }

    .a4-page {
      width: 100% !important;
      height: auto !important;
      min-height: 0 !important;
      max-height: none !important;
      margin: 0 !important;
      padding: 0 !important;
      box-shadow: none !important;
      border-radius: 0 !important;
      background-image: none !important;
      break-after: page !important;
      page-break-after: always !important;
    }

    /* Prevent the LAST page from forcing a trailing blank page */
    .a4-page:last-of-type {
      break-after: avoid !important;
      page-break-after: avoid !important;
    }

    .a4-page .gap-6 { gap: 0.85rem !important; }
    .a4-page .gap-5 { gap: 0.75rem !important; }
    .a4-page .p-9 { padding: 1.25rem !important; }

    .no-print,
    .fab-bar {
      display: none !important;
    }

    .tag-chip {
      flex-wrap: wrap;
      max-width: 260px;
    }
      
    .cta-btn-primary {
        background-color: #000000 !important;
        color: #ffffff !important;
    }
    .cta-btn-secondary {
        border-color: #ffffff !important;
        color: #ffffff !important;
        background-color: rgba(0, 0, 0, 0.15) !important;
    }

    a[data-print-url]::after {
      content: " (" attr(data-print-url) ")";
      font-family: 'JetBrains Mono', monospace;
      font-size: 7px;
      color: var(--color-muted-text);
      margin-left: 3px;
      word-break: break-all;
    }
  }

  @page {
    size: A4 portrait;
    margin: 0;
  }
`}</style>

      <PageOne isPrinting={isPrinting} />
      <PageTwo isPrinting={isPrinting} />
      
      <FabBar 
        theme={theme} 
        onToggleTheme={toggleTheme} 
        onPrint={handlePrint} 
      />
    </>
  );
}