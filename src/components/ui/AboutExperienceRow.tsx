import { cn } from "@/lib/utils";

export interface AboutExperienceRowProps {
  period: string;
  title: string;
  description: string;
  current?: boolean;
  className?: string;
}

export function AboutExperienceRow({
  period,
  title,
  description,
  current = false,
  className,
}: AboutExperienceRowProps) {
  return (
    <li className={cn("about-experience-row list-none", className)}>
      <article
        className={cn(
          "group/experience grid gap-5 py-8 transition-colors duration-300 md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:gap-x-12 md:py-10 lg:py-12",
          "hover:bg-fg/[0.04] md:px-6 md:-mx-6 md:rounded-2xl",
        )}
      >
        <div className="min-w-0">
          <h3 className="font-heading text-xl font-medium leading-snug tracking-tight text-fg md:text-[1.65rem]">
            {title}
            {current ? (
              <span className="sr-only"> (current role)</span>
            ) : null}
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-fg/55 md:text-base">
            {description}
          </p>
        </div>

        <time
          dateTime={period}
          className="font-heading text-2xl font-medium tracking-tight text-fg md:text-right md:text-[1.75rem] lg:text-[2rem]"
        >
          {period}
        </time>
      </article>
    </li>
  );
}
