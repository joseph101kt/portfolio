/* =========================
   Glow Renderer
========================= */

import { GlowSource } from "./HeroTypes";

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
        transform: `translate(${source.x - maxRadius}px, ${source.y - maxRadius}px)`,
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
   Utils
========================= */


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


export default CircleGlow;