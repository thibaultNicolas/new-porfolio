import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import { Link, routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";

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
  const projectIndex = projects.findIndex((item) => item.id === id);
  const project = projects[projectIndex];

  if (!project) notFound();

  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <>
      <article className="bg-paper pb-8 pt-32">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
          <Link
            href="/#work"
            className="nav-link text-sm text-stone hover:text-ink"
          >
            {t("projects.backToProjects")}
          </Link>

          <p className="mt-12 text-sm uppercase tracking-[0.16em] text-accent">
            {t(project.roleKey)}
          </p>
          <h1 className="mt-4 max-w-[12ch] font-heading text-5xl font-medium tracking-tight text-ink md:text-7xl">
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-stone">{t(project.impactKey)}</p>

          <div className="relative mt-16 aspect-[16/9] overflow-hidden bg-ink">
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 80vw, 100vw"
            />
          </div>

          <div className="mt-20 grid gap-16 lg:grid-cols-12">
            <aside className="space-y-8 lg:col-span-4">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-stone">
                  {t("projects.stackLabel")}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="border border-line px-3 py-1 text-sm text-ink"
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
                className="nav-link inline-block text-ink"
              >
                {t("projects.livePreview")}
              </a>
            </aside>

            <div className="lg:col-span-8">
              <p className="text-xs uppercase tracking-[0.18em] text-stone">
                {t("projects.aboutProject")}
              </p>
              <p className="mt-6 whitespace-pre-line text-lg leading-relaxed text-ink">
                {t(project.longDescriptionKey)}
              </p>
            </div>
          </div>
        </div>
      </article>

      {nextProject ? (
        <Link
          href={`/projects/${nextProject.id}`}
          className="group block border-t border-line bg-paper py-24 text-center"
        >
          <span className="text-xs uppercase tracking-[0.18em] text-stone">
            {t("projects.nextProject")}
          </span>
          <span className="mt-4 block font-heading text-4xl font-medium tracking-tight text-ink transition-colors duration-300 group-hover:text-accent md:text-6xl">
            {nextProject.title}
          </span>
        </Link>
      ) : null}
    </>
  );
}
