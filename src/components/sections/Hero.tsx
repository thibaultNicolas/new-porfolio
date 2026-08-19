import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { HeroMotion } from "@/components/sections/HeroMotion";
import { HeroSpotifyCard } from "@/components/sections/HeroSpotifyCard";
import { CONTACT_EMAIL } from "@/lib/constants";

export async function Hero() {
  const t = await getTranslations("hero");
  const tTrust = await getTranslations("trust");

  const headline = t.rich("headline", {
    accent: (chunks: ReactNode) => (
      <em className="font-serif italic font-normal tracking-normal text-fg">
        {chunks}
      </em>
    ),
  });

  return (
    <HeroMotion
      copy={{
        headline,
        body: t("body"),
        ctaProject: t("ctaProject"),
        ctaWork: t("ctaWork"),
        statProjectsLabel: t("statProjectsLabel"),
        statProjectsValue: t("statProjectsValue"),
        statYearsLabel: t("statYearsLabel"),
        statYearsValue: t("statYearsValue"),
        marqueeLabel: tTrust("label"),
      }}
    >
      <HeroSpotifyCard
        copy={{
          playlistTitle: t("playlistTitle"),
          playlistName: t("playlistName"),
          openPlaylist: t("openPlaylist"),
          openingPlaylist: t("openingPlaylist"),
          location: t("location"),
          name: t("name"),
          portraitAlt: t("portraitAlt"),
        }}
        email={CONTACT_EMAIL}
      />
    </HeroMotion>
  );
}
