"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { defaultFont, defaultPalette, fontPairings, palettes, storageKeys } from "./themes";

type Toast = { title: string; note: string } | null;

function current(attr: "theme" | "font", fallback: string) {
  return document.documentElement.dataset[attr] ?? fallback;
}

function isTyping(el: EventTarget | null) {
  const node = el as HTMLElement | null;
  if (!node) return false;
  return node.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(node.tagName);
}

export default function ThemeSwitcher() {
  const [toast, setToast] = useState<Toast>(null);
  const [panel, setPanel] = useState(false);
  const [, force] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const announce = useCallback((title: string, note: string) => {
    setToast({ title, note });
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 2200);
  }, []);

  const apply = useCallback(
    (kind: "palette" | "font", id: string) => {
      const root = document.documentElement;
      root.classList.add("theme-anim");
      const choice = (kind === "palette" ? palettes : fontPairings).find((x) => x.id === id);
      if (!choice) return;
      if (kind === "palette") {
        root.dataset.theme = id;
        localStorage.setItem(storageKeys.palette, id);
      } else {
        root.dataset.font = id;
        localStorage.setItem(storageKeys.font, id);
      }
      announce(choice.label, choice.note);
      window.setTimeout(() => root.classList.remove("theme-anim"), 400);
      force((n) => n + 1);
    },
    [announce],
  );

  const step = useCallback(
    (kind: "palette" | "font", dir: 1 | -1) => {
      const list = kind === "palette" ? palettes : fontPairings;
      const now = current(kind === "palette" ? "theme" : "font", kind === "palette" ? defaultPalette : defaultFont);
      const i = list.findIndex((x) => x.id === now);
      apply(kind, list[(i + dir + list.length) % list.length].id);
    },
    [apply],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!e.altKey || e.ctrlKey || e.metaKey || isTyping(e.target)) return;
      const back = e.shiftKey ? -1 : 1;
      const digit = e.code.startsWith("Digit") ? Number(e.code.slice(5)) : NaN;

      if (e.code === "KeyT") step("palette", back);
      else if (e.code === "KeyF") step("font", back);
      else if (digit >= 1 && digit <= palettes.length && !e.shiftKey) apply("palette", palettes[digit - 1].id);
      else if (digit >= 1 && digit <= fontPairings.length && e.shiftKey) apply("font", fontPairings[digit - 1].id);
      else if (e.code === "KeyR") {
        apply("font", defaultFont);
        apply("palette", defaultPalette);
      } else if (e.code === "KeyH") setPanel((v) => !v);
      else return;
      e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [apply, step]);

  const activePalette = typeof document === "undefined" ? defaultPalette : current("theme", defaultPalette);
  const activeFont = typeof document === "undefined" ? defaultFont : current("font", defaultFont);

  return (
    <>
      <div aria-live="polite" className="sr-only">
        {toast ? `${toast.title}. ${toast.note}` : ""}
      </div>

      {toast && (
        <div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-cta px-5 py-3 text-on-cta shadow-raised">
          <p className="font-body text-small font-semibold">{toast.title}</p>
          <p className="font-body text-label opacity-90">{toast.note}</p>
        </div>
      )}

      {panel && (
        <div className="fixed right-4 bottom-24 z-50 w-80 rounded-lg border border-line bg-surface p-4 font-body text-ink shadow-raised">
          <p className="mb-2 text-label font-semibold tracking-wide text-accent uppercase">Palette</p>
          <ul className="mb-4 space-y-1">
            {palettes.map((p, i) => (
              <li key={p.id}>
                <button
                  onClick={() => apply("palette", p.id)}
                  className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-small ${activePalette === p.id ? "bg-band text-on-band" : ""}`}
                >
                  <span className="flex overflow-hidden rounded-sm border border-line">
                    {[p.tokens.bg, p.tokens.heading, p.tokens.accent, p.tokens.wood].map((c) => (
                      <span key={c} className="h-4 w-3" style={{ background: c }} />
                    ))}
                  </span>
                  <span className="flex-1">{p.label}</span>
                  <kbd className="text-label opacity-70">Alt {i + 1}</kbd>
                </button>
              </li>
            ))}
          </ul>
          <p className="mb-2 text-label font-semibold tracking-wide text-accent uppercase">Fonts</p>
          <ul className="mb-4 space-y-1">
            {fontPairings.map((f, i) => (
              <li key={f.id}>
                <button
                  onClick={() => apply("font", f.id)}
                  className={`flex w-full items-center rounded-md px-2 py-1.5 text-left text-small ${activeFont === f.id ? "bg-band text-on-band" : ""}`}
                >
                  <span className="flex-1" style={{ fontFamily: f.heading.family, fontStretch: f.heading.stretch }}>
                    {f.label}
                  </span>
                  <kbd className="text-label opacity-70">Alt Shift {i + 1}</kbd>
                </button>
              </li>
            ))}
          </ul>
          <p className="text-label text-muted">Alt T palettes, Alt F fonts, add Shift to go back. Alt R resets. Alt H hides this.</p>
        </div>
      )}
    </>
  );
}
