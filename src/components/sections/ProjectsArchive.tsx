"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from "@/i18n/routing";
import {
  FeaturedProjectCard,
  type FeaturedProjectCardItem,
} from "@/components/ui/FeaturedProjectCard";

export interface ProjectsArchiveCopy {
  badge: string;
  headline: ReactNode;
  intro: string;
  backLabel: string;
}

interface ProjectsArchiveProps {
  items: FeaturedProjectCardItem[];
  copy: ProjectsArchiveCopy;
}

export function ProjectsArchive({ items, copy }: ProjectsArchiveProps) {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      const headerItems = gsap.utils.toArray<HTMLElement>(".projects-header-animate", root);
      const cards = gsap.utils.toArray<HTMLElement>(".projects-animate", root);

      gsap
        .timeline()
        .from(headerItems, {
          y: 24,
          autoAlpha: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
        })
        .from(
          cards,
          {
            y: 28,
            autoAlpha: 0,
            duration: 0.65,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.45",
        );
    },
    { scope: rootRef },
  );

  return (
    <section
      id="projects-archive"
      ref={rootRef}
      className="section-dark-zone relative pb-24 pt-28 md:pb-32 md:pt-32 lg:pb-36 lg:pt-40"
    >
      <div className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <header className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="projects-header-animate section-kicker">{copy.badge}</p>
            <h1 className="projects-header-animate section-title mt-5">{copy.headline}</h1>
            <p className="projects-header-animate section-intro mt-5">{copy.intro}</p>
          </div>

          <Link
            href="/"
            className="projects-header-animate cta-secondary shrink-0 self-start lg:self-auto"
          >
            {copy.backLabel}
            <ArrowUpRightIcon />
          </Link>
        </header>

        <div className="mt-14 grid gap-x-8 gap-y-20 sm:grid-cols-2 lg:mt-20 lg:gap-x-12 lg:gap-y-24">
          {items.map((item, index) => (
            <FeaturedProjectCard
              key={item.id}
              item={item}
              external={false}
              priority={index < 2}
              titleAs="h2"
              className={index % 2 === 1 ? "md:mt-16 lg:mt-24" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
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
