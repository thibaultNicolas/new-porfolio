"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const socialLinks = [
  { name: "GitHub", href: "https://github.com", icon: "G" },
  { name: "LinkedIn", href: "https://linkedin.com", icon: "L" },
  { name: "Email", href: "mailto:contact@example.com", icon: "E" },
];

export function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Name & Role */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-black mb-1">
              Nicolas Thibault
            </h3>
            <p className="text-sm text-gray-600">{t("role")}</p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-700 hover:border-black hover:text-black transition-colors"
                aria-label={link.name}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-500 text-center md:text-right">
            © {currentYear} Nicolas Thibault. {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
