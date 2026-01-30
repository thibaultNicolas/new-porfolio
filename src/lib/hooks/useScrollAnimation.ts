"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface UseScrollAnimationOptions {
  threshold?: number;
  triggerOnce?: boolean;
  delay?: number;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const { threshold = 0.1, triggerOnce = true, delay = 0 } = options;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: triggerOnce, amount: threshold });
  const delayedInView = useDelayedInView(isInView, delay);

  return {
    ref,
    isInView: delay > 0 ? delayedInView : isInView,
  };
}

function useDelayedInView(isInView: boolean, delay: number): boolean {
  const [delayedInView, setDelayedInView] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setDelayedInView(true), delay);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isInView, delay]);

  return delayedInView;
}
