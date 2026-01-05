"use client";

import Image from "next/image";
import { useState, useRef } from "react";

interface GameCardRevealSequenceProps {
  readonly images: readonly string[];
  readonly finalImage: string;
  readonly turns?: number;
  readonly totalDurationMs?: number;
}

export function GameCardRevealSequence({
  images,
  finalImage,
  turns = 10,
  totalDurationMs = 3000,
}: GameCardRevealSequenceProps) {
  const [currentImage, setCurrentImage] = useState(images[0]);
  const [rotation, setRotation] = useState(0);
  const [rolling, setRolling] = useState(false);
  const [hasFlipped, setHasFlipped] = useState(false);

  const sequenceRef = useRef<string[]>([]);
  const nextSwapRef = useRef(90); // First swap at 90°
  const currentIndexRef = useRef(0); // Tracks current image index
  const startTimeRef = useRef<number | null>(null);
  const requestRef = useRef<number>(0);

  const handleClick = () => {
    if (rolling || hasFlipped) return; // Only allow once
    setRolling(true);
    setHasFlipped(true);
    currentIndexRef.current = 0;
    nextSwapRef.current = 90;
    startTimeRef.current = null;

    // Build the sequence: first image + random images + final image
    const seq = [
      images[0],
      ...Array.from({ length: turns - 1 }, () =>
        images[Math.floor(Math.random() * images.length)]
      ),
      finalImage,
    ];
    sequenceRef.current = seq;

    setCurrentImage(seq[0]);
    setRotation(0);

    const animate = (time: number) => {
      if (!startTimeRef.current) startTimeRef.current = time;
      const elapsed = time - startTimeRef.current;
      const t = Math.min(elapsed / totalDurationMs, 1);

      // Smooth slot-machine easing
      const eased =
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      // Subtle scale effect
      const scale = 1 + Math.sin(Math.min(eased * Math.PI, Math.PI / 2) * 0.05);

      // Total rotation in degrees
      const totalRotation = eased * (turns + 1) * 180;
      setRotation(totalRotation);

      // Swap image when totalRotation reaches nextSwapRotation
      if (
        totalRotation >= nextSwapRef.current &&
        currentIndexRef.current < sequenceRef.current.length - 1
      ) {
        currentIndexRef.current += 1;
        setCurrentImage(sequenceRef.current[currentIndexRef.current]);
        nextSwapRef.current += 180; // Next swap after 180°
      }

      // Continue animation or finish
      if (t < 1) {
        requestRef.current = requestAnimationFrame(animate);
      } else {
        setRotation(180 * (turns + 1));
        setCurrentImage(sequenceRef.current[sequenceRef.current.length - 1]);
        setRolling(false);
        cancelAnimationFrame(requestRef.current!);
      }

      // Apply rotation + scale transform
      const cardDiv = document.getElementById("game-card");
      if (cardDiv) {
        cardDiv.style.transform = `rotateY(${totalRotation}deg) scale(${scale})`;
      }
    };

    requestRef.current = requestAnimationFrame(animate);
  };

  return (
    <div className="flex justify-center py-24">
      <button
        type="button"
        onClick={handleClick}
        className="relative h-80 w-56 perspective-[1200px]"
      >
        <div
          id="game-card"
          className="relative h-full w-full rounded-xl overflow-hidden transition-transform duration-75 [transform-style:preserve-3d]"
          style={{ transform: `rotateY(${rotation}deg) scale(1)` }}
        >
          <Image
            src={currentImage}
            alt="Card"
            fill
            className="object-cover rounded-xl"
          />
        </div>
      </button>
    </div>
  );
}
