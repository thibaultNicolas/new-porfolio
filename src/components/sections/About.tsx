// Refined by Gemini for nicolasthibault@hotmail.ca
"use client";

import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function About() {
  const t = useTranslations("about");
  const sectionRef = useRef<HTMLDivElement>(null);

  const highlights = [
    {
      number: t("highlights.experience.number"),
      label: t("highlights.experience.label"),
      description: t("highlights.experience.description"),
    },
    {
      number: t("highlights.projects.number"),
      label: t("highlights.projects.label"),
      description: t("highlights.projects.description"),
    },
    {
      number: t("highlights.satisfaction.number"),
      label: t("highlights.satisfaction.label"),
      description: t("highlights.satisfaction.description"),
    },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animation pour le titre et les paragraphes
      gsap.from(".reveal-text", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".reveal-text",
          start: "top 90%",
        },
      });

      // Animation pour les chiffres (Highlights)
      gsap.from(".stat-item", {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)",
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".stats-container",
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 md:py-48 lg:py-64 overflow-hidden bg-[radial-gradient(900px_circle_at_10%_20%,rgba(61,90,128,0.1),transparent_55%),radial-gradient(900px_circle_at_80%_80%,rgba(152,193,217,0.18),transparent_60%),linear-gradient(180deg,#ffffff_0%,#eaf2f7_100%)]"
    >
      {/* Texture grainée très subtile pour la continuité avec le Hero */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="aboutNoise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#aboutNoise)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* LEFT COLUMN: Large Title & Accents */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="overflow-hidden">
              <h2 className="reveal-text text-6xl md:text-8xl font-extrabold text-jet-black font-jakarta tracking-[-0.06em] leading-[0.85]">
                {t("title")}
              </h2>
            </div>

            {/* Visual element: A large, soft blue circle in the background of the text */}
            <div className="hidden lg:block w-32 h-32 rounded-full bg-burnt-peach/5 blur-3xl mt-12" />
          </div>

          {/* RIGHT COLUMN: Bio Content */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="space-y-10 text-xl md:text-2xl text-jet-black/80 font-jakarta font-medium leading-[1.4] tracking-tight">
              <div className="overflow-hidden">
                <p className="reveal-text">{t("paragraph1")}</p>
              </div>
              <div className="overflow-hidden">
                <p className="reveal-text opacity-70 text-lg md:text-xl">
                  {t("paragraph2")}
                </p>
              </div>
              <div className="overflow-hidden">
                <p className="reveal-text opacity-70 text-lg md:text-xl">
                  {t("paragraph3")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: Minimalist Highlights */}
        <div className="stats-container mt-32 md:mt-48 grid grid-cols-1 md:grid-cols-3 border-t border-jet-black/5 pt-16 gap-12">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="stat-item group glass-panel rounded-[32px] p-8 md:p-10"
            >
              <div className="flex flex-col gap-2">
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-burnt-peach/60 font-jakarta">
                  {highlight.label}
                </span>
                <div className="text-7xl md:text-8xl font-extrabold text-jet-black font-jakarta tracking-[-0.07em] leading-none group-hover:scale-105 transition-transform duration-500 origin-left">
                  {highlight.number}
                </div>
                <p className="text-jet-black/40 font-jakarta font-medium text-base max-w-[200px] mt-2">
                  {highlight.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
