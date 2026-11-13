"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import type { GalleryImage } from "@/content/gallery";
import { gallery } from "@/content/site";
import Button from "./button";
import GalleryLightbox from "./gallery-lightbox";

// tiles 1 and 6 are featured: wide in two and three columns, a large square in four, and every layout still fills its rows
const featured = new Set([0, 5]);
const featuredTile = "col-span-2 row-span-2 aspect-square sm:row-span-1 sm:aspect-auto lg:row-span-2";
const featuredSizes = "(min-width: 72rem) 35rem, (min-width: 64rem) 48vw, (min-width: 40rem) 64vw, 96vw";
const tileSizes = "(min-width: 72rem) 17rem, (min-width: 64rem) 24vw, (min-width: 40rem) 32vw, 48vw";

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [showAll, setShowAll] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const tiles = useRef<(HTMLButtonElement | null)[]>([]);
  const shown = showAll ? images : images.slice(0, gallery.initialCount);

  function showMore() {
    setShowAll(true);
    setOpenIndex(gallery.initialCount);
  }

  // return focus to the tile of the photo the visitor last viewed, not the one they opened
  function close(index: number) {
    setOpenIndex(null);
    tiles.current[index]?.focus();
  }

  return (
    <>
      <ul data-reveal className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
        {shown.map((image, index) => {
          const isFeatured = featured.has(index);
          return (
            <li key={image.id} className={isFeatured ? featuredTile : "aspect-square"}>
              <button
                ref={(node) => {
                  tiles.current[index] = node;
                }}
                type="button"
                aria-haspopup="dialog"
                onClick={() => setOpenIndex(index)}
                className="group relative block size-full cursor-zoom-in overflow-hidden rounded-md bg-overlay"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes={isFeatured ? featuredSizes : tileSizes}
                  className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-103"
                />
              </button>
            </li>
          );
        })}
      </ul>

      {shown.length < images.length && (
        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
          <Button variant="secondary" onClick={showMore}>
            {gallery.moreAction}
          </Button>
          <p className="text-small">{gallery.shownNote(shown.length, images.length)}</p>
        </div>
      )}

      {openIndex !== null && <GalleryLightbox images={images} startIndex={openIndex} onClose={close} />}
    </>
  );
}
