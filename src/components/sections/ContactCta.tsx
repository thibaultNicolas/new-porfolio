import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { CONTACT_EMAIL, SOCIAL_LINKS } from "@/lib/constants";

const linkedInHref =
  SOCIAL_LINKS.find((link) => link.name === "LinkedIn")?.href ??
  "https://www.linkedin.com/in/thibault-nicolas29/";

export async function ContactCta() {
  const t = await getTranslations("contactCta");

  const title = t.rich("title", {
    accent: (chunks: ReactNode) => (
      <em className="font-serif italic font-normal tracking-normal text-accent">{chunks}</em>
    ),
  });

  return (
    <section
      id="contact"
      aria-labelledby="contact-cta-heading"
      className="contact-cta-shell relative overflow-hidden px-6 py-20 text-paper md:px-12 md:py-28 lg:px-16"
    >
      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="contact-cta-card relative overflow-hidden rounded-[1.75rem] px-6 py-16 text-center md:px-14 md:py-20 lg:px-16 lg:py-24">
          <div
            className="project-card-grid pointer-events-none absolute inset-0 opacity-70"
            aria-hidden="true"
          />
          <div
            className="hero-grain pointer-events-none absolute inset-0 opacity-[0.12]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-paper/[0.04]"
            aria-hidden="true"
          />
          <div className="contact-cta-vignette pointer-events-none absolute inset-0" aria-hidden="true" />

          <div className="hero-meta relative z-10 mx-auto max-w-2xl">
            <h2
              id="contact-cta-heading"
              className="font-heading text-[2rem] font-medium leading-[1.08] tracking-[-0.04em] text-paper sm:text-5xl md:text-[3.25rem]"
            >
              {title}
            </h2>

            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-paper/90 md:text-lg">
              {t("subtitle")}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="contact-cta-primary inline-flex min-h-11 min-w-[11rem] cursor-pointer items-center justify-center gap-2 rounded-full bg-paper px-7 text-sm font-semibold text-ink transition-[background-color,transform] duration-300 hover:bg-paper/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
              >
                {t("emailCta")}
                <ArrowIcon />
              </a>
              <a
                href={linkedInHref}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-cta-secondary inline-flex min-h-11 min-w-[11rem] cursor-pointer items-center justify-center gap-2 rounded-full border border-paper/35 bg-ink/55 px-7 text-sm font-medium text-paper transition-[background-color,border-color,color] duration-300 hover:border-paper/55 hover:bg-ink/70 hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
              >
                {t("linkedinCta")}
                <LinkedInIcon />
              </a>
            </div>

            <p className="mt-6 text-sm text-paper/70">{t("trust")}</p>
          </div>
        </div>
      </div>
    </section>
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

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
      <path
        d="M3.5 6h2v6h-2V6zm1-2.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM6.5 6h1.9v.9h.03c.27-.5.92-1.03 1.9-1.03 2.03 0 2.4 1.34 2.4 3.08V12h-2v-3.1c0-.74-.01-1.7-1.04-1.7-1.04 0-1.2.81-1.2 1.65V12h-2V6z"
        fill="currentColor"
      />
    </svg>
  );
}
