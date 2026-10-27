import { business } from "@/content/site";

export default function Wordmark({ className = "" }: { className?: string }) {
  return <span className={`heading on-band:text-on-band ${className}`}>{business.brand}</span>;
}
