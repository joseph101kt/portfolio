'use client';

import { useEffect, useRef } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const LINKS = [
  { label: 'joseph101kt@gmail.com', href: 'mailto:joseph101kt@gmail.com', icon: '✉' },
  { label: 'GitHub', href: 'https://github.com/joseph101kt', icon: '⌥' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/joseph-kakkassery', icon: '◫' },
];

export default function Footer() {
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
      className="
        relative mx-auto overflow-hidden
        bg-[#F5EFE7] px-6 pt-20 pb-16
        dark:bg-gray-950
      "
    >
      {/* Top rule */}
      <div className="mb-16 h-px bg-[#E8DFD1] dark:bg-white/10" />

      {/* Header */}
      <div className="reveal mb-10 text-center">
        <div
          className="
            mb-4 flex justify-center text-xs font-bold tracking-[0.2em]
            text-[#C65D3B]
            dark:text-violet-400
          "
        >
          CONTACT
        </div>

        <h2
          className="
            mb-3.5 font-[Georgia,serif]
            text-[clamp(1.75rem,5vw,2.75rem)]
            font-bold leading-[1.1]
            text-[#2D3436]
            dark:text-white
          "
        >
          Let&apos;s work together
        </h2>

        <p
          className="
            mx-auto max-w-[420px]
            text-[14px] leading-[1.7]
            text-[#636E72]
            dark:text-gray-400
          "
        >
          Open to freelance Projects and Job opportunities.
          If you have something in mind, reach out — I reply fast.
        </p>
      </div>

      {/* Links */}
      <div className="reveal mb-12 flex flex-wrap justify-center gap-3">
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            target={l.href.startsWith('mailto') ? undefined : '_blank'}
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-2 rounded-lg
              border border-[#E8DFD1]
              bg-white/70 px-5 py-3
              text-[13px] font-medium
              text-[#2D3436]
              backdrop-blur-sm
              transition-all duration-200

              hover:border-[#C65D3B]
              hover:bg-[#FFF8F2]
              hover:text-[#C65D3B]

              dark:border-white/10
              dark:bg-white/[0.03]
              dark:text-gray-300
              dark:hover:border-violet-400/50
              dark:hover:bg-violet-500/10
              dark:hover:text-violet-300
            "
          >
            <span className="text-sm">{l.icon}</span>
            {l.label}
          </a>
        ))}

        {/* WhatsApp */}
        <a
          href="https://api.whatsapp.com/send/?phone=919397082746"
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex items-center justify-center
            rounded-lg border
            border-[#C65D3B]/30
            bg-[#C65D3B]/10
            px-5 py-3
            text-[#C65D3B]
            transition-all duration-200

            hover:border-[#C65D3B]
            hover:bg-[#C65D3B]/20

            dark:border-violet-400/30
            dark:bg-violet-500/10
            dark:text-violet-300
            dark:hover:border-violet-400/60
            dark:hover:bg-violet-500/20
          "
        >
          <FaWhatsapp className="h-7 w-7" />
        </a>
      </div>

      {/* Footer */}
      <div className="border-t border-[#E8DFD1] pt-8 text-center dark:border-white/10">
        <p
          className="
            text-[11px]
            font-medium tracking-wide
            text-[#636E72]
            dark:text-gray-500
          "
        >
          <a
            href="https://josephkportfolio.netlify.app"
            className="
              transition-colors hover:text-[#C65D3B]
              dark:hover:text-violet-300
            "
          >
            josephkportfolio.netlify.app
          </a>
          &nbsp;·&nbsp; Built with Next.js + Tailwind
        </p>
      </div>
    </section>
  );
}