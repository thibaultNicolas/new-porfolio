import type { ReactNode } from "react";
import { HeroIntro, type HeroIntroCopy } from "@/components/sections/HeroIntro";
import { LogoMarquee } from "@/components/ui/LogoMarquee";

interface HeroMotionCopy extends HeroIntroCopy {
  marqueeLabel: string;
}

export function HeroMotion({
  copy,
  children,
}: {
  copy: HeroMotionCopy;
  children: ReactNode;
}) {
  return (
    <section
      id="home"
      className="hero-shell relative flex min-h-dvh flex-col overflow-x-hidden text-fg"
    >
      <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 items-start gap-10 px-6 pb-8 pt-[calc(4rem+2.5rem)] md:px-12 md:pt-[calc(5rem+3rem)] lg:grid-cols-12 lg:items-center lg:gap-12 lg:px-16 lg:pt-[calc(5rem+3.5rem)]">
        <div className="lg:col-span-7">
          <HeroIntro copy={copy} />
        </div>
        <div className="mx-auto w-full max-w-sm lg:col-span-5 lg:mx-0 lg:max-w-md lg:justify-self-end">
          {children}
        </div>
      </div>

      <div className="relative z-10 w-full pb-8 md:pb-10">
        <LogoMarquee label={copy.marqueeLabel} />
      </div>
    </section>
  );
}
