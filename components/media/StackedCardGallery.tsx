"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface StackedCardGalleryProps {
  readonly images: readonly string[];
  readonly visibleCount?: number; // odd only
  readonly xSpacing?: number;
  readonly ySpacing?: number;
  readonly scaleStep?: number;
  readonly rotateStep?: number;
  readonly transitionDuration?: number;
}

export function StackedCardGallery({
  images,
  visibleCount = 7,
  xSpacing = 70,
  ySpacing = 24,
  scaleStep = 0.06,
  rotateStep = 6,
  transitionDuration = 600,
}: StackedCardGalleryProps) {
  if (visibleCount % 2 === 0) {
    throw new Error("visibleCount must be odd");
  }

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const half = Math.floor(visibleCount / 2);
  const queueRef = useRef<number[]>([]);
  const processQueue = useRef<(() => void) | null>(null);

  const circularIndex = (i: number) => (i + images.length) % images.length;

  // Easing function for smooth start/end
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  // Enqueue steps with smooth easing
  const enqueueStepsWithCurve = (steps: number[]) => {
    if (steps.length === 0) return;

    queueRef.current.push(...steps);
    setAnimating(true);

    if (processQueue.current) return;

    const totalSteps = steps.length;

    const runNextStep = (stepIndex = 0) => {
      const next = queueRef.current.shift();
      if (next != null) {
        setActiveIndex(next);

        // Eased duration: slower at start/end, faster in middle
        const t = stepIndex / (totalSteps - 1);
        const speedFactor = easeInOutCubic(t); // 0 -> 1
        const stepDuration = (transitionDuration/2) * (1 - 0.7 * speedFactor); // faster in middle

        processQueue.current = () =>
          setTimeout(() => runNextStep(stepIndex + 1), stepDuration);
        processQueue.current();
      } else {
        processQueue.current = null;
        setAnimating(false);
      }
    };

    runNextStep();
  };

  const goNext = () => enqueueStepsWithCurve([circularIndex(activeIndex + 1)]);
  const goPrev = () => enqueueStepsWithCurve([circularIndex(activeIndex - 1)]);

  const jumpTo = (targetIndex: number) => {
    if (animating || targetIndex === activeIndex) return;

    const forward = (targetIndex - activeIndex + images.length) % images.length;
    const backward = (activeIndex - targetIndex + images.length) % images.length;

    const direction = forward <= backward ? 1 : -1;
    const stepsCount = Math.min(forward, backward);

    const steps: number[] = [];
    let current = activeIndex;

    for (let i = 0; i < stepsCount; i++) {
      current = circularIndex(current + direction);
      steps.push(current);
    }

    enqueueStepsWithCurve(steps);
  };

  const visibleCards = Array.from({ length: visibleCount }, (_, i) => {
    const depth = i - half;
    const absDepth = Math.abs(depth);
    const index = circularIndex(activeIndex + depth);
    return { src: images[index], depth, absDepth, index };
  });

  const OUTER_EXTRA_X = 170;

  return (
    <div
      className="relative w-full h-[500px] flex justify-center items-start overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      {/* PREVIOUS */}
      <button
        onClick={goPrev}
        aria-label="Previous"
        className="absolute left-6 top-1/2 -translate-y-1/2 z-[200] p-2 hover:scale-110 active:scale-95 transition"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white drop-shadow-lg">
          <path d="M15.5 3.5L7.5 12L15.5 20.5Q16.2 21.2 17 20.6Q17.8 20 17.2 19.2L10.8 12L17.2 4.8Q17.8 4 17 3.4Q16.2 2.8 15.5 3.5Z" />
        </svg>
      </button>

      {/* NEXT */}
      <button
        onClick={goNext}
        aria-label="Next"
        className="absolute right-6 top-1/2 -translate-y-1/2 z-[200] p-2 hover:scale-110 active:scale-95 transition"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white drop-shadow-lg">
          <path d="M8.5 3.5Q7.8 2.8 7 3.4Q6.2 4 6.8 4.8L13.2 12L6.8 19.2Q6.2 20 7 20.6Q7.8 21.2 8.5 20.5L16.5 12Z" />
        </svg>
      </button>

      {visibleCards.map(({ src, depth, absDepth, index }) => {
        const isCenter = depth === 0;

        const scale = isCenter ? 1.13 : Math.max(0.72, 1 - absDepth * scaleStep);

        const falloff = 0.8;
        const easedDepth = Math.sign(depth) * Math.pow(absDepth, falloff);

        let translateX = easedDepth * xSpacing;
        if (!isCenter) translateX += Math.sign(depth) * OUTER_EXTRA_X;

        let translateY = absDepth * ySpacing;
        if (isCenter) translateY -= 50;
        translateY += 140;

        const rotate = depth * rotateStep;
        const translateZ = isCenter ? 120 : -absDepth * 60;

        return (
          <button
            key={index}
            onClick={() => jumpTo(index)}
            className="absolute focus:outline-none"
            style={{
              zIndex: 100 - absDepth,
              transform: `
                translateX(${translateX}px)
                translateY(${translateY}px)
                translateZ(${translateZ}px)
                rotate(${rotate}deg)
                scale(${scale})
              `,
              transition: `transform ${transitionDuration / 2}ms cubic-bezier(0.16, 1, 0.3, 1)`,
              willChange: "transform",
              backfaceVisibility: "hidden",
            }}
          >
            <div className="relative w-[208px] h-[288px] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src={src}
                alt={`Card ${index}`}
                fill
                sizes="208px"
                className="object-cover"
                priority={isCenter}
              />
            </div>
          </button>
        );
      })}
    </div>
  );
}
