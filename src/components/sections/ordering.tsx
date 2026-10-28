import {
  ChatTextIcon,
  HammerIcon,
  HandshakeIcon,
  ReceiptIcon,
  SealCheckIcon,
  TruckIcon,
} from "@phosphor-icons/react/ssr";
import Section from "@/components/section";
import { ordering } from "@/content/site";

const stepIcons: Record<string, typeof ChatTextIcon> = {
  enquiry: ChatTextIcon,
  quote: ReceiptIcon,
  confirm: HandshakeIcon,
  manufacture: HammerIcon,
  "quality-check": SealCheckIcon,
  dispatch: TruckIcon,
};

export default function Ordering() {
  return (
    <Section id="process" ground="band" heading={ordering.heading} intro={ordering.intro}>
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ordering.steps.map((step, index) => {
          const StepIcon = stepIcons[step.id];
          return (
            <li key={step.id} className="rounded-lg border border-on-band/25 bg-band p-6">
              <div className="flex items-center justify-between gap-4">
                <StepIcon aria-hidden="true" size={32} />
                <span className="text-label font-semibold tracking-wider uppercase">
                  {ordering.stepLabel} {index + 1}
                </span>
              </div>
              <h3 className="mt-4 text-h3">{step.title}</h3>
              <p className="mt-2">{step.text}</p>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
