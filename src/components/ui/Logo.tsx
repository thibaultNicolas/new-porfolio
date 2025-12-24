import Link from "next/link";

import { cn } from "@/lib/utils";

interface LogoProps {
  href?: string;
  onClick?: () => void;
  className?: string;
  mainText?: string;
  subText?: string;
  subTextColor?: string;
  layout?: "horizontal" | "vertical";
}

export default function Logo({
  href = "/",
  onClick,
  className,
  mainText = "THIBAULT.",
  subText,
  subTextColor = "text-[#748CAB]",
  layout = "horizontal",
}: LogoProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 text-[#F0EBD8] uppercase font-bold transition-opacity hover:opacity-80",
        layout === "vertical" && "flex-col gap-0",
        className
      )}
      onClick={onClick}
    >
      <span>{mainText}</span>
      {subText && (
        <span className={cn("text-sm leading-tight", subTextColor)}>
          {subText}
        </span>
      )}
    </Link>
  );
}
