"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Link } from "@/i18n/routing";
import {
  FeaturedProjectCard,
  type FeaturedProjectCardItem,
} from "@/components/ui/FeaturedProjectCard";
import { SectionKicker } from "@/components/ui/SectionKicker";

gsap.registerPlugin(ScrollTrigger);

export interface ProjectsCopy {
  badge: string;
  headline: ReactNode;
  intro: string;
  viewMore: string;
}

interface ProjectsMotionProps {
  items: FeaturedProjectCardItem[];
  copy: ProjectsCopy;
}

export function ProjectsMotion({ items, copy }: ProjectsMotionProps) {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      const headerItems = gsap.utils.toArray<HTMLElement>(".projects-header-animate", root);
      const cards = gsap.utils.toArray<HTMLElement>(".projects-animate", root);

      gsap.set(headerItems, { y: 24, autoAlpha: 0 });
      gsap.set(cards, { y: 72, opacity: 0 });

      gsap.to(headerItems, {
        y: 0,
        autoAlpha: 1,
        duration: 0.75,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root,
          start: "top 82%",
          once: true,
        },
      });

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 72, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              once: true,
            },
          },
        );
      });
    },
    { scope: rootRef },
  );

  return (
    <section
      id="work"
      ref={rootRef}
      className="section-dark-zone section-dark-zone--work relative py-24 md:py-32 lg:py-36"
    >
      <div className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <header className="projects-header-animate flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <SectionKicker label={copy.badge} index="03" className="projects-header-animate" />
            <h2 className="mt-4 font-heading text-4xl font-medium leading-[1.02] tracking-tight text-fg md:text-5xl lg:text-[3.35rem]">
              {copy.headline}
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fg/55 md:text-xl">
              {copy.intro}
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex min-h-11 shrink-0 items-center gap-2 self-start rounded-full border border-ink bg-ink px-5 py-3 text-sm tracking-wide text-paper transition-all duration-300 hover:bg-ink/90 hover:shadow-[0_12px_40px_rgba(0,0,0,0.25)] pill-ink lg:self-auto"
          >
            {copy.viewMore}
            <ArrowUpRightIcon />
          </Link>
        </header>

        <div className="mt-14 grid gap-x-8 gap-y-20 sm:grid-cols-2 lg:mt-20 lg:gap-x-12 lg:gap-y-24">
          {items.map((item, index) => (
            <FeaturedProjectCard
              key={item.id}
              item={item}
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
