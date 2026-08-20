import type { AboutPageEducation, AboutPageRole } from "@/components/sections/AboutPage";

export function AboutRoleBlock({ role }: { role: AboutPageRole }) {
  return (
    <li className="list-none py-10 md:py-12">
      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:gap-x-12">
        <h3 className="font-heading text-xl font-medium leading-snug tracking-tight text-fg md:text-[1.65rem]">
          {role.title}
          {role.current ? <span className="sr-only"> (current role)</span> : null}
        </h3>
        <time className="font-heading text-lg font-medium tracking-tight text-fg/70 md:text-right md:text-xl">
          {role.period}
        </time>
      </div>
      <ul className="mt-6 max-w-[62ch] space-y-3">
        {role.points.map((point) => (
          <li key={point} className="flex gap-3 text-base leading-relaxed text-fg/70">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
            {point}
          </li>
        ))}
      </ul>
    </li>
  );
}

export function AboutEducationBlock({ item }: { item: AboutPageEducation }) {
  return (
    <li className="list-none py-10 md:py-12">
      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:gap-x-12">
        <div>
          <h3 className="font-heading text-xl font-medium leading-snug tracking-tight text-fg md:text-[1.65rem]">
            {item.title}
          </h3>
          {item.school ? <p className="mt-2 text-sm text-fg/55">{item.school}</p> : null}
        </div>
        <time className="font-heading text-lg font-medium tracking-tight text-fg/70 md:text-right md:text-xl">
          {item.period}
        </time>
      </div>
      <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-fg/70">{item.summary}</p>
    </li>
  );
}
