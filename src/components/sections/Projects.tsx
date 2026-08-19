import { getTranslations } from "next-intl/server";
import { ProjectsMotion } from "@/components/sections/ProjectsMotion";
import { FEATURED_PROJECT_IDS, projects } from "@/data/projects";

export async function Projects() {
  const t = await getTranslations("projects");

  const projectMap = new Map(projects.map((project) => [project.id, project]));

  const items = FEATURED_PROJECT_IDS.flatMap((id) => {
    const project = projectMap.get(id);
    if (!project) return [];

    const projectKey = id.replace(/-/g, "_");

    return [
      {
        id: project.id,
        title: project.title,
        href: project.link,
        image: project.image,
        description: t(`${projectKey}.description`),
        tags: [...new Set(project.technologies.slice(0, 3))],
        viewLabel: t("viewProject"),
      },
    ];
  });

  return (
    <ProjectsMotion
      items={items}
      copy={{
        badge: t("badge"),
        headline: t.rich("headline", {
          accent: (chunks) => (
            <span className="font-serif italic text-accent">{chunks}</span>
          ),
        }),
        intro: t("intro"),
        viewMore: t("viewMore"),
      }}
    />
  );
}
