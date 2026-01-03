"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  createContext,
  useContext,
  useLayoutEffect,
} from "react";
import { v4 as uuidv4 } from "uuid";

/* =========================
   Helpers
========================= */
const isSmallScreen = (): boolean =>
  typeof window !== "undefined" && window.innerWidth < 640;

/* =========================
   Types
========================= */
interface GlowSource {
  id: string;
  x: number;
  y: number;
  color: string;
  radius: number;
  intensity: number;
}

interface GridContextType {
  registerGlow: (id: string, glow: Omit<GlowSource, "id">) => void;
  updateGlow: (id: string, glow: Partial<Omit<GlowSource, "id">>) => void;
  unregisterGlow: (id: string) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
  gridBounds: { width: number; height: number };
}

/* =========================
   Context
========================= */
const GridContext = createContext<GridContextType | null>(null);

const useGrid = (): GridContextType => {
  const ctx = useContext(GridContext);
  if (!ctx) throw new Error("useGrid must be used within GridWithGlow");
  return ctx;
};

/* =========================
   Utils
========================= */
const easeInOutSine = (x: number): number =>
  -(Math.cos(Math.PI * x) - 1) / 2;

const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m
    ? {
        r: parseInt(m[1], 16),
        g: parseInt(m[2], 16),
        b: parseInt(m[3], 16),
      }
    : { r: 106, g: 111, b: 255 };
};

