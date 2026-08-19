import Image from "next/image";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export interface ProjectCardItem {
  id: string;
  title: string;
  href: string;
  image: string;
  category: string;
  description: string;
}

interface ProjectCardProps {
  item: ProjectCardItem;
  className?: string;
  external?: boolean;
  aspectClass?: string;
}

export function ProjectCard({
  item,
  className,
  external = true,
  aspectClass = "aspect-[4/3]",
}: ProjectCardProps) {
  const linkClassName = "block focus-visible:outline-offset-4";

  const content = (
    <>
        <div className={cn("relative overflow-hidden rounded-3xl bg-line", aspectClass)}>
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover grayscale transition-[transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] group-hover:grayscale-0 group-focus-visible:scale-[1.03] group-focus-visible:grayscale-0 motion-reduce:grayscale-0 motion-reduce:transition-none"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-paper via-paper/20 to-transparent"
            aria-hidden="true"
          />
          <span className="absolute left-4 top-4 rounded-full bg-paper px-3 py-1 text-xs tracking-wide text-ink">
            {item.category}
          </span>
        </div>

        <h3 className="mt-5 font-heading text-xl font-medium tracking-tight text-ink transition-colors duration-300 group-hover:text-accent md:text-2xl">
          {item.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-base leading-relaxed text-stone">
          {item.description}
        </p>
    </>
  );

  return (
    <article className={cn("projects-animate group", className)}>
      {external ? (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
        >
          {content}
        </a>
      ) : (
        <Link href={item.href} className={linkClassName}>
          {content}
        </Link>
      )}
    </article>
  );
}
