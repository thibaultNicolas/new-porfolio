import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { projects } from "@/data/projects";

const siteUrl = "https://www.nicolas-thibault.ca";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  routing.locales.forEach((locale) => {
    entries.push({
      url: `${siteUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    });

    entries.push({
      url: `${siteUrl}/${locale}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    });

    projects.forEach((project) => {
      entries.push({
        url: `${siteUrl}/${locale}/projects/${project.id}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    });
  });

  return entries;
}
