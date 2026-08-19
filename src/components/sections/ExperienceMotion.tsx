"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { SectionKicker } from "@/components/ui/SectionKicker";

gsap.registerPlugin(ScrollTrigger);

export interface ExperienceTimelineItem {
  id: string;
  period: string;
  roleTitle: string;
  summary: string;
}

export interface ExperienceCopy {
  badge: string;
  headline: ReactNode;
  intro: string;
  quote: string;
  quoteImageAlt: string;
  timeline: ExperienceTimelineItem[];
}

function QuoteMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 28"
      className={cn("h-7 w-7 shrink-0 text-paper/90", className)}
      fill="currentColor"
    >
      <path d="M0 28V16.8C0 11.2 1.1 6.7 3.3 3.3 5.6-.1 9.3-1.3 14.4-1.3v5.6c-3.2 0-5.5.8-6.9 2.4-1.3 1.5-2 3.7-2 6.6h5.5V28H0Zm17.6 0V16.8c0-5.6 1.1-10.1 3.3-13.5C23.2-.1 26.9-1.3 32-1.3v5.6c-3.2 0-5.5.8-6.9 2.4-1.3 1.5-2 3.7-2 6.6h5.5V28h-6.9Z" />
    </svg>
  );
}

export function ExperienceMotion({ copy }: { copy: ExperienceCopy }) {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      const items = gsap.utils.toArray<HTMLElement>(".experience-animate", root);
      const timelineItems = gsap.utils.toArray<HTMLElement>(
        ".experience-timeline-item",
        root,
      );

      gsap.set(items, { y: 24, autoAlpha: 0 });
      gsap.set(timelineItems, { x: 16, autoAlpha: 0 });

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
          timelineItems,
          {
            x: 0,
            autoAlpha: 1,
            duration: 0.55,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.4",
        );
    },
    { scope: rootRef },
  );

  const lastIndex = copy.timeline.length - 1;

  return (
    <section
      id="experience"
      ref={rootRef}
      className="border-t border-line bg-paper py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 xl:gap-24">
          <div className="flex flex-col">
            <SectionKicker
              label={copy.badge}
              variant="paper"
              className="experience-animate"
            />

            <h2 className="experience-animate mt-6 max-w-lg font-heading text-4xl font-medium leading-[1.08] tracking-tight text-ink md:text-5xl lg:text-[3.25rem]">
              {copy.headline}
            </h2>

            <p className="experience-animate mt-6 max-w-md text-lg leading-relaxed text-stone md:text-xl">
              {copy.intro}
            </p>

            <figure className="experience-animate relative mt-10 aspect-[4/3] overflow-hidden rounded-2xl md:mt-12">
              <Image
                src="/images/person-1.webp"
                alt={copy.quoteImageAlt}
                fill
                className="object-cover grayscale"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/45 to-transparent px-6 pb-6 pt-16 md:px-8 md:pb-8">
                <blockquote className="flex gap-3">
                  <QuoteMark />
                  <p className="text-lg leading-snug text-paper md:text-xl">
                    {copy.quote}
                  </p>
                </blockquote>
              </figcaption>
            </figure>
          </div>

          <div className="lg:pt-2">
            <ol className="relative border-l border-line pl-8 md:pl-10">
              {copy.timeline.map((item, index) => {
                const isRecent = index >= copy.timeline.length - 2;

                return (
                  <li
                    key={item.id}
                    className={cn(
                      "experience-timeline-item relative pb-12 last:pb-0",
                      index === lastIndex && "pb-0",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute -left-[calc(2rem+1px)] top-1.5 h-3 w-3 -translate-x-1/2 rounded-full md:-left-[calc(2.5rem+1px)]",
                        isRecent
                          ? "border-2 border-ink bg-paper"
                          : "border-2 border-ink bg-ink",
                      )}
                    />

                    <time
                      dateTime={item.period}
                      className="text-sm tracking-wide text-stone"
                    >
                      {item.period}
                    </time>

                    <h3 className="mt-2 font-heading text-xl font-medium tracking-tight text-ink md:text-2xl">
                      {item.roleTitle}
                    </h3>

                    <p className="mt-3 max-w-md text-base leading-relaxed text-stone md:text-lg">
                      {item.summary}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
