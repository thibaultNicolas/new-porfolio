"use client";

import { useCallback, useRef } from "react";
import { gsap } from "gsap";

interface UseCardParallaxOptions {
  maxX?: number;
  maxY?: number;
}

export function useCardParallax({ maxX = 14, maxY = 10 }: UseCardParallaxOptions = {}) {
  const shellRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const shell = shellRef.current;
      const media = mediaRef.current;
      if (!shell || !media) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      const rect = shell.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      gsap.to(media, {
        x: x * maxX,
        y: y * maxY,
        duration: 0.45,
        ease: "power2.out",
      });
    },
    [maxX, maxY],
  );

  const handlePointerLeave = useCallback(() => {
    const media = mediaRef.current;
    if (!media) return;

    gsap.to(media, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  }, []);

  return {
    shellRef,
    mediaRef,
    handlePointerMove,
    handlePointerLeave,
  };
}
