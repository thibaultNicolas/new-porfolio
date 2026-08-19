import { gsap } from "gsap";
import type { LaunchOrigin } from "@/lib/hooks/useSpotifyLaunch";

interface SpotifyLaunchElements {
  overlay: HTMLElement;
  backdrop: HTMLElement;
  expanderPrimary: HTMLElement;
  expanderRing: HTMLElement;
  scene: HTMLElement;
  label: HTMLElement;
  titleWords: HTMLElement[];
  vinyl: HTMLElement;
  bars: HTMLElement[];
  progress: HTMLElement;
  curtainsContainer: HTMLElement;
  curtains: HTMLElement[];
  marquee: HTMLElement;
}

interface SpotifyLaunchTimelineOptions {
  origin: LaunchOrigin;
  playlistUrl: string;
  onComplete: () => void;
}

function getTargetScale(): number {
  const maxDimension = Math.max(window.innerWidth, window.innerHeight);
  return (maxDimension * 2.4) / 112;
}

export function createSpotifyLaunchTimeline(
  elements: SpotifyLaunchElements,
  { origin, playlistUrl, onComplete }: SpotifyLaunchTimelineOptions,
): gsap.core.Timeline {
  const {
    overlay,
    backdrop,
    expanderPrimary,
    expanderRing,
    scene,
    label,
    titleWords,
    vinyl,
    bars,
    progress,
    curtainsContainer,
    curtains,
    marquee,
  } = elements;

  const targetScale = getTargetScale();
  const barPulse = gsap.to(bars, {
    scaleY: () => dividedRandom(0.45, 1),
    duration: () => 0.28 + Math.random() * 0.22,
    ease: "sine.inOut",
    stagger: { each: 0.04, from: "center", repeat: -1, yoyo: true },
  });

  const vinylSpin = gsap.to(vinyl, {
    rotation: 360,
    duration: 4.8,
    ease: "none",
    repeat: -1,
  });

  gsap.set(overlay, { autoAlpha: 1 });
  gsap.set(backdrop, { autoAlpha: 0, backdropFilter: "blur(0px)" });
  gsap.set([expanderPrimary, expanderRing], {
    left: origin.x,
    top: origin.y,
    xPercent: -50,
    yPercent: -50,
    scale: 0,
    transformOrigin: "center center",
  });
  gsap.set(scene, { autoAlpha: 0 });
  gsap.set(label, { y: 28, autoAlpha: 0, clipPath: "inset(100% 0 0 0)" });
  gsap.set(titleWords, { yPercent: 120, autoAlpha: 0 });
  gsap.set(vinyl, { scale: 0.72, autoAlpha: 0, rotation: 0 });
  gsap.set(bars, { scaleY: 0.2, transformOrigin: "bottom center" });
  gsap.set(progress, { scaleX: 0, transformOrigin: "left center" });
  gsap.set(curtainsContainer, { yPercent: 100 });
  gsap.set(curtains, { yPercent: 0 });
  gsap.set(marquee, { xPercent: 0 });

  const timeline = gsap.timeline({
    defaults: { ease: "power3.inOut" },
    onComplete: () => {
      barPulse.kill();
      vinylSpin.kill();
      document.body.classList.remove("spotify-launch-active");
      document.body.style.overflow = "";
      onComplete();
    },
  });

  timeline
    .add(() => {
      document.body.classList.add("spotify-launch-active");
      document.body.style.overflow = "hidden";
    })
    .to(backdrop, { autoAlpha: 1, backdropFilter: "blur(14px)", duration: 0.45, ease: "power2.out" })
    .to(
      expanderPrimary,
      { scale: targetScale, duration: 0.78, ease: "expo.inOut" },
      "-=0.18",
    )
    .to(
      expanderRing,
      { scale: targetScale * 1.08, autoAlpha: 0.55, duration: 0.92, ease: "expo.out" },
      "-=0.62",
    )
    .to(scene, { autoAlpha: 1, duration: 0.35, ease: "power1.out" }, "-=0.42")
    .to([expanderPrimary, expanderRing], { autoAlpha: 0, duration: 0.28, ease: "power2.out" }, "-=0.28")
    .to(label, { clipPath: "inset(0% 0 0 0)", y: 0, autoAlpha: 1, duration: 0.55, ease: "expo.out" }, "-=0.12")
    .to(
      titleWords,
      {
        yPercent: 0,
        autoAlpha: 1,
        duration: 0.72,
        stagger: 0.07,
        ease: "expo.out",
      },
      "-=0.38",
    )
    .to(vinyl, { scale: 1, autoAlpha: 1, duration: 0.62, ease: "back.out(1.4)" }, "-=0.48")
    .to(bars, { scaleY: 0.65, duration: 0.35, stagger: 0.03, ease: "power2.out" }, "-=0.42")
    .to(marquee, { xPercent: -18, duration: 2.4, ease: "none" }, "-=1.1")
    .to(progress, { scaleX: 1, duration: 1.35, ease: "power1.inOut" }, "-=1.5")
    .call(() => {
      window.open(playlistUrl, "_blank", "noopener,noreferrer");
    })
    .to(curtainsContainer, { yPercent: 0, duration: 0.58, ease: "expo.inOut" }, "+=0.12")
    .to(overlay, { autoAlpha: 0, duration: 0.24, ease: "power2.in" });

  return timeline;
}

function dividedRandom(min: number, max: number): number {
  return min + Math.random() * (max - min);
}
