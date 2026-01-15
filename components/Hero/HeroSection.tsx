"use client";

import { createContext, useContext, useEffect, useState, useRef } from "react";
import GridWithGlow from "@/components/Hero/GridWithBgGlow";
import HeroText from "@/components/Hero/HeroText";
import ExplosionButton from "./ExplosionButton";
import { GridContextType } from "./HeroTypes";
import SmoothCursor from "./SmoothCursor";

const BUTTON_DELAY_MS = 3200;

/* =========================
    1. CONTEXT & HOOKS
========================= */

const GridContext = createContext<GridContextType | null>(null);

const useGridInit = (): GridContextType => {
  const containerRef = useRef<HTMLDivElement>(null);
  return {
    containerRef,
    gridBounds: { width: 0, height: 0 },
    registerGlow: () => {}, // These are placeholders; GridWithGlow overrides them
    updateGlow: () => {},
    unregisterGlow: () => {},
  };
};

/**
 * useGrid: Used by children (ExplosionButton, SmoothCursor).
 * This calls useContext and requires being inside a Provider.
 */
const useGrid = (): GridContextType => {
  const ctx = useContext(GridContext);
  if (!ctx) throw new Error("useGrid must be used within GridWithGlow");
  return ctx;
};

/* =========================
    2. MAIN COMPONENT
========================= */

export default function HeroSection() {
  const [showButton, setShowButton] = useState<boolean>(false);
  const [animateIn, setAnimateIn] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
      requestAnimationFrame(() => setAnimateIn(true));
    }, BUTTON_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col">
      <GridWithGlow useGrid={useGridInit} GridContext={GridContext}>
        <div
          className={`
            flex flex-col w-full items-center justify-center
            min-h-screen
            transition-transform duration-700 ease-out
            ${animateIn ? "-translate-y-2 md:-translate-y-3 lg:-translate-y-4" : "translate-y-0"}
          `}
        >
          <SmoothCursor useGrid={useGrid} />
          <HeroText />
          
          <div
            className={`
              transform transition-all duration-700 ease-out
              opacity-0 translate-y-6 scale-95
              ${animateIn ? "opacity-100 translate-y-0 scale-100" : ""}
            `}
          >
            {/* Pass the standard useGrid hook to children.
                They are inside the Provider, so it will work.
            */}
            {showButton && <ExplosionButton useGrid={useGrid} />}
          </div>
        </div>
      </GridWithGlow>
    </div>
  );
}