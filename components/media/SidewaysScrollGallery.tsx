// components/media/SidewaysScrollGallery.tsx
"use client";

import Image from "next/image";
import { JSX, useState } from "react";

interface SidewaysScrollGalleryProps {
  readonly images: readonly string[];
}

export function SidewaysScrollGallery({
  images,
}: SidewaysScrollGalleryProps): JSX.Element {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <div className="relative w-full overflow-hidden py-16">
      <div className="flex items-center justify-center gap-8 perspective-[1200px]">
        {images.map((src, index) => {
          const isActive = index === activeIndex;
          const offset = index - activeIndex;

          return (
            <button
              key={src}
              type="button"
              onClick={() => setActiveIndex(index)}
              className="focus:outline-none"
            >
              <div
                className={`
                  relative h-72 w-52 transition-all duration-700 ease-[cubic-bezier(.25,.8,.25,1)]
                  ${isActive ? "scale-110 z-20" : "scale-90 opacity-70"}
                `}
                style={{
                  transform: `
                    translateX(${offset * 140}px)
                    rotateY(${offset * -18}deg)
                  `,
                }}
              >
                <Image
                  src={src}
                  alt="Gallery image"
                  fill
                  className="rounded-xl object-cover shadow-xl"
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
