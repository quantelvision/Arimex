import type { ReactNode } from "react";
import Container from "./container";

// each ground carries its own background pattern, so neighbouring sections alternate
const grounds = {
  bg: "pattern pattern-grain bg-bg",
  surface: "pattern pattern-planks bg-surface",
  band: "on-band pattern pattern-rings grain bg-band text-on-band",
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
        <h2 id={headingId} data-reveal className="text-h2">
          {heading}
        </h2>
        {intro && (
          <p data-reveal className="mt-4 max-w-prose text-lead text-muted on-band:text-on-band">
            {intro}
          </p>
        )}
        <div className="mt-10 md:mt-12">{children}</div>
      </Container>
    </section>
  );
}
