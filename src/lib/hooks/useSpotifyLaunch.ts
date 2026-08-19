"use client";

import { useCallback, useState } from "react";

export interface LaunchOrigin {
  x: number;
  y: number;
}

interface UseSpotifyLaunchOptions {
  playlistUrl: string;
}

export function useSpotifyLaunch({ playlistUrl }: UseSpotifyLaunchOptions) {
  const [isLaunching, setIsLaunching] = useState(false);
  const [origin, setOrigin] = useState<LaunchOrigin | null>(null);

  const closeLaunch = useCallback(() => {
    setIsLaunching(false);
    setOrigin(null);
  }, []);

  const launchPlaylist = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();

      if (isLaunching) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        window.open(playlistUrl, "_blank", "noopener,noreferrer");
        return;
      }

      const rect = event.currentTarget.getBoundingClientRect();
      setOrigin({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
      setIsLaunching(true);
    },
    [isLaunching, playlistUrl],
  );

  return {
    isLaunching,
    origin,
    launchPlaylist,
    closeLaunch,
  };
}
