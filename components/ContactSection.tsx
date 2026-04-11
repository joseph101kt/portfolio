'use client';

import { useEffect, useRef } from 'react';

const LINKS = [
  { label: 'joseph101kt@gmail.com', href: 'mailto:joseph101kt@gmail.com', icon: '✉' },
  { label: 'GitHub', href: 'https://github.com/joseph101kt', icon: '⌥' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/joseph-kakkassery', icon: '◫' },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        }),
      { threshold: 0.15 }
    );

    sectionRef.current
      ?.querySelectorAll('.reveal')
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative mx-auto max-w-[800px] px-6 pt-20 pb-16"
    >
      {/* Top rule */}
      <div className="mb-16 h-px bg-[var(--border-subtle)]" />

      {/* Header */}
      <div className="reveal mb-10 text-center">
        <div className="section-kicker flex justify-center">CONTACT</div>

        <h2 className="mb-3.5 font-[var(--font-display)] text-[clamp(1.75rem,5vw,2.75rem)] font-extrabold leading-[1.1]">
          Let`s work together
        </h2>

        <p className="mx-auto max-w-[420px] text-[14px] leading-[1.6] text-[var(--txt-secondary)]">
          Open to freelance projects and internship opportunities.
          If you have something in mind, reach out — I reply fast.
        </p>
      </div>

      {/* Links */}
      <div className="reveal mb-12 flex flex-wrap justify-center gap-2.5">
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            target={l.href.startsWith('mailto') ? undefined : '_blank'}
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-5 py-3 text-[13px] font-medium text-[var(--txt-secondary)] transition-all hover:border-[rgba(139,92,246,0.5)] hover:bg-[rgba(139,92,246,0.06)] hover:text-[var(--v400)]"
          >
            <span className="text-sm">{l.icon}</span>
            {l.label}
          </a>
        ))}

        {/* Resume */}
        <a
          href="/resume.pdf"
          download
          className="inline-flex items-center gap-2 rounded-lg border border-[rgba(139,92,246,0.35)] bg-[rgba(139,92,246,0.08)] px-5 py-3 text-[13px] font-medium text-[var(--v400)] transition-all hover:border-[rgba(139,92,246,0.6)] hover:bg-[rgba(139,92,246,0.16)]"
        >
          ↓ Resume
        </a>
      </div>

      {/* Footer */}
      <div className="border-t border-[var(--border-subtle)] pt-8 text-center">
        <p className="font-[var(--font-mono)] text-[11px] text-[var(--txt-tertiary)]">
          josephk.netlify.app &nbsp;·&nbsp; Built with Next.js + Tailwind
        </p>
      </div>
    </section>
  );
}