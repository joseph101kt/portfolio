// components/media/GameCardReveal.tsx
"use client";

import Image from "next/image";
import { JSX, useState } from "react";

interface GameCardRevealProps {
  readonly image: string;
}

export function GameCardReveal({
  image,
}: GameCardRevealProps): JSX.Element {
  const [revealed, setRevealed] = useState<boolean>(false);

  return (
    <div className="flex justify-center py-24">
      <button
        type="button"
        onClick={() => setRevealed(true)}
        className="relative h-80 w-56 perspective-[1000px]"
      >
        <div
          className={`
            relative h-full w-full transition-transform duration-700
            [transform-style:preserve-3d]
            ${revealed ? "rotate-y-180" : ""}
          `}
        >
          {/* Back */}
          <div className="absolute inset-0 backface-hidden rounded-xl bg-gradient-to-br from-purple-700 to-indigo-900" />

          {/* Front */}
          <div
            className={`
              absolute inset-0 backface-hidden rotate-y-180 rounded-xl overflow-hidden
              ${revealed ? "animate-[glow_2s_ease-in-out_infinite]" : ""}
            `}
          >
            <Image src={image} alt="Revealed card" fill className="object-cover" />
          </div>
        </div>
      </button>
    </div>
  );
}
