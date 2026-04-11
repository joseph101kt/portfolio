'use client';

import { useState, useEffect, useRef } from 'react';
import Modal from './Modal';
import Image from 'next/image';

/* ─── Types ─────────────────────────────────────────── */

interface WorkItem {
  id: string;
  num: string;
  name: string;
  urls: { label: string; href: string }[];
  meta?: string;
  tagline: string;
  stack: string[];
  problem: string;
  built: string;
  features: string[];
  note?: string;
}

/* ─── Data ───────────────────────────────────────────── */

const WORK: WorkItem[] = [
  {
    id:      'anugraha',
    num:     '01',
    name:    'Anugraha Christian World',
    urls:    [{ label: 'anugrahachristianworld.in ↗', href: 'https://anugrahachristianworld.in' }],
    tagline: 'Product catalogue for a local retail store with CRUD, tag filtering, and slug-based routing.',
    stack:   ['Next.js', 'Supabase', 'Tailwind'],
    problem:
      'A local retail store had no online presence. Customers had to visit in person to see what was in stock — there was no way to browse, search, or share specific products.',
    built:
      'A full-stack product catalogue site with a CRUD admin panel for staff to add, edit, and remove products without touching code. Product images are hosted on Cloudinary with URLs stored in Supabase. The frontend is a Next.js site with tag-based filtering and keyword search both driven by URL params — so filtered views are bookmarkable and shareable.',
    features: [
      'Slug-based product routing — /products/gold-plated-chalice-c2b2e6a4 — clean, shareable URLs',
      'Tag filtering + keyword search via URL params (no page reload)',
      'Cloudinary image hosting with URL references in Supabase DB',
      'Staff-facing CRUD admin panel — no dev involvement needed',
      'Local JSON for static content, Supabase only for product data',
    ],
    note:
      'Also worked at this store as a part-time assistant — direct product knowledge directly shaped the categorisation and UX decisions.',
  },
  {
    id:      'sbms',
    num:     '02',
    name:    'Event Registration Platform',
    urls:    [
      { label: 'sbmsacademy.in ↗',       href: 'https://sbmsacademy.in' },
      { label: 'simabeautyexpo.com ↗',   href: 'https://simabeautyexpo.com' },
    ],
    meta:    'Built at SBMS · Aug 2025 – Jan 2026',
    tagline: 'Registration system serving two independent beauty-industry clients on a shared Supabase backend — image upload, PDF ticket generation, and automated onboarding.',
    stack:   ['Next.js', 'Supabase', 'Cloudinary', 'PDF Generation', 'Multi-tenant'],
    problem:
      'Two separate beauty-industry clients — SBMS Academy and SIMA Beauty Expo — both needed event registration systems. The process was manual: staff collected details by hand, printed tickets, and tracked attendees in spreadsheets.',
    built:
      'A shared Supabase backend serving two independent Next.js frontends. Registrants upload a photo which goes to Cloudinary; the URL is stored in Supabase alongside their details. On submission, the system instantly generates a personalised PDF ticket or ID card using a dynamic template. I also built a reusable template generator so staff can create new event templates without developer involvement.',
    features: [
      'Multi-tenant architecture — one Supabase DB, two independent client sites',
      'Image upload → Cloudinary → URL stored in DB, all in one flow',
      'Instant PDF ticket / ID card generation with dynamic field injection',
      'Reusable template generator for staff — no code required to create new event templates',
      'Automated onboarding: registration confirmation and personalised content delivery',
      'Attendee tracking and operations management dashboard',
    ],
  },
  {
    id:      'beyond',
    num:     '03',
    name:    'Beyond Beauty Network',
    urls:    [{ label: 'beyondbeautynetwork.in ↗', href: 'https://beyondbeautynetwork.in' }],
    meta:    'Built at SBMS · Aug 2025 – Jan 2026',
    tagline: 'A social network for beauty professionals, with a focus on community and networking.',
    stack:   ['Next.js', 'Supabase'],
    problem: 'A lack of a social network for beauty professionals where they can serve their clients and network with others in the industry.',
    built:   'A Service Catelog website along side a networking platform for beauty professionals.',
    features: [
      'A Services page with fuzzy search, filtering by tags and details of the services are shown, and a page where the details of the companies Directors of various branches are shown.',
    ],
  },
];
/* ─── Card ───────────────────────────────────────────── */

