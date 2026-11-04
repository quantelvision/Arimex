"use client";

import { useEffect, useRef, useState } from "react";
import { PauseIcon, PlayIcon } from "@phosphor-icons/react/ssr";

type Rendition = { media: string; webm: string; mp4: string };

type HeroVideoProps = {
  renditions: readonly Rendition[];
  pauseLabel: string;
  playLabel: string;
};

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

const reducedMotion = "(prefers-reduced-motion: reduce)";
// the poster is already in place, so a video that is not ready after this much visible loading time is dropped
const loadTimeout = 8000;

// the poster stays when the visitor prefers reduced motion or is on a slow or data saving connection
function canAutoplay() {
  if (window.matchMedia(reducedMotion).matches) return false;
  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  return !connection?.saveData && !["slow-2g", "2g"].includes(connection?.effectiveType ?? "");
}

function pickSource(video: HTMLVideoElement, renditions: readonly Rendition[]) {
  const rendition = renditions.find((option) => window.matchMedia(option.media).matches);
  if (!rendition) return undefined;
  return video.canPlayType('video/webm; codecs="vp9"') ? rendition.webm : rendition.mp4;
}

export default function HeroVideo({ renditions, pauseLabel, playLabel }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pausedByVisitor = useRef(false);
  const [shown, setShown] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const source = video && pickSource(video, renditions);
    if (!video || !source || !canAutoplay()) return;
    // set the property as well, React does not render the muted attribute and browsers only autoplay muted video
    video.muted = true;

    const motion = window.matchMedia(reducedMotion);
    let timeout = 0;
    let ready = false;
    let stopped = false;

    // keep the poster and cancel the download, so a slow connection stops paying for a video it will not see
    const stop = () => {
      if (stopped) return;
      stopped = true;
      window.clearTimeout(timeout);
      setShown(false);
      video.removeAttribute("src");
      video.load();
    };

    const play = () => {
      if (stopped || pausedByVisitor.current || motion.matches) return;
      if (!video.hasAttribute("src")) video.src = source;
      window.clearTimeout(timeout);
      if (!ready) timeout = window.setTimeout(stop, loadTimeout);
      video.play().catch((error: unknown) => {
        // a pause before playback begins rejects with AbortError, any other rejection means autoplay is blocked here
        if (!(error instanceof DOMException && error.name === "AbortError")) stop();
      });
    };

    const pause = () => {
      window.clearTimeout(timeout);
      video.pause();
    };

    // playback can begin on a thin buffer and then stall, so fade in once the browser expects to play through
    const reveal = () => {
      if (video.readyState < HTMLMediaElement.HAVE_ENOUGH_DATA) return;
      ready = true;
      window.clearTimeout(timeout);
      if (!video.paused) setShown(true);
    };

    const onPlaying = () => {
      setPlaying(true);
      reveal();
    };
    const onPause = () => setPlaying(false);
    const pauseOnReduce = () => {
      if (motion.matches) pause();
    };

    video.addEventListener("canplaythrough", reveal);
    video.addEventListener("playing", onPlaying);
    video.addEventListener("pause", onPause);
    video.addEventListener("error", stop);
    motion.addEventListener("change", pauseOnReduce);

    // load only while the hero is on screen, pause when it leaves, and resume on return unless the visitor paused it
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) play();
      else pause();
    });

    // wait for the page to finish loading so the video never competes with the poster and the page's own files
    const begin = () => observer.observe(video);
    if (document.readyState === "complete") begin();
    else window.addEventListener("load", begin, { once: true });

    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("load", begin);
      observer.disconnect();
      video.removeEventListener("canplaythrough", reveal);
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("error", stop);
      motion.removeEventListener("change", pauseOnReduce);
    };
  }, [renditions]);

  function toggle() {
    const video = videoRef.current;
    if (!video) return;
    pausedByVisitor.current = !video.paused;
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
        disablePictureInPicture
        disableRemotePlayback
        className={`absolute inset-0 -z-10 size-full object-cover transition-opacity duration-700 ${shown ? "opacity-100" : "opacity-0"}`}
      />
      {shown && (
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
