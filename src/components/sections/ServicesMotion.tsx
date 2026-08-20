"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Link } from "@/i18n/routing";
import { ServicesBentoCard } from "@/components/ui/ServicesBentoCard";
import { getServiceAnchor } from "@/data/services";

gsap.registerPlugin(ScrollTrigger);

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  featured: boolean;
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
            <p className="services-intro-animate section-kicker">{copy.badge}</p>
            <h2 className="services-intro-animate section-title mt-5">
              {copy.headline}
            </h2>
            <p className="services-intro-animate section-intro mt-6">
              {copy.intro}
            </p>
            <Link
              href="/#contact"
              className="services-intro-animate cta-secondary group mt-10"
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
                href={`/services#${getServiceAnchor(item.id)}`}
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
