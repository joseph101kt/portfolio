"use client";

import { useEffect, useState } from "react";
import GridWithGlow, { ExplosionButton } from "@/components/Hero/GridWithBgGlow";
import HeroText from "@/components/Hero/HeroText";

const BUTTON_DELAY_MS = 3500;

export default function HeroSection() {
  const [showButton, setShowButton] = useState<boolean>(false);
  const [animateIn, setAnimateIn] = useState<boolean>(false);

  useEffect(() => {
    const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
      setShowButton(true);

      // trigger animation on next frame
      requestAnimationFrame(() => {
        setAnimateIn(true);
      });
    }, BUTTON_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col">
      <GridWithGlow>
        <div className="flex flex-col w-full items-center justify-center min-h-screen gap-10 translate-z-0">
          <HeroText />

          {showButton && (
            <div
              className={`
                transition-all duration-700 ease-out
                ${animateIn
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-6 scale-95"}
              `}
            >
              <ExplosionButton />
            </div>
          )}
        </div>
      </GridWithGlow>
    </div>
  );
}
