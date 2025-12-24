"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";

export default function HeroCTA() {
  return (
    <Link
      href="#projects"
      className={cn(
        "hero-cta-button inline-flex justify-center items-center",
        "px-8 py-4 rounded-xl border border-[#F0EBD8]",
        "bg-transparent text-[#F0EBD8] font-normal transition-all duration-300",
        "relative overflow-hidden group",
        "hover:bg-[#F0EBD8]/10 hover:text-[#F0EBD8]",
        "focus:outline-none focus:ring-2 focus:ring-[#F0EBD8] focus:ring-offset-2"
      )}
    >
      <span className="relative z-10 text-lg">Découvrir mes projets</span>
    </Link>
  );
}
