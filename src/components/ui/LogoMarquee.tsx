import { TechLogoMark } from "@/components/ui/TechLogoMark";
import { TECH_LOGOS, type TechLogoId } from "@/data/tech-logos";

interface MarqueeItem {
  id: TechLogoId;
  name: string;
}

interface LogoMarqueeProps {
  label: string;
  items?: readonly MarqueeItem[];
}

interface LogoTrackProps {
  items: readonly MarqueeItem[];
  hidden?: boolean;
}

function LogoTrack({ items, hidden = false }: LogoTrackProps) {
  return (
    <span
      className="flex shrink-0 items-center"
      aria-hidden={hidden || undefined}
    >
      {items.map((item) => (
        <span
          key={item.id}
          className="logo-marquee-item flex items-center gap-3 px-7 transition-colors duration-300 md:gap-4 md:px-10"
        >
          <TechLogoMark id={item.id} />
          <span className="whitespace-nowrap font-heading text-xl font-medium tracking-tight md:text-2xl">
            {item.name}
          </span>
        </span>
      ))}
    </span>
  );
}

export function LogoMarquee({ label, items = TECH_LOGOS }: LogoMarqueeProps) {
  return (
    <div
      className="group relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      role="img"
      aria-label={label}
    >
      <span className="flex w-max py-6 will-change-transform animate-logo-marquee group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:animate-none md:py-7">
        <LogoTrack items={items} />
        <LogoTrack items={items} hidden />
      </span>
    </div>
  );
}
