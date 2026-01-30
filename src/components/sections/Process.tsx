"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { fadeInUp, staggerContainer } from "@/lib/utils/animations";

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
    <section id="process" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="space-y-12"
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center max-w-2xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold mb-4 text-black">
              {t("title")}
            </h2>
            <p className="text-lg text-gray-600">
              {t("subtitle")}
            </p>
          </motion.div>

          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step) => (
              <motion.div
                key={step.number}
                variants={fadeInUp}
                className="group"
              >
                <div className="bg-white border border-gray-200 rounded-2xl p-8 h-full hover:border-black transition-all duration-300">
                  <div className="text-6xl font-bold text-gray-100 mb-4 group-hover:text-black transition-colors">
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
