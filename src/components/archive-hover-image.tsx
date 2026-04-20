"use client";

import { useState } from "react";
import type { MouseEvent } from "react";

type ArchiveHoverImageProps = {
  images: string[];
  className?: string;
};

export function ArchiveHoverImage({ images, className }: ArchiveHoverImageProps) {
  const safeImages = images.length > 0 ? images : ["/vercel.svg"];
  const [activeIndex, setActiveIndex] = useState(0);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const isLeft = x < rect.width / 2;
    const isTop = y < rect.height / 2;

    if (isTop && isLeft) setActiveIndex(0);
    else if (isTop && !isLeft) setActiveIndex(1);
    else if (!isTop && isLeft) setActiveIndex(2);
    else setActiveIndex(3);
  };

  return (
    <div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setActiveIndex(0)}
    >
      {safeImages.map((image, index) => (
        <div
          key={`${image}-${index}`}
          className={`premium-photo absolute inset-0 bg-cover bg-center transition-opacity duration-250 ${
            activeIndex === index ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
    </div>
  );
}
