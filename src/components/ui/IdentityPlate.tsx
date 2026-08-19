"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface IdentityPlateCopy {
  initials: string;
  index: string;
  yearsNumber: string;
  yearsLabel: string;
  projectsNumber: string;
  projectsLabel: string;
  location: string;
  role: string;
  period: string;
  caption: string;
}

function parseMetric(value: string): { amount: number; suffix: string } {
  const match = /^(\d+)(.*)$/.exec(value);
  if (!match?.[1]) {
    return { amount: 0, suffix: value };
  }
  return { amount: Number(match[1]), suffix: match[2] ?? "" };
}

function formatMetric(amount: number, suffix: string, pad: boolean): string {
  const digits = pad ? String(amount).padStart(2, "0") : String(amount);
  return `${digits}${suffix}`;
}

export function IdentityPlate({ copy }: { copy: IdentityPlateCopy }): React.JSX.Element {
  const rootRef = useRef<HTMLDivElement>(null);
  const yearsRef = useRef<HTMLSpanElement>(null);
  const projectsRef = useRef<HTMLSpanElement>(null);
  const years = parseMetric(copy.yearsNumber);
  const projects = parseMetric(copy.projectsNumber);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      const counters = { years: 0, projects: 0 };

      const timeline = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 80%",
          once: true,
        },
      });

      timeline
        .from(".identity-crop", {
          scale: 0,
          duration: 0.55,
          stagger: 0.05,
          ease: "power3.out",
        })
        .from(
          ".identity-frame",
          { opacity: 0, duration: 0.45 },
          "-=0.25",
        )
        .from(
          ".identity-meta",
          { opacity: 0, y: 10, duration: 0.4, stagger: 0.06 },
          "-=0.2",
        )
        .from(".identity-stat", { opacity: 0, y: 14, duration: 0.5 }, "-=0.25")
        .fromTo(
          ".identity-rule",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.7, ease: "power3.out" },
          "-=0.15",
        )
        .to(
          counters,
          {
            years: years.amount,
            projects: projects.amount,
            duration: 0.9,
            ease: "power2.out",
            snap: { years: 1, projects: 1 },
            onUpdate: () => {
              if (yearsRef.current) {
                yearsRef.current.textContent = formatMetric(
                  Math.round(counters.years),
                  years.suffix,
                  true,
                );
              }
              if (projectsRef.current) {
                projectsRef.current.textContent = formatMetric(
                  Math.round(counters.projects),
                  projects.suffix,
                  false,
                );
              }
            },
          },
          "<",
        );
    },
    { scope: rootRef, dependencies: [copy.yearsNumber, copy.projectsNumber] },
  );

  return (
    <div
      ref={rootRef}
      className="group relative mx-auto w-full max-w-sm lg:mx-0"
    >
      <span className="identity-crop absolute left-0 top-0 h-6 w-6 origin-top-left border-l border-t border-ink" />
      <span className="identity-crop absolute right-0 top-0 h-6 w-6 origin-top-right border-r border-t border-ink" />
      <span className="identity-crop absolute bottom-0 left-0 h-6 w-6 origin-bottom-left border-b border-l border-ink" />
      <span className="identity-crop absolute bottom-0 right-0 h-6 w-6 origin-bottom-right border-b border-r border-ink" />

      <div className="identity-frame relative mx-3 my-3 aspect-[4/5] overflow-hidden border border-line bg-paper transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(9,9,11,0.07)_1px,transparent_1px)] bg-[size:22px_22px]"
          aria-hidden="true"
        />

        <div className="relative flex h-full flex-col justify-between p-7 md:p-8">
          <div className="identity-meta flex items-center justify-between text-[11px] uppercase tracking-[0.28em] text-stone">
            <span>{copy.initials}</span>
            <span>{copy.index}</span>
          </div>

          <div className="identity-stat">
            <p className="font-heading text-7xl font-medium leading-none tracking-[-0.05em] text-ink tabular-nums md:text-8xl">
              <span ref={yearsRef}>{formatMetric(years.amount, years.suffix, true)}</span>
            </p>
            <p className="mt-3 text-sm uppercase tracking-[0.18em] text-stone">
              {copy.yearsLabel}
            </p>
            <p className="mt-8 flex items-baseline gap-2">
              <span
                ref={projectsRef}
                className="font-heading text-2xl font-medium tracking-tight text-ink"
              >
                {formatMetric(projects.amount, projects.suffix, false)}
              </span>
              <span className="text-sm text-stone">{copy.projectsLabel}</span>
            </p>
          </div>

          <div>
            <p className="identity-meta text-sm italic text-stone">{copy.caption}</p>
            <span className="identity-rule mt-5 block h-px w-12 origin-left bg-accent transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-20" />
            <p className="identity-meta mt-5 text-xs uppercase tracking-[0.2em] text-ink">
              {copy.location}
            </p>
            <p className="identity-meta mt-1 text-xs tracking-[0.16em] text-stone">
              {copy.role} · {copy.period}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
