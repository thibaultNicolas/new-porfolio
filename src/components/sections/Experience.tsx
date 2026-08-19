import { getTranslations } from "next-intl/server";
import { ExperienceMotion } from "@/components/sections/ExperienceMotion";
import { FEATURED_EXPERIENCE_IDS } from "@/data/experience";

export async function Experience() {
  const t = await getTranslations("experience");

  const timeline = FEATURED_EXPERIENCE_IDS.map((id) => ({
    id,
    period: t(`items.${id}.period`),
    roleTitle: t("roleAt", {
      role: t(`items.${id}.role`),
      company: t(`items.${id}.company`),
    }),
    summary: t(`items.${id}.summary`),
  }));

  return (
    <ExperienceMotion
      copy={{
        badge: t("badge"),
        headline: t.rich("headline", {
          accent: (chunks) => (
            <span className="font-serif italic text-accent">{chunks}</span>
          ),
        }),
        intro: t("intro"),
        quote: t("quote"),
        quoteImageAlt: t("quoteImageAlt"),
        timeline,
      }}
    />
  );
}
