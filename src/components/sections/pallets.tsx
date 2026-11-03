import { CheckIcon } from "@phosphor-icons/react/ssr";
import BoardEndView from "@/components/board-end-view";
import Button from "@/components/button";
import Card from "@/components/card";
import PalletDiagram from "@/components/pallet-diagram";
import Section from "@/components/section";
import WhatsappIcon from "@/components/whatsapp-icon";
import { hero, pallets, whatsappMessages } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";

const { timber } = pallets;

export default function Pallets() {
  return (
    <Section id="pallets" heading={pallets.heading} intro={pallets.intro}>
      <h3 className="text-h3">{timber.heading}</h3>
      <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {timber.sizes.map((size) => {
          const label = `${size.thickness} x ${size.width} mm`;
          return (
            <Card key={label} as="li" reveal className="flex flex-col p-5">
              <div className="rounded-md bg-bg px-2 pt-3 pb-1">
                <BoardEndView thickness={size.thickness} width={size.width} className="w-full text-heading" />
              </div>
              <h4 className="mt-5 text-h3">{label}</h4>
              <dl className="mt-3 flex items-baseline justify-between gap-3 border-t border-line pt-3">
                <dt className="text-small text-muted">{timber.lengthsLabel}</dt>
                <dd className="font-semibold text-heading">{timber.lengths(size.shortest, size.longest)}</dd>
              </dl>
              <Button href="#contact" variant="secondary" prefill={{ size: label }} className="mt-5 w-full">
                {timber.action}
              </Button>
            </Card>
          );
        })}
      </ul>

      <h3 className="mt-16 text-h3">{pallets.typesHeading}</h3>
      <ul className="mt-5 grid gap-x-12 lg:grid-cols-2">
        {pallets.types.map((type) => (
          <li
            key={type.id}
            data-reveal
            className="flex flex-col gap-4 border-t border-line py-6 sm:flex-row sm:items-center sm:gap-6"
          >
            <PalletDiagram type={type.id} className="w-48 shrink-0 text-heading sm:w-44" />
            <div>
              <h4 className="text-lead font-semibold text-heading">{type.name}</h4>
              <p className="mt-1 text-small text-muted">{type.description}</p>
            </div>
          </li>
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
