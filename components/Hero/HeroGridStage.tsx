"use client";
import React, { useState, useEffect, useRef, useMemo, createContext, useContext, memo } from 'react';

interface GlowSource {
  id: string;
  x: number;
  y: number;
  color: string;
  radius: number;
  intensity: number;
  fullScreen?: boolean;
}

interface GridContextType {
  registerGlow: (id: string, glow: Omit<GlowSource, 'id'>) => void;
  updateGlow: (id: string, glow: Partial<Omit<GlowSource, 'id'>>) => void;
  unregisterGlow: (id: string) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
  gridBounds: { width: number; height: number };
}

const GridContext = createContext<GridContextType | null>(null);

const useGrid = () => {
  const context = useContext(GridContext);
  if (!context) throw new Error('useGrid must be used within PrecisionGrid');
  return context;
};

const easeInOutSine = (x: number): number => -(Math.cos(Math.PI * x) - 1) / 2;

const BreathingButton: React.FC = () => {
  const [phase, setPhase] = useState<'breathing' | 'exploding'>('breathing');
  const [time, setTime] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { registerGlow, updateGlow, unregisterGlow, containerRef, gridBounds } = useGrid();
  const glowId = 'breathing-button';

  useEffect(() => {
    registerGlow(glowId, { x: 0, y: 0, color: '#6A6FFF', radius: 150, intensity: 1 });
    return () => unregisterGlow(glowId);
  }, [registerGlow, unregisterGlow]);

  useEffect(() => {
    let rafId: number;
    let lastTime = performance.now();
    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;
      setTime(t => t + deltaTime);
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    if (!buttonRef.current || !containerRef.current) return;

    const buttonRect = buttonRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    const x = buttonRect.left + buttonRect.width / 2 - containerRect.left;
    const y = buttonRect.top + buttonRect.height / 2 - containerRect.top;

    if (phase === 'breathing') {
const DURATION = 3; // duration in seconds for full inhale + exhale
const cycle = (time % DURATION) / DURATION;

// sinusoidal ease simulates smooth inhale→exhale
const eased = Math.sin(cycle * Math.PI);

// now radius/intensity smoothly oscillate
const minRadius = 100;
const maxRadius = 220;
const radius = minRadius + eased * (maxRadius - minRadius);

// intensity goes opposite to radius to give nice visual contrast
const minIntensity = 1.0;
const maxIntensity = 1.4;
const intensity = maxIntensity - eased * (maxIntensity - minIntensity);

updateGlow(glowId, {
  x,
  y,
  radius,
  intensity,
  color: '#6A6FFF',
  fullScreen: false
});

    } else if (phase === 'exploding') {
      const explosionTime = time % 1.5;
      if (explosionTime < 0.05) {
        updateGlow(glowId, { x, y, radius: 0, intensity: 3, color: '#FFD700', fullScreen: true });
      } else if (explosionTime < 1.2) {
        const progress = (explosionTime - 0.05) / 1.15;
        const eased = easeInOutSine(progress);
        const maxDist = Math.sqrt(gridBounds.width ** 2 + gridBounds.height ** 2);
        const radius = eased * maxDist;
        const intensity = 3 - eased * 2.7;
        updateGlow(glowId, { x, y, radius, intensity, color: '#FFD700', fullScreen: true });
      } else {
        requestAnimationFrame(() => {
          setPhase('breathing');
          setTime(0);
        });
      }
    }
  }, [time, phase, gridBounds, updateGlow]);

  const handleClick = () => {
    setPhase('exploding');
    setTime(0);
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-8 py-4 bg-gray-900 bg-opacity-50 backdrop-blur-sm text-white font-medium rounded-lg border border-gray-700 hover:border-gray-600 transition-colors z-20"
    >
      Click for Explosion
    </button>
  );
};

