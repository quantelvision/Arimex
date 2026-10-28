import Section from "@/components/section";
import { quality } from "@/content/site";

export default function Quality() {
  return (
    <Section id="quality" heading={quality.heading} intro={quality.intro}>
      <ul className="grid gap-x-12 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
        {quality.points.map((point) => (
          <li key={point.title} data-reveal className="border-t-2 border-wood pt-4">
            <h3 className="text-h3">{point.title}</h3>
            <p className="mt-2 text-muted">{point.text}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
