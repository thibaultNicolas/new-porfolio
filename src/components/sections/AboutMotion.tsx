"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Link } from "@/i18n/routing";
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
  viewMore: string;
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
          <p className="section-kicker">{copy.badge}</p>
          <div className="mt-5 grid gap-6 lg:grid-cols-12 lg:items-start lg:gap-12">
            <h2 className="section-title lg:col-span-7">
              {copy.headline}
            </h2>
            <p className="section-intro md:text-lg lg:col-span-5 lg:justify-self-end lg:text-right">
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

        <div className="about-intro-animate mt-10">
          <Link href="/about" className="cta-secondary">
            {copy.viewMore}
            <ArrowUpRightIcon />
          </Link>
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
