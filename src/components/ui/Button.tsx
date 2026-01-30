"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BaseButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}

interface ButtonAsButton extends BaseButtonProps {
  as?: "button";
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

interface ButtonAsLink extends BaseButtonProps {
  as: "a";
  href: string;
  target?: string;
  rel?: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    className,
  } = props;

  const baseClasses = "relative font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-black inline-flex items-center justify-center";

  const variantClasses = {
    primary:
      "bg-black text-white hover:bg-gray-900 hover:shadow-lg",
    secondary:
      "bg-transparent border-2 border-black text-black hover:bg-black hover:text-white",
    ghost:
      "bg-transparent text-gray-700 hover:text-black hover:bg-gray-50",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-xl",
  };

  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if (props.as === "a") {
    return (
      <motion.a
        href={props.href}
        target={props.target}
        rel={props.rel}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={classes}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={props.type || "button"}
      onClick={props.onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={classes}
    >
      {children}
    </motion.button>
  );
}
