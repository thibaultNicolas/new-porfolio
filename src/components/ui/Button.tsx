"use client";

import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "cta";
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  variant = "primary",
  onClick,
  className,
  type = "button",
}: ButtonProps) {
  const variantClasses = {
    primary: "bg-[#3E5C76] text-[#F0EBD8] hover:bg-[#748CAB]",
    secondary: "bg-[#1D2D44] text-[#F0EBD8] hover:bg-[#3E5C76]",
    cta: "bg-[#3E5C76] text-[#F0EBD8] hover:bg-[#748CAB] font-medium",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-3xl transition-colors",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </button>
  );
}
