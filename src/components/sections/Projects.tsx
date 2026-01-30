"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { projects } from "@/data/projects";
import { fadeInUp, staggerContainer } from "@/lib/utils/animations";

export function Projects() {
  const t = useTranslations("projects");
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <section id="projects" className="section-padding bg-off-white">
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

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={fadeInUp}
                className="group"
              >
                <Link
                  href={project.link || "#"}
                  className="block bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-black transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative h-64 bg-gray-100 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-bold text-gray-300">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                    {/* Overlay on Hover */}
                    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white font-medium">{t("viewProject")}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-black mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>

                    {/* Metadata */}
                    <div className="space-y-3 pt-4 border-t border-gray-100">
                      <div>
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Role
                        </span>
                        <p className="text-sm text-gray-800 mt-1">{project.role}</p>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Impact
                        </span>
                        <p className="text-sm text-gray-800 mt-1">{project.impact}</p>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Stack
                        </span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-gray-50 text-gray-700 rounded text-xs font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span className="px-2 py-1 text-gray-500 text-xs">
                              +{project.technologies.length - 4}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
