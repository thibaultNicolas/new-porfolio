import { cn } from "@/lib/utils";

interface InfoSectionProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

export function InfoSection({ label, children, className }: InfoSectionProps) {
  return (
    <div className={cn("info-block", className)}>
      <p className="info-label info-animate mb-6 text-sm tracking-wide text-stone">
        <span aria-hidden="true">↳ </span>
        {label}
      </p>
      {children}
    </div>
  );
}
