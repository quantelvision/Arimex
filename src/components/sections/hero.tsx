import Image from "next/image";
import Button from "@/components/button";
import Container from "@/components/container";
import HeroVideo from "@/components/hero-video";
import WhatsappIcon from "@/components/whatsapp-icon";
import { hero, whatsappMessages } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";

export default function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="top-heading"
      className="flex min-h-[max(34rem,calc(100svh-4rem))] flex-col bg-bg p-2 sm:p-3"
    >
      <div className="on-overlay relative isolate flex flex-1 items-end overflow-hidden rounded-lg bg-overlay text-on-overlay">
        <Image src={hero.media.poster} alt={hero.media.alt} fill preload sizes="100vw" className="-z-10 object-cover" />
        <HeroVideo sources={hero.media.videos} pauseLabel={hero.pauseVideo} playLabel={hero.playVideo} />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-overlay/90 via-overlay/65 to-overlay/25" />
        <Container className="py-12 md:py-20">
          <h1 id="top-heading" className="max-w-4xl text-display text-on-overlay">
            {hero.heading}
          </h1>
          <p className="mt-5 max-w-2xl text-lead">{hero.lead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#contact">{hero.quoteAction}</Button>
            <Button href={whatsappUrl(whatsappMessages.general)} variant="secondary" newTab>
              <WhatsappIcon aria-hidden="true" size={20} />
              {hero.whatsappAction}
            </Button>
          </div>
        </Container>
      </div>
    </section>
  );
}
