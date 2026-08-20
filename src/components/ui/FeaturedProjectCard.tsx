"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
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
  external?: boolean;
  priority?: boolean;
  titleAs?: "h2" | "h3";
}

export function FeaturedProjectCard({
  item,
  className,
  external = true,
  priority = false,
  titleAs = "h3",
}: FeaturedProjectCardProps) {
  const TitleTag = titleAs;
  const { shellRef, mediaRef, handlePointerMove, handlePointerLeave } = useCardParallax({
    maxX: 10,
    maxY: 8,
  });

  const body = (
    <>
      <div
        ref={shellRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="project-card-media relative overflow-hidden rounded-2xl border border-fg/10 bg-fg/[0.03] transition-[border-color,transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:border-fg/25 group-hover:shadow-[0_20px_48px_rgba(0,0,0,0.12)] group-focus-within:-translate-y-1 group-focus-within:border-fg/25 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <div
            ref={mediaRef}
            className="absolute inset-0 will-change-transform transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] group-focus-within:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              priority={priority}
              className="object-cover object-top"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
        </div>

        <span
          className="absolute bottom-4 right-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-fg/15 bg-paper/90 text-ink backdrop-blur-sm transition-transform duration-500 group-hover:rotate-45 group-focus-within:rotate-45 sm:bottom-5 sm:right-5"
          aria-hidden="true"
        >
          <ArrowUpRightIcon />
        </span>
      </div>

      <div className="mt-6 px-0.5">
        <div className="flex items-start justify-between gap-6">
          <TitleTag className="font-heading text-2xl font-medium tracking-tight text-fg transition-colors duration-300 group-hover:text-accent md:text-[1.85rem]">
            {item.title}
          </TitleTag>
          <span className="hidden shrink-0 translate-y-1 text-sm tracking-wide text-fg/40 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:text-fg/70 group-hover:opacity-100 sm:inline-flex">
            {item.viewLabel}
          </span>
        </div>
        <p className="mt-3 max-w-md text-base leading-relaxed text-fg/55">
          {item.description}
        </p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Project tags">
          {(item.tags ?? []).map((tag, tagIndex) => (
            <li
              key={`${item.id}-${tagIndex}-${tag}`}
              className="rounded-full border border-fg/12 px-3 py-1 text-xs tracking-wide text-fg/65"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </>
  );

  return (
    <article className={cn("projects-animate group", className)}>
      <CardLink href={item.href} external={external}>
        {body}
      </CardLink>
    </article>
  );
}

function CardLink({
  href,
  external,
  children,
}: {
  href: string;
  external: boolean;
  children: ReactNode;
}): React.ReactElement {
  const className = "block focus-visible:outline-offset-4";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
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
