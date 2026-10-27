import { WhatsappLogoIcon } from "@phosphor-icons/react/ssr";
import Button from "@/components/button";
import Container from "@/components/container";
import ImagePlaceholder from "@/components/image-placeholder";
import { hero, whatsappMessages } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";

export default function Hero() {
  return (
    <section id="top" aria-labelledby="top-heading" className="bg-bg">
      <Container className="grid items-center gap-10 py-12 md:grid-cols-2 md:py-20 lg:gap-16">
        <div>
          <p className="text-label font-semibold tracking-wider text-accent uppercase">{hero.eyebrow}</p>
          <h1 id="top-heading" className="mt-3 text-display">
            {hero.heading}
          </h1>
          <p className="mt-5 max-w-prose text-lead text-muted">{hero.lead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#contact">{hero.quoteAction}</Button>
            <Button href={whatsappUrl(whatsappMessages.general)} variant="secondary" newTab>
              <WhatsappLogoIcon aria-hidden="true" size={20} />
              {hero.whatsappAction}
            </Button>
          </div>
        </div>
        <ImagePlaceholder className="aspect-[4/3] rounded-lg md:aspect-[4/5]" />
      </Container>
    </section>
  );
}
