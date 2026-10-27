import Container from "@/components/container";
import TextLink from "@/components/text-link";
import Wordmark from "@/components/wordmark";
import { business, contact, footer, nav } from "@/content/site";
import { currentYear } from "@/lib/current-year";

const { address } = business;
const footerLinks = [...nav.links, { label: contact.heading, href: "#contact" }];

export default async function SiteFooter() {
  const year = await currentYear();

  return (
    <footer className="on-band bg-band text-on-band">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Wordmark className="text-h2" />
          <p className="mt-3 font-semibold">{business.legalName}</p>
          <address className="mt-2 not-italic">
            {address.street}
            <br />
            {address.locality}, {address.city} {address.postalCode}
            <br />
            {address.region}, {address.country}
          </address>
          {business.gstin && (
            <p className="mt-2">
              {footer.gstinLabel}: {business.gstin}
            </p>
          )}
        </div>
        <nav aria-label={footer.navLabel}>
          <p className="font-semibold">{footer.quickLinksHeading}</p>
          <ul className="mt-3 grid gap-2">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <TextLink href={link.href}>{link.label}</TextLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="grid content-start gap-2">
          <p className="font-semibold">{contact.detailsHeading}</p>
          <TextLink href={`tel:${business.phone.tel}`}>{business.phone.display}</TextLink>
          <TextLink href={`mailto:${business.email}`}>{business.email}</TextLink>
        </div>
      </Container>
      <div className="border-t border-on-band/20">
        <Container className="flex flex-wrap justify-between gap-x-6 gap-y-1 py-5 text-small">
          <p>{footer.copyright(year)}</p>
          <p>{footer.brandLine}</p>
        </Container>
      </div>
    </footer>
  );
}