/* =========================
   Desktop Glow Renderer
========================= */
const CircleGlow: React.FC<{ source: GlowSource; maxRadius?: number }> = ({
  source,
  maxRadius = source.radius,
}) => {
  const rgb = hexToRgb(source.color);
  const size = maxRadius * 2;

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        transform: `translate(${source.x - maxRadius}px, ${
          source.y - maxRadius
        }px)`,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle,
          rgba(${rgb.r},${rgb.g},${rgb.b},${0.6 * source.intensity}) 0%,
          rgba(${rgb.r},${rgb.g},${rgb.b},${0.25 * source.intensity}) 35%,
          rgba(${rgb.r},${rgb.g},${rgb.b},${0.1 * source.intensity}) 60%,
          transparent 100%)`,
        filter: "blur(20px)",
        pointerEvents: "none",
        mixBlendMode: "screen",
        contain: "paint",
      }}
    />
  );
};

/* =========================
   Mobile Optimized Glow
========================= */
interface MobileGlowProps {
  phase: "breathing" | "exploding";
  center?: { x: number; y: number };
  color?: string;
}

const MobileGlow: React.FC<MobileGlowProps> = ({
  phase,
  center,
  color = "#6A6FFF",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const timeRef = useRef(0);
  const lastRef = useRef(0);

useEffect(() => {
  let raf: number;
  timeRef.current = 0;  // reset on phase change
  lastRef.current = 0;

  const tick = (now: number) => {
    if (!lastRef.current) lastRef.current = now;
    const dt = (now - lastRef.current) / 1000;
    lastRef.current = now;
    timeRef.current += dt;

    if (!ref.current) return;

    const cx = center?.x ?? 0;
    const cy = center?.y ?? 0;

    if (phase === "breathing") {
      const scale = 1 + 0.25 * Math.sin(timeRef.current * Math.PI * 2 / 3);
      const opacity = 0.3 + 0.3 * Math.sin(timeRef.current * Math.PI * 2 / 3);
      ref.current.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%) scale(${scale})`;
      ref.current.style.opacity = `${opacity}`;
      ref.current.style.width = "100px";
      ref.current.style.height = "100px";
    }

    if (phase === "exploding") {
      const duration = 0.6;
      const t = timeRef.current / duration;
      if (t >= 1) {
        timeRef.current = 0;
        ref.current.style.opacity = "0";
      } else {
        const ease = -(Math.cos(Math.PI * t) - 1) / 2;
        const size = 100 + ease * 300; // adjust for mobile explosion
        ref.current.style.width = `${size}px`;
        ref.current.style.height = `${size}px`;
        ref.current.style.opacity = `${1 - ease}`;
        ref.current.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%) scale(1)`;
      }
    }

    raf = requestAnimationFrame(tick);
  };

  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}, [phase, center]);


  const cx = center?.x ?? 0;
  const cy = center?.y ?? 0;

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        left: `${cx}px`,
        top: `${cy}px`,
        width: 100,
        height: 100,
        borderRadius: "50%",
        transform: "translate(-50%, -50%)",
        background: `radial-gradient(circle, ${color} 0%, transparent 100%)`,
        pointerEvents: "none",
        mixBlendMode: "screen",
      }}
    />
  );
};

/* =========================
   Explosion Button
========================= */
export const ExplosionButton: React.FC<{ children?: React.ReactNode }> = ({
  children = "Explore My Work",
}) => {
  const [phase, setPhase] = useState<"breathing" | "exploding">("breathing");
  const timeRef = useRef(0);
  const lastRef = useRef(0);
  const btnRef = useRef<HTMLButtonElement>(null);
  const btnCenter = useRef<{ x: number; y: number } | null>(null);
  const [mobileCenter, setMobileCenter] = useState<{ x: number; y: number }>();

  const { registerGlow, updateGlow, unregisterGlow, containerRef, gridBounds } =
    useGrid();

  const ids = useMemo(() => {
    const uid = uuidv4();
    return {
      primary: `p-${uid}`,
      w1: `w1-${uid}`,
      w2: `w2-${uid}`,
      w3: `w3-${uid}`,
    };
  }, []);
  useEffect(() => {
  timeRef.current = 0;
}, [phase]);

  /* Compute center & register glows */
useLayoutEffect(() => {
  const computeCenter = () => {
    if (!btnRef.current || !containerRef.current) return;

    const b = btnRef.current.getBoundingClientRect();
    const c = containerRef.current.getBoundingClientRect();
    const center = {
      x: b.left + b.width / 2 - c.left,
      y: b.top + b.height / 2 - c.top,
    };

    btnCenter.current = center;
    setMobileCenter(center); // ⚡ always update mobile center
  };

  computeCenter(); // initial

  window.addEventListener("resize", computeCenter);
  return () => window.removeEventListener("resize", computeCenter);
}, []);

useEffect(() => {
  const handleResize = () => {
    if (!btnRef.current || !containerRef.current) return;

    const b = btnRef.current.getBoundingClientRect();
    const c = containerRef.current.getBoundingClientRect();
    const center = {
      x: b.left + b.width / 2 - c.left,
      y: b.top + b.height / 2 - c.top,
    };

    btnCenter.current = center;
    setMobileCenter(center);

    if (!isSmallScreen()) {
      // Update desktop glows immediately
      updateGlow(ids.primary, { x: center.x, y: center.y });
      updateGlow(ids.w1, { x: center.x, y: center.y });
      updateGlow(ids.w2, { x: center.x, y: center.y });
      updateGlow(ids.w3, { x: center.x, y: center.y });
    }
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);



  /* Animation Loop */
  useEffect(() => {
    let raf: number;
    const tick = (now?: number) => {
      if (!lastRef.current) lastRef.current = now ?? 0;
      const dt = now ? (now - lastRef.current) / 1000 : 0.016;
      lastRef.current = now ?? lastRef.current;
      timeRef.current += dt;

      if (btnCenter.current && !isSmallScreen()) {
        const { x, y } = btnCenter.current;

        if (phase === "breathing") {
          const p = (timeRef.current % 3) / 3;
          const e = Math.sin(p * Math.PI);
          updateGlow(ids.primary, {
            x,
            y,
            radius: 120 + e * 100,
            intensity: 2,
          });
        } else {
          const max = Math.hypot(gridBounds.width, gridBounds.height);

          const wave = (
            id: string,
            delay: number,
            dur: number,
            scale: number,
            intensity: number
          ) => {
            const t = timeRef.current - delay;
            if (t < 0 || t > dur) return updateGlow(id, { intensity: 0 });
            const e = easeInOutSine(t / dur);
            updateGlow(id, {
              x,
              y,
              radius: e * max * scale,
              intensity: intensity * (1 - e),
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
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  return (
    <div className="relative inline-block">
{isSmallScreen() && mobileCenter && (
  <MobileGlow
    phase={phase}
    center={mobileCenter}
    color={phase === "exploding" ? "#FFF" : "#6A6FFF"}
  />
)}

      <button
        ref={btnRef}
        onClick={() => {
          console.log("DEBUG: button clicked - setting phase exploding");
          timeRef.current = 0;
          setPhase("exploding");
        }}
        className="
          relative z-10
          px-8 py-4
          bg-gray-900/60
          text-white
          rounded-lg
          border border-gray-700
          hover:border-gray-600
          transition-colors
        "
      >
        {children}
      </button>
    </div>
  );
};

/* =========================
   Canvas Grid
========================= */
const CanvasGrid: React.FC<{ rows: number; cols: number; size: number }> = ({
  rows,
  cols,
  size,
}) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = cols * size;
    canvas.height = rows * size;

    ctx.fillStyle = "rgba(5,8,18,1)";
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        ctx.fillRect(x * size, y * size, size - 2, size - 2);
      }
    }
  }, [rows, cols, size]);

  return <canvas ref={ref} className="absolute inset-0" />;
};

/* =========================
   Grid With Glow
========================= */
const GridWithGlow: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [dims, setDims] = useState({ rows: 16, cols: 16, size: 50 });
  const [isReady, setIsReady] = useState(false);

  useLayoutEffect(() => {
    const compute = () => {
      const size =
        window.innerWidth < 640 ? 70 : window.innerWidth < 768 ? 60 : 50;

      setDims({
        rows: Math.min(Math.ceil(window.innerHeight / size), 16),
        cols: Math.min(Math.ceil(window.innerWidth / size), 31),
        size,
      });

      setIsReady(true);
    };

    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  const glowMapRef = useRef<Map<string, GlowSource>>(new Map());
  const [glowSnapshot, setGlowSnapshot] = useState<GlowSource[]>([]);
  const framePending = useRef(false);

  const flush = () => {
    if (framePending.current) return;
    framePending.current = true;
    requestAnimationFrame(() => {
      framePending.current = false;
      setGlowSnapshot(Array.from(glowMapRef.current.values()));
      console.log("DEBUG: glowSnapshot", Array.from(glowMapRef.current.values()));
    });
  };

  const context = useMemo<GridContextType>(
    () => ({
      registerGlow: (id, glow) => {
        glowMapRef.current.set(id, { id, ...glow });
        flush();
      },
      updateGlow: (id, updates) => {
        const g = glowMapRef.current.get(id);
        if (g) Object.assign(g, updates);
        flush();
      },
      unregisterGlow: (id) => {
        glowMapRef.current.delete(id);
        flush();
      },
      containerRef,
      gridBounds: {
        width: dims.cols * dims.size,
        height: dims.rows * dims.size,
      },
    }),
    [dims]
  );

  const isTouch =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;

  return (
    <GridContext.Provider value={context}>
      <div className="relative w-full h-screen overflow-hidden bg-[#1A2138B3]">
        <div
          ref={containerRef}
          className="absolute inset-0"
          style={{
            width: `${dims.cols * dims.size}px`,
            height: `${dims.rows * dims.size}px`,
            opacity: isReady ? 1 : 0,
            transition: "opacity 0.15s ease-in",
          }}
        >
          {/* Desktop Glows */}
          {!isSmallScreen() && (
            <div className="absolute inset-0 pointer-events-none isolate">
              {glowSnapshot.map((g) => (
                <CircleGlow key={g.id} source={g} />
              ))}
            </div>
          )}

          {/* Grid */}
          <div className="absolute inset-0 z-10">
            <CanvasGrid {...dims} />
            {isReady && children}
          </div>
        </div>

        {!isTouch && !isSmallScreen() && isReady && <SmoothCursor />}
      </div>
    </GridContext.Provider>
  );
};

/* =========================
   Smooth Cursor (Desktop Only)
========================= */
const SmoothCursor: React.FC = () => {
  const { registerGlow, updateGlow, unregisterGlow, containerRef } = useGrid();
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    registerGlow("cursor", {
      x: 0,
      y: 0,
      color: "#6A6FFF",
      radius: 200,
      intensity: 1,
    });
    return () => unregisterGlow("cursor");
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const r = containerRef.current?.getBoundingClientRect();
      if (!r) return;
      target.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    let raf: number;
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.3;
      pos.current.y += (target.current.y - pos.current.y) * 0.3;
      updateGlow("cursor", { ...pos.current, intensity: 1 });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return null;
};

export default GridWithGlow;
