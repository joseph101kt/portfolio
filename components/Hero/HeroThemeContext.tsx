import React, { createContext, useContext } from "react";
import { ThemeName, Palette, PALETTES } from "./HeroTypes";

const ThemeContext = createContext<Palette>(PALETTES.purple);

export const ThemeProvider: React.FC<{ theme: ThemeName; children: React.ReactNode }> = ({ theme, children }) => {
  return (
    <ThemeContext.Provider value={PALETTES[theme]}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);