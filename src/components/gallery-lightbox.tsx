"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import Image from "next/image";
import { CaretLeftIcon, CaretRightIcon, XIcon } from "@phosphor-icons/react/ssr";
import type { GalleryImage } from "@/content/gallery";
import { gallery } from "@/content/site";

type GalleryLightboxProps = {
  images: GalleryImage[];
  startIndex: number;
  onClose: (index: number) => void;
};

const control =
  "inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-overlay/60 text-on-overlay ring-1 ring-on-overlay/40 transition-colors hover:bg-overlay/85";
const swipeDistance = 48;

export default function GalleryLightbox({ images, startIndex, onClose }: GalleryLightboxProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const strip = useRef<HTMLUListElement>(null);
  const swipeStart = useRef<number | null>(null);
  const [index, setIndex] = useState(startIndex);
  const count = images.length;
  const current = images[index];
  const go = (target: number) => setIndex((target + count) % count);

  // a modal dialog keeps focus inside, closes on Escape and returns focus when it closes
  useEffect(() => {
    if (dialog.current && !dialog.current.open) dialog.current.showModal();
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    strip.current?.children[index]?.scrollIntoView({ block: "nearest", inline: "center", behavior: reduce ? "auto" : "smooth" });
  }, [index]);

  function onKeyDown(event: KeyboardEvent) {
    const targets: Record<string, number> = { ArrowLeft: index - 1, ArrowRight: index + 1, Home: 0, End: count - 1 };
    if (!(event.key in targets)) return;
    event.preventDefault();
    go(targets[event.key]);
  }

  function onPointerDown(event: PointerEvent) {
    if (event.pointerType !== "mouse") swipeStart.current = event.clientX;
  }

  function onPointerUp(event: PointerEvent) {
    const start = swipeStart.current;
    swipeStart.current = null;
    if (start === null || Math.abs(event.clientX - start) < swipeDistance) return;
    go(index + (event.clientX < start ? 1 : -1));
  }

  // the photos either side are loaded but hidden, so moving to them shows them at once
  const loaded = [...new Set([index - 1, index, index + 1].map((target) => (target + count) % count))];

  return (
    <dialog
      ref={dialog}
      aria-label={gallery.dialogLabel}
      onClose={() => onClose(index)}
      onKeyDown={onKeyDown}
      className="gallery-lightbox on-overlay m-0 h-dvh max-h-none w-full max-w-none overflow-hidden border-0 bg-overlay p-0 text-on-overlay"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <p aria-live="polite" className="text-small font-semibold tabular-nums">
            {gallery.position(index + 1, count)}
            <span className="sr-only">: {current.alt}</span>
          </p>
          <button type="button" aria-label={gallery.closeLabel} onClick={() => dialog.current?.close()} className={control}>
            <XIcon aria-hidden="true" size={22} />
          </button>
        </div>

        <div
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => {
            swipeStart.current = null;
          }}
          className="relative min-h-0 flex-1 touch-pan-y touch-pinch-zoom"
        >
          <div className="absolute inset-x-2 inset-y-0 sm:inset-x-20">
            {loaded.map((target) => (
              <Image
                key={images[target].id}
                src={images[target].src}
                alt={target === index ? images[target].alt : ""}
                fill
                loading="eager"
                sizes="(min-width: 40rem) calc(100vw - 10rem), 100vw"
                className={`object-contain ${target === index ? "" : "invisible"}`}
              />
            ))}
          </div>
          {count > 1 && (
            <>
              <button
                type="button"
                aria-label={gallery.previousLabel}
                onClick={() => go(index - 1)}
                className={`${control} absolute top-1/2 left-3 -translate-y-1/2 sm:left-5`}
              >
                <CaretLeftIcon aria-hidden="true" size={22} />
              </button>
              <button
                type="button"
                aria-label={gallery.nextLabel}
                onClick={() => go(index + 1)}
                className={`${control} absolute top-1/2 right-3 -translate-y-1/2 sm:right-5`}
              >
                <CaretRightIcon aria-hidden="true" size={22} />
              </button>
            </>
          )}
        </div>

        <ul ref={strip} aria-label={gallery.thumbnailsLabel} className="flex justify-center-safe gap-2 overflow-x-auto px-4 pt-3 pb-4 sm:px-6">
          {images.map((image, target) => (
            <li key={image.id} className="shrink-0">
              <button
                type="button"
                aria-label={gallery.showPhoto(target + 1)}
                aria-current={target === index ? "true" : undefined}
                onClick={() => setIndex(target)}
                className={`relative block h-14 w-20 overflow-hidden rounded-sm transition-opacity sm:h-16 sm:w-24 ${
                  target === index ? "ring-2 ring-on-overlay ring-offset-2 ring-offset-overlay" : "opacity-55 hover:opacity-100"
                }`}
              >
                <Image src={image.src} alt="" fill sizes="96px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </dialog>
  );
}
