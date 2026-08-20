import type { ReactNode } from "react";
import { Link } from "@/i18n/routing";
import { AboutEducationBlock, AboutRoleBlock } from "@/components/ui/AboutPageBlocks";

export interface AboutPageRole {
  id: string;
  period: string;
  title: string;
  points: string[];
  current?: boolean;
}

export interface AboutPageEducation {
  id: string;
  period: string;
  title: string;
  summary: string;
  school?: string;
}

export interface AboutPageCopy {
  badge: string;
  headline: ReactNode;
  intro: string;
  backLabel: string;
  cta: string;
  linkedinLabel: string;
  linkedinHref: string;
  tocLabel: string;
  toc: { id: string; label: string }[];
  profileTitle: string;
  location: string;
  profileBody: string[];
  experienceTitle: string;
  educationTitle: string;
  languagesTitle: string;
  focusTitle: string;
  focusItems: string[];
  languages: { name: string; level: string }[];
  roles: AboutPageRole[];
  education: AboutPageEducation[];
}

interface AboutPageProps {
  copy: AboutPageCopy;
}

export function AboutPage({ copy }: AboutPageProps) {
  return (
    <section className="section-dark-zone relative pb-24 pt-28 md:pb-32 md:pt-32 lg:pb-36 lg:pt-40">
      <div className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <header className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="section-kicker">{copy.badge}</p>
            <h1 className="section-title mt-5">{copy.headline}</h1>
            <p className="section-intro mt-5">{copy.intro}</p>
          </div>
          <Link href="/" className="cta-secondary shrink-0 self-start lg:self-auto">
            {copy.backLabel}
            <ArrowUpRightIcon />
          </Link>
        </header>

        <nav aria-label={copy.tocLabel} className="mt-10 flex flex-wrap gap-2">
          {copy.toc.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="inline-flex min-h-11 items-center rounded-full border border-fg/15 px-4 text-sm text-fg/70 transition-colors duration-300 hover:border-fg/40 hover:text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <article id="profile" className="scroll-mt-28 mt-8 border-t border-fg/10 pt-14 md:mt-12 md:scroll-mt-32 md:pt-20">
          <p className="section-kicker">{copy.location}</p>
          <h2 className="section-title mt-5">{copy.profileTitle}</h2>
          <div className="mt-8 max-w-[62ch] space-y-6">
            {copy.profileBody.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-relaxed text-fg/80">
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        <section id="experience" className="scroll-mt-28 mt-8 border-t border-fg/10 pt-14 md:scroll-mt-32 md:pt-20">
          <h2 className="section-title">{copy.experienceTitle}</h2>
          <ol className="mt-10 divide-y divide-fg/10">
            {copy.roles.map((role) => (
              <AboutRoleBlock key={role.id} role={role} />
            ))}
          </ol>
        </section>

        <section id="education" className="scroll-mt-28 mt-8 border-t border-fg/10 pt-14 md:scroll-mt-32 md:pt-20">
          <h2 className="section-title">{copy.educationTitle}</h2>
          <ol className="mt-10 divide-y divide-fg/10">
            {copy.education.map((item) => (
              <AboutEducationBlock key={item.id} item={item} />
            ))}
          </ol>
        </section>

        <section
          id="languages"
          className="scroll-mt-28 mt-8 grid gap-12 border-t border-fg/10 pt-14 md:scroll-mt-32 md:grid-cols-2 md:gap-16 md:pt-20"
        >
          <div>
            <h2 className="section-title">{copy.languagesTitle}</h2>
            <ul className="mt-8 space-y-4">
              {copy.languages.map((language) => (
                <li key={language.name} className="flex flex-col gap-1">
                  <span className="font-heading text-xl text-fg">{language.name}</span>
                  <span className="text-sm text-fg/55">{language.level}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="section-title">{copy.focusTitle}</h2>
            <ul className="mt-8 space-y-3">
              {copy.focusItems.map((item) => (
                <li key={item} className="flex gap-3 text-base leading-relaxed text-fg/70">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="mt-16 flex flex-wrap gap-6 border-t border-fg/10 pt-12 md:mt-20 md:pt-16">
          <Link href="/#contact" className="cta-secondary">
            {copy.cta}
            <ArrowUpRightIcon />
          </Link>
          <a
            href={copy.linkedinHref}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-secondary"
          >
            {copy.linkedinLabel}
            <ArrowUpRightIcon />
          </a>
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
