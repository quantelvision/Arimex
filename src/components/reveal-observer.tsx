"use client";

import { useEffect } from "react";

const stagger = 80;

// fades content in once as it scrolls into view; anything on screen at load, or with reduced motion, is left as it is
export default function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .forEach((entry, index) => {
            const item = entry.target as HTMLElement;
            // items that arrive together, like a row of cards, follow one another
            item.style.setProperty("--reveal-delay", `${index * stagger}ms`);
            item.dataset.reveal = "shown";
            observer.unobserve(item);
          });
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    for (const item of document.querySelectorAll<HTMLElement>("[data-reveal]")) {
      if (item.getBoundingClientRect().top < window.innerHeight) continue;
      item.dataset.reveal = "hidden";
      observer.observe(item);
    }

    return () => observer.disconnect();
  }, []);

  return null;
}
