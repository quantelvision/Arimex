import Button from "@/components/button";
import EnquiryPrefill from "@/components/enquiry-prefill";
import Section from "@/components/section";
import SelectField from "@/components/select-field";
import TextField from "@/components/text-field";
import { contact, enquiryForm, productOptions } from "@/content/site";

const formId = "enquiry-form";
const fields = enquiryForm.fields;

export default function Contact() {
  return (
    <Section id="contact" heading={contact.heading} intro={contact.intro}>
      <form id={formId} className="grid max-w-3xl gap-5 sm:grid-cols-2">
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
      <EnquiryPrefill formId={formId} />
    </Section>
  );
}
