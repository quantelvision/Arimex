import type { ReactNode } from "react";
import { WarningCircleIcon } from "@phosphor-icons/react/ssr";

export const controlClass =
  "min-h-11 w-full rounded-md border border-field bg-surface px-3.5 py-2.5 text-body text-ink placeholder:text-muted disabled:cursor-not-allowed disabled:opacity-60 aria-[invalid=true]:border-error";

export function describedBy(id: string, hint?: string, error?: string) {
  const ids = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ");
  return ids || undefined;
}

type FormFieldProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
};

export default function FormField({ id, label, hint, error, children }: FormFieldProps) {
  return (
    <div className="grid content-start gap-1.5">
      <label htmlFor={id} className="font-semibold text-ink">
        {label}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="text-small text-muted">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`${id}-error`} className="flex items-start gap-1.5 text-small font-semibold text-error">
          <WarningCircleIcon aria-hidden="true" size="1.25em" className="shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
