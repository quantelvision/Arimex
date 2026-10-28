"use client";

import Image from "next/image";
import {
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { ArrowCounterClockwiseIcon, DotsSixVerticalIcon, XIcon } from "@phosphor-icons/react";
import EngineOption from "./engine-option";
import { defaultFont, defaultPalette, fontPairings, palettes, roundness, storageKeys } from "./themes";

type Position = { x: number; y: number };
type Choices = { palette: string; font: string; round: number };

const edge = 12;
const windowWidth = 352;
const step = 16;
const paletteColumns = 6;
const fontColumns = 5;
const sectionLabel = "text-label font-semibold tracking-wider text-ui-muted uppercase";
const iconButton =
  "inline-flex size-8 shrink-0 items-center justify-center rounded-ui-sm text-ui-muted hover:bg-ui-line hover:text-ui-text";

function clampAxis(value: number, room: number) {
  return Math.min(Math.max(value, edge), Math.max(edge, room - edge));
}

// tooltips grow away from the nearer window edge so they stay inside it
function columnAlign(index: number, columns: number) {
  const offset = (index % columns) * 2 - (columns - 1);
  if (offset < 0) return "start";
  return offset > 0 ? "end" : "center";
}

function readChoices(): Choices {
  const root = document.documentElement;
  const round = parseFloat(root.style.getPropertyValue("--ax-round"));
  return {
    palette: root.dataset.theme ?? defaultPalette,
    font: root.dataset.font ?? defaultFont,
    round: Number.isNaN(round) ? roundness.initial : round,
  };
}

function startPosition(): Position {
  const [x, y] = localStorage.getItem(storageKeys.position)?.split(",").map(Number) ?? [];
  return {
    x: clampAxis(Number.isFinite(x) ? x : window.innerWidth - windowWidth - 24, window.innerWidth - windowWidth),
    y: clampAxis(Number.isFinite(y) ? y : 88, window.innerHeight - 64),
  };
}

export default function ThemeEngine() {
  const [open, setOpen] = useState(false);
  const [choices, setChoices] = useState<Choices>({ palette: defaultPalette, font: defaultFont, round: roundness.initial });
  const [position, setPosition] = useState<Position>({ x: edge, y: edge });
  const panelRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const dragOffset = useRef<Position | null>(null);

  function openEngine() {
    returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setChoices(readChoices());
    setPosition(startPosition());
    setOpen(true);
  }

  function closeEngine() {
    setOpen(false);
    returnFocus.current?.focus();
  }

  function choose(next: Partial<Choices>) {
    const root = document.documentElement;
    if (next.palette || next.font) {
      root.classList.add("theme-anim");
      window.setTimeout(() => root.classList.remove("theme-anim"), 400);
    }
    if (next.palette) {
      root.dataset.theme = next.palette;
      localStorage.setItem(storageKeys.palette, next.palette);
    }
    if (next.font) {
      root.dataset.font = next.font;
      localStorage.setItem(storageKeys.font, next.font);
    }
    if (next.round !== undefined) {
      root.style.setProperty("--ax-round", String(next.round));
      localStorage.setItem(storageKeys.roundness, String(next.round));
    }
    setChoices((current) => ({ ...current, ...next }));
  }

  function moveTo(next: Position) {
    const panel = panelRef.current;
    if (!panel) return position;
    const moved = {
      x: clampAxis(next.x, window.innerWidth - panel.offsetWidth),
      y: clampAxis(next.y, window.innerHeight - panel.offsetHeight),
    };
    setPosition(moved);
    return moved;
  }

  function rememberPosition(at: Position) {
    localStorage.setItem(storageKeys.position, `${Math.round(at.x)},${Math.round(at.y)}`);
  }

  function startDrag(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.button !== 0 || (event.target as HTMLElement).closest("[data-no-drag]")) return;
    dragOffset.current = { x: event.clientX - position.x, y: event.clientY - position.y };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function drag(event: ReactPointerEvent<HTMLDivElement>) {
    if (dragOffset.current) moveTo({ x: event.clientX - dragOffset.current.x, y: event.clientY - dragOffset.current.y });
  }

  function endDrag() {
    if (!dragOffset.current) return;
    dragOffset.current = null;
    rememberPosition(position);
  }

  function nudge(event: ReactKeyboardEvent<HTMLButtonElement>) {
    const distance = event.shiftKey ? step * 4 : step;
    const moves: Record<string, Position> = {
      ArrowLeft: { x: -distance, y: 0 },
      ArrowRight: { x: distance, y: 0 },
      ArrowUp: { x: 0, y: -distance },
      ArrowDown: { x: 0, y: distance },
    };
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    rememberPosition(moveTo({ x: position.x + move.x, y: position.y + move.y }));
  }

  const onToggleKey = useEffectEvent(() => (open ? closeEngine() : openEngine()));
  const onResize = useEffectEvent(() => {
    if (open) moveTo(position);
  });

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!event.altKey || event.ctrlKey || event.metaKey || event.code !== "KeyH") return;
      event.preventDefault();
      onToggleKey();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  if (!open) return null;

  const activePalette = palettes.find((palette) => palette.id === choices.palette) ?? palettes[0];
  const activeFont = fontPairings.find((font) => font.id === choices.font) ?? fontPairings[0];
  const roundPercent = Math.round(choices.round * 100);

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-labelledby="engine-title engine-byline"
      tabIndex={-1}
      style={{ left: position.x, top: position.y }}
      className="fixed z-50 w-[min(22rem,calc(100vw-1.5rem))] rounded-ui border border-ui-line bg-ui-surface font-ui text-small text-ui-text shadow-ui outline-none **:focus-visible:outline-ui-focus"
    >
      <div
        onPointerDown={startDrag}
        onPointerMove={drag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="flex cursor-grab touch-none items-center gap-2 rounded-t-ui border-b border-ui-line bg-ui-subtle py-2 pr-2 pl-1.5 select-none active:cursor-grabbing"
      >
        <button type="button" aria-label="Move window, use the arrow keys" onKeyDown={nudge} className={iconButton}>
          <DotsSixVerticalIcon aria-hidden="true" size={18} />
        </button>
        <Image src="/images/quantel-vision-mark.png" alt="" width={29} height={28} draggable={false} />
        <p className="min-w-0 flex-1 leading-tight">
          <span id="engine-title" className="block font-semibold">
            Theme engine
          </span>
          <span id="engine-byline" className="block text-label text-ui-muted">
            by Quantel Vision
          </span>
        </p>
        <button type="button" data-no-drag aria-label="Close theme engine" onClick={closeEngine} className={iconButton}>
          <XIcon aria-hidden="true" size={18} />
        </button>
      </div>

      <div className="grid gap-6 px-4 pt-4 pb-5">
        <fieldset>
          <legend className="mb-3 flex w-full items-baseline justify-between gap-3">
            <span className={sectionLabel}>Colour palette</span>
            <span className="truncate text-label">{activePalette.label}</span>
          </legend>
          <div className="grid grid-cols-6 gap-2">
            {palettes.map((palette, index) => (
              <EngineOption
                key={palette.id}
                group="palette"
                value={palette.id}
                label={palette.label}
                note={palette.note}
                checked={palette.id === choices.palette}
                onSelect={(id) => choose({ palette: id })}
                align={columnAlign(index, paletteColumns)}
              >
                <span
                  className="relative block aspect-square overflow-hidden rounded-ui-sm border border-ui-line"
                  style={{ backgroundColor: palette.tokens.bg }}
                >
                  <span className="absolute inset-x-0 bottom-0 h-2/5" style={{ backgroundColor: palette.tokens.band }} />
                  <span className="absolute top-1.5 right-1.5 size-2.5 rounded-full" style={{ backgroundColor: palette.tokens.cta }} />
                </span>
              </EngineOption>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-3 flex w-full items-baseline justify-between gap-3">
            <span className={sectionLabel}>Typeface</span>
            <span className="truncate text-label">{activeFont.label}</span>
          </legend>
          <div className="grid grid-cols-5 gap-2">
            {fontPairings.map((font, index) => (
              <EngineOption
                key={font.id}
                group="font"
                value={font.id}
                label={font.label}
                note={font.note}
                checked={font.id === choices.font}
                onSelect={(id) => choose({ font: id })}
                align={columnAlign(index, fontColumns)}
              >
                <span
                  className="flex aspect-square items-center justify-center rounded-ui-sm border border-ui-line bg-ui-subtle text-h3 leading-none"
                  style={{ fontFamily: font.heading.family, fontWeight: font.heading.weight, fontStretch: font.heading.stretch }}
                >
                  Aa
                </span>
              </EngineOption>
            ))}
          </div>
        </fieldset>

        <div>
          <div className="mb-2 flex items-baseline justify-between gap-3">
            <label htmlFor="engine-roundness" className={sectionLabel}>
              Corner roundness
            </label>
            <output htmlFor="engine-roundness" className="text-label tabular-nums">
              {roundPercent}%
            </output>
          </div>
          <input
            id="engine-roundness"
            type="range"
            min={roundness.min}
            max={roundness.max}
            step={roundness.step}
            value={choices.round}
            aria-valuetext={`${roundPercent}%`}
            onChange={(event) => choose({ round: Number(event.target.value) })}
            className="w-full accent-ui-text"
          />
          <div aria-hidden="true" className="mt-1 flex justify-between text-label text-ui-muted">
            <span>Sharp</span>
            <span>Round</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 rounded-b-ui border-t border-ui-line bg-ui-subtle py-2 pr-2 pl-4 text-label text-ui-muted">
        <p>
          <kbd className="rounded-ui-sm border border-ui-line bg-ui-surface px-1.5 py-0.5 font-ui text-ui-text">Alt</kbd>
          {" + "}
          <kbd className="rounded-ui-sm border border-ui-line bg-ui-surface px-1.5 py-0.5 font-ui text-ui-text">H</kbd> shows or hides
        </p>
        <button
          type="button"
          onClick={() => choose({ palette: defaultPalette, font: defaultFont, round: roundness.initial })}
          className="inline-flex min-h-8 items-center gap-1.5 rounded-ui-sm px-2.5 font-semibold text-ui-text hover:bg-ui-line"
        >
          <ArrowCounterClockwiseIcon aria-hidden="true" size={16} />
          Reset
        </button>
      </div>
    </div>
  );
}
