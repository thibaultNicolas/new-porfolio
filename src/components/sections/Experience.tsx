"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { experience } from "@/data/experience";
import { fadeInUp, staggerContainer } from "@/lib/utils/animations";

export function Experience() {
  const t = useTranslations("experience");

  return (
    <section id="experience" className="section-padding bg-white">
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

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200" />

            {/* Timeline Items */}
            <div className="space-y-12">
              {experience.map((exp, index) => {
                const expT = t.raw(`items.${exp.id}`);
                const description = expT?.description || exp.description;
                
                return (
                  <motion.div
                    key={exp.id}
                    variants={fadeInUp}
                    className="relative pl-20 md:pl-0 md:flex md:items-start md:gap-12"
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-6 md:left-1/2 w-4 h-4 -translate-x-1/2 bg-black rounded-full border-4 border-white z-10" />

                    {/* Content */}
                    <div
                      className={`md:w-1/2 ${
                        index % 2 === 0 ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"
                      }`}
                    >
                      <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-black transition-all duration-300">
                        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-2 mb-4">
                          <h3 className="text-2xl font-bold text-black">
                            {expT?.role || exp.role}
                          </h3>
                          <span className="text-sm text-gray-600 font-medium">
                            {expT?.period || exp.period}
                          </span>
                        </div>
                        <p className="text-lg font-semibold text-gray-800 mb-4">
                          {expT?.company || exp.company}
                        </p>
                        <ul className="space-y-2">
                          {Array.isArray(description) ? description.map((item: string, itemIndex: number) => (
                            <li
                              key={itemIndex}
                              className="text-gray-700 text-sm leading-relaxed"
                            >
                              • {item}
                            </li>
                          )) : exp.description.map((item, itemIndex) => (
                            <li
                              key={itemIndex}
                              className="text-gray-700 text-sm leading-relaxed"
                            >
                              • {item}
                            </li>
                          ))}
                        </ul>
                        {exp.technologies && (
                          <div className="mt-6 pt-6 border-t border-gray-100">
                            <div className="flex flex-wrap gap-2">
                              {exp.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-3 py-1 bg-gray-50 text-gray-700 rounded-lg text-xs font-medium"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
