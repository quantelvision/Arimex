import Section from "@/components/section";
import { about, business } from "@/content/site";

const { detailLabels } = about;
const details = [
  { label: detailLabels.legalName, value: business.legalName },
  { label: detailLabels.brand, value: business.brand },
  { label: detailLabels.gstin, value: business.gstin },
  { label: detailLabels.base, value: `${business.address.locality}, ${business.address.city}` },
];

export default function About() {
  return (
    <Section id="about" heading={about.heading}>
      <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-start">
        <div data-reveal className="max-w-prose">
          <p className="heading text-h3 text-accent">{about.tagline}</p>
          <div className="mt-5 grid gap-4 text-lead">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div data-reveal className="rounded-lg border border-line bg-surface p-6">
          <h3 className="text-h3">{about.detailsHeading}</h3>
          <dl className="@container mt-3 divide-y divide-line">
            {details.map(({ label, value }) => (
              <div
                key={label}
                className="grid gap-0.5 py-3 @min-[22rem]:flex @min-[22rem]:flex-wrap @min-[22rem]:items-baseline @min-[22rem]:justify-between @min-[22rem]:gap-x-6"
              >
                <dt className="text-small text-muted">{label}</dt>
                <dd className="font-semibold text-heading">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
