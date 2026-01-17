"use client";

import { createContext, useContext, useEffect, useState, useRef } from "react";
import GridWithGlow from "@/components/DevHero/GridWithBgGlow";
import HeroText from "@/components/DevHero/HeroText";
import ExplosionButton from "./ExplosionButton";
import { GridContextType, ThemeName, PALETTES } from "./HeroTypes"; // Added PALETTES
import SmoothCursor from "./SmoothCursor";
import { ThemeProvider } from "./HeroThemeContext";

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
    registerGlow: () => {}, 
    updateGlow: () => {},
    unregisterGlow: () => {},
  };
};

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
  
  // Current active theme
  const [activeTheme] = useState<ThemeName>("purple");

  // Get the specific colors for the current theme to apply to the wrapper
  const currentPalette = PALETTES[activeTheme];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
      requestAnimationFrame(() => setAnimateIn(true));
    }, BUTTON_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider theme={activeTheme}>
      <div 
        className="min-h-screen w-full flex flex-col transition-colors duration-1000"
        // APPLY THE PALETTE BACKGROUND HERE
        style={{ backgroundColor: currentPalette.background }}
      >
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
              {showButton && <ExplosionButton useGrid={useGrid} />}
            </div>
          </div>
        </GridWithGlow>
      </div>
    </ThemeProvider>
  );
}