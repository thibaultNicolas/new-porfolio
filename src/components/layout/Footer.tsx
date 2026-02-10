// Refined by Gemini for nicolasthibault@hotmail.ca
"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";

const socialLinks = [
  { name: "LinkedIn", href: "https://linkedin.com" },
  { name: "GitHub", href: "https://github.com" },
  { name: "Instagram", href: "https://instagram.com" },
];

export function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-navy text-white pt-32 pb-12 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* TOP SECTION: Title + Multi-column Nav */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Titre Massif (Colonne 1 à 7) */}
          <div className="lg:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-6xl md:text-8xl font-extrabold font-jakarta tracking-[-0.04em] leading-[0.9] text-white"
            >
              {t("cta_title") || "Let's build something great."}
            </motion.h2>
          </div>

          {/* Grouped Navigation (Colonne 8 à 12) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-12 pt-4">
            {/* Column: Site */}
            <div className="space-y-6">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                {t("nav_title") || "Navigation"}
              </h4>
              <nav className="flex flex-col gap-4 font-jakarta font-bold text-lg">
                <Link
                  href="/"
                  className="hover:text-brand-blue transition-colors w-fit"
                >
                  Index
                </Link>
                <Link
                  href="/projects"
                  className="hover:text-brand-blue transition-colors w-fit"
                >
                  Projects
                </Link>
                <Link
                  href="/about"
                  className="hover:text-brand-blue transition-colors w-fit"
                >
                  About
                </Link>
              </nav>
            </div>

            {/* Column: Social */}
            <div className="space-y-6">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                {t("social_title") || "Social"}
              </h4>
              <div className="flex flex-col gap-4 font-jakarta font-bold text-lg">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    className="hover:text-brand-blue transition-colors w-fit"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION: Email & Info */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 pb-24 border-b border-white/10">
          <div className="space-y-4"></div>

          <div className="flex flex-col items-start md:items-end gap-6">
            <p className="text-xl text-white/60 font-jakarta max-w-xs md:text-right italic">
              {t("cta_subtitle") || "Available for freelance projects."}
            </p>
            <a
              href="mailto:nicolasthibault@hotmail.ca"
              className="group text-2xl md:text-4xl font-bold font-jakarta border-b-2 border-brand-blue pb-2 hover:text-brand-blue transition-all"
            >
              nicolasthibault@hotmail.ca
            </a>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 font-jakarta">
          <p>© {currentYear} Nicolas Thibault — Built with Next.js & GSAP</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="hover:text-white transition-colors flex items-center gap-2"
          >
            {t("back_to_top") || "Back to top"}{" "}
            <span className="text-lg">↑</span>
          </button>
        </div>
      </div>

      {/* Decorative Background Text */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none select-none overflow-hidden h-32 md:h-64 flex items-end translate-y-1/3">
        <span className="text-[20vw] font-black text-white/[0.02] leading-none tracking-tighter">
          THIBAULT
        </span>
      </div>
    </footer>
  );
}
