"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { SectionKicker } from "@/components/ui/SectionKicker";
import { StackOrbit } from "@/components/ui/StackOrbit";

gsap.registerPlugin(ScrollTrigger);

export interface ToolsServicesCopy {
  badge: string;
  headline: ReactNode;
  intro: string;
  centerLabel: string;
  toolLabels: string[];
  services: Array<{
    id: string;
    title: string;
    description: string;
  }>;
}

export function ToolsServicesMotion({ copy }: { copy: ToolsServicesCopy }) {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      const items = gsap.utils.toArray<HTMLElement>(".tools-animate", root);
      const cards = gsap.utils.toArray<HTMLElement>(".tools-service-card", root);

      gsap.set(items, { y: 24, autoAlpha: 0 });
      gsap.set(cards, { y: 28, autoAlpha: 0 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 80%",
          once: true,
        },
      });

      timeline
        .to(items, {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
        })
        .to(
          cards,
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.65,
            stagger: 0.07,
            ease: "power3.out",
          },
          "-=0.45",
        );
    },
    { scope: rootRef },
  );

  return (
    <section
      id="stack"
      ref={rootRef}
      className="border-t border-line bg-paper py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionKicker
              label={copy.badge}
              variant="paper"
              className="tools-animate"
            />
            <h2 className="tools-animate mt-6 max-w-xl font-heading text-4xl font-medium leading-[1.08] tracking-tight text-ink md:text-5xl lg:text-[3.25rem]">
              {copy.headline}
            </h2>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12">
              {copy.services.map((service, index) => (
                <ServiceCard
                  key={service.id}
                  index={index + 1}
                  title={service.title}
                  description={service.description}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between gap-10 lg:col-span-5 lg:py-2">
            <p className="tools-animate max-w-md text-lg leading-relaxed text-stone md:text-xl">
              {copy.intro}
            </p>
            <div className="tools-animate pb-8 md:pb-10">
              <StackOrbit centerLabel={copy.centerLabel} toolLabels={copy.toolLabels} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
