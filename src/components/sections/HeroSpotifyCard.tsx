"use client";

import Image from "next/image";
import {
  HERO_PORTRAIT_SRC,
  SOCIAL_LINKS,
  SPOTIFY_PLAYLIST_URL,
} from "@/lib/constants";
import { useSpotifyLaunch } from "@/lib/hooks/useSpotifyLaunch";
import { SpotifyLaunchOverlay } from "@/components/ui/SpotifyLaunchOverlay";

interface HeroSpotifyCardCopy {
  playlistTitle: string;
  playlistName: string;
  openPlaylist: string;
  openingPlaylist: string;
  location: string;
  name: string;
  portraitAlt: string;
}

interface HeroSpotifyCardProps {
  copy: HeroSpotifyCardCopy;
  email: string;
}

export function HeroSpotifyCard({ copy, email }: HeroSpotifyCardProps) {
  const playlistHref = SPOTIFY_PLAYLIST_URL;
  const { isLaunching, origin, launchPlaylist, closeLaunch } = useSpotifyLaunch(
    {
      playlistUrl: playlistHref ?? "",
    },
  );

  const playButtonClassName =
    "absolute bottom-4 right-4 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent text-paper shadow-lg transition-colors duration-300 hover:bg-paper hover:text-ink disabled:pointer-events-none disabled:opacity-80";

  return (
    <>
      <article className="hero-cta relative overflow-hidden rounded-[28px] border border-paper/12 bg-[#141110] pt-4">
        <div className="relative mx-4 h-[240px] overflow-hidden rounded-2xl bg-ink sm:h-[260px] lg:h-[280px]">
          {HERO_PORTRAIT_SRC ? (
            <>
              <Image
                src={HERO_PORTRAIT_SRC}
                alt={copy.portraitAlt}
                fill
                priority
                sizes="(max-width: 1024px) 80vw, 380px"
                className="object-cover"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent"
                aria-hidden="true"
              />
            </>
          ) : (
            <div
              className="flex h-full w-full items-end justify-between bg-ink px-5 pb-5"
              aria-hidden="true"
            >
              <span className="font-heading text-5xl font-medium tracking-tight text-paper/35">
                NT
              </span>
            </div>
          )}

          {playlistHref ? (
            <button
              type="button"
              onClick={launchPlaylist}
              disabled={isLaunching}
              className={playButtonClassName}
              aria-label={copy.openPlaylist}
              aria-busy={isLaunching}
            >
              <PlayIcon />
            </button>
          ) : (
            <span
              className="absolute bottom-4 right-4 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent text-paper shadow-lg"
              aria-hidden="true"
            >
              <PlayIcon />
            </span>
          )}
        </div>

        <div className="px-4 pt-4">
          <p className="text-[11px] uppercase tracking-[0.18em] text-paper/40">
            {copy.playlistTitle}
          </p>
          <p className="mt-1 font-heading text-lg font-medium tracking-tight text-paper">
            {copy.playlistName}
          </p>
          <p className="text-sm text-paper/55">{copy.name}</p>
          <div
            className="mt-3 h-px overflow-hidden rounded-full bg-paper/10"
            aria-hidden="true"
          >
            <div className="h-full w-1/3 rounded-full bg-accent" />
          </div>
        </div>

        <div className="mt-4 border-t border-paper/10 px-4 pb-4 pt-4">
          <a
            href={`mailto:${email}`}
            className="block truncate text-sm text-paper/80 transition-colors duration-300 hover:text-paper"
          >
            {email}
          </a>
          <p className="mt-1 text-sm text-paper/45">{copy.location}</p>
          <div className="mt-3 flex items-center gap-2">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-paper/15 text-paper/70 transition-colors duration-300 hover:border-paper/40 hover:text-paper"
              >
                <SocialIcon name={link.name} />
              </a>
            ))}
          </div>
        </div>

        {playlistHref ? (
          <button
            type="button"
            onClick={launchPlaylist}
            disabled={isLaunching}
            className="mx-4 mb-4 mt-4 flex min-h-11 w-[calc(100%-2rem)] items-center justify-center gap-2 rounded-full border border-paper/20 text-sm text-paper transition-colors duration-300 hover:border-paper/50 disabled:pointer-events-none disabled:opacity-80"
          >
            {copy.openPlaylist}
            <ArrowIcon />
          </button>
        ) : null}
      </article>

      {playlistHref ? (
        <SpotifyLaunchOverlay
          isOpen={isLaunching}
          origin={origin}
          playlistUrl={playlistHref}
          playlistTitle={copy.playlistTitle}
          playlistName={copy.playlistName}
          openingLabel={copy.openingPlaylist}
          onComplete={closeLaunch}
        />
      ) : null}
    </>
  );
}

function PlayIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-5 w-5 translate-x-px"
      aria-hidden="true"
    >
      <path d="M6.5 4.5v11l9-5.5-9-5.5Z" fill="currentColor" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
      <path
        d="M3 8h10M9 4l4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SocialIcon({ name }: { name: string }) {
  if (name === "GitHub") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.85.09-.67.35-1.12.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0 1 12 6.84c.85 0 1.7.12 2.5.35 1.9-1.32 2.74-1.05 2.74-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 10.13h3.96V21H3V10.13Zm7.18 0h3.8v1.49h.05c.53-.95 1.82-1.95 3.75-1.95 4.01 0 4.75 2.5 4.75 5.76V21h-3.96v-4.79c0-1.14-.02-2.61-1.59-2.61-1.59 0-1.84 1.24-1.84 2.52V21h-3.96V10.13Z"
      />
    </svg>
  );
}
