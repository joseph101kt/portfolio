"use client";

import React, { JSX, useMemo, useSyncExternalStore } from "react";

/* =========================
   Types
========================= */

interface GridDimensions {
  readonly rows: number;
  readonly cols: number;
}

interface WindowSize {
  readonly width: number;
  readonly height: number;
}

interface ResponsiveGridProps {
  readonly rows?: number;
  readonly cols?: number;
  readonly cellSize?: number;
  readonly gap?: number;
  readonly zIndex?: number;
  readonly children?: React.ReactNode;
}

/* =========================
   Window size store (cached)
========================= */

let cachedSnapshot: WindowSize | null = null;

function getSnapshot(): WindowSize {
  const width = window.innerWidth;
  const height = window.innerHeight;

  if (
    cachedSnapshot &&
    cachedSnapshot.width === width &&
    cachedSnapshot.height === height
  ) {
    return cachedSnapshot;
  }

  cachedSnapshot = { width, height };
  return cachedSnapshot;
}

function getServerSnapshot(): WindowSize {
  return { width: 0, height: 0 };
}

function subscribe(callback: () => void): () => void {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

/* =========================
   Component
========================= */

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  rows,
  cols,
  cellSize = 50,
  gap = 2,
  zIndex = 20,
  children,
}) => {
  const { width, height } = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  /* -------------------------
     Derive grid dimensions
     (pure calculation)
  ------------------------- */
  const dims: GridDimensions = useMemo(() => {
    if (rows !== undefined && cols !== undefined) {
      return { rows, cols };
    }

    const computedCols = Math.min(Math.ceil(width / cellSize), 32);
    const computedRows = Math.min(Math.ceil(height / cellSize), 18);

    return {
      cols: cols ?? computedCols,
      rows: rows ?? computedRows,
    };
  }, [rows, cols, width, height, cellSize]);

  /* -------------------------
     Precompute cells
  ------------------------- */
  const cells = useMemo<JSX.Element[]>(() => {
    const total = dims.rows * dims.cols;

    return Array.from({ length: total }, (_, index) => (
      <div
        key={index}
        style={{
          width: cellSize,
          height: cellSize,
          backgroundColor: "rgb(5, 8, 18)",
        }}
      />
    ));
  }, [dims, cellSize]);

  /* -------------------------
     Render
  ------------------------- */
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex,
        display: "grid",
        gridTemplateColumns: `repeat(${dims.cols}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${dims.rows}, ${cellSize}px)`,
        gap: `${gap}px`,
        padding: `${gap}px`,
        backgroundColor: "#1A2138B3",
        boxSizing: "border-box",
      }}
    >
      {cells}
      {children}
    </div>
  );
};