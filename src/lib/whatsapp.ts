import { business } from "@/content/site";

export function whatsappUrl(message: string, number = business.whatsapp) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
