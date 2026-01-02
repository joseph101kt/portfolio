"use client";

import React, { useEffect, useRef, useState } from "react";
import { ResponsiveGrid } from "./ResponsiveGrid";
import { Glow } from "./Glow";
import { MouseFollower } from "./MouseFollower";

/* =========================
   ExplosionButton (UI ONLY)
========================= */

type Phase = "breathing" | "exploding";

interface ExplosionButtonProps {
  onExplode: (center: { x: number; y: number }, phase: Phase) => void;
  children?: React.ReactNode;
}

const ExplosionButton: React.FC<ExplosionButtonProps> = ({
  children = "Explore My Work",
  onExplode,
}) => {
  const [phase, setPhase] = useState<Phase>("breathing");
  const btnRef = useRef<HTMLButtonElement | null>(null);

  /* -------------------------
     Track button position and notify HeroSection
  ------------------------- */
  useEffect(() => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    onExplode(
      { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 },
      phase
    );
  }, [phase, onExplode]);

  /* -------------------------
     Handle click (trigger explosion)
  ------------------------- */
  const handleClick = (): void => {
    setPhase("exploding");
    setTimeout(() => setPhase("breathing"), 1200);
  };

  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      className="
        px-8 py-4
        bg-gray-900/50
        backdrop-blur-sm
        text-white
        rounded-lg
        border border-gray-700
        hover:border-gray-600
        transition-colors
        relative
        z-20
      "
    >
      {children}
    </button>
  );
};

/* =========================
   HeroSection
========================= */

export const HeroSection: React.FC = () => {
  const [glowCenter, setGlowCenter] = useState({ x: 0, y: 0 });
  const [phase, setPhase] = useState<Phase>("breathing");
  const [explosionId, setExplosionId] = useState(0);

  /* -------------------------
     Callback from ExplosionButton
  ------------------------- */
  const handleExplode = (
    center: { x: number; y: number },
    nextPhase: Phase
  ): void => {
    setGlowCenter(center);
    setPhase(nextPhase);
    if (nextPhase === "exploding") setExplosionId((v) => v + 1);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* -------------------------
          Glow Layer (BEHIND GRID)
      ------------------------- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {phase === "breathing" && (
          <Glow
            x={glowCenter.x}
            y={glowCenter.y}
            colorGradient={["#6A6FFF"]}
            radius={120}
            animation="breath"
            intensity={1}
          />
        )}

        {phase === "exploding" && (
          <>
            <Glow
              key={`g1-${explosionId}`}
              x={glowCenter.x}
              y={glowCenter.y}
              colorGradient={["#6AFFFF"]}
              radius={0}
              animation="explosion"
            />
            <Glow
              key={`g2-${explosionId}`}
              x={glowCenter.x}
              y={glowCenter.y}
              colorGradient={["#8B5CF6"]}
              radius={0}
              animation="explosion"
            />
            <Glow
              key={`g3-${explosionId}`}
              x={glowCenter.x}
              y={glowCenter.y}
              colorGradient={["#6A6FFF"]}
              radius={0}
              animation="explosion"
            />
          </>
        )}
      </div>

      {/* -------------------------
          Grid Layer
      ------------------------- */}
      <div className="absolute inset-0 z-10">
        <ResponsiveGrid cellSize={50} gap={2} />
      </div>

      {/* -------------------------
          Content Layer (STATIC)
      ------------------------- */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 text-center px-4">
          Full Stack Web Developer
        </h1>
        <div className="pointer-events-auto">
          <ExplosionButton onExplode={handleExplode} />
        </div>
      </div>

      {/* -------------------------
          Mouse Follower Layer (TOP, MOVING)
      ------------------------- */}
      <MouseFollower color="#6A6FFF" radius={200} intensity={1} />
    </div>
  );
};
