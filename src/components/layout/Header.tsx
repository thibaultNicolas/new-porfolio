// Refined by Gemini for nicolasthibault@hotmail.ca
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter, Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Menu mis à jour avec les vraies routes
  const navItems = [
    { href: "/", label: t("home"), isAnchor: true },
    { href: "/projects", label: t("projects"), isAnchor: false },
    { href: "/about", label: t("about"), isAnchor: false },
    { href: "/#experience", label: t("experience"), isAnchor: true },
  ];

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <>
      {/* Logo / Nom - Optionnel mais recommandé pour la nav */}
      <div className="fixed top-10 left-10 md:left-16 z-50 pointer-events-auto">
        <Link
          href="/"
          className="text-brand-navy font-jakarta font-black text-xl tracking-tighter"
        >
          Thibault<span className="text-brand-blue">.</span>
        </Link>
      </div>

      {/* Hamburger Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed top-10 right-10 md:top-12 md:right-16 z-50 flex flex-col gap-[7px] p-2 group"
        aria-label="Open menu"
      >
        <span className="block w-9 h-[2px] bg-brand-navy group-hover:w-6 transition-all duration-300" />
        <span className="block w-5 h-[2px] bg-brand-navy group-hover:w-9 transition-all duration-300" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-brand-navy/10 backdrop-blur-md"
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full md:w-[450px] bg-white shadow-2xl flex flex-col"
            >
              {/* Header Drawer */}
              <div className="flex justify-between items-center p-10 md:p-16">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-navy/30">
                  Menu
                </span>
                <button onClick={() => setIsOpen(false)} className="group p-2">
                  <div className="relative w-6 h-6">
                    <span className="absolute top-1/2 left-0 w-6 h-[2px] bg-brand-navy rotate-45" />
                    <span className="absolute top-1/2 left-0 w-6 h-[2px] bg-brand-navy -rotate-45" />
                  </div>
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 px-10 md:px-16 flex flex-col justify-center">
                <ul className="space-y-4">
                  {navItems.map((item, index) => {
                    const isActive = pathname === item.href;
                    return (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "group flex items-center gap-4 text-4xl md:text-6xl font-extrabold tracking-tighter font-jakarta transition-all",
                            isActive
                              ? "text-brand-blue"
                              : "text-brand-navy hover:text-brand-blue",
                          )}
                        >
                          <span className="text-xs font-bold font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                            0{index + 1}
                          </span>
                          {item.label}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              {/* Footer Drawer */}
              <div className="p-10 md:p-16 flex flex-col gap-8">
                <div className="h-[1px] bg-brand-navy/5" />

                <div className="flex justify-between items-center">
                  {/* Lang Switcher */}
                  <div className="flex items-center gap-4">
                    {["fr", "en"].map((l) => (
                      <button
                        key={l}
                        onClick={() => switchLocale(l)}
                        className={cn(
                          "text-xs font-bold tracking-widest transition-colors",
                          locale === l
                            ? "text-brand-blue"
                            : "text-brand-navy/30 hover:text-brand-navy",
                        )}
                      >
                        {l.toUpperCase()}
                      </button>
                    ))}
                  </div>

                  {/* Socials rapides */}
                  <div className="flex gap-4">
                    <a
                      href="https://github.com"
                      target="_blank"
                      className="text-[10px] font-bold uppercase tracking-widest text-brand-navy/40 hover:text-brand-blue"
                    >
                      Github
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      className="text-[10px] font-bold uppercase tracking-widest text-brand-navy/40 hover:text-brand-blue"
                    >
                      Linkedin
                    </a>
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
