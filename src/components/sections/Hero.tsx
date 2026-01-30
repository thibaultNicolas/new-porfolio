"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/Button";
import { fadeInUp, textReveal, textRevealChar } from "@/lib/utils/animations";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Hero() {
  const t = useTranslations("hero");
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!backgroundRef.current) return;

    // Subtle parallax effect on background
    gsap.to(backgroundRef.current, {
      y: 50,
      scrollTrigger: {
        trigger: backgroundRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white"
    >
      {/* Subtle Animated Background */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 opacity-[0.02]"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-black rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-black rounded-full blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-32">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center space-y-8"
        >
          {/* Main Headline */}
          <motion.h1
            variants={textReveal}
            className="text-balance font-bold leading-[1.1] text-black"
          >
            {t("headline").split(" ").map((word, index) => (
              <span key={index} className="inline-block mr-3">
                {word.split("").map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    variants={textRevealChar}
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </span>
            ))}
            <br />
            <motion.span
              variants={textReveal}
              className="gradient-text inline-block mt-4"
            >
              {t("headline2").split("").map((char, index) => (
                <motion.span
                  key={index}
                  variants={textRevealChar}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto font-light"
          >
            {t("subheadline")}
            <br />
            <span className="text-black font-medium">{t("role")}</span>{" "}
            {t("specialization")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
            <Button variant="primary" size="lg" as="a" href="#projects">
              {t("ctaPrimary")}
            </Button>
            <Button variant="secondary" size="lg" as="a" href="#contact">
              {t("ctaSecondary")}
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-black rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
