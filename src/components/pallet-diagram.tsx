import type { ReactNode } from "react";

type PalletType = "two-way" | "four-way" | "euro" | "custom";

type Plank = { x: number; y: number; width: number; height: number };

const crossPlanks: Plank[] = [40, 58, 76, 94, 112, 130, 148].map((x) => ({ x, y: 30, width: 12, height: 80 }));
const lengthPlanks: Plank[] = [30, 47, 64, 81, 98].map((y) => ({ x: 40, y, width: 120, height: 12 }));
const euroPlanks: Plank[] = [
  [30, 14],
  [48.5, 10],
  [63, 14],
  [81.5, 10],
  [96, 14],
].map(([y, height]) => ({ x: 40, y, width: 120, height }));
const customPlanks: Plank[] = [40, 56, 72, 88].map((y) => ({ x: 40, y, width: 90, height: 12 }));

const entryArrows = {
  left: "M6 70H30M24 64l6 6-6 6",
  right: "M194 70H170M176 64l-6 6 6 6",
  top: "M100 2V22M94 16l6 6 6-6",
  bottom: "M100 138V118M94 124l6-6 6 6",
};

function planks(list: Plank[]) {
  return list.map((plank) => (
    <rect key={`${plank.x}-${plank.y}`} {...plank} rx={1.5} className="fill-wood/35" />
  ));
}

const drawings: Record<PalletType, ReactNode> = {
  "two-way": (
    <>
      {planks(crossPlanks)}
      <path d={entryArrows.left} />
      <path d={entryArrows.right} />
    </>
  ),
  "four-way": (
    <>
      {planks(lengthPlanks)}
      <path d={entryArrows.left} />
      <path d={entryArrows.right} />
      <path d={entryArrows.top} />
      <path d={entryArrows.bottom} />
    </>
  ),
  euro: (
    <>
      {planks(euroPlanks)}
      <path d="M40 114V122M160 114V122M40 118H160M168 30H176M168 110H176M172 30V110" />
      <text x="100" y="137" textAnchor="middle" fontSize="14" fill="currentColor" stroke="none">
        1200
      </text>
      <text x="191" y="70" textAnchor="middle" fontSize="14" fill="currentColor" stroke="none" transform="rotate(-90 191 70)">
        800
      </text>
    </>
  ),
  custom: (
    <>
      <rect x="24" y="16" width="152" height="108" rx="2" strokeDasharray="6 5" />
      {planks(customPlanks)}
      <path d="M136 70H168M162 64l6 6-6 6" />
      <path d="M85 106V118M79 112l6 6 6-6" />
    </>
  ),
};

export default function PalletDiagram({ type, className = "" }: { type: PalletType; className?: string }) {
  return (
    <svg viewBox="0 0 200 140" aria-hidden="true" className={`[&_*]:[vector-effect:non-scaling-stroke] ${className}`}>
      <g fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        {drawings[type]}
      </g>
    </svg>
  );
}
