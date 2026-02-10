// Refined by Gemini for nicolasthibault@hotmail.ca
"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { skills } from "@/data/skills";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function TechStack() {
  const t = useTranslations("stack");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".stack-title", {
        y: 30,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".stack-subtitle", {
        y: 20,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
        },
      });

      gsap.from(".stack-card", {
        y: 50,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: ".stack-grid",
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="stack"
      ref={sectionRef}
      className="py-32 md:py-48 overflow-hidden bg-[radial-gradient(1000px_circle_at_15%_10%,rgba(61,90,128,0.12),transparent_55%),radial-gradient(900px_circle_at_80%_70%,rgba(152,193,217,0.22),transparent_55%),linear-gradient(180deg,#ffffff_0%,#eaf2f7_100%)]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <h2 className="stack-title text-5xl md:text-7xl font-extrabold text-jet-black font-jakarta tracking-tighter mb-8">
            {t("title")}
            <span className="text-burnt-peach">.</span>
          </h2>
          <p className="stack-subtitle text-lg md:text-xl text-jet-black/60 font-jakarta leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        <div className="stack-grid grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {skills.map((category, idx) => (
            <div
              key={category.category}
              className="stack-card glass-panel rounded-[40px] p-12 flex flex-col items-center text-center border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-500 group"
            >
              <div className="w-24 h-24 rounded-3xl bg-burnt-peach/10 flex items-center justify-center mb-10 group-hover:bg-burnt-peach group-hover:scale-110 transition-all duration-500">
                <div className="text-burnt-peach group-hover:text-white transition-colors">
                  {category.category === "Frontend" && (
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
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                  )}
                  {category.category === "Backend" && (
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
                      <ellipse cx="12" cy="5" rx="9" ry="3" />
                      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                    </svg>
                  )}
                  {(category.category === "Tools & Others" ||
                    category.category === "Outils & Autres") && (
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
                      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                    </svg>
                  )}
                </div>
              </div>

              <h3 className="text-2xl md:text-3xl font-extrabold text-jet-black font-jakarta mb-6 tracking-tight">
                {category.category}
              </h3>

              <p className="text-jet-black/60 font-jakarta font-medium leading-relaxed text-sm md:text-base">
                {category.items.join(" • ")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