const SmoothCursor: React.FC = () => {
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
  const { registerGlow, updateGlow, unregisterGlow, containerRef } = useGrid();
  const glowId = 'smooth-cursor';
  const lerpFactor = 0.25; // faster lerping

  useEffect(() => {
    registerGlow(glowId, { x: 0, y: 0, color: '#6A6FFF', radius: 250, intensity: 1 });
    return () => unregisterGlow(glowId);
  }, [registerGlow, unregisterGlow]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setTargetPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [containerRef]);

  useEffect(() => {
    let rafId: number;
    const animate = () => {
      setCurrentPos(prev => ({
        x: prev.x + (targetPos.x - prev.x) * lerpFactor,
        y: prev.y + (targetPos.y - prev.y) * lerpFactor
      }));
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [targetPos]);

  useEffect(() => {
    updateGlow(glowId, { x: currentPos.x, y: currentPos.y });
  }, [currentPos, updateGlow]);

  return null;
};

interface GridCellProps {
  col: number;
  row: number;
  size: number;
  borderWidth: number;
  glowData: { intensity: number; color: { r: number; g: number; b: number } };
}

const GridCell = memo(({ col, row, size, borderWidth, glowData }: GridCellProps) => {
  const { intensity, color } = glowData;
  const style = useMemo(() => {
    if (intensity === 0) return { borderColor: 'rgba(75,78,158,0.3)', backgroundColor: 'rgba(26,33,56,0.7)', boxShadow: 'none' };
    const rgb = `${color.r}, ${color.g}, ${color.b}`;
    const coreGlow = `0 0 ${10 * intensity}px rgba(${rgb}, ${0.8 * intensity})`;
    const outerGlow = `0 0 ${28 * intensity}px rgba(${rgb}, ${0.5 * intensity})`;
    const extendedGlow = `0 0 ${56 * intensity}px rgba(${rgb}, ${0.25 * intensity})`;
    return {
      borderColor: `rgba(${rgb}, ${0.4 + 0.6 * intensity})`,
      backgroundColor: 'rgba(26,33,56,0.7)',
      boxShadow: `${coreGlow}, ${outerGlow}, ${extendedGlow}, inset ${coreGlow}`
    };
  }, [intensity, color.r, color.g, color.b]);

  return (
    <div
      className="absolute"
      style={{
        left: col * size,
        top: row * size,
        width: size,
        height: size,
        border: `${borderWidth}px solid`,
        borderColor: style.borderColor,
        backgroundColor: style.backgroundColor,
        boxShadow: style.boxShadow,
        willChange: 'border-color, box-shadow'
      }}
    />
  );
});
GridCell.displayName = 'GridCell';

interface PrecisionGridProps {
  children?: React.ReactNode;
  sm?: number;
  md?: number;
  lg?: number;
}

const PrecisionGrid: React.FC<PrecisionGridProps> = ({ children, sm = 40, md = 60, lg = 80 }) => {
  const [glowSources, setGlowSources] = useState<Map<string, GlowSource>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);
  const [cellGlowData, setCellGlowData] = useState<Map<string, { intensity: number; color: { r: number; g: number; b: number } }>>(new Map());
  const [cellSize, setCellSize] = useState(md);
  const [gridDims, setGridDims] = useState({ rows: 10, cols: 16 });

  // Update cell size based on screen width
  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width < 640) setCellSize(sm);
      else if (width < 1024) setCellSize(md);
      else setCellSize(lg);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [sm, md, lg]);

  // Dynamically calculate rows/cols based on window size
  useEffect(() => {
    const updateGridDims = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setGridDims({ cols: Math.floor(width / cellSize), rows: Math.floor(height / cellSize) });
    };
    updateGridDims();
    window.addEventListener('resize', updateGridDims);
    return () => window.removeEventListener('resize', updateGridDims);
  }, [cellSize]);

  const gridBounds = useMemo(() => ({
    width: gridDims.cols * cellSize,
    height: gridDims.rows * cellSize
  }), [gridDims, cellSize]);

  const hexToRgb = useMemo(() => (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : { r: 106, g: 111, b: 255 };
  }, []);

  useEffect(() => {
    let rafId: number;

    const updateCellGlows = () => {
      const newGlowData = new Map<string, { intensity: number; color: { r: number; g: number; b: number } }>();
      for (let row = 0; row < gridDims.rows; row++) {
        for (let col = 0; col < gridDims.cols; col++) {
          const cellCenterX = col * cellSize + cellSize / 2;
          const cellCenterY = row * cellSize + cellSize / 2;

          let maxIntensity = 0;
          let dominantColor = { r: 106, g: 111, b: 255 };

          glowSources.forEach(source => {
            let intensity = 0;
            const dx = cellCenterX - source.x;
            const dy = cellCenterY - source.y;
            if (source.fullScreen) {
              const distance = Math.sqrt(dx ** 2 + dy ** 2);
              if (distance < source.radius) intensity = (1 - distance / source.radius) * source.intensity;
            } else {
              const distSq = dx ** 2 + dy ** 2;
              if (distSq < source.radius ** 2) intensity = (1 - Math.sqrt(distSq) / source.radius) * source.intensity;
            }
            const squared = intensity ** 2;
            if (squared > maxIntensity) {
              maxIntensity = squared;
              dominantColor = hexToRgb(source.color);
            }
          });

          newGlowData.set(`${row}-${col}`, { intensity: maxIntensity, color: dominantColor });
        }
      }
      setCellGlowData(newGlowData);
      rafId = requestAnimationFrame(updateCellGlows);
    };

    rafId = requestAnimationFrame(updateCellGlows);
    return () => cancelAnimationFrame(rafId);
  }, [glowSources, gridDims, cellSize, hexToRgb]);

  const gridContext: GridContextType = useMemo(() => ({
    registerGlow: (id, glow) => setGlowSources(prev => new Map(prev).set(id, { id, ...glow })),
    updateGlow: (id, updates) => setGlowSources(prev => {
      const map = new Map(prev);
      const existing = map.get(id);
      if (existing) map.set(id, { ...existing, ...updates });
      return map;
    }),
    unregisterGlow: (id) => setGlowSources(prev => {
      const map = new Map(prev);
      map.delete(id);
      return map;
    }),
    containerRef,
    gridBounds
  }), [gridBounds]);

  const cells = useMemo(() => {
    const result: { row: number; col: number; key: string }[] = [];
    for (let row = 0; row < gridDims.rows; row++) {
      for (let col = 0; col < gridDims.cols; col++) {
        result.push({ row, col, key: `${row}-${col}` });
      }
    }
    return result;
  }, [gridDims]);

  return (
    <GridContext.Provider value={gridContext}>
      <div className="w-full h-screen overflow-hidden flex items-center justify-center relative" style={{ backgroundColor: '#050812' }}>
        <div ref={containerRef} className="relative z-0" style={{ width: gridBounds.width, height: gridBounds.height }}>
          {cells.map(({ row, col, key }) => (
            <GridCell
              key={key}
              col={col}
              row={row}
              size={cellSize}
              borderWidth={2}
              glowData={cellGlowData.get(key) || { intensity: 0, color: { r: 106, g: 111, b: 255 } }}
            />
          ))}
        </div>
        <SmoothCursor />
        <BreathingButton />
        {children}
      </div>
    </GridContext.Provider>
  );
};

export default PrecisionGrid;
