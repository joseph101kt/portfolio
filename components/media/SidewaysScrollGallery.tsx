"use client";

import React, { useState } from "react";

const CARD_WIDTH = 180;
const CARD_HEIGHT = 270;
const CARD_SPACING = 200;
const MAX_VISIBLE_OFFSET = 2;
const OUTSIDE_X = 480;
const GALLERY_HEIGHT = 420;

interface Props {
  readonly images: readonly string[];
}

export function SidewaysScrollGallery({ images }: Props) {
  const [centerIndex, setCenterIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);

  /* =========================================================
     Navigation
  ========================================================== */

  const handlePrev = () => startAnimation(centerIndex === 0 ? images.length - 1 : centerIndex - 1);
  const handleNext = () => startAnimation(centerIndex === images.length - 1 ? 0 : centerIndex + 1);

  const startAnimation = (targetIndex: number) => {
    if (isAnimating || targetIndex === centerIndex) return;
    setIsAnimating(true);

    const steps = Math.min(
      (targetIndex - centerIndex + images.length) % images.length,
      (centerIndex - targetIndex + images.length) % images.length
    );
    const direction = (targetIndex - centerIndex + images.length) % images.length <=
      (centerIndex - targetIndex + images.length) % images.length
      ? "next"
      : "prev";

    let done = 0;
    const id = window.setInterval(() => {
      setCenterIndex((prev) =>
        direction === "next"
          ? prev === images.length - 1
            ? 0
            : prev + 1
          : prev === 0
          ? images.length - 1
          : prev - 1
      );
      done++;
      if (done >= steps) {
        clearInterval(id);
        setIsAnimating(false);
      }
    }, 350);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (index !== centerIndex) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    });
    setHoveredIndex(index);
  };

  /* =========================================================
     Render
  ========================================================== */

  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <div className="relative w-full max-w-7xl overflow-hidden" style={{ height: GALLERY_HEIGHT }}>
        <div className="flex items-center justify-center h-full" style={{ perspective: "2000px" }}>
          {images.map((src, index) => {
            const offsetRaw = index - centerIndex;
            const half = Math.floor(images.length / 2);
            const adjusted = offsetRaw > half ? offsetRaw - images.length : offsetRaw < -half ? offsetRaw + images.length : offsetRaw;

            const isCenter = index === centerIndex;
            const isHovered = hoveredIndex === index;
            const isVisible = Math.abs(adjusted) <= MAX_VISIBLE_OFFSET;

            // 🔑 Entry/Exit logic:
            let translateX: number;
            if (isVisible) {
              translateX = adjusted * CARD_SPACING; // center + neighbors
            } else {
              // spawn outside toward nearest edge relative to center
              translateX = adjusted > 0 ? OUTSIDE_X : -OUTSIDE_X;
            }

            return (
              <div
                key={index}
                onClick={() => startAnimation(index)}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="absolute cursor-pointer"
                style={{
                  width: CARD_WIDTH,
                  height: CARD_HEIGHT,
                  transform: `
                    translateX(${translateX}px)
                    translateZ(${isCenter ? 60 : 0}px)
                    scale(${isCenter ? 1.1 : 0.75})
                  `,
                  opacity: isVisible ? (isCenter ? 1 : 0.6) : 0,
                  zIndex: isCenter ? 10 : 5 - Math.abs(adjusted),
                  pointerEvents: isVisible ? "auto" : "none",
                  willChange: "transform, opacity",
                  transition: `
                    transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                    opacity 0.6s ease
                  `,
                }}
              >
                <div
                  className={isCenter && !isHovered ? "idle-rotation" : ""}
                  style={{
                    width: "100%",
                    height: "100%",
                    transform: `
                      rotateX(${isCenter && isHovered ? mousePos.y * 25 : 0}deg)
                      rotateY(${isCenter && isHovered ? -mousePos.x * 25 : 0}deg)
                      translateZ(${isCenter && isHovered ? -60 : 0}px)
                    `,
                    transition: isCenter && isHovered ? "transform 0.1s ease-out" : "none",
                  }}
                >
                  <img
                    src={src}
                    draggable={false}
                    className="w-full h-full object-cover rounded-2xl shadow-2xl"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <button
          onClick={handlePrev}
          className="absolute left-6 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/20 opacity-40 hover:opacity-80 z-20"
        >
          ◀
        </button>

        <button
          onClick={handleNext}
          className="absolute right-6 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/20 opacity-40 hover:opacity-80 z-20"
        >
          ▶
        </button>
      </div>

      <style>{`
        @keyframes idle-rotation {
          0%, 100% {
            transform: rotateY(8deg) rotateZ(3deg);
          }
          50% {
            transform: rotateY(3deg) rotateZ(0deg);
          }
        }

        .idle-rotation {
          animation: idle-rotation 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
