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
import SmoothCursor from "./SmoothCursor";
import CanvasGrid from "./CanvasGrid";
import CircleGlow from "./CircleGlow";
import { GridContextType, GlowSource } from "./HeroTypes";





/* =========================
   Main Grid Wrapper
========================= */

interface GridWithGlowProps {
  // Pass the hook as a prop
  useGrid: () => GridContextType;
  // Pass the Context object as a prop
  GridContext: React.Context<GridContextType | null>;
  // Include children
  children: React.ReactNode;
}

/* =========================
   Constants
========================= */

const GRID_COLS_BREAKPOINTS = [
  { maxWidth: 640, cols: 10 },    // small screens
  { maxWidth: 768, cols: 15 },    // medium screens
  { maxWidth: 1024, cols: 20 },   // large screens
  { maxWidth: Infinity, cols: 25 } // extra-large screens
];

/* =========================
   Component
========================= */

const GridWithGlow: React.FC<GridWithGlowProps> = ({ useGrid, GridContext, children }) => {
  // 1. Execute the hook passed as a prop
  const gridValues = useGrid();
  const { containerRef } = gridValues;
  const DEFAULT_DIMS = { rows: 16, cols: 16, size: 50 };

  const [dims, setDims] = useState(DEFAULT_DIMS);
  const [isReady, setIsReady] = useState(false);

  useLayoutEffect(() => {
const compute = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  // Pick columns based on breakpoint
  const { cols } = GRID_COLS_BREAKPOINTS.find(b => width <= b.maxWidth)!;

  // Calculate cell size based on width and number of columns
  const size = width / cols;

  // Compute rows to fill height (add 1 to ensure full coverage)
  const rows = Math.ceil(height / size) + 2;

  setDims({ rows, cols, size });
  setIsReady(true);
};



    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  /* -------------------------
     Glow store (imperative)
  ------------------------- */
  const glowMapRef = useRef<Map<string, GlowSource>>(new Map());

  /* -------------------------
     Render snapshot (declarative)
  ------------------------- */
  const [glowSnapshot, setGlowSnapshot] = useState<GlowSource[]>([]);
  const framePending = useRef(false);

  /* -------------------------
     RAF-batched flush
  ------------------------- */
  const flush = () => {
    if (framePending.current) return;
    framePending.current = true;

    requestAnimationFrame(() => {
      framePending.current = false;
      setGlowSnapshot(Array.from(glowMapRef.current.values()));
    });
  };

  /* -------------------------
     Context (stable + batched)
  ------------------------- */
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

  /* -------------------------
     Touch detection
  ------------------------- */
  const isTouch =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;

  /* -------------------------
     Render
  ------------------------- */
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
            transition: 'opacity 0.15s ease-in',
          }}
        >
          {/* Glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              contain: "strict",
              isolation: "isolate",
              willChange: "transform",
            }}
          >
            {glowSnapshot.map((g) => (
              <CircleGlow
                key={g.id}
                source={g}
                maxRadius={g.id === "cursor" ? 220 : g.radius}
              />
            ))}
          </div>

          {/* Grid */}
          <div className="absolute inset-0 z-10">
            <CanvasGrid {...dims} />
            {isReady && children}
          </div>
        </div>

        {!isTouch && isReady && <SmoothCursor  useGrid={useGrid}/>}
      </div>
    </GridContext.Provider>
  );
};


export default GridWithGlow;