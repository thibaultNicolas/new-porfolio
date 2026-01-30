"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { skills } from "@/data/skills";
import { fadeInUp, staggerContainer } from "@/lib/utils/animations";

export function TechStack() {
  const t = useTranslations("stack");

  return (
    <section id="stack" className="section-padding bg-off-white">
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

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map((skill, categoryIndex) => (
              <motion.div
                key={skill.category}
                variants={fadeInUp}
                className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-black transition-all duration-300"
              >
                <h3 className="text-2xl font-bold mb-6 text-black">
                  {skill.category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {skill.items.map((item, itemIndex) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: categoryIndex * 0.1 + itemIndex * 0.05,
                      }}
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-2 bg-gray-50 text-gray-800 rounded-lg text-sm font-medium hover:bg-black hover:text-white transition-colors cursor-default"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
