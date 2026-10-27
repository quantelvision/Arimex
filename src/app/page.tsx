import Hero from "@/components/sections/hero";
import Products from "@/components/sections/products";
import SiteHeader from "@/components/sections/site-header";
import TrustStrip from "@/components/sections/trust-strip";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <TrustStrip />
        <Products />
      </main>
    </>
  );
}
