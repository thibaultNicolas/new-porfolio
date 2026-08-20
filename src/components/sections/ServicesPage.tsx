import type { ReactNode } from "react";
import { Link } from "@/i18n/routing";

export interface ServicePageItem {
  id: string;
  index: string;
  title: string;
  description: string;
  body: string;
  points: string[];
}

export interface ServicesPageCopy {
  badge: string;
  headline: ReactNode;
  intro: string;
  tocLabel: string;
  backLabel: string;
  cta: string;
  items: ServicePageItem[];
}

interface ServicesPageProps {
  copy: ServicesPageCopy;
}

export function ServicesPage({ copy }: ServicesPageProps) {
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
          {copy.items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="inline-flex min-h-11 items-center rounded-full border border-fg/15 px-4 text-sm text-fg/70 transition-colors duration-300 hover:border-fg/40 hover:text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg"
            >
              {item.title}
            </a>
          ))}
        </nav>

        <div className="mt-8 divide-y divide-fg/10 md:mt-12">
          {copy.items.map((item) => (
            <ServiceBlock key={item.id} item={item} />
          ))}
        </div>

        <div className="mt-16 border-t border-fg/10 pt-12 md:mt-20 md:pt-16">
          <Link href="/#contact" className="cta-secondary">
            {copy.cta}
            <ArrowUpRightIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ServiceBlock({ item }: { item: ServicePageItem }) {
  return (
    <article id={item.id} className="scroll-mt-28 py-14 md:scroll-mt-32 md:py-20">
      <p className="section-kicker">{item.index}</p>
      <h2 className="section-title mt-5">{item.title}</h2>
      <p className="section-intro mt-5">{item.description}</p>
      <p className="mt-8 max-w-[62ch] text-lg leading-relaxed text-fg/80">{item.body}</p>
      <ul className="mt-8 max-w-[62ch] space-y-3">
        {item.points.map((point) => (
          <li key={point} className="flex gap-3 text-base leading-relaxed text-fg/70">
            <span
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
              aria-hidden="true"
            />
            {point}
          </li>
        ))}
      </ul>
    </article>
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
