import {
  ArmchairIcon,
  ArrowRightIcon,
  CaretDownIcon,
  ChatTextIcon,
  CheckIcon,
  EnvelopeSimpleIcon,
  FactoryIcon,
  HammerIcon,
  HandshakeIcon,
  HardHatIcon,
  ListIcon,
  MapPinIcon,
  PhoneIcon,
  ReceiptIcon,
  SealCheckIcon,
  ShippingContainerIcon,
  TruckIcon,
  WarehouseIcon,
  WarningCircleIcon,
  WhatsappLogoIcon,
  XIcon,
} from "@phosphor-icons/react/ssr";
import Badge from "@/components/badge";
import Button from "@/components/button";
import Card from "@/components/card";
import Container from "@/components/container";
import PalletDiagram from "@/components/pallet-diagram";
import Section from "@/components/section";
import SelectField from "@/components/select-field";
import StockTable, { type StockRow } from "@/components/stock-table";
import TextField from "@/components/text-field";
import TextLink from "@/components/text-link";
import Wordmark from "@/components/wordmark";
import { enquiryForm, productOptions, stock } from "@/content/site";

const swatches = [
  { token: "bg", className: "bg-bg" },
  { token: "surface", className: "bg-surface" },
  { token: "band", className: "bg-band" },
  { token: "on-band", className: "bg-on-band" },
  { token: "ink", className: "bg-ink" },
  { token: "heading", className: "bg-heading" },
  { token: "muted", className: "bg-muted" },
  { token: "accent", className: "bg-accent" },
  { token: "cta", className: "bg-cta" },
  { token: "on-cta", className: "bg-on-cta" },
  { token: "wood", className: "bg-wood" },
  { token: "line", className: "bg-line" },
  { token: "field", className: "bg-field" },
  { token: "error", className: "bg-error" },
];

const icons = [
  { name: "Phone", Icon: PhoneIcon },
  { name: "WhatsappLogo", Icon: WhatsappLogoIcon },
  { name: "EnvelopeSimple", Icon: EnvelopeSimpleIcon },
  { name: "MapPin", Icon: MapPinIcon },
  { name: "ArrowRight", Icon: ArrowRightIcon },
  { name: "CaretDown", Icon: CaretDownIcon },
  { name: "List", Icon: ListIcon },
  { name: "X", Icon: XIcon },
  { name: "Check", Icon: CheckIcon },
  { name: "WarningCircle", Icon: WarningCircleIcon },
  { name: "ShippingContainer", Icon: ShippingContainerIcon },
  { name: "Factory", Icon: FactoryIcon },
  { name: "Warehouse", Icon: WarehouseIcon },
  { name: "HardHat", Icon: HardHatIcon },
  { name: "Armchair", Icon: ArmchairIcon },
  { name: "ChatText", Icon: ChatTextIcon },
  { name: "Receipt", Icon: ReceiptIcon },
  { name: "Handshake", Icon: HandshakeIcon },
  { name: "Hammer", Icon: HammerIcon },
  { name: "SealCheck", Icon: SealCheckIcon },
  { name: "Truck", Icon: TruckIcon },
];

const pallets = [
  { type: "two-way", name: "2 way" },
  { type: "four-way", name: "4 way" },
  { type: "euro", name: "Euro size" },
  { type: "custom", name: "Custom" },
] as const;

const sampleRows: StockRow[] = [
  { size: "00 x 000", length: "0000", quantity: "00", grade: "Sample" },
  { size: "00 x 000", length: stock.lengthOnRequest, quantity: "00", grade: "Sample" },
  { size: "00 x 000", length: "0000", quantity: "", grade: "Sample" },
].map((row, index) => ({
  ...row,
  id: `sample-${index}`,
  label: `Sample row ${index + 1}`,
  askHref: "#form",
  whatsappHref: "#stock-table",
}));

const fields = enquiryForm.fields;

