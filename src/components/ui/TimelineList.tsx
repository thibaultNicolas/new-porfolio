import { cn } from "@/lib/utils";

export interface TimelineEntry {
  id: string;
  period: string;
  title: string;
  role?: string;
  description: string;
  current?: boolean;
}

interface TimelineListProps {
  items: TimelineEntry[];
  className?: string;
}

interface TimelineItemProps {
  item: TimelineEntry;
  isLast: boolean;
}

function TimelineItem({ item, isLast }: TimelineItemProps) {
  const hasRole = Boolean(item.role);
  const leftTitle = hasRole ? item.title : item.period;
  const leftMeta = hasRole ? item.period : undefined;
  const rightTitle = item.role ?? item.title;

  return (
    <li
      className={cn(
        "grid grid-cols-[1.5rem_minmax(0,1fr)] gap-x-4 gap-y-4 pb-12",
        "md:grid-cols-[minmax(11rem,18rem)_2.5rem_minmax(0,1fr)] md:gap-x-6 md:gap-y-0",
        "lg:grid-cols-[minmax(13rem,20rem)_3rem_minmax(0,1fr)] lg:gap-x-8 lg:pb-16",
        isLast && "pb-0 lg:pb-0",
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "relative col-start-1 row-start-1 row-span-2 flex flex-col items-center self-stretch",
          "md:col-start-2 md:row-span-1",
          !isLast && "-mb-12 lg:-mb-16",
        )}
      >
        <span
          className={cn(
            "relative z-10 mt-1.5 h-3 w-3 shrink-0 rounded-full",
            item.current ? "bg-ink ring-4 ring-ink/15" : "bg-ink",
          )}
        />
        <span className="absolute top-2 bottom-0 w-px bg-ink/20" />
      </div>

      <div className="col-start-2 row-start-1 md:col-start-1">
        <p className="font-heading text-lg font-medium tracking-tight text-ink md:text-xl">
          {leftTitle}
        </p>
        {leftMeta ? (
          <p className="mt-1 text-sm text-stone">{leftMeta}</p>
        ) : null}
      </div>

      <div className="col-start-2 row-start-2 md:col-start-3 md:row-start-1">
        <h3 className="font-heading text-xl font-medium tracking-tight text-ink md:text-2xl">
          {rightTitle}
        </h3>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone md:text-base">
          {item.description}
        </p>
      </div>
    </li>
  );
}

export function TimelineList({ items, className }: TimelineListProps) {
  return (
    <ol className={cn(className)}>
      {items.map((item, index) => (
        <TimelineItem
          key={item.id}
          item={item}
          isLast={index === items.length - 1}
        />
      ))}
    </ol>
  );
}
