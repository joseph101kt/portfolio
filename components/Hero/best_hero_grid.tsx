"use client";
import React, { useState, useEffect, useRef, useMemo, createContext, useContext } from 'react';

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
  if (!context) throw new Error('useGrid must be used within LayeredGrid');
  return context;
};

const easeInOutSine = (x: number): number => -(Math.cos(Math.PI * x) - 1) / 2;

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? { 
    r: parseInt(result[1], 16), 
    g: parseInt(result[2], 16), 
    b: parseInt(result[3], 16) 
  } : { r: 106, g: 111, b: 255 };
};

const CircleGlow: React.FC<{ source: GlowSource }> = ({ source }) => {
  const rgb = hexToRgb(source.color);
  const size = source.radius * 2;
  
  return (
    <div
      style={{
        position: 'absolute',
        left: source.x - source.radius,
        top: source.y - source.radius,
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${0.6 * source.intensity}) 0%, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${0.3 * source.intensity}) 30%, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${0.1 * source.intensity}) 60%, transparent 100%)`,
        filter: 'blur(20px)',
        pointerEvents: 'none',
        mixBlendMode: 'screen',
        zIndex: 1,
      }}
    />
  );
};

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
      const DURATION = 3;
      const cycle = (time % DURATION) / DURATION;
      const eased = Math.sin(cycle * Math.PI);
      
      const minRadius = 100;
      const maxRadius = 220;
      const radius = minRadius + eased * (maxRadius - minRadius);
      
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
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-8 py-4 bg-gray-900 bg-opacity-50 backdrop-blur-sm text-white font-medium rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
      style={{ zIndex: 100 }}
    >
      Click for Explosion
    </button>
  );
};

const SmoothCursor: React.FC = () => {
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });
  const [outerPos, setOuterPos] = useState({ x: 0, y: 0 });
  const [innerPos, setInnerPos] = useState({ x: 0, y: 0 });
  const { registerGlow, updateGlow, unregisterGlow, containerRef } = useGrid();
  const outerGlowId = 'smooth-cursor-outer';
  const innerGlowId = 'smooth-cursor-inner';
  const outerLerpFactor = 0.25;
  const innerLerpFactor = 0.5;

  useEffect(() => {
    registerGlow(outerGlowId, { x: 0, y: 0, color: '#6A6FFF', radius: 250, intensity: 1 });
    registerGlow(innerGlowId, { x: 0, y: 0, color: '#6A6FFF', radius: 60, intensity: 2 });
    return () => {
      unregisterGlow(outerGlowId);
      unregisterGlow(innerGlowId);
    };
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
      setOuterPos(prev => ({
        x: prev.x + (targetPos.x - prev.x) * outerLerpFactor,
        y: prev.y + (targetPos.y - prev.y) * outerLerpFactor
      }));
      setInnerPos(prev => ({
        x: prev.x + (targetPos.x - prev.x) * innerLerpFactor,
        y: prev.y + (targetPos.y - prev.y) * innerLerpFactor
      }));
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [targetPos]);

  useEffect(() => {
    updateGlow(outerGlowId, { x: outerPos.x, y: outerPos.y });
  }, [outerPos, updateGlow]);

  useEffect(() => {
    updateGlow(innerGlowId, { x: innerPos.x, y: innerPos.y });
  }, [innerPos, updateGlow]);

  return null;
};

const GlowLayer: React.FC<{ glowSources: Map<string, GlowSource> }> = ({ glowSources }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full" style={{ zIndex: 1 }}>
      {Array.from(glowSources.values()).map(source => (
        <CircleGlow key={source.id} source={source} />
      ))}
    </div>
  );
};

const StaticGrid: React.FC<{ rows: number; cols: number; cellSize: number }> = ({ rows, cols, cellSize }) => {
  const gridStyle = useMemo(() => ({
    display: 'grid',
    gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
    gap: '2px',
    pointerEvents: 'none' as const,
    zIndex: 10,
    position: 'relative' as const,
  }), [rows, cols, cellSize]);

  const cells = useMemo(() => {
    return Array.from({ length: rows * cols }, (_, i) => i);
  }, [rows, cols]);

  return (
    <div className="absolute top-0 left-0" style={gridStyle}>
      {cells.map(i => (
        <div
          key={i}
          style={{
            backgroundColor: 'rgba(5, 8, 18, 1)',
          }}
        />
      ))}
    </div>
  );
};

interface LayeredGridProps {
  children?: React.ReactNode;
  cellSize?: number;
}

const LayeredGrid: React.FC<LayeredGridProps> = ({ children, cellSize = 50 }) => {
  const [glowSources, setGlowSources] = useState<Map<string, GlowSource>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);
  const [gridDims, setGridDims] = useState({ rows: 20, cols: 20 });

  useEffect(() => {
    const updateGridDims = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setGridDims({ 
        cols: Math.ceil(width / cellSize), 
        rows: Math.ceil(height / cellSize) 
      });
    };
    updateGridDims();
    window.addEventListener('resize', updateGridDims);
    return () => window.removeEventListener('resize', updateGridDims);
  }, [cellSize]);

  const gridBounds = useMemo(() => ({
    width: gridDims.cols * cellSize,
    height: gridDims.rows * cellSize
  }), [gridDims, cellSize]);

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

  return (
    <GridContext.Provider value={gridContext}>
      <div 
        className="w-full h-screen overflow-hidden relative" 
        style={{ backgroundColor: '#1A2138B3' }}
      >
        <div 
          ref={containerRef} 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{ 
            width: gridBounds.width, 
            height: gridBounds.height,
            position: 'relative'
          }}
        >
          {/* Layer 2: Circle Glows */}
          <GlowLayer glowSources={glowSources} />
          
          {/* Layer 3: Static Grid Overlay */}
          <StaticGrid 
            rows={gridDims.rows} 
            cols={gridDims.cols} 
            cellSize={cellSize} 
          />
        </div>

        <SmoothCursor />
        <BreathingButton />
        {children}
      </div>
    </GridContext.Provider>
  );
};

export default LayeredGrid;