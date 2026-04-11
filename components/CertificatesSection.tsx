'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

/* ─── Types ─────────────────────────────────────────── */

interface CertItem {
  src: string;
  label: string;
  issuer: string;
}

/* ─── Data ───────────────────────────────────────────── */

const CERTS: CertItem[] = [
  { src: '/certificates/CS50x.jpg',                             label: 'CS50x',                         issuer: 'Harvard / edX' },
  { src: '/certificates/CS50P.jpg',                             label: 'CS50P',                         issuer: 'Harvard / edX' },
  { src: '/certificates/CS50SQL.jpg',                           label: 'CS50 SQL',                      issuer: 'Harvard / edX' },
  { src: '/certificates/Fundamentals-of-digital-marketing.jpg', label: 'Digital Marketing Fundamentals', issuer: 'Google'        },
  { src: '/certificates/Google-Ads-Measurement.jpg',            label: 'Google Ads Measurement',        issuer: 'Google'        },
  { src: '/certificates/Hubspot-SEO.jpg',                       label: 'SEO Certification',              issuer: 'HubSpot'       },
  { src: '/certificates/paid-ads.jpg',                          label: 'Paid Ads',                      issuer: 'Meta / Google' },
];

/* ─── Lightbox ───────────────────────────────────────── */

function Lightbox({
  item,
  onClose,
  onPrev,
  onNext,
}: {
  item: CertItem;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
      style={{ background: 'rgba(5, 8, 18, 0.92)', backdropFilter: 'blur(12px)' }}
    >
      <button
        onClick={onClose}
        className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 font-mono text-[11px] text-white/50 transition hover:border-[#c27aff]/40 hover:text-[#c27aff]"
      >
        ✕
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/40 transition hover:border-[#c27aff]/40 hover:text-[#c27aff] md:left-8"
      >
        ←
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/40 transition hover:border-[#c27aff]/40 hover:text-[#c27aff] md:right-8"
      >
        →
      </button>
      <div
        className="relative mx-16 flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative max-h-[75vh] w-[50vw] overflow-hidden rounded-xl border border-white/10"
          style={{ boxShadow: '0 0 60px rgba(194,122,255,0.12)', aspectRatio: '16/9' }}
        >
          <Image
            src={item.src}
            alt={item.label}
            fill
            className="object-contain"
            sizes="50vw"
          />
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="font-[var(--font-display)] text-[15px] font-semibold text-white">{item.label}</span>
          <span className="font-[var(--font-mono)] text-[10px] text-white/40">{item.issuer}</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Carousel ───────────────────────────────────────── */

const CARD_GAP = 24;
const SPEED = 1.8; // px per frame

function InfiniteCarousel({ onSelect }: { onSelect: (i: number) => void }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);
  const rafRef = useRef<number>(0);
  const pausedRef = useRef(false);
  const [cardW, setCardW] = useState(0);

  // 60vw card width, computed client-side
  useEffect(() => {
    const compute = () => setCardW(Math.round(window.innerWidth * 0.60));
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  const tiles = [...CERTS, ...CERTS, ...CERTS];
  const singleW = CERTS.length * (cardW + CARD_GAP);

  useEffect(() => {
    if (!cardW) return;
    const tick = () => {
      if (!pausedRef.current) {
        xRef.current += SPEED;
        if (xRef.current >= singleW) xRef.current -= singleW;
        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(-${xRef.current}px)`;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [singleW, cardW]);

  if (!cardW) return null;

  const imgH = Math.round(cardW * 0.58);

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      {/* Left fade edge */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20"
        style={{ background: 'linear-gradient(to right, #050812 0%, transparent 100%)' }}
      />
      {/* Right fade edge */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20"
        style={{ background: 'linear-gradient(to left, #050812 0%, transparent 100%)' }}
      />

      <div
        ref={trackRef}
        className="flex will-change-transform"
        style={{ gap: CARD_GAP, paddingBottom: 16 }}
      >
        {tiles.map((item, i) => {
          const originalIndex = i % CERTS.length;
          return (
            <button
              key={i}
              onClick={() => onSelect(originalIndex)}
              className="group shrink-0 cursor-pointer rounded-2xl border border-white/10 bg-[#050812]/60 p-3 text-left backdrop-blur-sm transition-all duration-300 hover:border-[#c27aff]/35"
              style={{ width: cardW }}
            >
              {/* Image */}
              <div className="relative overflow-hidden rounded-xl" style={{ height: imgH }}>
                <div
                  className="absolute inset-0 z-10 opacity-0 transition-opacity duration-300 "
                  style={{ background: 'radial-gradient(ellipse at center, rgba(194,122,255,0.08) 0%, transparent 70%)' }}
                />
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="60vw"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0 z-20 flex items-center justify-center opacity-0 transition-opacity duration-200 "
                  style={{ background: 'rgba(5,8,18,0.45)' }}
                >
                  <span className="rounded-full border border-[#c27aff]/40 bg-[rgba(194,122,255,0.1)] px-4 py-1.5 font-[var(--font-mono)] text-[12px] text-[#c27aff]">
                    View ↗
                  </span>
                </div>
              </div>

              {/* Label */}
              <div className="mt-3.5 flex items-center justify-between px-1">
                <div className="flex flex-col gap-0.5">
                  <span className="font-[var(--font-display)] text-[15px] font-semibold leading-tight text-white">
                    {item.label}
                  </span>
                  <span className="font-[var(--font-mono)] text-[11px] text-white/40">
                    {item.issuer}
                  </span>
                </div>
                <span className="font-[var(--font-mono)] text-[10px] text-white/20 group-hover:text-[#c27aff]/60 transition-colors">
                  ↗
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Section ────────────────────────────────────────── */

export default function CertificatesSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const prev = () => setActiveIndex((i) => (i !== null ? (i - 1 + CERTS.length) % CERTS.length : 0));
  const next = () => setActiveIndex((i) => (i !== null ? (i + 1) % CERTS.length : 0));

  return (
    <>
      <section
        id="certificates"
        ref={sectionRef}
        className="mx-auto bg-[#050812] px-6 py-20 overflow-hidden"
      >
        <div className="reveal mb-9">
          <div className="section-kicker">CREDENTIALS</div>
          <h2 className="mb-2 font-[var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold">
            Certified & curious
          </h2>
          <p className="text-[15px] leading-[1.6] text-[var(--txt-secondary)]">
            Formal recognition across computer science and digital growth.
          </p>
        </div>

        <div className="reveal -mx-6">
          <InfiniteCarousel onSelect={(i) => setActiveIndex(i)} />
        </div>

        <p className="reveal mt-4 font-[var(--font-mono)] text-[10px] text-white/20">
          hover to pause · click to view
        </p>
      </section>

      {activeIndex !== null && (
        <Lightbox
          item={CERTS[activeIndex]}
          onClose={() => setActiveIndex(null)}
          onPrev={prev}
          onNext={next}
        />
      )}
    </>
  );
}