export default function ComponentSheet() {
  return (
    <main className="font-body">
      <header className="border-b border-line">
        <Container className="flex flex-wrap items-baseline justify-between gap-4 py-6">
          <Wordmark className="text-h3" />
          <div className="text-small text-muted">
            <h1 className="text-h3">Component sheet</h1>
            <p>Phase 2 review. Alt T for palettes, Alt F for fonts, Alt H for the panel.</p>
          </div>
        </Container>
      </header>

      <Section id="tokens" heading="Colour tokens" intro="Every palette defines all of these. Switch palettes to compare.">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {swatches.map((swatch) => (
            <li key={swatch.token}>
              <div className={`h-16 rounded-md border border-line ${swatch.className}`} />
              <p className="mt-1.5 text-label text-muted">{swatch.token}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="type" ground="surface" heading="Type scale" intro="Headings scale with the viewport. Body text stays at 17px.">
        <div className="grid gap-6">
          <p className="heading text-display">Pine, spruce and pallets</p>
          <p className="heading text-h2">Section heading, h2</p>
          <p className="heading text-h3">Card heading, h3</p>
          <p className="max-w-prose text-lead text-muted">Lead text introduces a section in one or two plain sentences.</p>
          <p className="max-w-prose">
            Body text is set for long reading on low cost phones. Line length stays near 70 characters on wide screens.
          </p>
          <p className="text-small text-muted">Small text for hints and secondary details.</p>
          <p className="text-label font-semibold tracking-wider text-accent uppercase">Label text</p>
        </div>
      </Section>

      <Section id="actions" heading="Buttons, links and badges" intro="Tab through to check the focus ring.">
        <div className="flex flex-wrap items-center gap-4">
          <Button href="#form">Request a quote</Button>
          <Button href="#actions" variant="secondary" newTab>
            <WhatsappLogoIcon aria-hidden="true" size={20} />
            Chat on WhatsApp
          </Button>
          <Button disabled>Disabled</Button>
          <TextLink href="#form">Ask for a price</TextLink>
          <Badge>Made to order</Badge>
          <Badge>Custom sizes</Badge>
        </div>
      </Section>

      <Section id="band" ground="band" heading="On the band" intro="The same components on a band ground. Links and focus use the band text colour here.">
        <div className="flex flex-wrap items-center gap-4">
          <Button href="#form">Request a quote</Button>
          <Button href="#band" variant="secondary">
            <WhatsappLogoIcon aria-hidden="true" size={20} />
            Chat on WhatsApp
          </Button>
          <TextLink href="#form">Ask for a price</TextLink>
          <Badge>Made to order</Badge>
        </div>
      </Section>

      <Section id="cards" ground="surface" heading="Cards" intro="Cards sit on bg or surface grounds, never on the band.">
        <ul className="grid gap-6 md:grid-cols-3">
          {["Pine", "Spruce", "Wooden pallets"].map((name) => (
            <Card key={name} as="li">
              <div className="aspect-[4/3] bg-wood/40" />
              <div className="grid gap-3 p-5">
                <h3 className="text-h3">{name}</h3>
                <p className="text-muted">Short description of the product and its common uses.</p>
                <div className="flex flex-wrap gap-2">
                  <Badge>Made to order</Badge>
                </div>
                <TextLink href="#form">Ask for a price</TextLink>
              </div>
            </Card>
          ))}
        </ul>
      </Section>

      <Section id="form" heading="Form fields" intro="Default, hint, error, select, textarea and disabled states.">
        <form className="grid max-w-3xl gap-5 sm:grid-cols-2">
          <TextField name="name" label={fields.name.label} required autoComplete="name" />
          <TextField name="company" label={fields.company.label} hint={fields.company.hint} autoComplete="organization" />
          <TextField name="phone" label={fields.phone.label} hint={fields.phone.hint} type="tel" required autoComplete="tel" />
          <TextField
            name="email"
            label={fields.email.label}
            hint={fields.email.hint}
            type="email"
            autoComplete="email"
            defaultValue="name@"
            error={enquiryForm.errors.email}
          />
          <SelectField
            name="product"
            label={fields.product.label}
            placeholder={fields.product.placeholder}
            options={productOptions}
            required
          />
          <TextField name="city" label={fields.city.label} disabled />
          <div className="sm:col-span-2">
            <TextField name="message" label={fields.message.label} hint={fields.message.hint} multiline />
          </div>
          <div className="sm:col-span-2">
            <Button type="submit">{enquiryForm.submit}</Button>
          </div>
        </form>
      </Section>

      <Section id="stock-table" ground="surface" heading="Stock table" intro="Sample rows for layout only. A table on wide screens, cards on narrow screens.">
        <StockTable
          heading={stock.tables.pine}
          headingId="sample-stock-heading"
          columns={{ ...stock.columns, actions: "Enquire" }}
          rows={sampleRows}
          askLabel={stock.askAction}
          whatsappLabel={stock.whatsappAction}
        />
      </Section>

      <Section id="pallets" heading="Pallet diagrams" intro="Drawn from scratch with a 1.5px stroke to match the regular icon weight.">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pallets.map((pallet) => (
            <Card key={pallet.type} as="li" className="p-5">
              <PalletDiagram type={pallet.type} className="w-full text-heading" />
              <p className="mt-3 font-semibold text-heading">{pallet.name}</p>
            </Card>
          ))}
        </ul>
      </Section>

      <Section id="icons" ground="surface" heading="Icons" intro="Phosphor, regular weight. Shown at 28px.">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {icons.map(({ name, Icon }) => (
            <li key={name} className="grid justify-items-center gap-2 rounded-md border border-line p-4 text-center">
              <Icon aria-hidden="true" size={28} className="text-heading" />
              <span className="text-label text-muted">{name}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="surfaces" heading="Radius and shadow">
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-sm border border-line bg-surface p-5 text-small">rounded-sm, controls inside cards</div>
          <div className="rounded-md bg-surface p-5 text-small shadow-card">rounded-md, shadow-card</div>
          <div className="rounded-lg bg-surface p-5 text-small shadow-raised">rounded-lg, shadow-raised</div>
        </div>
      </Section>
    </main>
  );
}
