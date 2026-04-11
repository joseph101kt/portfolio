'use client';

import { useEffect, useState } from 'react';

export default function ScrollTopFAB() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="
        fixed bottom-21.5 right-6 z-40
        flex h-10 w-10 items-center justify-center
        rounded-full
        border border-[rgba(139,92,246,0.35)]
        bg-[rgba(15,15,26,0.85)]
        text-base text-[#A78BFA]
        backdrop-blur-md
        transition-all duration-200
        hover:border-[rgba(139,92,246,0.7)]
        hover:text-[#F0EEFF]
        animate-[fadeIn_0.25s_ease]
      "
    >
      ↑
    </button>
  );
}