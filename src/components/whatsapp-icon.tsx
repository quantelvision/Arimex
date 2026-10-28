import type { ComponentProps } from "react";
import { WhatsappLogoIcon } from "@phosphor-icons/react/ssr";

// the filled glyph is the one people recognise as WhatsApp, every other icon stays at regular weight
export default function WhatsappIcon(props: ComponentProps<typeof WhatsappLogoIcon>) {
  return <WhatsappLogoIcon weight="fill" {...props} />;
}
