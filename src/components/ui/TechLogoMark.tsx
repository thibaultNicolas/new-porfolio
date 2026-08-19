import type { TechLogoId } from "@/data/tech-logos";
import { cn } from "@/lib/utils";

interface TechLogoMarkProps {
  id: TechLogoId;
  className?: string;
}

export function TechLogoMark({ id, className }: TechLogoMarkProps) {
  const src = `/icons/tech/${id}.svg`;

  return (
    <span
      aria-hidden="true"
      className={cn("inline-block h-8 w-8 shrink-0 bg-current md:h-9 md:w-9", className)}
      style={{
        maskImage: `url(${src})`,
        WebkitMaskImage: `url(${src})`,
        maskRepeat: "no-repeat",
        maskPosition: "center",
        maskSize: "contain",
      }}
    />
  );
}
