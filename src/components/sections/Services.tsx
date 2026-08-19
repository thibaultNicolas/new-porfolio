import { getTranslations } from "next-intl/server";
import { ServicesMotion } from "@/components/sections/ServicesMotion";
import {
  FEATURED_SERVICE_IDS,
  HIGHLIGHTED_SERVICE_ID,
  SERVICE_ACCENTS,
} from "@/data/services";

export async function Services() {
  const t = await getTranslations("services");

  const items = FEATURED_SERVICE_IDS.map((id) => ({
    id,
    title: t(`items.${id}.title`),
    description: t(`items.${id}.description`),
    featured: id === HIGHLIGHTED_SERVICE_ID,
    accent: SERVICE_ACCENTS[id],
  }));

  return (
    <ServicesMotion
      copy={{
        badge: t("badge"),
        headline: t.rich("headline", {
          accent: (chunks) => (
            <span className="font-serif italic text-accent">{chunks}</span>
          ),
        }),
        intro: t("intro"),
        cta: t("cta"),
        items,
      }}
    />
  );
}
