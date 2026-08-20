"use client";

export function BackToTop({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="min-h-11 text-sm text-current/60 transition-colors duration-200 hover:text-current"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      {label}
    </button>
  );
}
