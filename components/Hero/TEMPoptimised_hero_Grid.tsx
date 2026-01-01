'use client';

import React, { useState, useEffect, useRef } from 'react';

interface LayeredGridProps {
  rows?: number;
  cols?: number;
  cellSize?: number;
  gridPadding?: number;
  glowRadius?: number;
}

const LayeredGrid: React.FC<LayeredGridProps> = ({
  rows = 10,
  cols = 16,
  cellSize = 60,
  gridPadding = 6,
  glowRadius = 60
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      style={{ backgroundColor: '#2B3B5C' }} // light navy background
    >
      {/* Glow Layer (midground) */}
      <MouseGlow containerRef={containerRef} radius={glowRadius} />

      {/* Foreground Grid (z=10) */}
      <div
        ref={containerRef}
        className="absolute z-10"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
          gap: `${gridPadding}px`,
          padding: `${gridPadding}px`,
          width: cols * (cellSize + gridPadding) - gridPadding,
          height: rows * (cellSize + gridPadding) - gridPadding,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {Array.from({ length: rows * cols }).map((_, i) => (
          <div
            key={i}
            className="bg-gray-900" // dark cells
            style={{ width: cellSize, height: cellSize }}
          />
        ))}
      </div>
    </div>
  );
};

export default LayeredGrid;

/* ===========================================
   MouseGlow Component (midground, behind grid)
   =========================================== */
interface MouseGlowProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  radius: number;
}

const MouseGlow: React.FC<MouseGlowProps> = ({ containerRef, radius }) => {
  const glowRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const lerpFactor = 0.15;

  // Track mouse inside container
  useEffect(() => {
const handleMouseMove = (e: MouseEvent) => {
  if (!containerRef.current) return;

  const rect = containerRef.current.getBoundingClientRect();

  // Container top-left in viewport
  const containerLeft = rect.left + window.scrollX;
  const containerTop = rect.top + window.scrollY;

  // Mouse relative to container top-left
  let x = e.pageX - containerLeft;
  let y = e.pageY - containerTop;

  // Clamp inside container
  x = Math.max(radius, Math.min(x, rect.width - radius));
  y = Math.max(radius, Math.min(y, rect.height - radius));

  targetPos.current = { x, y };
};


    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [containerRef, radius]);

  // Lerp animation loop
  useEffect(() => {
    let rafId: number;

    const animate = () => {
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * lerpFactor;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * lerpFactor;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${currentPos.current.x - radius}px, ${currentPos.current.y - radius}px)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [radius]);

  return (
    <div
      ref={glowRef}
      className="absolute z-5 pointer-events-none"
      style={{
        width: radius * 2,
        height: radius * 2,
        borderRadius: '50%',
        background: 'white',
        opacity: 0.25,
        filter: `blur(${radius / 2}px)`
      }}
    />
  );
};
