"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Link } from "@/i18n/routing";
import { ServicesBentoCard } from "@/components/ui/ServicesBentoCard";
import { SectionKicker } from "@/components/ui/SectionKicker";

gsap.registerPlugin(ScrollTrigger);

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  featured: boolean;
  accent: string;
}

export interface ServicesCopy {
  badge: string;
  headline: ReactNode;
  intro: string;
  cta: string;
  items: ServiceItem[];
}

export function ServicesMotion({ copy }: { copy: ServicesCopy }) {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      const introItems = gsap.utils.toArray<HTMLElement>(".services-intro-animate", root);
      const cards = gsap.utils.toArray<HTMLElement>(".services-card-animate", root);

      gsap.set(introItems, { y: 32, autoAlpha: 0 });
      gsap.set(cards, { y: 56, opacity: 0, scale: 0.94 });

      gsap.to(introItems, {
        y: 0,
        autoAlpha: 1,
        duration: 0.85,
        stagger: 0.11,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root,
          start: "top 80%",
          once: true,
        },
      });

      cards.forEach((card) => {
        gsap.to(card, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 92%",
            once: true,
          },
        });
      });
    },
    { scope: rootRef },
  );

  return (
    <section
      id="services"
      ref={rootRef}
      className="section-dark-zone section-dark-zone--services relative py-24 md:py-32 lg:py-36"
    >
      <div className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16 xl:gap-20">
          <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
            <SectionKicker label={copy.badge} index="02" className="services-intro-animate" />
            <h2 className="services-intro-animate mt-6 font-heading text-4xl font-medium leading-[1.04] tracking-tight text-fg md:text-[2.75rem] lg:text-[3rem]">
              {copy.headline}
            </h2>
            <p className="services-intro-animate mt-6 max-w-md text-lg leading-relaxed text-fg/55 md:text-xl">
              {copy.intro}
            </p>
            <Link
              href="/#contact"
              className="services-intro-animate services-cta pill-ink group mt-10 inline-flex min-h-11 items-center gap-2.5 rounded-full border border-fg/20 bg-fg/[0.06] px-7 py-3 text-sm font-medium tracking-wide text-fg transition-all duration-500 hover:border-[#ff9a4a]/45 hover:bg-[color-mix(in_oklab,var(--color-ink)_70%,#ff9a4a)] hover:shadow-[0_20px_50px_rgba(255,154,74,0.22)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg"
            >
              {copy.cta}
              <span className="inline-flex transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRightIcon />
              </span>
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:col-span-7">
            {copy.items.map((item) => (
              <ServicesBentoCard
                key={item.id}
                title={item.title}
                description={item.description}
                accent={item.accent}
                featured={item.featured}
                className="services-card-animate"
              />
            ))}
          </div>
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
