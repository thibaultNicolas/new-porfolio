import { cn } from "@/lib/utils";

interface InfoDividerProps {
  className?: string;
}

export function InfoDivider({ className }: InfoDividerProps) {
  return (
    <div
      className={cn("info-divider h-px w-full origin-left scale-x-100 bg-line will-change-transform", className)}
      aria-hidden="true"
    />
  );
}
