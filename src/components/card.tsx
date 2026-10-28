import type { ReactNode } from "react";

type CardProps = {
  as?: "div" | "article" | "li";
  reveal?: boolean;
  children: ReactNode;
  className?: string;
};

export default function Card({ as: Tag = "div", reveal = false, children, className = "" }: CardProps) {
  return (
    <Tag
      data-reveal={reveal || undefined}
      className={`overflow-hidden rounded-lg border border-line bg-surface text-ink shadow-card ${className}`}
    >
      {children}
    </Tag>
  );
}
