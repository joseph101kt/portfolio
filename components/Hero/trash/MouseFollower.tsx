"use client";

import React, { useEffect, useRef, useState } from "react";
import { Glow } from "./Glow";

/* =========================
   Types
========================= */

interface MouseFollowerProps {
  readonly colorPrimary?: string | string[];
  readonly colorSecondary?: string | string[];
  readonly radiusPrimary?: number;
  readonly radiusSecondary?: number;
  readonly intensityPrimary?: number;
  readonly intensitySecondary?: number;
  readonly smoothness?: number;
  readonly maxRadiusPrimary?: number;
  readonly maxRadiusSecondary?: number;
  readonly children?: React.ReactNode;
}

/* =========================
   Component
========================= */

export const MouseFollower: React.FC<MouseFollowerProps> = ({
  colorPrimary = "#6A6FFF",
  colorSecondary = "#6AFFFF",
  radiusPrimary = 200,
  radiusSecondary = 120,
  intensityPrimary = 1,
  intensitySecondary = 0.8,
  smoothness = 0.3,
  maxRadiusPrimary = 220,
  maxRadiusSecondary = 180,
  children,
}) => {
  const target = useRef({ x: 0, y: 0 });
  const [pos, setPos] = useState({ x: 0, y: 0 });

  /* -------------------------
     Track mouse movement
  ------------------------- */
  useEffect(() => {
    const move = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  /* -------------------------
     Smooth interpolation via RAF
  ------------------------- */
  useEffect(() => {
    let raf: number;

    const tick = () => {
      setPos((prev) => {
        const x = prev.x + (target.current.x - prev.x) * smoothness;
        const y = prev.y + (target.current.y - prev.y) * smoothness;
        return { x, y };
      });
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [smoothness]);

  /* -------------------------
     Touch detection
  ------------------------- */
  const isTouch =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;

  if (isTouch) return <>{children}</>;

  /* -------------------------
     Render two glows + children
  ------------------------- */
  return (
    <>
      <Glow
        x={pos.x}
        y={pos.y}
        color={colorPrimary}
        radius={radiusPrimary}
        animation="static"
        intensity={intensityPrimary}
        maxRadius={maxRadiusPrimary}
        zIndex={5}
      />
      <Glow
        x={pos.x}
        y={pos.y}
        color={colorSecondary}
        radius={radiusSecondary}
        animation="static"
        intensity={intensitySecondary}
        maxRadius={maxRadiusSecondary}
        zIndex={4}
      />
      {children}
    </>
  );
};
