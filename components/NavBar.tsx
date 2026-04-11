'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const NAV_LINKS = [
  { label: 'Work', id: 'work' },
  { label: 'Projects', id: 'projects' },
  { label: 'About', id: 'about' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState('');

  /* ── Scroll detection ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Active section tracking ── */
  useEffect(() => {
    const sections = NAV_LINKS.map(l =>
      document.getElementById(l.id)
    ).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* ── Escape closes mobile menu ── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) =>
      e.key === 'Escape' && setMobileOpen(false);
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      {/* ── Navbar ── */}
<header className="fixed top-0 left-0 w-full z-50 px-4 pt-4">
  <div
    className={`
      mx-auto flex items-center justify-between px-5 py-2.5

      /* 🔑 width animation happens INSIDE */
      transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]

      ${scrolled
        ? 'max-w-[680px] rounded-full border border-violet-500/30 bg-[#0f0f1a]/70 backdrop-blur-xl backdrop-saturate-150 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
        : 'max-w-full rounded-none bg-transparent border-transparent'}
    `}
  >

          {/* ── Logo ── */}
          <button
            onClick={() =>
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
            className="flex items-center gap-2.5"
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 shadow-[0_0_0_2px_rgba(139,92,246,0.45)]">
              <Image src="/avatar.jpg" alt="Joseph" fill className="object-cover" />
            </div>
            <span className="font-bold text-[15px] text-violet-200 tracking-tight">
              JK
            </span>
          </button>

          {/* ── Desktop Nav ── */}
          <nav className="hidden sm:flex items-center px-6 gap-12">
            {NAV_LINKS.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`
                  text-sm transition-colors duration-200
                  ${activeId === id
                    ? 'text-violet-400'
                    : 'text-zinc-300 hover:text-white'}
                `}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* ── Right side ── */}
          <div className="flex items-center gap-2.5">

            {/* Resume */}
            <a
              href="/resume.pdf"
              download
              className="hidden sm:inline-block text-[11px] font-mono text-violet-400 border border-violet-500/50 rounded-full px-3.5 py-1.5 transition hover:bg-violet-500/10 whitespace-nowrap"
            >
              Resume ↓
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(o => !o)}
              className="sm:hidden border border-violet-500/30 rounded-md px-2 py-1 text-zinc-400"
            >
              {mobileOpen ? '✕' : '☰'}
            </button>

          </div>
        </div>
      </header>

      {/* ── Mobile Drawer ── */}
{mobileOpen && (
  <div
    onClick={() => setMobileOpen(false)}
    className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md"
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="
        absolute inset-x-4 top-20
        rounded-2xl border border-white/10
        bg-[#0f0f1a]/80 backdrop-blur-xl
        shadow-[0_20px_60px_rgba(0,0,0,0.6)]
        p-6 flex flex-col gap-6

        animate-in fade-in zoom-in-95 duration-300
      "
    >
      
      {/* Links */}
      <div className="flex flex-col gap-4">
        {NAV_LINKS.map(({ label, id }, i) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="
              text-left text-xl font-semibold
              text-zinc-300 hover:text-white
              transition-all duration-300

              hover:translate-x-1
            "
            style={{
              animationDelay: `${i * 40}ms`
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px bg-white/10" />

      {/* Resume */}
      <a
        href="/resume.pdf"
        download
        className="
          text-center text-sm font-mono
          text-violet-400 border border-violet-500/40
          rounded-full py-2.5
          hover:bg-violet-500/10 transition
        "
      >
        Download Resume ↓
      </a>

    </div>
  </div>
)}
    </>
  );
}