import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: t("seo.projectsTitle"),
    description: t("seo.projectsDescription"),
    alternates: {
      canonical: `/${locale}/projects`,
      languages: {
        fr: "/fr/projects",
        en: "/en/projects",
      },
    },
  };
}

export default function AllProjectsPage() {
  return <ProjectsClient />;
}
