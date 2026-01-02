"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

/* =========================
   Types
========================= */

export type GlowAnimation = "breath" | "explosion" | "static";

export interface GlowProps {
  x: number;
  y: number;
  color: string | readonly string[];
  radius: number;
  animation: GlowAnimation;
  intensity?: number;
  zIndex?: number;
  maxRadius?: number;
}

/* =========================
   Utils
========================= */

const easeInOutSine = (x: number): number =>
  -(Math.cos(Math.PI * x) - 1) / 2;

const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!match) return { r: 106, g: 111, b: 255 };
  return {
    r: parseInt(match[1], 16),
    g: parseInt(match[2], 16),
    b: parseInt(match[3], 16),
  };
};

/* =========================
   Component
========================= */

export const Glow: React.FC<GlowProps> = ({
  x,
  y,
  color,
  radius,
  animation,
  intensity = 1,
  zIndex = 10,
  maxRadius,
}) => {
  const isStatic = animation === "static";

  const [animatedRadius, setAnimatedRadius] = useState(radius);
  const [animatedIntensity, setAnimatedIntensity] = useState(intensity);

  const timeRef = useRef(0);
  const lastRef = useRef(0);

  /* -------------------------
     Animation loop
  ------------------------- */
  useEffect(() => {
    if (isStatic) return;

    let rafId: number;
    timeRef.current = 0;
    lastRef.current = 0;

    const tick = (now: number) => {
      if (!lastRef.current) lastRef.current = now;
      const dt = (now - lastRef.current) / 1000;
      lastRef.current = now;
      timeRef.current += dt;

      switch (animation) {
        case "breath": {
          const cycle = 3;
          const phase = (timeRef.current % cycle) / cycle;
          const eased = Math.sin(phase * Math.PI);
          setAnimatedRadius(radius + eased * 100);
          setAnimatedIntensity(1.3);
          break;
        }
        case "explosion": {
          const maxViewport = Math.max(window.innerWidth, window.innerHeight);
          const maxDistance = Math.hypot(maxViewport, maxViewport);

          const waves = [
            { delay: 0, duration: 0.8, scale: 1.2, intensity: 2.2 },
            { delay: 0.1, duration: 0.9, scale: 1.1, intensity: 1.6 },
            { delay: 0.2, duration: 1.0, scale: 1.0, intensity: 1.2 },
          ] as const;

          let strongestRadius = 0;
          let strongestIntensity = 0;

          for (const wave of waves) {
            const t = timeRef.current - wave.delay;
            if (t < 0 || t > wave.duration) continue;
            const e = easeInOutSine(t / wave.duration);
            const waveRadius = e * maxDistance * wave.scale;
            const waveIntensity = wave.intensity * (1 - e);

            if (waveIntensity > strongestIntensity) {
              strongestRadius = waveRadius;
              strongestIntensity = waveIntensity;
            }
          }

          setAnimatedRadius(strongestRadius);
          setAnimatedIntensity(strongestIntensity);
          break;
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [animation, radius, isStatic]);

  /* -------------------------
     Compute effective values
  ------------------------- */
  const effectiveRadius = maxRadius ?? (isStatic ? radius : animatedRadius);
  const effectiveIntensity = isStatic ? intensity : animatedIntensity;

  const gradient = useMemo(() => {
    const colors = Array.isArray(color) ? color : [color];
    if (colors.length === 1) {
      const { r, g, b } = hexToRgb(colors[0]);
      return `radial-gradient(circle,
        rgba(${r},${g},${b},${0.6 * effectiveIntensity}) 0%,
        rgba(${r},${g},${b},${0.25 * effectiveIntensity}) 35%,
        rgba(${r},${g},${b},${0.1 * effectiveIntensity}) 60%,
        transparent 100%)`;
    }
    const stops = colors.map((c, i) => {
      const { r, g, b } = hexToRgb(c);
      const pos = (i / (colors.length - 1)) * 100;
      const alpha = effectiveIntensity * (1 - i * 0.3);
      return `rgba(${r},${g},${b},${alpha}) ${pos}%`;
    });
    return `radial-gradient(circle, ${stops.join(", ")}, transparent 100%)`;
  }, [color, effectiveIntensity]);

  const size = effectiveRadius * 2;

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        transform: `translate(${x - effectiveRadius}px, ${y - effectiveRadius}px)`,
        width: size,
        height: size,
        borderRadius: "50%",
        background: gradient,
        filter: "blur(20px)",
        pointerEvents: "none",
        mixBlendMode: "screen",
        contain: "paint",
        zIndex,
      }}
    />
  );
};
