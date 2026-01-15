// HeroTypes.tsx


export interface GlowSource {
  id: string;
  x: number;
  y: number;
  color: string;
  radius: number;
  intensity: number;
}

export interface GridContextType {
  registerGlow: (id: string, glow: Omit<GlowSource, "id">) => void;
  updateGlow: (id: string, glow: Partial<Omit<GlowSource, "id">>) => void;
  unregisterGlow: (id: string) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
  gridBounds: { width: number; height: number };
}
// HeroTypes.tsx
export interface ColorScheme {
  // Background & Grid
  background: string;
  gridCell: string;

  // Glows
  glowPrimary: string;
  glowWave1: string;
  glowWave2: string;
  glowWave3: string;
  glowCursor: string;

  // Button
  buttonBg: string;
  buttonBorder: string;
  buttonText: string;
  buttonHoverText: string;

  // HeroText specific (NEW)
  heroPrimary: string;      // Replaces DESIGN_CONFIG.primaryColor
  heroSecondary: string;    // Replaces DESIGN_CONFIG.secondaryColor
  heroTagline: string;      // Replaces DESIGN_CONFIG.taglineColor
  heroSubTagline: string;   // Replaces DESIGN_CONFIG.subTaglineColor
  heroUnderline: string;    // Gradient Start
  heroUnderlineAccent: string; // Gradient End

  enableSound?: boolean;
  soundFile?: string;
}

export type ThemeName = "purple" | "emerald" | "sunset" | "ocean";


export const PALETTES: Record<string, ColorScheme> = {
  purple: {
    background: "#02040a",
    gridCell: "rgba(5, 8, 18, 1)",
    glowPrimary: "#6A6FFF",
    glowWave1: "#6AFFFF",
    glowWave2: "#8B5CF6",
    glowWave3: "#6A6FFF",
    glowCursor: "#6A6FFF",
    buttonBg: "#000000",
    buttonBorder: "#8B5CF6",
    buttonText: "#FFFFFF",
    buttonHoverText: "#D8B4FE",
    // HeroText Colors
    heroPrimary: "text-purple-400",
    heroSecondary: "text-white",
    heroTagline: "text-gray-300",
    heroSubTagline: "text-gray-400",
    heroUnderline: "#A78BFA", // purple-400
    heroUnderlineAccent: "#8B5CF6", // violet-500
  },
  emerald: {
    background: "#010805",
    gridCell: "rgba(2, 15, 10, 1)",
    glowPrimary: "#10B981",
    glowWave1: "#34D399",
    glowWave2: "#059669",
    glowWave3: "#10B981",
    glowCursor: "#10B981",
    buttonBg: "#000000",
    buttonBorder: "#10B981",
    buttonText: "#FFFFFF",
    buttonHoverText: "#6EE7B7",
    // HeroText Colors
    heroPrimary: "text-emerald-400",
    heroSecondary: "text-slate-100",
    heroTagline: "text-emerald-100/70",
    heroSubTagline: "text-emerald-200/50",
    heroUnderline: "#34D399", 
    heroUnderlineAccent: "#059669",
  }
};