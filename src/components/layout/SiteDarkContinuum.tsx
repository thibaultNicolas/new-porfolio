import type { ReactNode } from "react";

interface SiteDarkContinuumProps {
  children: ReactNode;
}

export function SiteDarkContinuum({ children }: SiteDarkContinuumProps) {
  return (
    <div className="site-dark-continuum relative text-fg">
      <div
        className="site-dark-continuum-grain pointer-events-none absolute inset-0"
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
