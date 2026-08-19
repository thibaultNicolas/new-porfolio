"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { AboutExperienceRow } from "@/components/ui/AboutExperienceRow";

gsap.registerPlugin(ScrollTrigger);

export interface AboutExperienceItem {
  id: string;
  period: string;
  title: string;
  description: string;
  current?: boolean;
}

export interface AboutCopy {
  badge: string;
  headline: ReactNode;
  subtitle: string;
  experienceItems: AboutExperienceItem[];
}

export function AboutMotion({ copy }: { copy: AboutCopy }) {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      const introItems = gsap.utils.toArray<HTMLElement>(".about-intro-animate", root);
      const rows = gsap.utils.toArray<HTMLElement>(".about-experience-row", root);

      gsap.set(introItems, { y: 28, autoAlpha: 0 });
      gsap.set(rows, { y: 32, autoAlpha: 0 });

      gsap.to(introItems, {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root,
          start: "top 82%",
          once: true,
        },
      });

      rows.forEach((row) => {
        gsap.to(row, {
          y: 0,
          autoAlpha: 1,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 94%",
            once: true,
          },
        });
      });
    },
    { scope: rootRef },
  );

  return (
    <section
      id="about"
      ref={rootRef}
      className="section-dark-zone relative py-24 md:py-32 lg:py-36"
    >
      <div className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <header className="about-intro-animate">
          <span className="inline-flex rounded-full border border-fg/15 px-3.5 py-1 text-xs tracking-wide text-fg/70">
            {copy.badge}
          </span>

          <div className="mt-8 grid gap-6 lg:mt-10 lg:grid-cols-12 lg:gap-12 lg:items-start">
            <h2 className="font-heading text-4xl font-medium leading-[1.06] tracking-tight text-fg md:text-[2.75rem] lg:col-span-7 lg:text-[3.15rem]">
              {copy.headline}
            </h2>
            <p className="max-w-md text-base leading-relaxed text-fg/55 md:text-lg lg:col-span-5 lg:justify-self-end lg:text-right">
              {copy.subtitle}
            </p>
          </div>
        </header>

        <ol className="about-intro-animate mt-12 divide-y divide-fg/10 border-y border-fg/10 md:mt-16">
          {copy.experienceItems.map((item) => (
            <AboutExperienceRow
              key={item.id}
              period={item.period}
              title={item.title}
              description={item.description}
              current={item.current}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
