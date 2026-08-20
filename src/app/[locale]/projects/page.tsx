import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { HomeDarkFlow } from "@/components/layout/HomeDarkFlow";
import { ProjectsArchive } from "@/components/sections/ProjectsArchive";
import { projects } from "@/data/projects";

function getProjectTranslationKey(id: string): string {
  return id.replace(/-/g, "_");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });

  return {
    title: t("archiveTitle"),
    description: t("archiveIntro"),
    alternates: {
      canonical: `/${locale}/projects`,
      languages: {
        en: "/en/projects",
        fr: "/fr/projects",
        "x-default": "/en/projects",
      },
    },
  };
}

export default async function ProjectsArchivePage() {
  const t = await getTranslations("projects");

  const items = projects
    .filter((project) => project.id !== "portfolio")
    .map((project) => {
      const projectKey = getProjectTranslationKey(project.id);

      return {
        id: project.id,
        title: project.title,
        href: `/projects/${project.id}`,
        image: project.image,
        description: t(`${projectKey}.description`),
        tags: [...new Set(project.technologies.slice(0, 3))],
        viewLabel: t("viewProject"),
      };
    });

  return (
    <HomeDarkFlow>
      <ProjectsArchive
        items={items}
        copy={{
          badge: t("badge"),
          headline: t.rich("archiveHeadline", {
            accent: (chunks) => (
              <span className="font-serif italic text-accent">{chunks}</span>
            ),
          }),
          intro: t("archiveIntro"),
          backLabel: t("backToHome"),
        }}
      />
    </HomeDarkFlow>
  );
}
