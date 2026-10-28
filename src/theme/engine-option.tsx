import type { ReactNode } from "react";

const tooltipAlign = {
  start: "left-0",
  center: "left-1/2 -translate-x-1/2",
  end: "right-0",
};

type EngineOptionProps = {
  group: string;
  value: string;
  label: string;
  note: string;
  checked: boolean;
  onSelect: (value: string) => void;
  align: keyof typeof tooltipAlign;
  children: ReactNode;
};

export default function EngineOption({ group, value, label, note, checked, onSelect, align, children }: EngineOptionProps) {
  const noteId = `engine-${group}-${value}-note`;

  return (
    <label className="group relative block cursor-pointer">
      <input
        type="radio"
        name={group}
        value={value}
        checked={checked}
        onChange={() => onSelect(value)}
        aria-label={label}
        aria-describedby={noteId}
        className="peer sr-only"
      />
      <span className="block rounded-ui-sm ring-offset-2 ring-offset-ui-surface group-hover:ring-1 group-hover:ring-ui-muted peer-checked:ring-2 peer-checked:ring-ui-text peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-ui-focus">
        {children}
      </span>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute bottom-full z-10 mb-2.5 w-52 rounded-ui-sm bg-ui-text px-3 py-2 text-left text-label text-ui-surface opacity-0 shadow-ui group-hover:opacity-100 peer-focus-visible:opacity-100 motion-safe:transition-opacity ${tooltipAlign[align]}`}
      >
        <span className="block font-semibold">{label}</span>
        <span id={noteId} className="mt-0.5 block text-ui-subtle">
          {note}
        </span>
      </span>
    </label>
  );
}
