import {
  Hero,
  About,
  TechStack,
  Experience,
  Projects,
  Process,
} from "@/components/sections";
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
        fr: "/fr",
        en: "/en",
      },
    },
  };
}

export default function HomePage() {
  return (
    <>
      <main className="relative">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <TechStack />
        <Process />
      </main>
    </>
  );
}
