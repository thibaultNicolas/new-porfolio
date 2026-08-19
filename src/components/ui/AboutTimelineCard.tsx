"use client";

import { cn } from "@/lib/utils";
import { useCardParallax } from "@/lib/hooks/useCardParallax";

export interface AboutTimelineCardProps {
  period: string;
  title: string;
  role?: string;
  description: string;
  current?: boolean;
  className?: string;
}

export function AboutTimelineCard({
  period,
  title,
  role,
  description,
  current = false,
  className,
}: AboutTimelineCardProps) {
  const { shellRef, mediaRef, handlePointerMove, handlePointerLeave } = useCardParallax({
    maxX: 8,
    maxY: 6,
  });

  return (
    <li className={cn("about-timeline-item list-none", className)}>
      <article
        ref={shellRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className={cn(
          "about-timeline-card group relative overflow-hidden rounded-[1.5rem] border bg-white p-6 transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none md:p-8",
          current
            ? "border-accent/40 shadow-[0_24px_60px_rgba(196,92,56,0.14)]"
            : "border-line shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:border-ink/15 hover:shadow-[0_20px_48px_rgba(0,0,0,0.12)]",
        )}
      >
        <div
          ref={mediaRef}
          className="about-card-parallax pointer-events-none absolute inset-0"
          aria-hidden="true"
        >
          <div className="about-card-grid about-card-grid--light absolute inset-0 opacity-[0.35]" />
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-br via-transparent to-transparent transition-opacity duration-500",
              current
                ? "from-accent/[0.06] opacity-100"
                : "from-ink/[0.02] opacity-0 group-hover:opacity-100",
            )}
          />
          {current ? (
            <div
              className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/15 blur-3xl"
              aria-hidden="true"
            />
          ) : null}
        </div>

        <time
          dateTime={period}
          className="relative block text-sm tracking-wide text-stone"
        >
          {period}
        </time>

        <div className="relative mt-4 md:mt-5">
          <h3 className="font-heading text-xl font-medium tracking-tight text-ink md:text-2xl">
            {title}
          </h3>
          {role ? (
            <p className="mt-1.5 text-sm font-medium tracking-wide text-accent md:text-base">
              {role}
            </p>
          ) : null}
          <p className="mt-4 max-w-prose text-sm leading-relaxed text-stone md:text-base">
            {description}
          </p>
        </div>
      </article>
    </li>
  );
}
