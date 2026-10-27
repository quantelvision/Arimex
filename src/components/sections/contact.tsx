import EnquiryFallback from "@/components/enquiry-fallback";
import EnquiryForm from "@/components/enquiry-form";
import EnquiryFormBoundary from "@/components/enquiry-form-boundary";
import EnquiryPrefill from "@/components/enquiry-prefill";
import Section from "@/components/section";
import { contact, enquiryForm } from "@/content/site";

export const enquiryFormId = "enquiry-form";

export default function Contact() {
  return (
    <Section id="contact" heading={contact.heading} intro={contact.intro}>
      <EnquiryFormBoundary
        fallback={
          <div role="alert" className="max-w-3xl rounded-md border-l-4 border-error bg-surface p-4">
            <EnquiryFallback message={enquiryForm.errors.failed} />
          </div>
        }
      >
        <EnquiryForm id={enquiryFormId} />
      </EnquiryFormBoundary>
      <EnquiryPrefill formId={enquiryFormId} />
    </Section>
  );
}
