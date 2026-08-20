"use client";

import { useEffect, useState } from "react";

type HeaderTone = "light" | "dark";

const SECTION_TONES: Record<string, HeaderTone> = {
  home: "light",
  about: "dark",
  services: "dark",
  work: "dark",
  contact: "light",
};

const HOME_SECTION_IDS = [
  "home",
  "work",
  "services",
  "about",
  "contact",
] as const;

export function useHeaderTone(isHome: boolean): HeaderTone {
  const [tone, setTone] = useState<HeaderTone>("light");

  useEffect(() => {
    if (!isHome) {
      return;
    }

    const sections = HOME_SECTION_IDS.flatMap((id) => {
      const element = document.getElementById(id);
      return element ? [{ id, element }] : [];
    });

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const activeId = visible[0]?.target.id;
        if (activeId && activeId in SECTION_TONES) {
          setTone(SECTION_TONES[activeId] ?? "light");
        }
      },
      {
        rootMargin: "-42% 0px -42% 0px",
        threshold: [0, 0.15, 0.35, 0.5],
      },
    );

    sections.forEach(({ element }) => observer.observe(element));
    return () => observer.disconnect();
  }, [isHome]);

  if (!isHome) {
    return "dark";
  }

  return tone;
}
