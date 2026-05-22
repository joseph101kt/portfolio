"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggleFab = () => {
  // ─────────────────────────────────────────────────────────────
  // Initial theme detection (runs once)
  // ─────────────────────────────────────────────────────────────

  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === "undefined") {
      return false;
    }

    const storedTheme = localStorage.getItem("theme");

    if (storedTheme === "dark") return true;
    if (storedTheme === "light") return false;

    return window.matchMedia("(prefers-color-scheme: dark)")
      .matches;
  });

  // ─────────────────────────────────────────────────────────────
  // Sync theme to DOM + localStorage
  // ─────────────────────────────────────────────────────────────

  useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle("dark", isDark);

    localStorage.setItem(
      "theme",
      isDark ? "dark" : "light"
    );
  }, [isDark]);

  // ─────────────────────────────────────────────────────────────
  // Toggle
  // ─────────────────────────────────────────────────────────────

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  // ─────────────────────────────────────────────────────────────
  // UI
  // ─────────────────────────────────────────────────────────────

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        isDark
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
      title={
        isDark
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
      className="
        fixed bottom-5 left-5 z-[100]

        flex h-14 w-14 items-center justify-center

        rounded-full border
        border-[#E7DED1]

        bg-white/90
        text-[#1F2933]

        shadow-[0_10px_30px_rgba(0,0,0,0.12)]
        backdrop-blur-md

        transition-all duration-300

        hover:scale-105
        hover:bg-[#F8F5F1]

        focus:outline-none
        focus:ring-2
        focus:ring-[#C65D3B]
        focus:ring-offset-2

        dark:border-white/10
        dark:bg-[#12161C]/90
        dark:text-[#F3F4F6]

        dark:hover:bg-[#1A1F27]
        dark:focus:ring-[#D97757]
      "
    >
      <span className="sr-only">
        Toggle light and dark mode
      </span>

      {isDark ? (
        <Sun className="h-5 w-5" aria-hidden="true" />
      ) : (
        <Moon className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  );
};

export default ThemeToggleFab;