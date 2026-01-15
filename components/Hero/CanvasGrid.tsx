/* =========================
   Canvas Grid
========================= */

import { canvas } from "framer-motion/client";
import { useRef, useEffect } from "react";

const CanvasGrid: React.FC<{ rows: number; cols: number; size: number }> = ({
  rows,
  cols,
  size,
}) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = cols * size;
    canvas.height = rows * size;

    ctx.fillStyle = "rgba(5,8,18,1)";
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        ctx.fillRect(x * size, y * size, size - 2, size - 2);
      }
    }
  }, [rows, cols, size]);

  return <canvas ref={ref} className="absolute inset-0" />;
};

export default CanvasGrid;