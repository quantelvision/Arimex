import type { ReactNode } from "react";

type TextLinkProps = {
  href: string;
  children: ReactNode;
  newTab?: boolean;
};

export default function TextLink({ href, children, newTab = false }: TextLinkProps) {
  return (
    <a
      href={href}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
      className="font-semibold text-accent underline decoration-1 underline-offset-4 hover:decoration-2 on-band:text-on-band"
    >
      {children}
    </a>
  );
}
