// Refined by Gemini for nicolasthibault@hotmail.ca
"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { skills } from "@/data/skills";

export function TechStack() {
  const t = useTranslations("stack");

  return (
    <section
      id="stack"
      className="py-32 md:py-48 bg-brand-navy/[0.02] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* Header : Plus Jakarta Sans & Ton Navy */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-extrabold text-brand-navy font-jakarta tracking-tighter mb-8"
          >
            {t("title")}
            <span className="text-brand-blue">.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-brand-navy/60 font-jakarta leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        {/* Grille Statique : 3 colonnes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {skills.map((category, idx) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: idx * 0.1,
                duration: 0.8,
                ease: [0.21, 1, 0.36, 1],
              }}
              className="bg-white rounded-[40px] p-12 flex flex-col items-center text-center border border-brand-navy/5 shadow-sm hover:shadow-xl hover:border-brand-blue/20 transition-all duration-500 group"
            >
              {/* Icône avec ton Brand Blue */}
              <div className="w-24 h-24 rounded-3xl bg-brand-blue/5 flex items-center justify-center mb-10 group-hover:bg-brand-blue group-hover:scale-110 transition-all duration-500">
                <div className="text-brand-blue group-hover:text-white transition-colors">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                  </svg>
                </div>
              </div>

              {/* Titre Catégorie */}
              <h3 className="text-2xl md:text-3xl font-extrabold text-brand-navy font-jakarta mb-6 tracking-tight">
                {category.category}
              </h3>

              {/* Liste des technos */}
              <p className="text-brand-navy/60 font-jakarta font-medium leading-relaxed text-sm md:text-base">
                {category.items.join(" • ")}
              </p>

              {/* Bas de carte : Juste le bouton interactif épuré */}
              <div className="mt-8 pt-8 border-t border-brand-navy/5 w-full flex justify-center items-center">
                <div className="w-10 h-10 rounded-full border border-brand-navy/10 flex items-center justify-center text-brand-navy/30 group-hover:border-brand-blue group-hover:text-brand-blue group-hover:rotate-90 transition-all duration-500">
                  <span className="text-xl font-light">+</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
