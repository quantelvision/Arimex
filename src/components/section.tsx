import type { ReactNode } from "react";
import Container from "./container";

const grounds = {
  bg: "bg-bg",
  surface: "bg-surface",
  band: "on-band bg-band text-on-band",
};

type SectionProps = {
  id: string;
  heading: string;
  intro?: string;
  ground?: keyof typeof grounds;
  children: ReactNode;
};

export default function Section({ id, heading, intro, ground = "bg", children }: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section id={id} aria-labelledby={headingId} className={grounds[ground]}>
      <Container className="py-section">
        <h2 id={headingId} className="text-h2">
          {heading}
        </h2>
        {intro && <p className="mt-4 max-w-prose text-lead text-muted on-band:text-on-band">{intro}</p>}
        <div className="mt-10 md:mt-12">{children}</div>
      </Container>
    </section>
  );
}
