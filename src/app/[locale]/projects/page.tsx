// Refined by Gemini for nicolasthibault@hotmail.ca
"use client";

import { useState } from "react";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { projects } from "@/data/projects";
import { Link } from "@/i18n/routing";

export default function AllProjectsPage() {
  const t = useTranslations("projects");
  const locale = useLocale();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Configuration du ressort pour le mouvement fluide
  const springConfig = { stiffness: 150, damping: 20, mass: 0.6 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    // On ajuste l'offset pour que l'image et le curseur soient bien positionnés
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const hoveredProject = projects.find((p) => p.id === hoveredId);

  return (
    <main
      className="bg-white min-h-screen pt-40 pb-40 cursor-none select-none overflow-x-hidden"
      onMouseMove={handleMouseMove}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* Header Dynamique */}
        <header className="mb-32">
          <div className="flex flex-col gap-4">
            <span className="text-brand-blue font-jakarta font-bold uppercase tracking-[0.4em] text-xs">
              {/* Traduction du badge (ex: 00 — FULL DIRECTORY) */}
              00 — {t("viewMore")}
            </span>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-8xl md:text-[12vw] font-extrabold text-brand-navy font-jakarta tracking-[-0.06em] leading-[0.75]"
            >
              {t("portfolio")}
              <span className="text-brand-blue">.</span>
            </motion.h1>
            <p className="mt-8 text-brand-navy/40 font-jakarta max-w-md text-lg italic leading-relaxed">
              {/* Assure-toi d'avoir la clé "subtitle" dans ton JSON projects */}
              {t("subtitle")}
            </p>
          </div>
        </header>

        {/* Liste des projets sous forme de répertoire */}
        <div className="flex flex-col border-t border-brand-navy/10">
          {projects.map((project, index) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group grid grid-cols-1 md:grid-cols-12 gap-4 items-center py-12 border-b border-brand-navy/5 relative z-10"
            >
              {/* Numéro [01] */}
              <div className="col-span-1 hidden md:block">
                <span className="text-sm font-jakarta font-bold text-brand-navy/10 group-hover:text-brand-blue transition-colors">
                  [{index < 9 ? `0${index + 1}` : index + 1}]
                </span>
              </div>

              {/* Titre du projet */}
              <div className="col-span-1 md:col-span-8">
                <div className="flex flex-col gap-1 transition-all duration-500 group-hover:pl-6">
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-brand-navy font-jakarta tracking-[-0.04em]">
                    {project.title}
                  </h2>
                  {/* Role visible sur mobile seulement sous le titre */}
                  <span className="md:hidden text-xs font-bold uppercase tracking-widest text-brand-blue">
                    {project.role}
                  </span>
                </div>
              </div>

              {/* Role / Expertise (Desktop) */}
              <div className="col-span-3 text-right hidden md:block">
                <span className="text-sm font-bold uppercase tracking-widest text-brand-navy/20 font-jakarta group-hover:text-brand-navy/60 transition-colors">
                  {project.role}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* --- MOTEUR DE PREVIEW FLOTTANTE --- */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        <AnimatePresence>
          {hoveredId && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
                x: mouseX.get() - 175, // Centrage horizontal
                y: mouseY.get() - 225, // Centrage vertical
              }}
              exit={{ opacity: 0, scale: 0.9, rotate: 2 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="absolute w-[350px] h-[450px] rounded-3xl overflow-hidden shadow-2xl bg-brand-navy border-[12px] border-white"
            >
              <div className="w-full h-full relative bg-[#F8F9FA] flex items-center justify-center p-8 text-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/20 to-transparent" />
                <h3 className="text-3xl font-black text-brand-navy uppercase tracking-tighter">
                  {hoveredProject?.title}
                </h3>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- CUSTOM CURSOR (AVEC TEXTE DYNAMIQUE) --- */}
      <motion.div
        style={{ x: mouseX, y: mouseY }}
        className="fixed top-0 left-0 w-4 h-4 bg-brand-blue rounded-full z-[60] pointer-events-none mix-blend-difference flex items-center justify-center"
        animate={{
          scale: hoveredId ? 5 : 1,
        }}
      >
        {hoveredId && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[2px] font-bold text-white uppercase tracking-tighter"
          >
            {locale === "fr" ? "Voir" : "View"}
          </motion.span>
        )}
      </motion.div>
    </main>
  );
}
