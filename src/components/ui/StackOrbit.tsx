"use client";

import { getOrbitRadius, ORBIT_TOOLS } from "@/data/tools-services";
import { TechLogoMark } from "@/components/ui/TechLogoMark";

interface StackOrbitProps {
  centerLabel: string;
  toolLabels: string[];
}

export function StackOrbit({ centerLabel, toolLabels }: StackOrbitProps) {
  return (
    <div className="flex w-full flex-col items-center gap-8">
      <div className="relative aspect-square w-full max-w-[22rem] md:max-w-[26rem]">
        <div
          className="pointer-events-none absolute inset-[5%] rounded-full border border-line"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-[20%] rounded-full border border-line"
          aria-hidden="true"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-[5.5rem] w-[5.5rem] items-center justify-center overflow-hidden rounded-full border border-line bg-stone/10 font-heading text-lg font-medium tracking-tight text-ink md:h-[6.25rem] md:w-[6.25rem] md:text-xl">
            {centerLabel}
          </div>
        </div>

        {ORBIT_TOOLS.map((tool) => {
          const radius = getOrbitRadius(tool.ring);

          return (
            <div
              key={tool.id}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `rotate(${tool.angle}deg) translateY(calc(-1 * ${radius}))`,
              }}
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-paper md:h-[3.25rem] md:w-[3.25rem]"
                style={{
                  transform: `translate(-50%, -50%) rotate(${-tool.angle}deg)`,
                }}
              >
                <TechLogoMark id={tool.id} />
              </div>
            </div>
          );
        })}
      </div>

      <ul className="flex flex-wrap justify-center gap-2">
        {toolLabels.map((label) => (
          <li
            key={label}
            className="rounded-full border border-line bg-paper px-4 py-2 text-sm text-ink"
          >
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}
