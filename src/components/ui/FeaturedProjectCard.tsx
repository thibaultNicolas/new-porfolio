"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useCardParallax } from "@/lib/hooks/useCardParallax";

export interface FeaturedProjectCardItem {
  id: string;
  title: string;
  href: string;
  image: string;
  description: string;
  tags: string[];
  viewLabel: string;
}

interface FeaturedProjectCardProps {
  item: FeaturedProjectCardItem;
  className?: string;
}

export function FeaturedProjectCard({ item, className }: FeaturedProjectCardProps) {
  const { shellRef, mediaRef, handlePointerMove, handlePointerLeave } = useCardParallax();

  return (
    <article className={cn("projects-animate group", className)}>
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="block focus-visible:outline-offset-4"
      >
        <div
          ref={shellRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="project-card-shell project-card-shell-interactive relative overflow-hidden rounded-[28px] px-4 pt-4 pb-0 sm:px-5 sm:pt-5 md:px-6 md:pt-6"
        >
          <div
            className="project-card-grid pointer-events-none absolute inset-0 opacity-60"
            aria-hidden="true"
          />
          <div
            className="project-card-shell-shade pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-paper/[0.04]"
            aria-hidden="true"
          />
          <div
            className="project-card-hover-glow pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100"
            aria-hidden="true"
          />

          <div className="project-card-media-frame relative overflow-hidden rounded-t-2xl border border-b-0 border-paper/10 bg-[#f5f5f4] shadow-[0_28px_70px_rgba(0,0,0,0.42)]">
            <div className="relative aspect-[2/1] overflow-hidden">
              <div
                ref={mediaRef}
                className="absolute inset-0 will-change-transform transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] group-focus-within:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  priority
                  className="object-cover object-bottom"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>

          <span
            className="project-card-action pill-ink absolute bottom-5 right-5 inline-flex h-12 w-12 items-center justify-center rounded-full border border-paper/20 bg-paper/10 text-paper backdrop-blur-sm transition-all duration-500 group-hover:rotate-45 group-hover:border-paper/40 group-hover:bg-paper group-hover:text-ink group-focus-within:rotate-45 group-focus-within:border-paper/40 group-focus-within:bg-paper group-focus-within:text-ink sm:bottom-6 sm:right-6"
            aria-hidden="true"
          >
            <ArrowUpRightIcon />
          </span>
        </div>

        <div className="mt-7 px-1">
          <div className="flex items-start justify-between gap-6">
            <h3 className="font-heading text-2xl font-medium tracking-tight text-fg transition-colors duration-300 group-hover:text-accent md:text-[1.85rem]">
              {item.title}
            </h3>
            <span className="hidden shrink-0 translate-y-1 text-sm tracking-wide text-fg/45 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:text-fg group-hover:opacity-100 sm:inline-flex">
              {item.viewLabel}
            </span>
          </div>
          <p className="mt-3 max-w-md text-base leading-relaxed text-fg/55 transition-colors duration-300 group-hover:text-fg/72">
            {item.description}
          </p>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Project tags">
            {item.tags.map((tag, tagIndex) => (
              <li
                key={`${item.id}-${tagIndex}-${tag}`}
                className="pill-ink rounded-full border border-fg/10 bg-fg/[0.04] px-3 py-1 text-xs tracking-wide text-fg/70 transition-colors duration-300 group-hover:border-fg/20 group-hover:bg-fg/[0.07]"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </a>
    </article>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
      <path
        d="M4 12L12 4M12 4H6M12 4V10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
