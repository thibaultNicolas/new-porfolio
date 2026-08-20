"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, routing, usePathname, useRouter } from "@/i18n/routing";
import { CONTACT_EMAIL } from "@/lib/constants";
import { useHeaderTone } from "@/lib/hooks/useHeaderTone";
import { useTheme } from "@/lib/hooks/useTheme";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const isHome = pathname === "/";
  const sectionTone = useHeaderTone(isHome);
  // Paper nav on oxblood (home hero) and on dark canvas. Ink/fg nav on light canvas.
  const isLight = isHome
    ? sectionTone === "light" || theme === "dark"
    : theme === "dark";

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const navItems = [
    { href: "/projects", label: t("projects") },
    { href: "/services", label: t("stack") },
    { href: "/about", label: t("about") },
    { href: "/#contact", label: t("contact") },
  ];

  const linkClass = isLight
    ? "nav-link pb-0.5 text-[15px] text-paper/85 hover:text-paper"
    : "nav-link pb-0.5 text-[15px] text-fg/55 hover:text-fg";

  const localeClass = (active: boolean): string =>
    cn(
      "min-h-11 uppercase transition-colors duration-300",
      isLight
        ? active
          ? "text-paper"
          : "text-paper/45 hover:text-paper"
        : active
          ? "text-fg"
          : "text-fg/45 hover:text-fg",
    );

  return (
    <>
      <header
        className="absolute inset-x-0 top-0 z-50 w-full border-transparent bg-transparent transition-[background-color,border-color,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20 md:px-12 lg:px-16">
          <Link
            href="/"
            className={cn(
              "font-heading text-xl font-medium tracking-tight transition-colors duration-300 md:text-2xl",
              isLight ? "text-paper" : "text-fg",
            )}
          >
            Thibault.
          </Link>

          <nav className="hidden items-center gap-10 md:flex" aria-label="Primary">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={linkClass}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 md:gap-6">
            <ThemeToggle isHeaderLight={isLight} />

            <div className="flex items-center gap-3 text-xs tracking-widest">
              {routing.locales.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => router.replace(pathname, { locale: item })}
                  className={localeClass(locale === item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="relative flex min-h-11 min-w-11 flex-col items-center justify-center md:hidden"
              aria-label={isOpen ? t("close") : t("open")}
              aria-expanded={isOpen}
              onClick={() => setIsOpen((open) => !open)}
            >
              <span
                className={cn(
                  "block h-px w-6 transition-transform duration-300",
                  isLight ? "bg-paper" : "bg-fg",
                  isOpen && "translate-y-[3px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "mt-1.5 block h-px w-6 transition-transform duration-300",
                  isLight ? "bg-paper" : "bg-fg",
                  isOpen && "-translate-y-[3px] -rotate-45",
                )}
              />
            </button>
          </div>
        </div>
      </header>

      {isOpen ? (
        <div className="fixed inset-0 z-[70] bg-ink px-6 pt-28 text-paper md:hidden">
          <nav aria-label={t("menu")}>
            <ul className="flex flex-col gap-6">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="font-heading text-5xl font-medium tracking-tight"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-lg text-paper/60">
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      ) : null}
    </>
  );
}
