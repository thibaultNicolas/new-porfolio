import { getTranslations } from "next-intl/server";
import { AboutMotion } from "@/components/sections/AboutMotion";
import { FEATURED_EXPERIENCE_IDS } from "@/data/profile-cards";

export async function About() {
  const t = await getTranslations("about");
  const tExperience = await getTranslations("experience");

  return (
    <AboutMotion
      copy={{
        badge: t("badge"),
        headline: t.rich("headline", {
          accent: (chunks) => (
            <span className="font-serif italic text-accent">{chunks}</span>
          ),
        }),
        subtitle: t("subtitle"),
        experienceItems: FEATURED_EXPERIENCE_IDS.map((id, index) => ({
          id,
          period: tExperience(`items.${id}.period`),
          title: tExperience("roleAt", {
            role: tExperience(`items.${id}.role`),
            company: tExperience(`items.${id}.company`),
          }),
          description: tExperience(`items.${id}.summary`),
          current: index === 0,
        })),
      }}
    />
  );
}
