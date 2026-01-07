"use client";

import { useEffect, useState } from "react";
import GridWithGlow, { ExplosionButton } from "@/components/Hero/GridWithBgGlow";
import HeroText from "@/components/Hero/HeroText";

const BUTTON_DELAY_MS = 3200;

export default function HeroSection() {
  const [showButton, setShowButton] = useState<boolean>(false);
  const [animateIn, setAnimateIn] = useState<boolean>(false);

  useEffect(() => {
    const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
      setShowButton(true);

      // Trigger animation on next frame
      requestAnimationFrame(() => setAnimateIn(true));
    }, BUTTON_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col">
      <GridWithGlow>
        {/* Hero + Button wrapper */}
        <div
          className={`
            flex flex-col w-full items-center justify-center
            min-h-screen
            transition-transform duration-700 ease-out
            ${animateIn ? "-translate-y-2 md:-translate-y-3 lg:-translate-y-4" : "translate-y-0"}
          `}
        >
          {/* Hero Text */}
          <HeroText />

          {/* Button (always in DOM, hidden until animation) */}
          <div
            className={`
              transform transition-all duration-700 ease-out
              opacity-0 translate-y-6 scale-95
              ${animateIn ? "opacity-100 translate-y-0 scale-100" : ""}
            `}
          >
            {showButton && <ExplosionButton />}
          </div>
        </div>
      </GridWithGlow>
    </div>
  );
}
