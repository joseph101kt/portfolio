/* =========================
   Canvas Grid
========================= */

import { useRef, useEffect } from "react";
import { useTheme } from "./HeroThemeContext"; 

const CanvasGrid: React.FC<{ rows: number; cols: number; size: number }> = ({
  rows,
  cols,
  size,
}) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const theme = useTheme();
  const borderRadius = 0 // use 0 for dev mode
  const gap = 2 // use 2 for dev mode

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 1. Set canvas dimensions
    canvas.width = cols * size;
    canvas.height = rows * size;

    // 2. Clear the canvas completely (Transparent)
    // We keep this transparent so your "background" property 
    // and glows show through the 2px gaps.
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 3. Apply the gridCell color from the palette
    ctx.fillStyle = theme.gridCell;
    
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        // Draw the tiles with the specific cell color
        // The '- 2' creates the transparent gap/mesh
        ctx.roundRect(x * size, y * size, size - gap, size - gap, borderRadius);
        ctx.fill();
      }
    }
    // Added theme.gridCell to dependency array to ensure 
    // it updates when switching between 'purple' and 'emerald'
  }, [rows, cols, size, theme.gridCell]); 

  return <canvas ref={ref} className="absolute inset-0 pointer-events-none" />;
};

export default CanvasGrid;