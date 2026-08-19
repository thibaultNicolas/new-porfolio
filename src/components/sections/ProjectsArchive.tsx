"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from "@/i18n/routing";
import { ProjectCard, type ProjectCardItem } from "@/components/ui/ProjectCard";
import { SectionKicker } from "@/components/ui/SectionKicker";

export interface ProjectsArchiveCopy {
  badge: string;
  headline: ReactNode;
  intro: string;
  backLabel: string;
}

interface ProjectsArchiveProps {
  items: ProjectCardItem[];
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
      ref={rootRef}
      className="border-t border-line bg-paper pb-24 pt-28 md:pb-32 md:pt-36"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <header className="mx-auto max-w-2xl text-center">
          <SectionKicker
            label={copy.badge}
            variant="paper"
            align="center"
            className="projects-header-animate"
          />
          <h1 className="projects-header-animate mt-6 font-heading text-4xl font-medium leading-[1.08] tracking-tight text-ink md:text-5xl lg:text-[3.25rem]">
            {copy.headline}
          </h1>
          <p className="projects-header-animate mt-5 text-lg leading-relaxed text-stone md:text-xl">
            {copy.intro}
          </p>
        </header>

        <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 md:mt-16 lg:gap-x-10 lg:gap-y-14">
          {items.map((item) => (
            <ProjectCard key={item.id} item={item} external={false} />
          ))}
        </div>

        <div className="projects-header-animate mt-14 text-center md:mt-16">
          <Link
            href="/"
            className="nav-link inline-flex rounded-full border border-line px-6 py-3 text-sm tracking-wide text-ink transition-colors duration-300 hover:border-ink hover:text-accent"
          >
            {copy.backLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
