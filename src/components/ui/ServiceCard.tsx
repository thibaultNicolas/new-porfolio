interface ServiceCardProps {
  index: number;
  title: string;
  description: string;
}

export function ServiceCard({ index, title, description }: ServiceCardProps) {
  return (
    <article className="tools-service-card relative rounded-2xl border border-line bg-paper p-6 md:p-7">
      <span className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-line text-xs tabular-nums text-stone">
        {index}
      </span>
      <h3 className="max-w-[14ch] pr-10 font-heading text-xl font-medium tracking-tight text-ink md:text-2xl">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-stone md:text-[15px]">{description}</p>
    </article>
  );
}
