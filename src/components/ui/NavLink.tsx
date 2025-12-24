import Link from "next/link";

import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  label: string;
  onClick?: () => void;
  className?: string;
  variant?: "desktop" | "mobile";
  isActive?: boolean;
  hasDropdown?: boolean;
}

export default function NavLink({
  href,
  label,
  onClick,
  className,
  variant = "desktop",
  isActive = false,
  hasDropdown = false,
}: NavLinkProps) {
  const baseClasses =
    variant === "desktop"
      ? cn(
          "text-md font-light text-[#F0EBD8] px-3 py-1.5 rounded-full transition-all",
          isActive
            ? "bg-[#1D2D44]/50 text-[#F0EBD8]"
            : "hover:bg-[#1D2D44]/30 hover:text-[#F0EBD8]"
        )
      : "block py-4 text-lg font-normal text-white transition-all duration-300 hover:text-[#F0EBD8] rounded-lg px-4 hover:bg-[#3E5C76]/30";

  return (
    <Link href={href} className={cn(baseClasses, className)} onClick={onClick}>
      <span className="flex items-center gap-1">
        {label}
        {hasDropdown && (
          <svg
            className="w-3 h-3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </span>
    </Link>
  );
}
