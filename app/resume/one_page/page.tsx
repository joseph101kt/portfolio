// app/resume/one_page/page.tsx
"use client";

import Image from "next/image";
import { Mail, ArrowRight, ExternalLink, GraduationCap, Download } from "lucide-react";
import { CSSProperties, ElementType, ReactNode } from "react";
import {
  getTagIcon,
  type TagColor,
  type ContactItem,
  type SkillItem,
  type Certification,
  type Role,
  type FeaturedRole,
  CONTACTS,
  CERTIFICATIONS,
  FEATURED_ROLE,
  EDUCATION,
} from "@/app/resume/page";

/**
 * One-page PRINT-ONLY resume.
 *
 * This file exists solely to be printed/downloaded as a PDF — the two-page
 * resume (app/resume/page.tsx) remains the version used everywhere else
 * (on-site browsing, dark mode, interactive buttons). Because of that,
 * every design decision here is made for a flattened, single-page, light-
 * mode-only document:
 *  - No theme toggle, no dark palette — one light color set in :root.
 *  - No `isPrinting` content-branching. Earlier revisions tried to swap
 *    link labels for full URLs only when a print was triggered, but that
 *    relied on React state that native Ctrl+P never touches — so the
 *    "print" content just never appeared for people who didn't use the
 *    in-page button. Anything that needs to show as a full URL (currently
 *    just the portfolio contact) now ALWAYS renders that way, permanently.
 *  - Live-website chips are dropped entirely (Nazaria, Anugraha, and the
 *    featured SBMS role) — the featured role's bullets already name the
 *    live URLs in text, and a clickable button adds nothing once this is
 *    a flattened PDF.
 *  - Skills are a hand-curated, reordered list (not every SKILL_GROUPS
 *    entry) — recruiter-facing space is expensive; low-signal/duplicate
 *    tooling (NativeWind, Vite, Node/Express/Django/MongoDB, Flutter,
 *    Android Studio, LiveKit, Cloudinary, Git, REST API Design, SEO) is
 *    cut in favor of the stack that actually differentiates.
 *  - Copy (about text, bullets, role descriptions) is trimmed shorter
 *    than the two-page version, purely for space — see the local
 *    overrides below rather than the shared data in app/resume/page.tsx.
 *
 * LAYOUT VIA INLINE STYLES, NOT TAILWIND CLASSES — this file lives at a
 * nested path Tailwind's class generation wasn't covering in this project,
 * so structural properties (grid, flex, position, sizing) are set via the
 * `style` prop rather than utility classes.
 *
 * DELIBERATELY SELF-CONTAINED: UI primitives (Panel, Tag, SectionHead,
 * Eyebrow, Heading, FeaturedPanel) are defined locally instead of imported
 * from app/resume/page.tsx. Only raw DATA, the icon-matcher, and shared
 * TYPES are imported from there.
 */

const PORTFOLIO_URL = "https://josephkportfolio.netlify.app/";

// ---------- Theme tokens (light only — this build has no dark mode) ----------

const C = {
  panel: "#ffffff",
  panelAlt: "#f6f5fa",
  line: "rgba(124,58,237,0.10)",
  border: "rgba(124,58,237,0.22)",
  accent: "#7c3aed",
  accent2: "#c026d3",
  text: "#191527",
  sub: "#5b5570",
  mono: "#6d28d9",
  onAccent: "#ffffff",
} as const;

const mono = { fontFamily: "'JetBrains Mono', monospace" };
const display = { fontFamily: "'Bebas Neue', sans-serif" };

// ---------- Local data overrides (trimmed for a single printed page) ----------

// Header contacts: phone + portfolio only. Email and GitHub live once, in
// the closing CTA. LinkedIn is dropped (link isn't live right now).
const HEADER_CONTACTS: ContactItem[] = CONTACTS.filter(
  (c: ContactItem) => !c.href.includes("linkedin.com") && !c.href.includes("github.com") && !c.href.startsWith("mailto:")
);

const ABOUT_SHORT: string = "Full-stack and React Native developer who ships production applications for real clients — not just side projects. Built and deployed cross-platform mobile apps, multi-tenant web backends, and AI-powered features using Next.js, React Native (Expo), Supabase, FastAPI, and the Gemini API. Comfortable owning the full stack: schema design, REST APIs, real-time systems, mobile UI, and deployment. Looking to bring that execution speed into an AI-native engineering team.";


