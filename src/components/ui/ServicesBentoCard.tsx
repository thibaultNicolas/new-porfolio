"use client";

import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { useCardParallax } from "@/lib/hooks/useCardParallax";

interface ServicesBentoCardProps {
  title: string;
  description: string;
  href: string;
  featured?: boolean;
  className?: string;
}

export function ServicesBentoCard({
  title,
  description,
  href,
  featured = false,
  className,
}: ServicesBentoCardProps) {
  const locale = useLocale();
  const localizedHref = href.startsWith(`/${locale}`) ? href : `/${locale}${href}`;
  const { shellRef, mediaRef, handlePointerMove, handlePointerLeave } = useCardParallax({
    maxX: 10,
    maxY: 8,
  });

  return (
    <article className={cn("h-full", className)}>
      <a
        href={localizedHref}
        onClick={(event) => {
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
            return;
          }
          event.preventDefault();
          window.location.assign(localizedHref);
        }}
        className={cn(
          "block h-full rounded-[1.75rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4",
          featured ? "focus-visible:outline-paper" : "focus-visible:outline-fg",
        )}
      >
        <div
          ref={shellRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className={cn(
            "services-bento-card group relative flex h-full min-h-[18.5rem] flex-col justify-between overflow-hidden rounded-[1.75rem] p-7 transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none md:min-h-[21rem] md:p-8",
            featured
              ? "service-card-shell service-card-shell-interactive border border-paper/10 text-paper shadow-[0_28px_70px_rgba(0,0,0,0.45)]"
              : "services-card-glass border text-fg",
          )}
        >
          {featured ? (
            <>
              <div
                className="project-card-grid pointer-events-none absolute inset-0 opacity-50"
                aria-hidden="true"
              />
              <div
                className="service-card-hover-glow pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden="true"
              />
            </>
          ) : (
            <>
              <div
                className="services-card-accent-glow pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-fg/[0.04] via-transparent to-transparent"
                aria-hidden="true"
              />
            </>
          )}

          <div ref={mediaRef} className="relative will-change-transform">
            <span
              className={cn(
                "block h-px w-10 transition-[width,background-color] duration-500 group-hover:w-16",
                featured
                  ? "bg-paper/45 group-hover:bg-paper"
                  : "bg-fg/25 group-hover:bg-[var(--service-accent)]",
              )}
              aria-hidden="true"
            />
            <h3
              className={cn(
                "mt-8 max-w-[14ch] font-heading text-2xl font-medium leading-tight tracking-tight transition-colors duration-300 md:text-[1.7rem]",
                featured ? "group-hover:text-paper" : "group-hover:text-[var(--service-accent)]",
              )}
            >
              {title}
            </h3>
            <p
              className={cn(
                "mt-4 max-w-[28ch] text-sm leading-relaxed transition-colors duration-300 md:text-[15px]",
                featured
                  ? "text-paper/65 group-hover:text-paper/78"
                  : "text-fg/55 group-hover:text-fg/72",
              )}
            >
              {description}
            </p>
          </div>

          <span
            className={cn(
              "relative mt-8 inline-flex h-11 w-11 items-center justify-center self-end rounded-full border transition-all duration-500",
              featured
                ? "border-paper bg-paper text-ink group-hover:rotate-45 group-hover:border-paper group-hover:bg-paper/90 group-hover:text-ink"
                : "pill-ink border-fg/15 bg-fg/[0.04] text-fg/70 group-hover:rotate-45 group-hover:border-[color-mix(in_oklab,var(--service-accent)_45%,transparent)] group-hover:bg-[var(--service-accent)] group-hover:text-paper",
            )}
            aria-hidden="true"
          >
            <ArrowUpRightIcon />
          </span>
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
