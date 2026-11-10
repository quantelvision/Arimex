import { business, faq, meta, products } from "@/content/site";
import { siteUrl } from "@/lib/site-url";

const { address } = business;
const businessId = `${siteUrl}/#business`;

const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: business.brand,
      alternateName: business.legalName,
      inLanguage: meta.language,
      publisher: { "@id": businessId },
    },
    {
      // the most specific LocalBusiness type for a business that trades timber to other businesses
      "@type": "WholesaleStore",
      "@id": businessId,
      name: business.brand,
      legalName: business.legalName,
      description: meta.description,
      url: `${siteUrl}/`,
      logo: `${siteUrl}/images/logo/arimex-logo.png`,
      image: `${siteUrl}/opengraph-image.jpg`,
      telephone: business.phone.tel,
      email: business.email,
      taxID: business.gstin,
      address: {
        "@type": "PostalAddress",
        streetAddress: `${address.street}, ${address.locality}`,
        addressLocality: address.city,
        addressRegion: address.region,
        postalCode: address.postalCode,
        addressCountry: address.countryCode,
      },
      areaServed: { "@type": "Country", name: address.country },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: business.phone.tel,
        email: business.email,
        areaServed: address.countryCode,
      },
      // listed as services: Google reports a Product offer without a price as invalid, and every price is quoted per order
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: products.heading,
        itemListElement: products.cards.map((card) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: card.name, category: card.category, description: card.summary },
        })),
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: faq.entries
        .filter((entry) => entry.confirmed)
        .map((entry) => ({
          "@type": "Question",
          name: entry.question,
          acceptedAnswer: { "@type": "Answer", text: entry.answer },
        })),
    },
  ],
};

// "<" is escaped so no value can close the script tag early
const json = JSON.stringify(graph).replace(/</g, "\\u003c");

export default function StructuredData() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
