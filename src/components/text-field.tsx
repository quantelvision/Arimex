import FormField, { controlClass, describedBy } from "./form-field";

type TextFieldProps = {
  name: string;
  label: string;
  optionalLabel?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  type?: "text" | "tel" | "email";
  autoComplete?: string;
  multiline?: boolean;
  defaultValue?: string;
};

export default function TextField({
  name,
  label,
  optionalLabel,
  hint,
  error,
  required,
  disabled,
  type = "text",
  autoComplete,
  multiline = false,
  defaultValue,
}: TextFieldProps) {
  const control = {
    id: name,
    name,
    required,
    disabled,
    defaultValue,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy(name, hint, error),
    className: controlClass,
  };

  return (
    <FormField id={name} label={label} optionalLabel={optionalLabel} hint={hint} error={error}>
      {multiline ? <textarea rows={5} {...control} /> : <input type={type} autoComplete={autoComplete} {...control} />}
    </FormField>
  );
}
