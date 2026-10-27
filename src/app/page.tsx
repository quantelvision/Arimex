import About from "@/components/sections/about";
import Contact from "@/components/sections/contact";
import Faq from "@/components/sections/faq";
import Hero from "@/components/sections/hero";
import Industries from "@/components/sections/industries";
import Ordering from "@/components/sections/ordering";
import Pallets from "@/components/sections/pallets";
import Products from "@/components/sections/products";
import Quality from "@/components/sections/quality";
import SiteHeader from "@/components/sections/site-header";
import StockList from "@/components/sections/stock-list";
import TrustStrip from "@/components/sections/trust-strip";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <TrustStrip />
        <Products />
        <StockList />
        <Pallets />
        <Ordering />
        <Quality />
        <Industries />
        <About />
        <Faq />
        <Contact />
      </main>
    </>
  );
}
