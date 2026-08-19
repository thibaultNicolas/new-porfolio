import { getTranslations } from "next-intl/server";
import { ToolsServicesMotion } from "@/components/sections/ToolsServicesMotion";
import { TOOLS_SERVICE_IDS, ORBIT_TOOLS } from "@/data/tools-services";
import { TECH_LOGOS } from "@/data/tech-logos";

export async function ToolsServices() {
  const t = await getTranslations("toolsServices");

  return (
    <ToolsServicesMotion
      copy={{
        badge: t("badge"),
        headline: t.rich("headline", {
          accent: (chunks) => (
            <span className="font-serif italic text-accent">{chunks}</span>
          ),
        }),
        intro: t("intro"),
        centerLabel: t("centerLabel"),
        toolLabels: ORBIT_TOOLS.map(
          (tool) => TECH_LOGOS.find((logo) => logo.id === tool.id)?.name ?? tool.id,
        ),
        services: TOOLS_SERVICE_IDS.map((id) => ({
          id,
          title: t(`items.${id}.title`),
          description: t(`items.${id}.description`),
        })),
      }}
    />
  );
}
