import type { ReactNode } from "react";
import { Link } from "@/i18n/routing";
import { CONTACT_EMAIL } from "@/lib/constants";

export interface HeroIntroCopy {
  headline: ReactNode;
  body: string;
  ctaProject: string;
  ctaWork: string;
  statProjectsLabel: string;
  statProjectsValue: string;
  statYearsLabel: string;
  statYearsValue: string;
}

export function HeroIntro({ copy }: { copy: HeroIntroCopy }) {
  return (
    <div className="hero-meta flex max-w-xl flex-col justify-center">
      <h1 className="font-heading text-[2.35rem] font-medium leading-[1.04] tracking-[-0.04em] text-fg sm:text-5xl md:text-6xl lg:text-[4.1rem]">
        {copy.headline}
      </h1>

      <p className="mt-6 max-w-md text-base leading-relaxed text-fg/82 md:text-lg">
        {copy.body}
      </p>

      <div className="mt-6 grid max-w-md grid-cols-2 gap-3">
        <article className="rounded-2xl border border-fg/15 px-5 py-4 text-fg">
          <p className="text-xs text-fg/60">{copy.statProjectsLabel}</p>
          <p className="mt-3 font-heading text-4xl font-medium tracking-tight">
            {copy.statProjectsValue}
          </p>
        </article>
        <article className="rounded-2xl border border-fg/15 px-5 py-4 text-fg">
          <p className="text-xs text-fg/60">{copy.statYearsLabel}</p>
          <p className="mt-3 font-heading text-4xl font-medium tracking-tight">
            {copy.statYearsValue}
          </p>
        </article>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="pill-ink inline-flex min-h-11 items-center gap-2 rounded-full bg-paper px-5 text-sm font-medium text-ink transition-colors duration-300 hover:bg-paper/90"
        >
          {copy.ctaProject}
          <ArrowIcon />
        </a>
        <Link href="/#work" className="cta-secondary">
          {copy.ctaWork}
          <ArrowIcon />
        </Link>
      </div>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
      <path
        d="M3 8h10M9 4l4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
