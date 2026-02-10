// Refined by Gemini for nicolasthibault@hotmail.ca
"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function Process() {
  const t = useTranslations("process");

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

  return (
    <section id="process" className="pt-32 md:pt-48 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* Header : Traduit via t() */}
        <header className="mb-24 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <span className="text-brand-blue font-jakarta font-bold uppercase tracking-[0.4em] text-xs block mb-6">
              04 — {t("badge")}
            </span>
            <h2 className="text-6xl md:text-8xl font-extrabold text-brand-navy font-jakarta tracking-tighter leading-[0.85]">
              {t("title")}
              <span className="text-brand-blue">.</span>
            </h2>
          </div>
          <div className="lg:col-span-4 flex items-end">
            <p className="text-xl text-brand-navy/50 font-jakarta leading-relaxed border-l-2 border-brand-blue/20 pl-6 italic">
              {t("subtitle")}
            </p>
          </div>
        </header>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-24 relative">
          {processSteps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.8 }}
              className="relative group"
            >
              <div className="absolute -top-12 -left-4 text-[130px] font-jakarta font-black text-brand-navy/[0.03] select-none group-hover:text-brand-blue/[0.06] transition-colors duration-700 leading-none">
                {step.number}
              </div>

              <div className="relative z-10 pt-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-[2px] bg-brand-blue scale-x-100 origin-left group-hover:scale-x-[2] transition-transform duration-500 ease-out" />
                  <span className="text-brand-blue font-mono font-bold text-xs uppercase tracking-widest">
                    {t("step_label")}_{step.number}
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-extrabold text-brand-navy font-jakarta mb-4 tracking-tight">
                  {step.title}
                </h3>

                <p className="text-brand-navy/60 font-jakarta font-medium leading-relaxed">
                  {step.description}
                </p>
              </div>

              {idx < 3 && (
                <div className="hidden lg:block absolute top-[60px] -right-6 w-12 h-[1px] bg-brand-navy/10" />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Marquee : Traduit via t() */}
      <div className="mt-40 border-y border-brand-navy/5 py-12 bg-brand-navy/[0.01]">
        <div className="max-w-full overflow-hidden flex">
          <div className="flex gap-16 animate-marquee whitespace-nowrap">
            {[1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className="text-brand-navy/5 font-jakarta font-black text-5xl uppercase tracking-tighter"
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
                className="text-brand-navy/5 font-jakarta font-black text-5xl uppercase tracking-tighter"
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
