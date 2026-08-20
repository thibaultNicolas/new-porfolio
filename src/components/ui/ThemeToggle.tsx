"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "@/lib/hooks/useTheme";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  isHeaderLight?: boolean;
  className?: string;
}

export function ThemeToggle({ isHeaderLight = false, className }: ThemeToggleProps) {
  const t = useTranslations("theme");
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? t("light") : t("dark")}
      className={cn(
        "inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        isHeaderLight
          ? "border-paper/20 text-paper hover:border-paper/40 hover:bg-paper/10 focus-visible:outline-paper"
          : "border-fg/15 text-fg hover:border-fg/30 hover:bg-fg/5 focus-visible:outline-fg",
        className,
      )}
    >
      {isDark ? (
        <SunIcon className="h-[18px] w-[18px]" />
      ) : (
        <MoonIcon className="h-[18px] w-[18px]" />
      )}
    </button>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true" fill="none">
      <circle cx="10" cy="10" r="3.25" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M10 2.5v1.75M10 15.75V17.5M17.5 10h-1.75M4.25 10H2.5M15.05 4.95l-1.24 1.24M6.19 13.81l-1.24 1.24M15.05 15.05l-1.24-1.24M6.19 6.19 4.95 4.95"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true" fill="none">
      <path
        d="M15.8 12.2a5.75 5.75 0 0 1-7-7 6.25 6.25 0 1 0 7 7Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
