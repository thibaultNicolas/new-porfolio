// Refined by Gemini for nicolasthibault@hotmail.ca
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { experience } from "@/data/experience";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Experience() {
  const t = useTranslations("experience");
  const containerRef = useRef<HTMLDivElement>(null);
  const cardPalettes = [
    "bg-[#e0fbfc]",
    "bg-[#eaf2f7]",
    "bg-[#d5e6f0]",
    "bg-[#ee6c4d]",
    "bg-[#98c1d9]",
  ];

  useEffect(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".experience-card");

    // Animation de Stacking
    cards.forEach((card, index) => {
      ScrollTrigger.create({
        trigger: card,
        start: "top 10%", // La carte se fige à 10% du haut de l'écran
        pin: true, // Elle reste bloquée
        pinSpacing: false, // Les autres cartes remontent par-dessus
        endTrigger: containerRef.current,
        end: "bottom bottom",
        invalidateOnRefresh: true,
      });

      // Optionnel : On réduit légèrement l'échelle des cartes du dessous
      if (index !== cards.length - 1) {
        gsap.to(card, {
          scale: 0.95,
          scrollTrigger: {
            trigger: cards[index + 1],
            start: "top 50%",
            end: "top 10%",
            scrub: true,
          },
        });
      }
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative pb-[20vh] bg-[radial-gradient(1000px_circle_at_85%_10%,rgba(152,193,217,0.22),transparent_55%),linear-gradient(180deg,#ffffff_0%,#eaf2f7_100%)]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-32">
        <h2 className="text-7xl md:text-9xl font-extrabold text-jet-black font-jakarta tracking-[-0.06em] mb-24">
          {t("title")}
        </h2>

        <div className="flex flex-col gap-0">
          {experience.map((exp, index) => (
            <div
              key={exp.id}
              className="experience-card sticky-card w-full min-h-[60vh] md:min-h-[50vh] mb-12 opacity-100 relative"
              style={{ zIndex: index + 1 }}
            >
              {/* Card Style inspiré de Tedy/Hero */}
              <div
                className={`w-full h-full rounded-[40px] p-8 md:p-16 flex flex-col md:flex-row gap-12 relative overflow-hidden ${cardPalettes[index % cardPalettes.length]} border border-jet-black/10 shadow-xl`}
              >
                {/* Contenu de la carte */}
                <div className="flex-1 z-10">
                  <span className="text-sm font-bold uppercase tracking-[0.2em] text-burnt-peach/60 font-jakarta">
                    {t(`items.${exp.id}.period`)}
                  </span>
                  <h3 className="text-5xl md:text-7xl font-extrabold text-jet-black font-jakarta tracking-[-0.04em] mt-4 leading-none">
                    {t(`items.${exp.id}.company`)}
                  </h3>
                  <p className="text-xl md:text-2xl font-medium text-jet-black/60 mt-4 font-jakarta">
                    {t(`items.${exp.id}.role`)}
                  </p>
                </div>

                <div className="flex-1 z-10">
                  <ul className="space-y-6">
                    {t
                      .raw(`items.${exp.id}.description`)
                      .map((item: string, i: number) => (
                        <li
                          key={i}
                          className="text-lg text-jet-black/80 font-jakarta font-medium leading-relaxed flex gap-4"
                        >
                          <span className="w-1.5 h-1.5 bg-burnt-peach/40 rounded-full mt-2 shrink-0" />
                          {item}
                        </li>
                      ))}
                  </ul>
                </div>

                {/* Index massif en fond de carte */}
                <span className="absolute -bottom-10 -right-4 text-[12rem] md:text-[20rem] font-extrabold text-jet-black/[0.02] font-jakarta leading-none">
                  0{index + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
