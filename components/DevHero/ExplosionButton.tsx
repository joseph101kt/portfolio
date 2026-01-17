import { useRouter } from "next/navigation";
import { useState, useRef, useMemo, useLayoutEffect, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useTheme } from "./HeroThemeContext"; 

interface ExplosionButtonProps {
  useGrid: () => {
    registerGlow: (id: string, config: { x: number; y: number; color: string; radius: number; intensity: number }) => void;
    updateGlow: (id: string, config: { x: number; y: number; radius?: number; intensity: number }) => void;
    unregisterGlow: (id: string) => void;
    containerRef: React.RefObject<HTMLElement | null>;
    gridBounds: { width: number; height: number };
  };
}

export const ExplosionButton: React.FC<ExplosionButtonProps> = ({ useGrid }) => {
  const [phase, setPhase] = useState<"breathing" | "exploding">("breathing");
  const [, setReady] = useState(false);
  const timeRef = useRef(0);
  const lastRef = useRef(0);
  const btnRef = useRef<HTMLButtonElement>(null);
  const btnCenter = useRef<{ x: number; y: number } | null>(null);

  const theme = useTheme(); 
  const router = useRouter();

  const easeInOutSine = (x: number): number =>
    -(Math.cos(Math.PI * x) - 1) / 2;

  const { registerGlow, updateGlow, unregisterGlow, containerRef, gridBounds } = useGrid();

  const ids = useMemo(() => {
    const uid = uuidv4();
    return {
      primary: `p-${uid}`,
      w1: `w1-${uid}`,
      w2: `w2-${uid}`,
      w3: `w3-${uid}`,
      flash: `f-${uid}`,
    };
  }, []);

  useLayoutEffect(() => {
    if (!btnRef.current || !containerRef.current) return;

    const b = btnRef.current.getBoundingClientRect();
    const c = containerRef.current.getBoundingClientRect();

    btnCenter.current = {
      x: b.left + b.width / 2 - c.left,
      y: b.top + b.height / 2 - c.top,
    };

    const { x, y } = btnCenter.current;

    // 1. Updated Glow Color Mappings to match your new ColorScheme
    registerGlow(ids.primary, { x, y, color: theme.glowPrimary, radius: 120, intensity: 1 });
    registerGlow(ids.w1, { x, y, color: theme.glowWave1, radius: 0, intensity: 0 });
    registerGlow(ids.w2, { x, y, color: theme.glowWave2, radius: 0, intensity: 0 });
    registerGlow(ids.w3, { x, y, color: theme.glowWave3, radius: 0, intensity: 0 });
    // Note: If you don't have theme.flash, theme.glowWave1 is a good bright alternative
    registerGlow(ids.flash, { x, y, color: theme.glowWave1, radius: 0, intensity: 0 });

    requestAnimationFrame(() => setReady(true));

    return () => Object.values(ids).forEach(unregisterGlow);
  }, [registerGlow, unregisterGlow, ids, containerRef, theme]); 

  useEffect(() => {
    let raf: number;
    const isMobile = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
    const intensityScale = isMobile ? 1.5 : 1;

    const tick = (now: number) => {
      if (!lastRef.current) lastRef.current = now;
      const dt = (now - lastRef.current) / 1000;
      lastRef.current = now;
      timeRef.current += dt;

      if (!btnRef.current || !containerRef.current || !btnCenter.current) {
        raf = requestAnimationFrame(tick);
        return;
      }
      
      const { x, y } = btnCenter.current;

      if (phase === "breathing") {
        const p = (timeRef.current % 3) / 3;
        const e = Math.sin(p * Math.PI);

        updateGlow(ids.primary, {
          x,
          y,
          radius: 140 + e * 100,
          intensity: 1.7 * intensityScale,
        });
      } else {
        const max = Math.hypot(gridBounds.width, gridBounds.height);

        const wave = (id: string, delay: number, dur: number, scale: number, intensity: number) => {
          const t = timeRef.current - delay;
          if (t < 0 || t > dur) return updateGlow(id, { x, y, intensity: 0 });
          const e = easeInOutSine(t / dur);
          updateGlow(id, {
            x,
            y,
            radius: e * max * scale,
            intensity: intensity * (1 - e) * intensityScale,
          });
        };

        wave(ids.w1, 0, 0.8, 1.2, 2.2);
        wave(ids.w2, 0.1, 0.9, 1.1, 1.6);
        wave(ids.w3, 0.2, 1.0, 1.0, 1.2);

        if (timeRef.current > 1.2) {
          timeRef.current = 0;
          setPhase("breathing");
        }
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase, ids, updateGlow, gridBounds, containerRef]);

  return (
    <button
      ref={btnRef}
      onClick={() => {
        timeRef.current = 0;
        setPhase("exploding");
        setTimeout(() => router.push("/work"), 800);
      }}
      // 2. Map Button Colors to the Theme
      style={{ 
        backgroundColor: theme.buttonBg, 
        borderColor: theme.buttonBorder, 
        color: theme.buttonText,
        // Using a CSS variable for the hover state color
        ['--hover-color' as string]: theme.buttonHoverText 
      } as React.CSSProperties}
      className="px-6 py-4 rounded-none border-2 text-base uppercase tracking-[0.32em] leading-none font-['Bebas_Neue'] transition-all duration-300 hover:text-[var(--hover-color)] hover:tracking-[0.5em] hover:font-bold hover:italic active:scale-95"
    >
      Explore My Work
    </button>
  );
};

export default ExplosionButton;