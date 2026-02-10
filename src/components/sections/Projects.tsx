// Refined by Gemini for nicolasthibault@hotmail.ca
"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";
import { projects } from "@/data/projects";
import Image from "next/image";
import { Link } from "@/i18n/routing";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Projects() {
  // tGeneral pour les clés dynamiques des projets, tSection pour les labels fixes
  const t = useTranslations();
  const container = useRef<HTMLDivElement>(null);

  const featuredProjects = projects.filter((p) => p.featured).slice(0, 5);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>(".project-item");
      items.forEach((item) => {
        const image = item.querySelector(".project-image");
        const card = item.querySelector(".project-card");

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

        if (card) {
          gsap.from(card, {
            y: 40,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 75%",
            },
          });
        }
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="py-32 lg:py-48 bg-[radial-gradient(1100px_circle_at_20%_20%,rgba(61,90,128,0.12),transparent_60%),radial-gradient(900px_circle_at_90%_70%,rgba(152,193,217,0.22),transparent_55%),linear-gradient(180deg,#ffffff_0%,#eaf2f7_100%)]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* Utilise une clé fixe pour le titre de la section */}
        <h2 className="text-7xl md:text-9xl font-extrabold text-jet-black font-jakarta tracking-[-0.06em] mb-32">
          {t("projects.title")}
        </h2>

        <div className="flex flex-col gap-40 mb-32">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`project-item flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-12 lg:gap-24 items-center`}
            >
              {/* Image Container */}
              <div className="w-full lg:w-3/5 aspect-[16/10] rounded-[40px] overflow-hidden relative group glass-panel bg-white/20 border border-white/50 shadow-xl">
                <div className="project-image absolute inset-0">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    priority={index === 0}
                  />
                </div>
                <div className="absolute inset-0 bg-dusk-blue/90 opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 flex items-center justify-center">
                  <Link
                    href={`/projects/${project.id}`}
                    className="text-white font-jakarta font-bold text-xl uppercase tracking-widest"
                  >
                    {t("projects.viewProject")}
                  </Link>
                </div>
              </div>

              {/* Text Content */}
              <div className="project-card w-full lg:w-2/5 space-y-6 glass-panel rounded-[32px] p-8 md:p-10 bg-white/40 backdrop-blur-md border border-white/60 shadow-lg">
                <h3 className="text-4xl md:text-6xl font-extrabold text-dusk-blue font-jakarta tracking-tighter leading-none">
                  {project.title}
                </h3>

                {/* Traduction dynamique de la description */}
                <p className="text-lg text-jet-black/70 font-medium font-jakarta leading-relaxed">
                  {t(project.descriptionKey)}
                </p>

                {/* Traduction dynamique du rôle */}
                <div className="text-xs font-bold uppercase tracking-widest text-dusk-blue/80">
                  {t(project.roleKey)}
                </div>

                {/* Tags de technos (données brutes) */}
                <div className="flex flex-wrap gap-2 pt-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-white/50 text-dusk-blue text-[10px] font-bold rounded-full border border-dusk-blue/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BOUTON VERS TOUS LES PROJETS */}
        <div className="flex justify-center mt-20">
          <Link
            href="/projects"
            className="group relative inline-flex items-center gap-6 px-14 py-7 bg-dusk-blue text-white rounded-full overflow-hidden transition-all duration-500 hover:scale-105"
          >
            <div className="absolute inset-0 bg-powder-blue translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1]" />

            <span className="relative z-10 font-jakarta font-bold text-lg uppercase tracking-[0.2em]">
              {t("projects.viewMore")} ({projects.length})
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