function WorkCard({ item, onOpen }: { item: WorkItem; onOpen: () => void }) {
  return (
    <div className="group reveal relative mb-3.5 rounded-2xl border border-white/10 bg-[#050812]/60 px-7 pt-7 pb-6 backdrop-blur-sm transition-all duration-200 hover:border-[#c27aff]/30">

      {/* Decorative number */}
      <span className="pointer-events-none absolute top-3 right-5 select-none font-[var(--font-display)] text-[5rem] font-extrabold leading-none text-white/[0.06]">
        {item.num}
      </span>

      {/* Header */}
      <div className="mb-3.5">
        {item.meta && (
          <span className="mb-2 inline-block rounded border border-white/10 px-2 py-[2px] font-[var(--font-mono)] text-[10px] text-white/50">
            {item.meta}
          </span>
        )}

        <h3 className="mb-1 pr-20 font-[var(--font-display)] text-[19px] font-bold text-white">
          {item.name}
        </h3>

        <div className="flex flex-wrap gap-1.5">
          {item.urls.map((u) => (
            <a
              key={u.href}
              href={u.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="font-[var(--font-mono)] text-[11px] text-[#c27aff]/80 hover:text-[#c27aff]"
            >
              {u.label}
            </a>
          ))}
        </div>
      </div>

      <div className="mb-3.5 h-px bg-white/10" />

      {/* Tagline */}
      <p className="mb-3.5 text-[13px] leading-[1.65] text-white/70">
        {item.tagline}
      </p>

      {/* Stack */}
      <div className="mb-4.5 flex flex-wrap gap-1.5">
        {item.stack.map((t) => (
          <span
            key={t}
            className="rounded-md border border-white/10 px-2 py-[3px] text-[11px] text-white/60"
          >
            {t}
          </span>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={onOpen}
        className="rounded-lg border border-[#c27aff]/30 px-4 py-2 text-[13px] font-medium text-[#c27aff] transition-colors hover:bg-[#c27aff]/10 hover:text-white"
      >
        View Case Study →
      </button>
    </div>
  );
}

/* ─── Modal content ──────────────────────────────────── */

function WorkModalContent({ item }: { item: WorkItem }) {
  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        {item.meta && (
          <span className="mb-2.5 inline-block rounded border border-[var(--border-subtle)] px-2 py-[2px] font-[var(--font-mono)] text-[10px] text-[var(--txt-tertiary)]">
            {item.meta}
          </span>
        )}

        <h2 className="mb-2 font-[var(--font-display)] text-2xl font-extrabold">
          {item.name}
        </h2>

        <div className="flex flex-wrap gap-2">
          {item.urls.map((u) => (
            <a
              key={u.href}
              href={u.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-md border border-[rgba(139,92,246,0.3)] bg-[rgba(139,92,246,0.08)] px-2.5 py-1 text-[11px] font-[var(--font-mono)] text-[var(--v400)]"
            >
              {u.label}
            </a>
          ))}
        </div>
      </div>

      <div className="mb-6 h-px bg-[var(--border-subtle)]" />

      {/* Screenshot */}
<div className="mb-7 overflow-hidden rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
  <Image
    src={`/screenshots/${item.id}.jpg`}
    alt={`${item.id}`}
    width={1200}
    height={800}
    className="h-auto w-full object-contain"
  />
      </div>

      {/* Sections */}
      <Section label="The problem" icon="◎">
        <p className="text-sm leading-[1.7] text-[var(--txt-secondary)]">
          {item.problem}
        </p>
      </Section>

      <Section label="What I built" icon="◈">
        <p className="text-sm leading-[1.7] text-[var(--txt-secondary)]">
          {item.built}
        </p>
      </Section>

      <Section label="Key features" icon="◆">
        <ul className="flex flex-col gap-2">
          {item.features.map((f, i) => (
            <li key={i} className="flex gap-2.5 text-[13px] leading-[1.6] text-[var(--txt-secondary)]">
              <span className="mt-[1px] text-[var(--v500)]">▪</span>
              {f}
            </li>
          ))}
        </ul>
      </Section>

      {/* Note */}
      {item.note && (
        <div className="mb-5 rounded-r-lg border border-[rgba(139,92,246,0.2)] border-l-[3px] border-l-[var(--v500)] bg-[rgba(139,92,246,0.06)] px-3.5 py-2.5 text-[13px] leading-[1.6] text-[var(--txt-secondary)]">
          {item.note}
        </div>
      )}

      <Section label="Stack" icon="◎">
        <div className="flex flex-wrap gap-1.5">
          {item.stack.map((t) => (
            <span key={t} className="tech-tag">
              {t}
            </span>
          ))}
        </div>
      </Section>
    </div>
  );
}

function Section({
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
        <span className="text-xs text-[var(--v500)]">{icon}</span>
        <span className="font-[var(--font-mono)] text-[11px] tracking-[0.08em] text-[var(--v600)]">
          {label.toUpperCase()}
        </span>
      </div>
      {children}
    </div>
  );
}

/* ─── Section ────────────────────────────────────────── */

export default function WorkSection() {
  const [activeItem, setActiveItem] = useState<WorkItem | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        }),
      { threshold: 0.1 }
    );

    sectionRef.current
      ?.querySelectorAll('.reveal')
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        id="work"
        ref={sectionRef}
        className="mx-auto bg-[#050812]  px-6 py-20"
      >
        <div className="reveal mb-10">
          <div className="section-kicker">WORK</div>

          <h2 className="mb-2 text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold">
            Things I`ve shipped
          </h2>

          <p className="text-[15px] leading-[1.6] text-(--txt-secondary)">
            Client projects — live, real, used by people.
          </p>
        </div>

        {WORK.map((item) => (
          <WorkCard
            key={item.id}
            item={item}
            onOpen={() => setActiveItem(item)}
          />
        ))}
      </section>

      <Modal isOpen={!!activeItem} onClose={() => setActiveItem(null)}>
        {activeItem && <WorkModalContent item={activeItem} />}
      </Modal>
    </>
  );
}