"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

interface WorkItem {
  project: Project;
  role: string;
}

interface WorkListProps {
  items: WorkItem[];
  viewLabel: string;
  title: string;
  moreLabel?: string;
  moreCount?: number;
}

function formatIndex(index: number): string {
  return String(index + 1).padStart(2, "0");
}

export function WorkList({
  items,
  viewLabel,
  title,
  moreLabel,
  moreCount,
}: WorkListProps) {
  const rootRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const firstImage = items[0]?.project.image ?? "";
  const [previewSrc, setPreviewSrc] = useState(firstImage);
  const isArchive = moreCount === undefined;

  useEffect(() => {
    const root = rootRef.current;
    const preview = previewRef.current;
    if (!root || !preview) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;

    gsap.set(preview, {
      xPercent: -50,
      yPercent: -50,
      opacity: 0,
      scale: 0.94,
      rotate: -4,
    });

    const xTo = gsap.quickTo(preview, "x", { duration: 0.7, ease: "power3" });
    const yTo = gsap.quickTo(preview, "y", { duration: 0.7, ease: "power3" });
    const controller = new AbortController();
    const { signal } = controller;

    const onLeave = (): void => {
      gsap.to(preview, {
        opacity: 0,
        scale: 0.94,
        rotate: -4,
        duration: 0.28,
        ease: "power2.in",
      });
    };

    root.querySelectorAll<HTMLElement>("[data-preview]").forEach((row) => {
      const src = row.dataset.preview;
      if (!src) return;

      row.addEventListener(
        "pointerenter",
        () => {
          setPreviewSrc(src);
          gsap.to(preview, {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.4,
            ease: "power3.out",
          });
        },
        { signal },
      );
      row.addEventListener("pointerleave", onLeave, { signal });
    });

    window.addEventListener(
      "pointermove",
      (event: PointerEvent) => {
        xTo(event.clientX);
        yTo(event.clientY);
      },
      { signal },
    );

    return () => controller.abort();
  }, []);

  return (
    <section
      id={isArchive ? undefined : "work"}
      ref={rootRef}
      className={cn(
        "relative border-t border-line bg-paper py-24 md:py-32",
        isArchive && "border-t-0 pt-32 md:pt-40",
      )}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        {isArchive ? (
          <h1 className="mb-16 max-w-[8ch] font-heading text-6xl font-medium tracking-tight text-ink md:text-8xl">
            {title}
          </h1>
        ) : (
          <div className="mb-16 flex items-end justify-between gap-6">
            <h2 className="font-heading text-sm font-medium uppercase tracking-[0.18em] text-stone">
              {title}
            </h2>
            {moreLabel && moreCount ? (
              <Link href="/projects" className="nav-link text-sm text-stone hover:text-ink">
                {moreLabel} ({moreCount})
              </Link>
            ) : null}
          </div>
        )}

        <ul>
          {items.map((item, index) => (
            <li key={item.project.id} className="border-t border-line last:border-b">
              <Link
                href={`/projects/${item.project.id}`}
                data-preview={item.project.image}
                className="group grid grid-cols-1 items-baseline gap-3 py-8 md:grid-cols-12 md:gap-8 md:py-10"
              >
                <span className="text-xs tabular-nums tracking-[0.16em] text-stone md:col-span-1">
                  {formatIndex(index)}
                </span>
                <h3 className="font-heading text-3xl font-medium tracking-tight text-ink transition-[color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2 group-hover:text-accent md:col-span-5 md:text-5xl">
                  {item.project.title}
                </h3>
                <p className="text-stone md:col-span-4">{item.role}</p>
                <p className="flex items-center gap-2 text-sm uppercase tracking-[0.16em] text-stone transition-colors duration-300 group-hover:text-ink md:col-span-2 md:justify-end">
                  {viewLabel}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    className="h-3 w-3 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  >
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                    />
                  </svg>
                </p>
                <div className="relative mt-2 aspect-[16/10] overflow-hidden md:hidden">
                  <Image
                    src={item.project.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {previewSrc ? (
        <div
          ref={previewRef}
          className="pointer-events-none fixed left-0 top-0 z-40 hidden h-52 w-80 overflow-hidden opacity-0 shadow-[0_24px_60px_rgba(9,9,11,0.28)] md:block"
          aria-hidden="true"
        >
          <div className="relative h-full w-full">
            <Image src={previewSrc} alt="" fill className="object-cover" sizes="320px" />
          </div>
        </div>
      ) : null}
    </section>
  );
}
