'use client';

import { useState, useEffect, useRef } from 'react';
import Modal from './Modal';

/* ─── Types ─────────────────────────────────────────── */

interface ProjectItem {
  id: string;
  icon: string;
  name: string;
  type: string;
  tagline: string;
  stack: string[];
  links: { label: string; href: string }[];
  overview: string;
  highlights: string[];
  details?: string;
}

/* ─── Data ───────────────────────────────────────────── */

const PROJECTS: ProjectItem[] = [
  {
    id:      'mern-visualizer',
    icon:    '📊',
    name:    'MERN MongoDB Visualizer',
    type:    'Full-Stack System',
    tagline: 'Custom-built MongoDB document visualizer with recursive UI logic and an Express-driven REST API.',
    stack:   ['MongoDB', 'Express', 'React', 'Node.js', 'Mongoose', 'Lucide React', 'Tailwind CSS'],
    links:   [
      { label: 'Live App ↗', href: 'https://mern-stack-mongodb-database-visualize.netlify.app' },
      { label: 'GitHub ↗', href: 'https://github.com/joseph101kt/MERN-Stack-Mongodb-database-Visualizer' }
    ],
    overview:
      'A specialized data management tool designed to bridge the gap between raw MongoDB collections and intuitive administrative control. This project represents a major technical transition from BaaS (Supabase) to a self-managed MERN architecture, requiring manual schema definition and custom API routing.',
    highlights: [
      'Engineered Recursive React Components to visualize infinitely nested JSON data structures without hardcoded paths',
      'Developed a robust RESTful API from scratch using Node/Express to handle GET, POST, PATCH, and DELETE operations',
      'Implemented Mongoose Schema Validation to ensure data integrity and type safety in a schema-less NoSQL environment',
      'Built a centralized Admin Panel featuring live inline DB editing and instant UI-to-database synchronization',
      'Designed a high-performance product catalog with fuzzy search and category-based filtering against live MongoDB collections',
      'Created a "Dark-Mode First" aesthetic utilizing Lucide icons and specialized Emerald/Zinc color palettes for a pro-developer feel',
    ],
    details: 'The transition from automated backend magic to "manual" Express routing was the primary focus. I solved the data hierarchy problem by building a recursive tree-view component that dynamically renders document keys and values regardless of depth.',
  },
  {
    id:      'job-portal',
    icon:    '⚙',
    name:    'Full-Stack Job Portal',
    type:    'Web + Mobile',
    tagline: 'Cross-platform app with real-time chat, live video interviews, and AI-powered resume parsing.',
    stack:   ['React Native', 'Expo Router', 'Supabase', 'LiveKit', 'Gemini API', 'Tesseract.js', 'Mammoth', 'TypeScript'],
    links:   [{ label: 'GitHub ↗', href: 'https://github.com/joseph101kt/job_portal_barabari' },
              { label: 'Live App ↗', href: "https://joseph-k-mobile.expo.app/"}
    ],
    overview:
      'A cross-platform job platform (web + Android) built with Expo Router in a monorepo structure and deployed to Vercel for web. Employers can post jobs, interview candidates live, and chat in real time. Candidates upload resumes that are automatically parsed into structured data.',
    highlights: [
      'Expo Router monorepo — shared codebase runs on web (Vercel) and Android',
      'Supabase Realtime for live chat between employers and candidates with JWT auth',
      'LiveKit Cloud WebRTC integration for in-app video interviews with camera/mic controls',
      'AI resume parser pipeline: Tesseract.js for image OCR, Mammoth for DOCX extraction, Gemini API to structure the extracted text into job-ready data',
      'Shared Supabase package across workspace apps — single source of truth for DB schema and types',
      'NativeWind + Tailwind for consistent UI across platforms',
    ],
    details: 'Built as a manual monorepo (npm workspaces) with apps/mobile and a shared packages/supabase package. The web export uses expo export --platform web piped through a custom fix-dist.js for Vercel compatibility.',
  },

 
  {
    id:      'cctv',
    icon:    '◉',
    name:    'Smart CCTV System',
    type:    'Team Project',
    tagline: 'Python + OpenCV human-detection system that records only when someone is present, cutting storage waste.',
    stack:   ['Python', 'OpenCV', 'Tkinter', 'JSON'],
    links:   [{ label: '', href: '' }],
    overview:
      'A team project: a CCTV recording system that uses computer vision to detect human presence and only saves footage when someone is actually there. Standard CCTV records 24/7 and wastes enormous storage on empty rooms. This system solves that.',
    highlights: [
      'Background subtraction + contour analysis via OpenCV for reliable human detection',
      'Selective recording logic — only writes to disk when a human is detected in frame',
      'My contribution: Tkinter GUI and JSON-based settings panel — non-technical users can configure detection sensitivity, recording paths, and thresholds without touching code',
      'Settings persisted in JSON — configuration survives restarts',
    ],
  },
  {
    id:      'game',
    icon:    '◈',
    name:    'Slimes vs Sorcerers',
    type:    '2D Game',
    tagline: 'A full 2D game in Lua/Love2D with 6 enemy types, wave progression, DoT/freeze/stun mechanics, and a loot system.',
    stack:   ['Lua', 'Love2D'],
    links:   [
      { label: 'Demo ↗', href: 'https://www.youtube.com/watch?v=x14loV1b6fc' },
    ],
    overview:
      'A complete 2D game built from scratch in Lua and Love2D. The player is a sorcerer defending against waves of slimes, each type with unique combat behaviours. Enemy difficulty and variety escalate as score increases.',
    highlights: [
      'Player mechanics: movement, dash, and projectile firing; tween-based sprite animation (width/height scaling)',
      'Base Enemy class extended into 6 types: fire slime (DoT), poison slime (DoT), ice slime (DoT + slow → freeze if slow exceeds threshold), stone slime (stun), explosive slime (area-of-effect on impact)',
      'Wave progression system — enemy level, variety, and spawn rate increase with player score',
      'Basic pathfinding for enemy movement toward the player',
      'Full HUD: health hearts, enemy health bars, score display',
      'All UI screens: main menu (Play / Options / Quit), pause menu, game over screen',
      'Loot drop system: heart pickups (half or full health), basic XP drops',
    ],
    details: 'Pending: swap background music to copyright-free tracks, fix volume slider bug, and explore Lua → WASM conversion for a playable in-browser embed.',
  },
];
/* ─── Project card ───────────────────────────────────── */
 {/*
  {
    id:      'layout-creator',
    icon:    '▦',
    name:    'Layout Creator',
    type:    'Internal Tool',
    tagline: 'Drag-and-drop ID card and ticket generator with live field bindings from a Supabase DB schema.',
    stack:   ['React', 'Supabase', 'PDF Generation', 'Cloudinary'],
    links:   [{ label: 'GitHub ↗', href: 'https://github.com/joseph101kt' }],
    overview:
      'A visual layout builder that lets non-technical staff create event ID cards and tickets by dragging DB fields onto a canvas. The tool reads the live Supabase schema, so any new column automatically appears as a bindable field — no code changes required.',
    highlights: [
      'Live Supabase schema introspection — new DB columns appear instantly as draggable fields',
      'Canvas-based drag-and-drop layout editor with live preview',
      'One-click PDF generation from the designed template with real attendee data injected',
      'Images fetched from Cloudinary via URL stored in Supabase',
      'Used in production for real events — SBMS Academy and SIMA Beauty Expo',
    ],
  },

  */}
