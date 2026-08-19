"use client";

import { useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { createSpotifyLaunchTimeline } from "@/lib/animations/spotifyLaunchTimeline";
import type { LaunchOrigin } from "@/lib/hooks/useSpotifyLaunch";

interface SpotifyLaunchOverlayProps {
  isOpen: boolean;
  origin: LaunchOrigin | null;
  playlistUrl: string;
  playlistTitle: string;
  playlistName: string;
  openingLabel: string;
  onComplete: () => void;
}

const BAR_HEIGHTS = [0.55, 0.92, 1, 0.68, 0.96, 0.58, 0.84, 0.74, 0.88, 0.62, 0.78];
const CURTAIN_COUNT = 5;

export function SpotifyLaunchOverlay({
  isOpen,
  origin,
  playlistUrl,
  playlistTitle,
  playlistName,
  openingLabel,
  onComplete,
}: SpotifyLaunchOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const expanderPrimaryRef = useRef<HTMLDivElement>(null);
  const expanderRingRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const vinylRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const curtainsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const titleWords = useMemo(
    () => playlistName.split(/\s+/).filter(Boolean),
    [playlistName],
  );

  useEffect(() => {
    if (!isOpen || !origin) return;

    const overlay = overlayRef.current;
    const backdrop = backdropRef.current;
    const expanderPrimary = expanderPrimaryRef.current;
    const expanderRing = expanderRingRef.current;
    const scene = sceneRef.current;
    const label = labelRef.current;
    const vinyl = vinylRef.current;
    const barsContainer = barsRef.current;
    const progress = progressRef.current;
    const marquee = marqueeRef.current;
    const curtainsContainer = curtainsRef.current;
    const title = titleRef.current;

    if (
      !overlay ||
      !backdrop ||
      !expanderPrimary ||
      !expanderRing ||
      !scene ||
      !label ||
      !vinyl ||
      !barsContainer ||
      !progress ||
      !marquee ||
      !curtainsContainer ||
      !title
    ) {
      return;
    }

    const bars = Array.from(barsContainer.children) as HTMLElement[];
    const curtains = Array.from(curtainsContainer.children) as HTMLElement[];
    const words = Array.from(title.querySelectorAll<HTMLElement>("[data-spotify-word]"));

    const timeline = createSpotifyLaunchTimeline(
      {
        overlay,
        backdrop,
        expanderPrimary,
        expanderRing,
        scene,
        label,
        titleWords: words,
        vinyl,
        bars,
        progress,
        curtainsContainer,
        curtains,
        marquee,
      },
      { origin, playlistUrl, onComplete },
    );

    return () => {
      timeline.kill();
      document.body.classList.remove("spotify-launch-active");
      document.body.style.overflow = "";
    };
  }, [isOpen, onComplete, origin, playlistUrl]);

  if (!isOpen || !origin || typeof document === "undefined") return null;

  const marqueeText = `${playlistTitle} · ${playlistName} · `.repeat(4);

  return createPortal(
    <div
      ref={overlayRef}
      className="spotify-launch-overlay pointer-events-none fixed inset-0 z-[9999] overflow-hidden opacity-0"
      aria-hidden="true"
    >
      <div ref={backdropRef} className="spotify-launch-backdrop absolute inset-0 z-[1] opacity-0" />

      <div
        ref={expanderPrimaryRef}
        className="absolute z-[2] h-28 w-28 rounded-full bg-accent shadow-[0_0_120px_rgba(196,92,56,0.55)]"
      />
      <div
        ref={expanderRingRef}
        className="absolute z-[2] h-28 w-28 rounded-full border border-paper/25 opacity-0"
      />

      <div
        ref={sceneRef}
        className="absolute inset-0 z-[3] flex flex-col items-center justify-center overflow-hidden opacity-0"
      >
        <div className="spotify-launch-gradient pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="spotify-launch-vignette pointer-events-none absolute inset-0" aria-hidden="true" />

        <div
          ref={marqueeRef}
          className="pointer-events-none absolute top-[18%] whitespace-nowrap font-heading text-[14vw] font-medium leading-none text-paper/[0.05]"
          aria-hidden="true"
        >
          {marqueeText}
        </div>

        <div className="relative z-10 flex flex-col items-center px-6 text-center">
          <p
            ref={labelRef}
            className="text-[11px] uppercase tracking-[0.28em] text-paper/65"
            style={{ perspective: "800px" }}
          >
            {openingLabel}
          </p>

          <h2
            ref={titleRef}
            className="mt-5 max-w-4xl font-heading text-[clamp(2.4rem,8vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.04em] text-paper"
            style={{ perspective: "900px" }}
          >
            {titleWords.map((word, index) => (
              <span key={`${word}-${index}`} className="inline-block overflow-hidden align-top">
                <span data-spotify-word className="inline-block will-change-transform">
                  {word}
                  {index < titleWords.length - 1 ? "\u00a0" : ""}
                </span>
              </span>
            ))}
          </h2>

          <div
            ref={vinylRef}
            className="relative mt-10 h-28 w-28 rounded-full border border-paper/15 bg-[#120f0e] opacity-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]"
            aria-hidden="true"
          >
            <div className="absolute inset-[18%] rounded-full border border-paper/10" />
            <div className="absolute inset-[34%] rounded-full border border-paper/8" />
            <div className="absolute inset-[44%] rounded-full bg-accent/90" />
            <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-paper/90" />
          </div>

          <div
            ref={barsRef}
            className="mt-8 flex h-12 items-end justify-center gap-1"
            aria-hidden="true"
          >
            {BAR_HEIGHTS.map((height, index) => (
              <span
                key={index}
                className="block w-[3px] rounded-full bg-paper/85"
                style={{ height: `${height * 100}%` }}
              />
            ))}
          </div>

          <div className="mt-10 h-px w-48 overflow-hidden rounded-full bg-paper/10">
            <div ref={progressRef} className="h-full w-full origin-left scale-x-0 bg-paper/80" />
          </div>
        </div>
      </div>

      <div ref={curtainsRef} className="pointer-events-none absolute inset-0 z-[4] flex flex-col will-change-transform">
        {Array.from({ length: CURTAIN_COUNT }).map((_, index) => (
          <div
            key={index}
            className="spotify-launch-curtain flex-1 border-t border-paper/[0.04]"
            style={{ backgroundColor: index % 2 === 0 ? "#120c0a" : "#1a100d" }}
          />
        ))}
      </div>

      <div className="spotify-launch-grain pointer-events-none absolute inset-0 z-[5] opacity-[0.14] mix-blend-overlay" aria-hidden="true" />
    </div>,
    document.body,
  );
}
