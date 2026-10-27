import type { ReactNode } from "react";

export default function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-sm bg-band px-2.5 py-1 text-label font-semibold text-on-band on-band:bg-on-band on-band:text-band">
      {children}
    </span>
  );
}
