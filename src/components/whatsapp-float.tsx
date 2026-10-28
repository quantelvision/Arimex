"use client";

import { useEffect, useState } from "react";
import WhatsappIcon from "./whatsapp-icon";

type WhatsappFloatProps = {
  href: string;
  label: string;
  hideOverId: string;
};

export default function WhatsappFloat({ href, label, hideOverId }: WhatsappFloatProps) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const target = document.getElementById(hideOverId);
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting));
    observer.observe(target);
    return () => observer.disconnect();
  }, [hideOverId]);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      hidden={hidden}
      className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 inline-flex size-14 items-center justify-center rounded-full bg-cta text-on-cta shadow-raised ring-2 ring-on-cta hover:bg-cta/85 sm:right-6 sm:bottom-6"
    >
      <WhatsappIcon aria-hidden="true" size={30} />
    </a>
  );
}
