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

      // Optionnel : On réduit légèrement l'échelle et on assombrit les cartes du dessous
      if (index !== cards.length - 1) {
        gsap.to(card, {
          scale: 0.95,
          opacity: 0.5,
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
    <section ref={containerRef} className="relative bg-white pb-[20vh]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-32">
        <h2 className="text-7xl md:text-9xl font-extrabold text-brand-navy font-jakarta tracking-[-0.06em] mb-24">
          {t("title")}
        </h2>

        <div className="flex flex-col gap-0">
          {experience.map((exp, index) => (
            <div
              key={exp.id}
              className="experience-card sticky-card w-full min-h-[60vh] md:min-h-[50vh] mb-12"
            >
              {/* Card Style inspiré de Tedy/Hero */}
              <div className="w-full h-full bg-[#F8F9FA] border border-brand-navy/5 rounded-[40px] p-8 md:p-16 shadow-sm flex flex-col md:flex-row gap-12 relative overflow-hidden">
                {/* Grain subtil sur chaque carte */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply">
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <filter id={`noise-${index}`}>
                      <feTurbulence type="fractalNoise" baseFrequency="0.6" />
                    </filter>
                    <rect
                      width="100%"
                      height="100%"
                      filter={`url(#noise-${index})`}
                    />
                  </svg>
                </div>

                {/* Contenu de la carte */}
                <div className="flex-1 z-10">
                  <span className="text-sm font-bold uppercase tracking-[0.2em] text-brand-blue/60 font-jakarta">
                    {t(`items.${exp.id}.period`)}
                  </span>
                  <h3 className="text-5xl md:text-7xl font-extrabold text-brand-navy font-jakarta tracking-[-0.04em] mt-4 leading-none">
                    {t(`items.${exp.id}.company`)}
                  </h3>
                  <p className="text-xl md:text-2xl font-medium text-brand-navy/60 mt-4 font-jakarta">
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
                          className="text-lg text-brand-navy/80 font-jakarta font-medium leading-relaxed flex gap-4"
                        >
                          <span className="w-1.5 h-1.5 bg-brand-blue/40 rounded-full mt-2 shrink-0" />
                          {item}
                        </li>
                      ))}
                  </ul>
                </div>

                {/* Index massif en fond de carte */}
                <span className="absolute -bottom-10 -right-4 text-[12rem] md:text-[20rem] font-extrabold text-brand-navy/[0.02] font-jakarta leading-none">
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
