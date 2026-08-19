// Refined by Gemini for nicolasthibault@hotmail.ca
"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Process() {
  const t = useTranslations("process");
  const sectionRef = useRef<HTMLDivElement>(null);

  const processSteps = [
    {
      number: "01",
      title: t("steps.understand.title"),
      description: t("steps.understand.description"),
    },
    {
      number: "02",
      title: t("steps.design.title"),
      description: t("steps.design.description"),
    },
    {
      number: "03",
      title: t("steps.build.title"),
      description: t("steps.build.description"),
    },
    {
      number: "04",
      title: t("steps.deliver.title"),
      description: t("steps.deliver.description"),
    },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".process-header", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".process-card", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".process-grid",
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="pt-32 md:pt-48 overflow-hidden bg-[radial-gradient(1100px_circle_at_10%_20%,rgba(61,90,128,0.12),transparent_55%),radial-gradient(900px_circle_at_90%_0%,rgba(152,193,217,0.22),transparent_55%),linear-gradient(180deg,#ffffff_0%,#eaf2f7_100%)]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <header className="process-header mb-24 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <span className="text-burnt-peach font-jakarta font-bold uppercase tracking-[0.4em] text-xs block mb-6">
              04 · {t("badge")}
            </span>
            <h2 className="text-6xl md:text-8xl font-extrabold text-jet-black font-jakarta tracking-tighter leading-[0.85]">
              {t("title")}
              <span className="text-burnt-peach">.</span>
            </h2>
          </div>
          <div className="lg:col-span-4 flex items-end">
            <p className="text-xl text-jet-black/50 font-jakarta leading-relaxed border-l-2 border-burnt-peach/20 pl-6 italic">
              {t("subtitle")}
            </p>
          </div>
        </header>

        <div className="process-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-24 relative">
          {processSteps.map((step, idx) => (
            <div key={step.number} className="process-card relative group">
              <div className="absolute -top-10 -left-4 text-[120px] font-jakarta font-black text-jet-black/[0.03] select-none group-hover:text-burnt-peach/[0.08] transition-colors duration-700 leading-none">
                {step.number}
              </div>

              <div className="relative z-10 pt-8 glass-panel rounded-[28px] p-8 md:p-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-[2px] bg-burnt-peach scale-x-100 origin-left group-hover:scale-x-[2] transition-transform duration-500 ease-out" />
                  <span className="text-burnt-peach font-mono font-bold text-xs uppercase tracking-widest">
                    {t("step_label")}_{step.number}
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-extrabold text-jet-black font-jakarta mb-4 tracking-tight">
                  {step.title}
                </h3>

                <p className="text-jet-black/60 font-jakarta font-medium leading-relaxed">
                  {step.description}
                </p>
              </div>

              {idx < 3 && (
                <div className="hidden lg:block absolute top-[60px] -right-6 w-12 h-[1px] bg-jet-black/10" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-40 border-y border-jet-black/5 py-12 bg-jet-black/[0.01]">
        <div className="max-w-full overflow-hidden flex">
          <div className="flex gap-16 animate-marquee whitespace-nowrap">
            {[1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className="text-jet-black/5 font-jakarta font-black text-5xl uppercase tracking-tighter"
              >
                {t("marquee_text")}
              </span>
            ))}
          </div>
          <div
            className="flex gap-16 animate-marquee whitespace-nowrap"
            aria-hidden="true"
          >
            {[1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className="text-jet-black/5 font-jakarta font-black text-5xl uppercase tracking-tighter"
              >
                {t("marquee_text")}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
