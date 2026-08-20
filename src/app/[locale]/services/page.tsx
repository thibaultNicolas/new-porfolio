import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { HomeDarkFlow } from "@/components/layout/HomeDarkFlow";
import { ServicesPage } from "@/components/sections/ServicesPage";
import { FEATURED_SERVICE_IDS, getServiceAnchor } from "@/data/services";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });

  return {
    title: t("pageTitle"),
    description: t("pageIntro"),
    alternates: {
      canonical: `/${locale}/services`,
      languages: {
        en: "/en/services",
        fr: "/fr/services",
        "x-default": "/en/services",
      },
    },
  };
}

export default async function ServicesRoutePage() {
  const t = await getTranslations("services");

  const items = FEATURED_SERVICE_IDS.map((id, index) => ({
    id: getServiceAnchor(id),
    index: String(index + 1).padStart(2, "0"),
    title: t(`items.${id}.title`),
    description: t(`items.${id}.description`),
    body: t(`items.${id}.body`),
    points: [
      t(`items.${id}.point1`),
      t(`items.${id}.point2`),
      t(`items.${id}.point3`),
    ],
  }));

  return (
    <HomeDarkFlow>
      <ServicesPage
        copy={{
          badge: t("badge"),
          headline: t.rich("pageHeadline", {
            accent: (chunks) => (
              <span className="font-serif italic text-accent">{chunks}</span>
            ),
          }),
          intro: t("pageIntro"),
          tocLabel: t("tocLabel"),
          backLabel: t("backToHome"),
          cta: t("cta"),
          items,
        }}
      />
    </HomeDarkFlow>
  );
}
