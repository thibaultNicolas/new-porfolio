import type { ReactNode } from "react";

interface HomeDarkFlowProps {
  children: ReactNode;
}

export function HomeDarkFlow({ children }: HomeDarkFlowProps) {
  return (
    <div className="home-dark-flow relative text-fg">
      <div className="home-dark-flow-ambient pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="home-dark-flow-orb home-dark-flow-orb--left-top" />
        <div className="home-dark-flow-orb home-dark-flow-orb--right-mid" />
        <div className="home-dark-flow-orb home-dark-flow-orb--left-mid" />
        <div className="home-dark-flow-orb home-dark-flow-orb--right-low" />
      </div>
      <div className="home-dark-flow-grain pointer-events-none absolute inset-0" aria-hidden="true" />
      {children}
    </div>
  );
}
