import { EnvelopeSimpleIcon, MapPinIcon, PhoneIcon } from "@phosphor-icons/react/ssr";
import Container from "@/components/container";
import TextLink from "@/components/text-link";
import WhatsappIcon from "@/components/whatsapp-icon";
import Wordmark from "@/components/wordmark";
import { business, contact, footer, nav, whatsappMessages } from "@/content/site";
import { currentYear } from "@/lib/current-year";
import { whatsappUrl } from "@/lib/whatsapp";

const { address } = business;
const footerLinks = [...nav.links, { label: contact.heading, href: "#contact" }];
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${address.street}, ${address.locality}, ${address.city} ${address.postalCode}`,
)}`;

const channels = [
  { label: contact.labels.phone, href: `tel:${business.phone.tel}`, text: business.phone.display, Icon: PhoneIcon, newTab: false },
  {
    label: contact.labels.whatsapp,
    href: whatsappUrl(whatsappMessages.general),
    text: business.phone.display,
    Icon: WhatsappIcon,
    newTab: true,
  },
  { label: contact.labels.email, href: `mailto:${business.email}`, text: business.email, Icon: EnvelopeSimpleIcon, newTab: false },
];

const columnHeading = "text-label font-semibold tracking-wider uppercase";

export default async function SiteFooter() {
  const year = await currentYear();

  return (
    <footer className="on-band bg-band text-on-band">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1.2fr_1fr_0.8fr] lg:gap-12">
        <div>
          <Wordmark className="text-h2" />
          <p className="mt-3 font-semibold">{business.legalName}</p>
          <p className="mt-1 text-small">{footer.brandLine}</p>
          {business.gstin && (
            <p className="mt-3 text-small">
              {footer.gstinLabel}: {business.gstin}
            </p>
          )}
        </div>

        <div>
          <p className={columnHeading}>{contact.detailsHeading}</p>
          <dl className="mt-4 grid gap-3">
            {channels.map(({ label, href, text, Icon, newTab }) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd>
                  <a
                    href={href}
                    target={newTab ? "_blank" : undefined}
                    rel={newTab ? "noopener noreferrer" : undefined}
                    className="inline-flex min-h-11 items-center gap-2.5 font-semibold break-all underline-offset-4 hover:underline"
                  >
                    <Icon aria-hidden="true" size={20} className="shrink-0" />
                    {text}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <p className={columnHeading}>{contact.labels.address}</p>
          <address className="mt-4 flex gap-2.5 not-italic">
            <MapPinIcon aria-hidden="true" size={20} className="mt-0.5 shrink-0" />
            <span>
              {address.street}
              <br />
              {address.locality}, {address.city} {address.postalCode}
              <br />
              {address.region}, {address.country}
            </span>
          </address>
          <p className="mt-3 pl-7.5">
            <TextLink href={mapsUrl} newTab>
              {contact.mapAction}
            </TextLink>
          </p>
        </div>

        <nav aria-label={footer.navLabel}>
          <p className={columnHeading}>{footer.quickLinksHeading}</p>
          <ul className="mt-4 grid gap-2">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="underline-offset-4 hover:underline">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
      <div className="border-t border-on-band/20">
        <Container className="py-5 text-small">
          <p>{footer.copyright(year)}</p>
        </Container>
      </div>
    </footer>
  );
}
