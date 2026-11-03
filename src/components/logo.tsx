import Image from "next/image";
import { business } from "@/content/site";

type LogoProps = {
  sizes: string;
  className?: string;
};

// the letters are a mask filled with the text colour, so they turn light on dark grounds while the mark keeps its colours
export default function Logo({ sizes, className = "" }: LogoProps) {
  return (
    <span
      role="img"
      aria-label={business.brand}
      className={`relative block aspect-[800/210] text-logo on-band:text-on-band ${className}`}
    >
      <Image src="/images/logo/arimex-mark.png" alt="" fill sizes={sizes} />
      <span className="absolute inset-0 bg-current mask-[url(/images/logo/arimex-type.png)] mask-contain mask-no-repeat" />
    </span>
  );
}
