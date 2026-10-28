"use client";

import { useEffect, useRef, useState } from "react";
import { PauseIcon, PlayIcon } from "@phosphor-icons/react/ssr";

type HeroVideoProps = {
  sources: readonly { src: string; type: string }[];
  pauseLabel: string;
  playLabel: string;
};

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

const reducedMotion = "(prefers-reduced-motion: reduce)";

// the poster stays when the visitor prefers reduced motion or is on a slow or data saving connection
function canAutoplay() {
  if (window.matchMedia(reducedMotion).matches) return false;
  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  return !connection?.saveData && !["slow-2g", "2g"].includes(connection?.effectiveType ?? "");
}

export default function HeroVideo({ sources, pauseLabel, playLabel }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !canAutoplay()) return;
    // set the property as well, React does not render the muted attribute and browsers only autoplay muted video
    video.muted = true;
    video.play().catch(() => {});

    const motion = window.matchMedia(reducedMotion);
    const pauseOnReduce = () => {
      if (motion.matches) video.pause();
    };
    motion.addEventListener("change", pauseOnReduce);
    return () => motion.removeEventListener("change", pauseOnReduce);
  }, []);

  function toggle() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  }

  return (
    <>
      <video
        ref={videoRef}
        aria-hidden="true"
        muted
        loop
        playsInline
        preload="none"
        onPlaying={() => {
          setStarted(true);
          setPlaying(true);
        }}
        onPause={() => setPlaying(false)}
        className={`absolute inset-0 -z-10 size-full object-cover transition-opacity duration-700 ${started ? "opacity-100" : "opacity-0"}`}
      >
        {sources.map((source) => (
          <source key={source.src} src={source.src} type={source.type} />
        ))}
      </video>
      {started && (
        <button
          type="button"
          aria-label={playing ? pauseLabel : playLabel}
          onClick={toggle}
          className="absolute top-3 right-3 inline-flex size-11 items-center justify-center rounded-full bg-overlay/60 text-on-overlay ring-1 ring-on-overlay/40 transition-colors hover:bg-overlay/85 sm:top-4 sm:right-4"
        >
          {playing ? <PauseIcon aria-hidden="true" size={22} /> : <PlayIcon aria-hidden="true" size={22} />}
        </button>
      )}
    </>
  );
}
