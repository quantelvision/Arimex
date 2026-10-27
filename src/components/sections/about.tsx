import ImagePlaceholder from "@/components/image-placeholder";
import Section from "@/components/section";
import { about } from "@/content/site";

export default function About() {
  return (
    <Section id="about" heading={about.heading}>
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div className="grid max-w-prose gap-4 text-lead">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <ImagePlaceholder className="aspect-4/3 rounded-lg" />
      </div>
    </Section>
  );
}
