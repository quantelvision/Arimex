import type { ReactNode } from "react";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-2.5 font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60";

const variants = {
  primary: "bg-cta text-on-cta hover:bg-cta/85 on-band:bg-on-band on-band:text-band on-band:hover:bg-on-band/85",
  secondary:
    "border border-field text-ink hover:bg-ink/5 on-band:border-on-band on-band:text-on-band on-band:hover:bg-on-band/10",
};

type ButtonProps = {
  children: ReactNode;
  variant?: keyof typeof variants;
  href?: string;
  newTab?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
};

export default function Button({
  children,
  variant = "primary",
  href,
  newTab = false,
  type = "button",
  disabled,
  className = "",
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        target={newTab ? "_blank" : undefined}
        rel={newTab ? "noopener noreferrer" : undefined}
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
