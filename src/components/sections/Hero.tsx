// Refined by Claude for nicolasthibault@hotmail.ca
"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export function Hero() {
  const t = useTranslations("hero");
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-kicker", { y: 24, opacity: 0, duration: 0.8 })
        .from(".hero-line", { scaleX: 0, transformOrigin: "left center", duration: 0.6 }, "-=0.35")
        .from(".hero-title", { y: 40, opacity: 0, duration: 1.1 }, "-=0.25");

      gsap.to(".hero-orb", {
        y: 18,
        x: -10,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 1.2,
      });
    },
    { scope: container },
  );

  return (
    <section
      id="home"
      ref={container}
      className="relative min-h-screen overflow-hidden bg-white"
    >
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px circle at 15% 10%, rgba(61,90,128,0.22), transparent 60%), radial-gradient(1000px circle at 80% 30%, rgba(152,193,217,0.35), transparent 55%), linear-gradient(135deg, #ffffff 0%, #eaf2f7 55%, #e0fbfc 100%)",
        }}
        aria-hidden="true"
      />

      {/* Floating orbs */}
      <div
        className="hero-orb absolute -top-10 -left-10 w-56 h-56 rounded-full bg-powder-blue/30 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="hero-orb absolute top-24 right-10 w-72 h-72 rounded-full bg-light-cyan/70 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="hero-orb absolute bottom-10 left-1/3 w-80 h-80 rounded-full bg-burnt-peach/20 blur-[80px]"
        aria-hidden="true"
      />

      {/* Grain overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none mix-blend-overlay opacity-[0.5]"
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
        <div className="mb-8 md:mb-10">
          <p className="hero-kicker text-lg md:text-2xl font-medium text-dusk-blue mb-3 font-[family-name:var(--font-plus-jakarta)]">
            {t("greeting")}
          </p>
          <div className="hero-line w-36 h-[2px] bg-dusk-blue" aria-hidden="true" />
        </div>

        <h1 className="hero-title text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-[-0.05em] leading-[0.88] text-dusk-blue max-w-5xl font-jakarta">
          {t("headline")}
        </h1>
      </div>
    </section>
  );
}
