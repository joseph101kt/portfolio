import React, { createContext, useContext } from "react";
import { ThemeName, ColorScheme, PALETTES } from "./HeroTypes";

// 1. Initialize context with the ColorScheme type
// We use PALETTES.purple as the default starting point
const ThemeContext = createContext<ColorScheme>(PALETTES.purple);

export const ThemeProvider: React.FC<{ 
  theme: ThemeName; 
  children: React.ReactNode 
}> = ({ theme, children }) => {
  
  // 2. Ensure we fallback to purple if a non-existent theme name is passed
  const activeTheme = PALETTES[theme] || PALETTES.purple;

  return (
    <ThemeContext.Provider value={activeTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

// 3. Custom hook to consume the theme in HeroText, CanvasGrid, etc.
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export default ThemeProvider;