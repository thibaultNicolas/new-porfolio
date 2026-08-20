"use client";

import { Fragment, useRef, type RefObject } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PHRASE_COPY_COUNT = 6;
/** Lower = slower horizontal drift per scroll pixel. */
const SCROLL_TRAVEL_MULTIPLIER = 0.45;
/** Extra scroll distance beyond the section pass-through (higher = slower). */
const SCROLL_RANGE_VIEWPORT_FACTOR = 1.4;
/** Higher scrub = smoother catch-up, less twitchy on fast scroll. */
const SCRUB_SMOOTHING = 2.2;

interface PhraseBlockProps {
  words: string[];
  accentIndex: number;
  hidden?: boolean;
}

function WordSeparator() {
  return (
    <span
      className="inline-flex shrink-0 items-center self-center px-4 md:px-6 lg:px-8"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 32 32"
        className="h-5 w-5 text-accent/75 md:h-7 md:w-7 lg:h-8 lg:w-8"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M16 0 19.5 12.5 32 16 19.5 19.5 16 32 12.5 19.5 0 16 12.5 12.5 16 0Z"
        />
      </svg>
    </span>
  );
}

function PhraseBlock({ words, accentIndex, hidden = false }: PhraseBlockProps) {
  return (
    <span
      className="flex shrink-0 items-center"
      aria-hidden={hidden || undefined}
    >
      {words.map((word, wordIndex) => {
        const isAccent = wordIndex === accentIndex;

        return (
          <Fragment key={`${word}-${wordIndex}`}>
            {wordIndex > 0 && <WordSeparator />}
            <span
              className={cn(
                "whitespace-nowrap font-heading text-[clamp(3rem,10vw,7rem)] font-medium uppercase leading-[0.92] tracking-[-0.02em]",
                isAccent
                  ? "font-serif italic font-normal text-accent"
                  : "text-fg",
              )}
            >
              {word}
            </span>
          </Fragment>
        );
      })}
      <WordSeparator />
    </span>
  );
}

interface InfinitePhraseRowProps {
  words: string[];
  accentIndex: number;
  trackRef: RefObject<HTMLDivElement | null>;
  measureRef: RefObject<HTMLSpanElement | null>;
}

function InfinitePhraseRow({
  words,
  accentIndex,
  trackRef,
  measureRef,
}: InfinitePhraseRowProps) {
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_2%,black_98%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_2%,black_98%,transparent)]">
      <div ref={trackRef} className="flex w-max will-change-transform">
        {Array.from({ length: PHRASE_COPY_COUNT }, (_, index) => (
          <span
            key={`phrase-copy-${index}`}
            ref={index === 0 ? measureRef : undefined}
            className="flex shrink-0"
          >
            <PhraseBlock
              words={words}
              accentIndex={accentIndex}
              hidden={index > 0}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

export function ScrollIdentity() {
  const t = useTranslations("scrollIdentity");
  const rootRef = useRef<HTMLElement>(null);
  const rowOneTrackRef = useRef<HTMLDivElement>(null);
  const rowOneMeasureRef = useRef<HTMLSpanElement>(null);
  const rowTwoTrackRef = useRef<HTMLDivElement>(null);
  const rowTwoMeasureRef = useRef<HTMLSpanElement>(null);

  const rowOne = t.raw("row1") as string[];
  const rowTwo = t.raw("row2") as string[];
  const rowOneAccent = Number(t("row1Accent"));
  const rowTwoAccent = Number(t("row2Accent"));

  useGSAP(
    () => {
      const root = rootRef.current;
      const rowOneTrack = rowOneTrackRef.current;
      const rowOneMeasure = rowOneMeasureRef.current;
      const rowTwoTrack = rowTwoTrackRef.current;
      const rowTwoMeasure = rowTwoMeasureRef.current;

      if (!root || !rowOneTrack || !rowOneMeasure || !rowTwoTrack || !rowTwoMeasure) {
        return;
      }

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      const setupRow = (
        track: HTMLDivElement,
        measure: HTMLSpanElement,
        direction: 1 | -1,
      ) => {
        const phraseWidth = measure.offsetWidth;
        if (phraseWidth <= 0) return;

        const travel = phraseWidth * SCROLL_TRAVEL_MULTIPLIER;
        const scrollDistance =
          root.offsetHeight + window.innerHeight * SCROLL_RANGE_VIEWPORT_FACTOR;

        gsap.fromTo(
          track,
          { x: direction === 1 ? 0 : -travel },
          {
            x: direction === 1 ? -travel : 0,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: `+=${scrollDistance}`,
              scrub: SCRUB_SMOOTHING,
              invalidateOnRefresh: true,
            },
          },
        );
      };

      setupRow(rowOneTrack, rowOneMeasure, 1);
      setupRow(rowTwoTrack, rowTwoMeasure, -1);
    },
    { scope: rootRef, dependencies: [rowOne.join("-"), rowTwo.join("-")] },
  );

  return (
    <section
      ref={rootRef}
      aria-hidden="true"
      className="section-dark-zone section-dark-zone--scroll relative overflow-hidden py-20 md:py-28 lg:py-32"
    >

      <div className="relative flex flex-col gap-4 md:gap-6">
        <InfinitePhraseRow
          words={rowOne}
          accentIndex={rowOneAccent}
          trackRef={rowOneTrackRef}
          measureRef={rowOneMeasureRef}
        />
        <InfinitePhraseRow
          words={rowTwo}
          accentIndex={rowTwoAccent}
          trackRef={rowTwoTrackRef}
          measureRef={rowTwoMeasureRef}
        />
      </div>
    </section>
  );
}
