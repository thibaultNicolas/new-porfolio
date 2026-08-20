import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { HomeDarkFlow } from "@/components/layout/HomeDarkFlow";
import { AboutPage } from "@/components/sections/AboutPage";
import { EDUCATION_IDS, EXPERIENCE_IDS } from "@/data/profile-cards";
import { SOCIAL_LINKS } from "@/lib/constants";

const LINKEDIN_HREF =
  SOCIAL_LINKS.find((link) => link.name === "LinkedIn")?.href ??
  "https://www.linkedin.com/in/thibault-nicolas29/";

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return {
    title: t("pageTitle"),
    description: t("pageIntro"),
    alternates: {
      canonical: `/${locale}/about`,
      languages: {
        en: "/en/about",
        fr: "/fr/about",
        "x-default": "/en/about",
      },
    },
  };
}

export default async function AboutRoutePage() {
  const t = await getTranslations("about");
  const tExperience = await getTranslations("experience");

  const roles = EXPERIENCE_IDS.map((id, index) => ({
    id,
    period: tExperience(`items.${id}.period`),
    title: tExperience("roleAt", {
      role: tExperience(`items.${id}.role`),
      company: tExperience(`items.${id}.company`),
    }),
    points: asStringArray(tExperience.raw(`items.${id}.description`)),
    current: index === 0,
  }));

  const education = EDUCATION_IDS.map((id) => ({
    id,
    period: t(`education.items.${id}.tag`),
    title: t(`education.items.${id}.title`),
    summary: t(`education.items.${id}.summary`),
    school: id === "edu-1" ? t(`education.items.${id}.school`) : undefined,
  }));

  return (
    <HomeDarkFlow>
      <AboutPage
        copy={{
          badge: t("pageTitle"),
          headline: t.rich("pageHeadline", {
            accent: (chunks) => (
              <span className="font-serif italic text-accent">{chunks}</span>
            ),
          }),
          intro: t("pageIntro"),
          backLabel: t("backToHome"),
          cta: t("pageCta"),
          linkedinLabel: t("linkedinCta"),
          linkedinHref: LINKEDIN_HREF,
          tocLabel: t("tocLabel"),
          toc: [
            { id: "profile", label: t("tocProfile") },
            { id: "experience", label: t("tocExperience") },
            { id: "education", label: t("tocEducation") },
            { id: "languages", label: t("tocLanguages") },
          ],
          profileTitle: t("profileTitle"),
          location: t("location"),
          profileBody: [t("profileBody1"), t("profileBody2")],
          experienceTitle: t("experienceTitle"),
          educationTitle: t("educationTitle"),
          languagesTitle: t("languagesTitle"),
          focusTitle: t("focusTitle"),
          focusItems: [t("focus1"), t("focus2"), t("focus3")],
          languages: [
            { name: t("languageFr"), level: t("languageFrLevel") },
            { name: t("languageEn"), level: t("languageEnLevel") },
          ],
          roles,
          education,
        }}
      />
    </HomeDarkFlow>
  );
}
