import { Hero, About, Services, Projects, ScrollIdentity } from "@/components/sections";
import { HomeDarkFlow } from "@/components/layout/HomeDarkFlow";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: t("seo.homeTitle"),
    description: t("seo.homeDescription"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        fr: "/fr",
        "x-default": "/en",
      },
    },
  };
}

export default function HomePage() {
  return (
    <>
      <HomeDarkFlow>
        <Hero />
        <About />
        <Services />
        <Projects />
        <ScrollIdentity />
      </HomeDarkFlow>
    </>
  );
}
