"use client";

import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fadeInUp, staggerContainer } from "@/lib/utils/animations";

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

    const elements = sectionRef.current.querySelectorAll(".animate-on-scroll");

    elements.forEach((element) => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-padding bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="space-y-16"
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="max-w-3xl">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-black">
              {t("title")}
            </h2>
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p>{t("paragraph1")}</p>
              <p>{t("paragraph2")}</p>
              <p>{t("paragraph3")}</p>
            </div>
          </motion.div>

          {/* Highlights Grid */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="animate-on-scroll group"
              >
                <div className="relative p-8 border border-gray-200 rounded-2xl bg-white hover:border-black transition-all duration-500">
                  <div className="text-5xl font-bold text-black mb-2">
                    {highlight.number}
                  </div>
                  <div className="text-xl font-semibold mb-2 text-black">
                    {highlight.label}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {highlight.description}
                  </div>
                  <div className="absolute inset-0 bg-black/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
