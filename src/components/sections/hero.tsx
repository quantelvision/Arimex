import { WhatsappLogoIcon } from "@phosphor-icons/react/ssr";
import Button from "@/components/button";
import Container from "@/components/container";
import ImagePlaceholder from "@/components/image-placeholder";
import { hero, whatsappMessages } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";

export default function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="top-heading"
      className="flex min-h-[max(34rem,calc(100svh-4.0625rem))] flex-col bg-bg p-2 sm:p-3"
    >
      <div className="on-overlay relative isolate flex flex-1 items-end overflow-hidden rounded-lg text-on-overlay">
        <ImagePlaceholder className="absolute inset-0 -z-10" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-overlay/90 via-overlay/65 to-overlay/25" />
        <Container className="py-12 md:py-20">
          <p className="text-label font-semibold tracking-wider uppercase">{hero.eyebrow}</p>
          <h1 id="top-heading" className="mt-4 max-w-4xl text-display text-on-overlay">
            {hero.heading}
          </h1>
          <p className="mt-5 max-w-2xl text-lead">{hero.lead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#contact">{hero.quoteAction}</Button>
            <Button href={whatsappUrl(whatsappMessages.general)} variant="secondary" newTab>
              <WhatsappLogoIcon aria-hidden="true" size={20} />
              {hero.whatsappAction}
            </Button>
          </div>
        </Container>
      </div>
    </section>
  );
}
