import { CheckIcon } from "@phosphor-icons/react/ssr";
import Button from "@/components/button";
import Card from "@/components/card";
import PalletDiagram from "@/components/pallet-diagram";
import Section from "@/components/section";
import WhatsappIcon from "@/components/whatsapp-icon";
import { hero, pallets, whatsappMessages } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";

export default function Pallets() {
  return (
    <Section id="pallets" heading={pallets.heading} intro={pallets.intro}>
      <h3 className="text-h3">{pallets.typesHeading}</h3>
      <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {pallets.types.map((type) => (
          <Card key={type.id} as="li" reveal className="p-5">
            <PalletDiagram type={type.id} className="mx-auto w-full max-w-60 text-heading" />
            <h4 className="mt-4 text-lead font-semibold text-heading">{type.name}</h4>
            <p className="mt-1 text-small text-muted">{type.description}</p>
          </Card>
        ))}
      </ul>

      <div className="mt-14 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
        <div data-reveal>
          <h3 className="text-h3">{pallets.briefHeading}</h3>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {pallets.brief.map((point) => (
              <li key={point} className="flex gap-3">
                <CheckIcon aria-hidden="true" size={20} className="mt-1 shrink-0 text-accent" />
                {point}
              </li>
            ))}
          </ul>
        </div>
        <div data-reveal className="rounded-lg border border-line bg-surface p-6">
          <p className="text-heading">{pallets.matchNote}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button href="#contact" prefill={{ product: "pallets" }}>
              {pallets.action}
            </Button>
            <Button href={whatsappUrl(whatsappMessages.product("wooden pallets"))} variant="secondary" newTab>
              <WhatsappIcon aria-hidden="true" size={20} />
              {hero.whatsappAction}
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
