import Link from "next/link";

import { cn } from "@/lib/utils";

interface LogoProps {
  href?: string;
  onClick?: () => void;
  className?: string;
  mainText?: string;
}

export default function Logo({
  href = "/",
  onClick,
  className,
  mainText = "THIBAULT",
}: LogoProps) {
  return (
    <Link
      href={href}
      className={cn(
        "logo-text text-[#F0EBD8] text-3xl uppercase font-bold transition-opacity hover:opacity-80",
        className
      )}
      onClick={onClick}
    >
      {mainText}
    </Link>
  );
}
