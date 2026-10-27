import { EnvelopeSimpleIcon, PhoneIcon, WhatsappLogoIcon } from "@phosphor-icons/react/ssr";
import Button from "@/components/button";
import Card from "@/components/card";
import EnquiryPrefill from "@/components/enquiry-prefill";
import Section from "@/components/section";
import SelectField from "@/components/select-field";
import TextField from "@/components/text-field";
import TextLink from "@/components/text-link";
import { business, contact, enquiryForm, productOptions, whatsappMessages } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";

const { address } = business;
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${address.street}, ${address.locality}, ${address.city} ${address.postalCode}`,
)}`;

const channels = [
  { label: contact.labels.phone, href: `tel:${business.phone.tel}`, text: business.phone.display, Icon: PhoneIcon, newTab: false },
  {
    label: contact.labels.whatsapp,
    href: whatsappUrl(whatsappMessages.general),
    text: business.phone.display,
    Icon: WhatsappLogoIcon,
    newTab: true,
  },
  { label: contact.labels.email, href: `mailto:${business.email}`, text: business.email, Icon: EnvelopeSimpleIcon, newTab: false },
];

const formId = "enquiry-form";
const fields = enquiryForm.fields;

export default function Contact() {
  return (
    <Section id="contact" heading={contact.heading} intro={contact.intro}>
      <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-start">
        <form id={formId} className="grid gap-5 sm:grid-cols-2">
          <p className="text-small text-muted sm:col-span-2">{enquiryForm.requiredNote}</p>
          <TextField name="name" label={fields.name.label} required autoComplete="name" />
          <TextField
            name="company"
            label={fields.company.label}
            optionalLabel={enquiryForm.optionalLabel}
            autoComplete="organization"
          />
          <TextField name="phone" label={fields.phone.label} hint={fields.phone.hint} type="tel" required autoComplete="tel" />
          <TextField
            name="email"
            label={fields.email.label}
            optionalLabel={enquiryForm.optionalLabel}
            type="email"
            autoComplete="email"
          />
          <SelectField
            name="product"
            label={fields.product.label}
            placeholder={fields.product.placeholder}
            options={productOptions}
            required
          />
          <TextField name="quantity" label={fields.quantity.label} hint={fields.quantity.hint} />
          <TextField name="size" label={fields.size.label} hint={fields.size.hint} />
          <TextField name="city" label={fields.city.label} autoComplete="address-level2" />
          <div className="sm:col-span-2">
            <TextField name="message" label={fields.message.label} hint={fields.message.hint} multiline />
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" disabled>
              {enquiryForm.submit}
            </Button>
          </div>
        </form>

        <Card className="p-6">
          <h3 className="text-h3">{contact.detailsHeading}</h3>
          <dl className="mt-5 grid gap-5">
            {channels.map(({ label, href, text, Icon, newTab }) => (
              <div key={label}>
                <dt className="text-label font-semibold tracking-wider text-accent uppercase">{label}</dt>
                <dd>
                  <a
                    href={href}
                    target={newTab ? "_blank" : undefined}
                    rel={newTab ? "noopener noreferrer" : undefined}
                    className="inline-flex min-h-11 items-center gap-2 font-semibold break-all text-heading underline-offset-4 hover:underline"
                  >
                    <Icon aria-hidden="true" size={20} className="shrink-0" />
                    {text}
                  </a>
                </dd>
              </div>
            ))}
            <div>
              <dt className="text-label font-semibold tracking-wider text-accent uppercase">{contact.labels.address}</dt>
              <dd className="mt-1">
                <address className="not-italic">
                  {address.street}
                  <br />
                  {address.locality}, {address.city} {address.postalCode}
                  <br />
                  {address.region}
                </address>
                <p className="mt-2">
                  <TextLink href={mapsUrl} newTab>
                    {contact.mapAction}
                  </TextLink>
                </p>
              </dd>
            </div>
          </dl>
        </Card>
      </div>
      <EnquiryPrefill formId={formId} />
    </Section>
  );
}
