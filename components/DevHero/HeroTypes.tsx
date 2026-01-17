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

export type ThemeName = "purple" | "emerald" | "industrial" | "oceanic" | "outback" | "luxury"  | "crimson" | "ledger"
    | "contractorBlue" | "paperInk" | "";


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
  },
  industrial: {
    background: "#0a0a0b",
    gridCell: "rgba(18, 18, 20, 1)",
    glowPrimary: "#F97316", // Bright Orange
    glowWave1: "#FB923C", 
    glowWave2: "#EA580C",
    glowWave3: "#F97316",
    glowCursor: "#F97316",
    buttonBg: "#000000",
    buttonBorder: "#F97316",
    buttonText: "#FFFFFF",
    buttonHoverText: "#FED7AA",
    heroPrimary: "text-orange-500",
    heroSecondary: "text-zinc-100",
    heroTagline: "text-zinc-400",
    heroSubTagline: "text-zinc-500",
    heroUnderline: "#F97316",
    heroUnderlineAccent: "#EA580C",
  },
  oceanic: {
    background: "#020617",
    gridCell: "rgba(15, 23, 42, 1)",
    glowPrimary: "#0EA5E9", // Sky Blue
    glowWave1: "#38BDF8", 
    glowWave2: "#0284C7",
    glowWave3: "#0EA5E9",
    glowCursor: "#0EA5E9",
    buttonBg: "#000000",
    buttonBorder: "#0EA5E9",
    buttonText: "#FFFFFF",
    buttonHoverText: "#BAE6FD",
    heroPrimary: "text-sky-400",
    heroSecondary: "text-white",
    heroTagline: "text-slate-300",
    heroSubTagline: "text-slate-400",
    heroUnderline: "#38BDF8",
    heroUnderlineAccent: "#0284C7",
  },
  outback: {
    background: "#0c0a09",
    gridCell: "rgba(28, 25, 23, 1)",
    glowPrimary: "#D4D4D8", // Silver/Steel
    glowWave1: "#A8A29E", 
    glowWave2: "#78716C",
    glowWave3: "#D4D4D8",
    glowCursor: "#F59E0B", // Amber highlight for the "Call"
    buttonBg: "#000000",
    buttonBorder: "#F59E0B",
    buttonText: "#FFFFFF",
    buttonHoverText: "#FCD34D",
    heroPrimary: "text-amber-500",
    heroSecondary: "text-stone-100",
    heroTagline: "text-stone-400",
    heroSubTagline: "text-stone-500",
    heroUnderline: "#F59E0B",
    heroUnderlineAccent: "#D97706",
  },
  crimson: {
    background: "#0a0000",
    gridCell: "rgba(20, 5, 5, 1)",
    glowPrimary: "#EF4444", // Red
    glowWave1: "#F87171", 
    glowWave2: "#B91C1C",
    glowWave3: "#EF4444",
    glowCursor: "#EF4444",
    buttonBg: "#000000",
    buttonBorder: "#EF4444",
    buttonText: "#FFFFFF",
    buttonHoverText: "#FECACA",
    heroPrimary: "text-red-500",
    heroSecondary: "text-white",
    heroTagline: "text-rose-100/60",
    heroSubTagline: "text-rose-200/40",
    heroUnderline: "#EF4444",
    heroUnderlineAccent: "#991B1B",
  },

ledger: {
  // GRID IS THE BACKGROUND
  gridCell: "rgba(17, 24, 39, 1)", // slate-900 feel
  background: "#0B0F14", // almost never visible

  // GLOWS (SUBTLE)
  glowPrimary: "#4CAF50",
  glowWave1: "#81C784",
  glowWave2: "#388E3C",
  glowWave3: "#4CAF50",
  glowCursor: "#4CAF50",

  // CTA
  buttonBg: "#020617",
  buttonBorder: "#4CAF50",
  buttonText: "#FFFFFF",
  buttonHoverText: "#C8E6C9",

  // HERO TEXT
  heroPrimary: "text-slate-100",     // “More”
  heroSecondary: "text-green-400",   // “Leads / Sales / Growth”
  heroTagline: "text-slate-400",
  heroSubTagline: "text-slate-500",

  heroUnderline: "#4CAF50",
  heroUnderlineAccent: "#388E3C",
},
contractorBlue: {
  gridCell: "rgba(15, 23, 42, 1)", // slate-900
  background: "#0A0E16",

  glowPrimary: "#3B82F6",
  glowWave1: "#60A5FA",
  glowWave2: "#2563EB",
  glowWave3: "#3B82F6",
  glowCursor: "#3B82F6",

  buttonBg: "#020617",
  buttonBorder: "#3B82F6",
  buttonText: "#FFFFFF",
  buttonHoverText: "#BFDBFE",

  heroPrimary: "text-slate-100",   // “More”
  heroSecondary: "text-blue-400",  // Animated word
  heroTagline: "text-slate-400",
  heroSubTagline: "text-slate-500",

  heroUnderline: "#60A5FA",
  heroUnderlineAccent: "#2563EB",
},
paperInk: {
  gridCell: "rgba(17, 17, 17, 1)", // neutral dark gray
  background: "#0A0A0A",

  glowPrimary: "#94A3B8",
  glowWave1: "#CBD5E1",
  glowWave2: "#64748B",
  glowWave3: "#94A3B8",
  glowCursor: "#94A3B8",

  buttonBg: "#020617",
  buttonBorder: "#94A3B8",
  buttonText: "#FFFFFF",
  buttonHoverText: "#E5E7EB",

  heroPrimary: "text-gray-100",
  heroSecondary: "text-slate-300", // subtle emphasis
  heroTagline: "text-gray-400",
  heroSubTagline: "text-gray-500",

  heroUnderline: "#CBD5E1",
  heroUnderlineAccent: "#64748B",
},
inversePaperInk: {
  gridCell: "rgba(10, 10, 10, 1)", // neutral dark gray
  background: "##111111",

  glowPrimary: "#94A3B8",
  glowWave1: "#CBD5E1",
  glowWave2: "#64748B",
  glowWave3: "#94A3B8",
  glowCursor: "#94A3B8",

  buttonBg: "#020617",
  buttonBorder: "#94A3B8",
  buttonText: "#FFFFFF",
  buttonHoverText: "#E5E7EB",

  heroPrimary: "text-gray-100",
  heroSecondary: "text-slate-300", // subtle emphasis
  heroTagline: "text-gray-400",
  heroSubTagline: "text-gray-500",

  heroUnderline: "#CBD5E1",
  heroUnderlineAccent: "#64748B",
}



};