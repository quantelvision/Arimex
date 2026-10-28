import About from "@/components/sections/about";
import Contact, { enquiryFormId } from "@/components/sections/contact";
import Faq from "@/components/sections/faq";
import Hero from "@/components/sections/hero";
import Industries from "@/components/sections/industries";
import Ordering from "@/components/sections/ordering";
import Pallets from "@/components/sections/pallets";
import Products from "@/components/sections/products";
import RevealObserver from "@/components/reveal-observer";
import Quality from "@/components/sections/quality";
import SiteFooter from "@/components/sections/site-footer";
import SiteHeader from "@/components/sections/site-header";
import StockList from "@/components/sections/stock-list";
import TrustStrip from "@/components/sections/trust-strip";
import WhatsappFloat from "@/components/whatsapp-float";
import { whatsappMessages } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Products />
        <StockList />
        <Pallets />
        <TrustStrip />
        <Ordering />
        <Quality />
        <Industries />
        <About />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
      <WhatsappFloat
        href={whatsappUrl(whatsappMessages.general)}
        label={whatsappMessages.floatingLabel}
        hideOverId={enquiryFormId}
      />
      <RevealObserver />
    </>
  );
}
