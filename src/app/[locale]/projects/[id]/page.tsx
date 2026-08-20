import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import { Link, routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import { HomeDarkFlow } from "@/components/layout/HomeDarkFlow";

const CATALOG = projects.filter((item) => item.id !== "portfolio");

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}): Promise<Metadata> {
  const { id, locale } = await params;
  const project = projects.find((item) => item.id === id);
  if (!project) return { title: "Project Not Found" };

  const t = await getTranslations({ locale });
  const description = project.seoDescriptionKey
    ? t(project.seoDescriptionKey)
    : t(project.descriptionKey);

  return {
    title: `${project.title} | Nicolas Thibault`,
    description,
    openGraph: {
      title: project.title,
      description,
      images: [{ url: project.image, width: 1200, height: 630, alt: project.title }],
    },
    alternates: {
      canonical: `/${locale}/projects/${project.id}`,
      languages: {
        fr: `/fr/projects/${project.id}`,
        en: `/en/projects/${project.id}`,
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((project) => ({ locale, id: project.id })),
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id } = await params;
  const t = await getTranslations();
  const project = projects.find((item) => item.id === id);

  if (!project) notFound();

  const catalogIndex = CATALOG.findIndex((item) => item.id === id);
  const nextCandidate =
    catalogIndex >= 0
      ? CATALOG[(catalogIndex + 1) % CATALOG.length]
      : CATALOG[0];
  const nextProject =
    nextCandidate && nextCandidate.id !== project.id ? nextCandidate : undefined;

  return (
    <HomeDarkFlow>
      <section className="section-dark-zone pb-16 pt-28 md:pb-24 md:pt-32 lg:pt-40">
        <article className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
          <Link
            href="/projects"
            className="nav-link text-sm text-fg/55 transition-colors hover:text-fg"
          >
            {t("projects.backToProjects")}
          </Link>

          <p className="section-kicker mt-12">{t(project.roleKey)}</p>
          <h1 className="mt-5 max-w-[14ch] font-heading text-5xl font-medium tracking-tight text-fg md:text-7xl">
            {project.title}
          </h1>
          <p className="section-intro mt-6 max-w-2xl text-xl">{t(project.impactKey)}</p>

          <div className="relative mt-16 aspect-[16/9] overflow-hidden rounded-2xl border border-fg/10 bg-fg/[0.03]">
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              className="object-cover object-top"
              sizes="(min-width: 1024px) 80vw, 100vw"
            />
          </div>

          <div className="mt-20 grid gap-16 lg:grid-cols-12">
            <aside className="space-y-8 lg:col-span-4">
              <div>
                <h2 className="section-kicker">{t("projects.stackLabel")}</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-fg/12 px-3 py-1 text-sm text-fg/70"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-secondary"
              >
                {t("projects.livePreview")}
                <ArrowUpRightIcon />
              </a>
            </aside>

            <div className="lg:col-span-8">
              <h2 className="section-kicker">{t("projects.aboutProject")}</h2>
              <p className="mt-6 max-w-[62ch] whitespace-pre-line text-lg leading-relaxed text-fg/80">
                {t(project.longDescriptionKey)}
              </p>
            </div>
          </div>
        </article>
      </section>

      {nextProject ? (
        <section className="section-dark-zone">
          <Link
            href={`/projects/${nextProject.id}`}
            className="group block border-t border-fg/10 py-24 text-center focus-visible:outline-offset-4"
          >
            <span className="section-kicker">{t("projects.nextProject")}</span>
            <span className="mt-4 block font-heading text-4xl font-medium tracking-tight text-fg transition-colors duration-300 group-hover:text-accent md:text-6xl">
              {nextProject.title}
            </span>
          </Link>
        </section>
      ) : null}
    </HomeDarkFlow>
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
