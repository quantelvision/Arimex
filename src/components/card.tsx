import type { ReactNode } from "react";

type CardProps = {
  as?: "div" | "article" | "li";
  children: ReactNode;
  className?: string;
};

export default function Card({ as: Tag = "div", children, className = "" }: CardProps) {
  return (
    <Tag className={`overflow-hidden rounded-lg border border-line bg-surface text-ink shadow-card ${className}`}>
      {children}
    </Tag>
  );
}