interface SkillGroup {
  label: string;
  skills: SkillItem[];
}
const SKILL_GROUPS: SkillGroup[] = [
  {
    label: "Frontend",
    skills: [
      { name: "Next.js", core: true },
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

const CERTIFICATIONS_DISPLAY: Certification[] = CERTIFICATIONS.filter(
  (c: Certification) => c.name !== "Google Digital Marketing"
);

const FEATURED_ROLE_SHORT: FeaturedRole = {
  ...FEATURED_ROLE,
  href: undefined,
  bullets: [
    "Designed, built, and deployed three production sites solo — sbmsacademy.in, simabeautyexpo.com, beyondbeautynetwork.in.",
    "Owned the full event-registration pipeline: photo upload → Cloudinary → instant PDF ticket → email, live at real events.",
    "Shipped internal dashboards for attendee and event management.",
  ],
};


const OTHER_ROLES: Role[] = [
  {
    title: "Full-Stack Web App Developer - Freelance Project",
    org: "Nazaria Collective",
    period: "Jun 2026 – Aug 2026",
    stack: ["Next.js", "Supabase", "Gemini API", "Solo Paid Project"],
    desc: "Architecting a full LMS for a youth mentorship nonprofit — 4 roles, a 22-table schema , real-time chat, Google Meet scheduling, assignments and courses.",
    toned: false,
    href: "https://nazaria-mentorship-webapp-adbd.vercel.app/",
    linkLabel: "Live Website",
  },
  {
    title: "Product Catalogue",
    org: "Anugraha Christian World",
    period: "Retail client",
    stack: ["Next.js", "Cloudinary", "Solo Paid Project"],
    desc: "Product showcase for a real retail client (also worked there in-store), with slug routing, URL-driven filters, and a CRUD admin panel.",
    toned: false,
    href: "https://anugrahachristianworld.in",
    linkLabel: "Live Website",
  },
];
// Side roles: no live-link chip, no stack chips, shorter descriptions, and
// Nazaria's org renamed for display.
const OTHER_ROLES_DISPLAY: Role[] = OTHER_ROLES.map((r: Role) => ({
  ...r,
  org: r.org === "Nazaria Collective" ? "Nazaria Arts Collective" : r.org,
  stack: [],
  href: undefined,
  desc:
    r.title === "Full-Stack Web App Developer"
      ? "Architecting a full LMS for a youth mentorship nonprofit — 4 roles, 22-table schema, real-time chat, scheduling."
      : "Product showcase for a retail client — slug routing, URL-driven filters, and a CRUD admin panel.",
}));

// ---------- Local UI primitives ----------

function Eyebrow({ children }: { children: ReactNode }): React.JSX.Element {
  return (
    <p style={{ ...mono, color: C.mono, letterSpacing: "0.25em", fontSize: 10, textTransform: "uppercase", marginBottom: 3 }}>
      {children}
    </p>
  );
}

interface HeadingProps {
  children: ReactNode;
  fontSize?: number;
}

function Heading({ children, fontSize = 28 }: HeadingProps): React.JSX.Element {
  return (
    <h2 style={{ ...display, color: C.text, letterSpacing: "0.02em", fontSize, lineHeight: 1, marginBottom: 8 }}>
      {children}
    </h2>
  );
}

interface SectionHeadProps {
  eyebrow?: ReactNode;
  heading: ReactNode;
  fontSize?: number;
}

function SectionHead({ eyebrow, heading, fontSize = 28 }: SectionHeadProps): React.JSX.Element {
  return (
    <div style={{ marginBottom: 10 }}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Heading fontSize={fontSize}>{heading}</Heading>
    </div>
  );
}

interface PanelProps {
  style?: CSSProperties;
  children: ReactNode;
}

function Panel({ style = {}, children }: PanelProps): React.JSX.Element {
  return (
    <div
      style={{
        borderRadius: 8,
        border: `1px solid ${C.border}`,
        padding: 12,
        backgroundColor: C.panelAlt,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

interface TagProps {
  children: ReactNode;
  icon?: ElementType;
  color?: TagColor;
  href?: string;
  small?: boolean;
}

function Tag({ children, icon: Icon, color, href, small = false }: TagProps): React.JSX.Element {
  const filled: boolean = color !== undefined;
  const vividFill: string = color === "accent" ? C.accent2 : C.accent;

  const backgroundColor: string = filled ? vividFill : "transparent";
  const borderColor: string = filled ? vividFill : C.border;
  const textColor: string = filled ? C.onAccent : C.sub;

  const style: CSSProperties = {
    ...mono,
    backgroundColor,
    borderColor,
    color: textColor,
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    borderRadius: 6,
    border: "1px solid",
    padding: small ? "2px 8px" : "4px 10px",
    fontSize: small ? 10 : 11,
    fontWeight: filled ? 600 : 400,
    textDecoration: "none",
    whiteSpace: "nowrap",
  };

  const content = (
    <>
      {Icon && <Icon size={small ? 10 : 12} />}
      {children}
    </>
  );

  if (href) {
    const isExternal: boolean = href.startsWith("http");
    return (
      <a href={href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noreferrer" : undefined} style={style}>
        {content}
      </a>
    );
  }

  return <span style={style}>{content}</span>;
}

interface FeaturedPanelProps {
  data: FeaturedRole;
}

function FeaturedPanel({ data }: FeaturedPanelProps): React.JSX.Element {
  return (
    <Panel>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <div>
          {data.period && <p style={{ ...mono, color: C.sub, fontSize: 10, marginBottom: 3 }}>{data.period}</p>}
          <h3 style={{ color: C.text, fontSize: 15, fontWeight: 600 }}>{data.title}</h3>
          {data.org && <p style={{ color: C.sub, fontSize: 12 }}>{data.org}</p>}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "flex-end" }}>
          {data.stack.map((s: string) => (
            <Tag key={s} icon={getTagIcon(s)} color="primary" small>
              {s}
            </Tag>
          ))}
        </div>
      </div>
      <ul style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 4, listStyle: "none", padding: 0 }}>
        {data.bullets.map((b: string, i: number) => (
          <li key={i} style={{ color: C.sub, fontSize: 11.5, lineHeight: 1.5, paddingLeft: 12, position: "relative" }}>
            <span style={{ position: "absolute", left: 0, top: 6, width: 4, height: 4, borderRadius: 999, backgroundColor: C.accent }} />
            {b}
          </li>
        ))}
      </ul>
    </Panel>
  );
}

// ---------- Page ----------

export default function ResumeOnePage(): React.JSX.Element {
  const handleDownload = (): void => window.print();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        :root {
          --color-bg: #eef0f6;
        }

        body {
          font-family: 'Inter', system-ui, sans-serif;
          background: var(--color-bg);
          margin: 0;
          padding: 24px 0;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        .a4-page {
          width: 794px;
          height: 1123px;
          margin: 0 auto;
          border-radius: 6px;
          overflow: hidden;
        }

        @media print {
          html, body { background: #ffffff !important; padding: 0 !important; margin: 0 !important; height: auto !important; overflow: visible !important; }
          .a4-page { width: 100% !important; height: auto !important; margin: 0 !important; border-radius: 0 !important; }
          .no-print { display: none !important; }
        }

        @page { size: A4 portrait; margin: 0; }
      `}</style>

      <div className="a4-page" style={{ backgroundColor: C.panel, display: "flex", flexDirection: "column" }}>
        <div style={{ padding: 28, flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Header — photo (top-left) + role/name/contacts grouped together */}
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <div style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
              <div style={{ position: "relative", width: 84, height: 84, flexShrink: 0, borderRadius: 8, overflow: "hidden" }}>
                <Image src="/stylized_avatar1.png" alt="Joseph Kakkassery" fill priority style={{ objectFit: "cover" }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ ...mono, color: C.mono, fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 6 }}>
                  Full-Stack &amp; React Native Developer
                </p>
                <h1 style={{ ...display, color: C.text, letterSpacing: "0.01em", fontSize: 40, lineHeight: 0.9, marginBottom: 10 }}>
                  JOSEPH KAKKASSERY
                </h1>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {HEADER_CONTACTS.map((contact: ContactItem) => {
                    const Icon = contact.icon;
                    const isPortfolio: boolean = contact.href === PORTFOLIO_URL;
                    const displayLabel: string = isPortfolio ? contact.href : contact.label;

                    return (
                      <Tag key={contact.href} icon={Icon} href={contact.href}>
                        {displayLabel}
                      </Tag>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="h-2"></div>
            <p style={{ ...mono, color: C.mono, letterSpacing: "0.25em", fontSize: 10,  }}>
              ABOUT    
            </p>
            <p style={{ color: C.sub, fontSize: 13, lineHeight: 1.5, maxWidth: 640 }}>{ABOUT_SHORT}</p>
          </div>

          <div style={{ height: 1, backgroundColor: C.line }} />

 <div>
      <h2 style={{ ...display, color: C.text, letterSpacing: "0.02em", fontSize:28, lineHeight: 1, marginBottom: 4 }}>
      Skills
    </h2>
  <div className="flex flex-col gap-1.5">
    {SKILL_GROUPS.map((group) => (
      <div
        key={group.label}
        className="rounded-lg border py-1.5 px-2.5 grid gap-1.5 items-center"
        style={{ backgroundColor: C.panelAlt, borderColor: C.border, gridTemplateColumns: "80px 1fr" }}
      >
        <span className="text-[11px] uppercase tracking-wider font-semibold" style={{ ...mono, color: C.accent }}>
          {group.label}
        </span>
        <div className="flex flex-wrap gap-1.5">
          {group.skills.map((s) => (
            <Tag key={s.name} icon={getTagIcon(s.name)} color={s.core ? "primary" : undefined} small>
              {s.name}
            </Tag>
          ))}
        </div>
      </div>
    ))}
  </div>
</div>

          <div style={{ height: 1, backgroundColor: C.line }} />

          {/* Experience — featured role + side roles, one merged section */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <SectionHead  heading="Roles I Have Taken On" fontSize={26} />
            <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
              <FeaturedPanel data={FEATURED_ROLE_SHORT} />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {OTHER_ROLES_DISPLAY.map((role: Role) => (
                  <Panel key={role.title}>
                    <p style={{ ...mono, color: C.sub, fontSize: 10, marginBottom: 2 }}>{role.period}</p>
                    <h4 style={{ color: C.text, fontSize: 13, fontWeight: 600, lineHeight: 1.25 }}>{role.title}</h4>
                    <p style={{ color: C.sub, fontSize: 11 }}>{role.org}</p>
                    <p style={{ color: C.sub, fontSize: 11, lineHeight: 1.5, marginTop: 6 }}>{role.desc}</p>
                  </Panel>
                ))}
              </div>
            </div>
          </div>

          {/* Education And Certs */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 16, alignItems: "start" }}>
            {/* Education */}
            <Panel>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                <GraduationCap size={13} style={{ color: C.accent }} />
                <span style={{ color: C.text, fontSize: 13, fontWeight: 600 }}>Education</span>
              </div>
              <p style={{ color: C.text, fontSize: 11, lineHeight: 1.5 }}>{EDUCATION[0].detail}</p>
              <p style={{ color: C.text, fontSize: 11, lineHeight: 1.5 }}>{EDUCATION[0].school}</p>
              <p style={{ color: C.sub, fontSize: 10 }}>{EDUCATION[0].period}</p>
            </Panel>

              {/* Certifications */}
              <div>
                <Panel style={{ padding: 12 }}>
                  {/* Header */}
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                    <span style={{ color: C.text, fontSize: 13, fontWeight: 600 }}>
                      Verified Certifications
                    </span>
                  </div>

                  {/* First Row: First 3 Certifications */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 7 }}>
                    {CERTIFICATIONS_DISPLAY.slice(0, 3).map((cert: Certification) => (
                      <Tag key={cert.name} href={cert.href} icon={cert.icon} color={cert.color} small>
                        {cert.name}
                      </Tag>
                    ))}
                  </div>

                  {/* Second Row: Remaining Certifications */}
                  {CERTIFICATIONS_DISPLAY.length > 3 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                      {CERTIFICATIONS_DISPLAY.slice(3).map((cert: Certification) => (
                        <Tag key={cert.name} href={cert.href} icon={cert.icon} color={cert.color} small>
                          {cert.name}
                        </Tag>
                      ))}
                    </div>
                  )}
                </Panel>
              </div>
          </div>


{/* Final CTA */}
<div className="rounded-lg p-4 relative mt-1" style={{ background: `linear-gradient(115deg, ${C.accent}, ${C.accent2})` }}>
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      borderRadius: 8,
      opacity: 0.2,
      backgroundImage: "repeating-linear-gradient(115deg, #05070d 0px, #05070d 1px, transparent 1px, transparent 14px)",
    }}
  />
  <div className="relative">
    <p style={{ ...mono, color: C.onAccent }} className="text-[10px] tracking-[0.3em] uppercase font-bold mb-0.5">
      Open to opportunities
    </p>

    <h3
      style={{ ...display, color: C.onAccent, letterSpacing: "0.01em" }}
      className="text-xl sm:text-2xl md:text-3xl leading-none mb-2.5 whitespace-nowrap"
    >
      LET&apos;S SHIP SOMETHING THAT ACTUALLY MATTERS.
    </h3>

    <div className="flex flex-wrap gap-2">
      <a
        href="mailto:joseph101kt@gmail.com"
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border-2 text-xs font-bold hover:bg-black/10 transition-colors"
        style={{ borderColor: "#ffffff", color: "#ffffff" }}
      >
        <Mail size={13} /> joseph101kt@gmail.com <ArrowRight size={13} />
      </a>
      <a
        href="https://github.com/joseph101kt"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border-2 text-xs font-bold hover:bg-black/10 transition-colors"
        style={{ borderColor: "#ffffff", color: "#ffffff" }}
      >
        <ExternalLink size={13} />
        <span>GitHub [github.com/joseph101kt]</span>
      </a>
    </div>
  </div>
</div>



        </div>
      </div>
    </>
  );
}