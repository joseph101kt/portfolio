import { useRef, useEffect } from "react";

// 1. Define the Prop type based on the function signature of useGrid
interface SmoothCursorProps {
  useGrid: () => {
    registerGlow: (id: string, config: { x: number; y: number; color: string; radius: number; intensity: number }) => void;
    updateGlow: (id: string, config: { x: number; y: number; intensity: number }) => void;
    unregisterGlow: (id: string) => void;
    containerRef: React.RefObject<HTMLElement | null>;
  };
}

const SmoothCursor: React.FC<SmoothCursorProps> = ({ useGrid }) => {
  // 2. Execute the passed-in hook prop
  const { registerGlow, updateGlow, unregisterGlow, containerRef } = useGrid();
  
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    registerGlow("cursor", { x: 0, y: 0, color: "#6A6FFF", radius: 200, intensity: 1 });
    return () => unregisterGlow("cursor");
  }, [registerGlow, unregisterGlow]);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const r = containerRef.current?.getBoundingClientRect();
      if (!r) return;
      target.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [containerRef]);

  useEffect(() => {
    let raf: number;
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.3;
      pos.current.y += (target.current.y - pos.current.y) * 0.3;

      updateGlow("cursor", {
        x: pos.current.x,
        y: pos.current.y,
        intensity: 1,
      });

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [updateGlow]);

  return null;
};

export default SmoothCursor;