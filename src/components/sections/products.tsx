import Image from "next/image";
import { ArrowRightIcon, WhatsappLogoIcon } from "@phosphor-icons/react/ssr";
import Button from "@/components/button";
import Card from "@/components/card";
import Section from "@/components/section";
import { hero, products, whatsappMessages } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";

const subheading = "text-label font-semibold tracking-wider text-accent uppercase";

export default function Products() {
  return (
    <Section id="products" heading={products.heading} intro={products.intro}>
      <ul className="grid gap-8 lg:gap-10">
        {products.cards.map((card, index) => {
          const flipped = index % 2 === 1;
          return (
            <Card
              key={card.id}
              as="li"
              className={`grid md:min-h-120 ${flipped ? "md:grid-cols-[3fr_2fr]" : "md:grid-cols-[2fr_3fr]"}`}
            >
              <div className={`relative aspect-16/10 bg-wood md:aspect-auto ${flipped ? "md:order-last" : ""}`}>
                <Image
                  src={card.image}
                  alt={card.imageAlt}
                  fill
                  sizes="(min-width: 72rem) 29rem, (min-width: 48rem) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-7 p-6 sm:p-8 lg:p-12">
                <div>
                  <p className={subheading}>{card.category}</p>
                  <h3 className="mt-4 text-h2">{card.name}</h3>
                  <p className="mt-4 max-w-prose text-lead text-muted">{card.summary}</p>
                </div>

                <div className="grid gap-7 border-t border-line pt-7 sm:grid-cols-2">
                  <div>
                    <h4 className={subheading}>{products.usesLabel}</h4>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {card.uses.map((use) => (
                        <li key={use} className="rounded-sm bg-bg px-2.5 py-1 text-small text-heading">
                          {use}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className={subheading}>{products.specsLabel}</h4>
                    <dl className="mt-3 grid gap-3 text-small">
                      {card.specs.map((spec) => (
                        <div key={spec.label}>
                          <dt className="font-semibold text-heading">{spec.label}</dt>
                          <dd className="text-muted">{spec.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>

                <div className="mt-auto flex flex-wrap gap-3">
                  <Button href="#contact" prefill={{ product: card.id }}>
                    {card.action}
                    <ArrowRightIcon aria-hidden="true" size={18} />
                  </Button>
                  <Button href={whatsappUrl(whatsappMessages.product(card.name.toLowerCase()))} variant="secondary" newTab>
                    <WhatsappLogoIcon aria-hidden="true" size={20} />
                    {hero.whatsappAction}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </ul>
    </Section>
  );
}