function ProjectCard({ item, onOpen }: { item: ProjectItem; onOpen: () => void }) {
  return (
    <div
      onClick={onOpen}
      className="group reveal flex cursor-pointer flex-col gap-3 rounded-xl border border-white/10 bg-[#050812]/60 px-5 py-5 backdrop-blur-sm transition-colors hover:border-[#c27aff]/30"
    >
      {/* Icon */}
      <div className="flex h-[42px] w-[42px] items-center justify-center rounded-lg border border-[#c27aff]/20 bg-[#c27aff]/10 text-[15px] text-[#c27aff]">
        {item.icon}
      </div>

      <div className="flex-1">
        <div className="mb-1 flex items-center gap-2">
          <h3 className="font-[var(--font-display)] text-[15px] font-semibold text-white">
            {item.name}
          </h3>
        </div>

        <span className="inline-block rounded border border-white/10 px-1.5 py-[2px] font-[var(--font-mono)] text-[9px] text-white/50">
          {item.type}
        </span>

        <p className="mt-2 text-[12px] leading-[1.6] text-white/70">
          {item.tagline}
        </p>
      </div>

      {/* Stack */}
      <div className="flex flex-wrap gap-1">
        {item.stack.slice(0, 4).map((t) => (
          <span
            key={t}
            className="rounded border border-white/10 px-1.5 py-[2px] text-[10px] text-white/60"
          >
            {t}
          </span>
        ))}
        {item.stack.length > 4 && (
          <span className="rounded border border-white/10 px-1.5 py-[2px] text-[10px] text-white/40">
            +{item.stack.length - 4}
          </span>
        )}
      </div>

      {/* Links */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex items-center justify-between pt-1"
      >
        <div className="flex gap-1.5">
          {item.links.map((l) => (
            l.label && (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[#c27aff]/30 px-2.5 py-1 font-[var(--font-mono)] text-[10px] text-[#c27aff]/80 hover:text-[#c27aff]"
              >
                {l.label}
              </a>
            )
          ))}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
          }}
          className="font-[var(--font-mono)] text-[10px] text-white/40 hover:text-[#c27aff]"
        >
          Details →
        </button>
      </div>
    </div>
  );
}

