import { cn } from "@/lib/utils";

interface SectionKickerProps {
  label: string;
  index?: string;
  variant?: "canvas" | "paper";
  align?: "start" | "center";
  className?: string;
}

export function SectionKicker({
  label,
  index,
  variant = "canvas",
  align = "start",
  className,
}: SectionKickerProps) {
  return (
    <div
      className={cn(
        "section-kicker",
        variant === "paper" && "section-kicker--paper",
        align === "center" && "section-kicker--center",
        className,
      )}
      role="doc-subtitle"
    >
      <div className="section-kicker-row">
        {index ? (
          <span className="section-kicker-index" aria-hidden="true">
            {index}
          </span>
        ) : null}

        <div className="section-kicker-copy">
          <p className="section-kicker-label">{label}</p>
          <span className="section-kicker-rule" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
