// Refined by Claude for nicolasthibault@hotmail.ca
"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      {/* Gradient background — white top-left, blue bottom-right */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, white 35%, rgba(191,219,254,0.4) 45%, rgba(96,165,250,0.75) 80%, rgba(59,130,246,0.85) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Blue stippled grain overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none mix-blend-overlay opacity-[0.85]"
        aria-hidden="true"
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="3"
              numOctaves="10"
              stitchTiles="stitch"
            />
          </filter>

          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col justify-center min-h-screen">
        {/* Greeting + accent line — tight spacing */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-8 md:mb-10"
        >
          <p className="text-lg md:text-2xl font-medium text-[#2B35AF] mb-3 font-[family-name:var(--font-plus-jakarta)]">
            {t("greeting")}
          </p>
          <div className="w-36 h-[2px] bg-[#2B35AF]" aria-hidden="true" />
        </motion.div>

        {/* Main headline — massive, extrabold, geometric */}
        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-[-0.05em] leading-[0.88] text-[#2B35AF] max-w-5xl font-jakarta"
        >
          {t("headline")}
        </motion.h1>
      </div>
    </section>
  );
}