/* ─── Modal content ──────────────────────────────────── */

function ProjectModalContent({ item }: { item: ProjectItem }) {
  return (
    <div>
      {/* Header */}
      <div className="mb-5 flex items-start gap-3.5">
        <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-xl border border-[rgba(139,92,246,0.25)] bg-[rgba(139,92,246,0.12)] text-2xl">
          {item.icon}
        </div>

        <div>
          <span className="mb-1 inline-block rounded border border-[var(--border-subtle)] px-2 py-[2px] font-[var(--font-mono)] text-[10px] text-[var(--txt-tertiary)]">
            {item.type}
          </span>

          <h2 className="font-[var(--font-display)] text-[22px] font-extrabold">
            {item.name}
          </h2>
        </div>
      </div>

      <div className="mb-5 h-px bg-[var(--border-subtle)]" />

      {/* Overview */}
      <ModalSection label="Overview" icon="◎">
        <p className="text-sm leading-[1.7] text-[var(--txt-secondary)]">
          {item.overview}
        </p>
      </ModalSection>

      {/* Highlights */}
      <ModalSection label="Technical highlights" icon="◆">
        <ul className="flex flex-col gap-2">
          {item.highlights.map((h, i) => (
            <li
              key={i}
              className="flex gap-2.5 text-[13px] leading-[1.65] text-[var(--txt-secondary)]"
            >
              <span className="mt-[2px] text-[var(--v500)]">▪</span>
              {h}
            </li>
          ))}
        </ul>
      </ModalSection>

      {/* Details */}
      {item.details && (
        <div className="mb-5 rounded-r-lg border border-[rgba(139,92,246,0.18)] border-l-[3px] border-l-[var(--v600)] bg-[rgba(139,92,246,0.05)] px-3.5 py-2.5 text-[12px] leading-[1.65] text-[var(--txt-secondary)] font-[var(--font-body)]">
          {item.details}
        </div>
      )}

      {/* Stack */}
      <ModalSection label="Stack" icon="◎">
        <div className="flex flex-wrap gap-1.5">
          {item.stack.map((t) => (
            <span key={t} className="tech-tag">
              {t}
            </span>
          ))}
        </div>
      </ModalSection>

      {/* Links */}
      <div className="mt-1 flex flex-wrap gap-2">
        {item.links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-md border border-[rgba(139,92,246,0.3)] bg-[rgba(139,92,246,0.08)] px-3.5 py-2 text-[12px] font-[var(--font-mono)] text-[var(--v400)] transition hover:bg-[rgba(139,92,246,0.16)]"
          >
            {l.label}
          </a>
        ))}
      </div>
    </div>
  );
}

function ModalSection({
  label,
  icon,
  children,
}: {
  label: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5.5">
      <div className="mb-2.5 flex items-center gap-1.5">
        <span className="text-[11px] text-[var(--v500)]">{icon}</span>
        <span className="font-[var(--font-mono)] text-[10px] tracking-[0.08em] text-[var(--v600)]">
          {label.toUpperCase()}
        </span>
      </div>
      {children}
    </div>
  );
}

/* ─── Section ────────────────────────────────────────── */

export default function ProjectsSection() {
  const [activeItem, setActiveItem] = useState<ProjectItem | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        }),
      { threshold: 0.08 }
    );

    sectionRef.current
      ?.querySelectorAll('.reveal')
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        id="projects"
        ref={sectionRef}
        className="mx-auto bg-[#050812]  px-6 py-20"
      >
        <div className="reveal mb-9">
          <div className="section-kicker">PROJECTS</div>

          <h2 className="mb-2 font-[var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold">
            Built for curiosity
          </h2>

          <p className="text-[15px] leading-[1.6] text-[var(--txt-secondary)]">
            Personal and team builds — no client, just craft.
          </p>
        </div>

        <div className="stagger-children grid lg:grid-cols-2 md:grid-cols-2 gap-3.5 md:gap-10 lg:gap-9 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
          {PROJECTS.map((item) => (
            <ProjectCard
              key={item.id}
              item={item}
              onOpen={() => setActiveItem(item)}
            />
          ))}
        </div>
      </section>

      <Modal isOpen={!!activeItem} onClose={() => setActiveItem(null)}>
        {activeItem && <ProjectModalContent item={activeItem} />}
      </Modal>
    </>
  );
}