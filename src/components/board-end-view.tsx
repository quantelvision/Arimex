type BoardEndViewProps = {
  thickness: number;
  width: number;
  className?: string;
};

// one unit is one millimetre for every board, so the drawings compare at true scale
const centre = 120;
const base = 88;
const ringGap = 7;

export default function BoardEndView({ thickness, width, className = "" }: BoardEndViewProps) {
  const left = centre - width / 2;
  const right = centre + width / 2;
  const top = base - thickness;
  const clipId = `board-end-${thickness}-${width}`;
  const pith = { x: centre + width * 0.1, y: base + width * 0.45 };
  const firstRing = Math.ceil((pith.y - base) / ringGap) * ringGap;
  const lastRing = Math.hypot(pith.x - left, pith.y - top);
  const rings = Array.from({ length: Math.floor((lastRing - firstRing) / ringGap) + 1 }, (_, index) => firstRing + index * ringGap);
  const board = { x: left, y: top, width, height: thickness };

  return (
    <svg viewBox="0 0 264 130" aria-hidden="true" className={`[&_*]:[vector-effect:non-scaling-stroke] ${className}`}>
      <defs>
        <clipPath id={clipId}>
          <rect {...board} />
        </clipPath>
      </defs>
      <rect {...board} className="fill-wood/30" />
      <g clipPath={`url(#${clipId})`} fill="none" strokeWidth={1} className="stroke-wood">
        {rings.map((radius) => (
          <circle key={radius} cx={pith.x} cy={pith.y} r={radius} />
        ))}
      </g>
      <rect {...board} fill="none" stroke="currentColor" strokeWidth={1.5} />
      <path
        d={`M${left} ${base + 14}H${right}M${left} ${base + 9}V${base + 19}M${right} ${base + 9}V${base + 19}M${right + 12} ${top}V${base}M${right + 7} ${top}H${right + 17}M${right + 7} ${base}H${right + 17}`}
        fill="none"
        strokeWidth={1}
        className="stroke-muted"
      />
      <g fontSize={16} className="fill-muted">
        <text x={centre} y={base + 36} textAnchor="middle">
          {width}
        </text>
        <text x={right + 20} y={(top + base) / 2} dominantBaseline="central">
          {thickness}
        </text>
      </g>
    </svg>
  );
}
