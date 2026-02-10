// Refined by Gemini for nicolasthibault@hotmail.ca
"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";
import { projects } from "@/data/projects";
import { Link } from "@/i18n/routing";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Projects() {
  const t = useTranslations("projects");
  const container = useRef<HTMLDivElement>(null);

  // On ne prend que les 5 premiers projets mis en avant
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 5);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>(".project-item");
      items.forEach((item) => {
        const image = item.querySelector(".project-image");
        gsap.fromTo(
          image,
          { scale: 1.15, y: -30 },
          {
            scale: 1,
            y: 30,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: container },
  );

  return (
    <section ref={container} className="bg-white py-32 lg:py-48">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <h2 className="text-7xl md:text-9xl font-extrabold text-brand-navy font-jakarta tracking-[-0.06em] mb-32">
          {t("title")}
        </h2>

        <div className="flex flex-col gap-40 mb-32">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`project-item flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 lg:gap-24 items-center`}
            >
              {/* Image Container */}
              <div className="w-full lg:w-3/5 aspect-[16/10] rounded-[40px] overflow-hidden relative group bg-[#F8F9FA]">
                <div className="project-image absolute inset-0 flex items-center justify-center">
                  <span className="text-9xl font-bold text-brand-navy/[0.05]">
                    {index + 1}
                  </span>
                </div>
                <div className="absolute inset-0 bg-brand-blue/90 opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 flex items-center justify-center">
                  <Link
                    href={`/projects/${project.id}`}
                    className="text-white font-jakarta font-bold text-xl uppercase tracking-widest"
                  >
                    {t("viewProject")}
                  </Link>
                </div>
              </div>

              {/* Text Content */}
              <div className="w-full lg:w-2/5 space-y-6">
                <h3 className="text-4xl md:text-6xl font-extrabold text-brand-navy font-jakarta tracking-tighter leading-none">
                  {project.title}
                </h3>
                <p className="text-lg text-brand-navy/60 font-medium font-jakarta leading-relaxed">
                  {project.description}
                </p>
                <div className="text-xs font-bold uppercase tracking-widest text-brand-blue/60">
                  {project.role}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BOUTON VERS TOUS LES PROJETS */}
        <div className="flex justify-center mt-20">
          <Link
            href="/projects"
            className="group relative inline-flex items-center gap-6 px-14 py-7 bg-brand-navy text-white rounded-full overflow-hidden transition-all duration-500 hover:scale-105"
          >
            {/* Effet de remplissage au hover (Background liquide) */}
            <div className="absolute inset-0 bg-brand-blue translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1]" />

            <span className="relative z-10 font-jakarta font-bold text-lg uppercase tracking-[0.2em]">
              {t("viewMore")} ({projects.length})
            </span>

            <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full border border-white/20 group-hover:border-white/50 transition-colors">
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
