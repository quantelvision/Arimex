import { PhoneIcon } from "@phosphor-icons/react/ssr";
import { business, contact, whatsappMessages } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";
import Button from "./button";
import WhatsappIcon from "./whatsapp-icon";

export default function EnquiryFallback({ message }: { message: string }) {
  return (
    <>
      <p className="font-semibold text-error">{message}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Button href={`tel:${business.phone.tel}`} variant="secondary">
          <PhoneIcon aria-hidden="true" size={20} />
          {contact.labels.phone}
        </Button>
        <Button href={whatsappUrl(whatsappMessages.general)} variant="secondary" newTab>
          <WhatsappIcon aria-hidden="true" size={20} />
          {contact.labels.whatsapp}
        </Button>
      </div>
    </>
  );
}
