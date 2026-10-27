import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import Button from "@/components/button";
import Card from "@/components/card";
import ImagePlaceholder from "@/components/image-placeholder";
import Section from "@/components/section";
import { products } from "@/content/site";

export default function Products() {
  return (
    <Section id="products" heading={products.heading} intro={products.intro}>
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.cards.map((card) => (
          <Card key={card.id} as="li" className="flex flex-col">
            <ImagePlaceholder className="aspect-[4/3]" />
            <div className="flex flex-1 flex-col gap-5 p-6">
              <div>
                <h3 className="text-h3">{card.name}</h3>
                <p className="mt-2 text-muted">{card.summary}</p>
              </div>
              <div>
                <h4 className="text-label font-semibold tracking-wider text-accent uppercase">{products.usesLabel}</h4>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {card.uses.map((use) => (
                    <li key={use} className="rounded-sm border border-line px-2.5 py-1 text-small">
                      {use}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-label font-semibold tracking-wider text-accent uppercase">{products.specsLabel}</h4>
                <dl className="mt-2 divide-y divide-line text-small">
                  {card.specs.map((spec) => (
                    <div key={spec.label} className="grid grid-cols-[8rem_1fr] gap-3 py-2">
                      <dt className="font-semibold text-heading">{spec.label}</dt>
                      <dd className="text-muted">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <Button href="#contact" variant="secondary" className="mt-auto">
                {card.action}
                <ArrowRightIcon aria-hidden="true" size={18} />
              </Button>
            </div>
          </Card>
        ))}
      </ul>
    </Section>
  );
}
