"use client";

import { useRef, useEffect } from "react";
import { useTheme } from "./HeroThemeContext"; // Path should match your context file

interface SmoothCursorProps {
  useGrid: () => {
    registerGlow: (id: string, config: { x: number; y: number; color: string; radius: number; intensity: number }) => void;
    updateGlow: (id: string, config: { x: number; y: number; intensity: number }) => void;
    unregisterGlow: (id: string) => void;
    containerRef: React.RefObject<HTMLElement | null>;
  };
}

const SmoothCursor: React.FC<SmoothCursorProps> = ({ useGrid }) => {
  const { registerGlow, updateGlow, unregisterGlow, containerRef } = useGrid();
  const theme = useTheme();

  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  /* -------------------------
      Theme-Aware Registration
  ------------------------- */
  useEffect(() => {
    // We register with the current pos.current to prevent snapping 
    // to [0,0] when switching from Purple to Emerald.
    registerGlow("cursor", { 
      x: pos.current.x, 
      y: pos.current.y, 
      color: theme.glowCursor, 
      radius: 220, // Slightly larger radius for better mesh bleed
      intensity: 1 
    });
    
    return () => unregisterGlow("cursor");
    // Re-register only when the specific cursor color changes
  }, [registerGlow, unregisterGlow, theme.glowCursor]); 

  /* -------------------------
      Mouse Tracking Logic
  ------------------------- */
  useEffect(() => {
    const move = (e: MouseEvent) => {
      const r = containerRef.current?.getBoundingClientRect();
      if (!r) return;
      
      // Target position relative to the grid container bounds
      target.current = { 
        x: e.clientX - r.left, 
        y: e.clientY - r.top 
      };
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [containerRef]);

  /* -------------------------
      Animation Loop (Lerp)
  ------------------------- */
  useEffect(() => {
    let raf: number;
    
    const tick = () => {
      // 0.15 provides a smoother, "heavier" lag feel suited for grid highlights
      const lerpFactor = 0.15;
      pos.current.x += (target.current.x - pos.current.x) * lerpFactor;
      pos.current.y += (target.current.y - pos.current.y) * lerpFactor;

      updateGlow("cursor", {
        x: pos.current.x,
        y: pos.current.y,
        intensity: 1,
      });

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [updateGlow]);

  return null;
};

export default SmoothCursor;