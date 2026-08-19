"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function MagneticButton({ href, children, className }: MagneticButtonProps) {
  const rootRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3" });

    const onMove = (event: PointerEvent): void => {
      const rect = el.getBoundingClientRect();
      xTo((event.clientX - rect.left - rect.width / 2) * 0.3);
      yTo((event.clientY - rect.top - rect.height / 2) * 0.3);
    };

    const onLeave = (): void => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <a
      ref={rootRef}
      href={href}
      className={cn(
        "inline-flex h-36 w-36 shrink-0 items-center justify-center rounded-full bg-accent text-center text-sm leading-tight text-paper shadow-[0_0_0_1px_rgba(250,250,250,0.16)] transition-colors duration-300 will-change-transform hover:bg-paper hover:text-ink focus-visible:outline-offset-8",
        className,
      )}
    >
      {children}
    </a>
  );
}
