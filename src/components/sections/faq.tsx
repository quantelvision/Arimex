import { CaretDownIcon } from "@phosphor-icons/react/ssr";
import Section from "@/components/section";
import { faq } from "@/content/site";

export default function Faq() {
  return (
    <Section id="faq" ground="surface" heading={faq.heading}>
      <div data-reveal className="max-w-3xl border-t border-line">
        {faq.entries.map((entry) => (
          <details key={entry.question} className="group border-b border-line">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 text-lead font-semibold text-heading [&::-webkit-details-marker]:hidden">
              {entry.question}
              <CaretDownIcon aria-hidden="true" size={20} className="shrink-0 group-open:rotate-180" />
            </summary>
            <p className="max-w-prose pb-5 text-muted">{entry.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
