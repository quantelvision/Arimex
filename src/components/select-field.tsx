import { CaretDownIcon } from "@phosphor-icons/react/ssr";
import FormField, { controlClass, describedBy } from "./form-field";

type SelectFieldProps = {
  name: string;
  label: string;
  placeholder: string;
  options: { value: string; label: string }[];
  hint?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: string;
};

export default function SelectField({
  name,
  label,
  placeholder,
  options,
  hint,
  error,
  required,
  disabled,
  defaultValue = "",
}: SelectFieldProps) {
  return (
    <FormField id={name} label={label} hint={hint} error={error}>
      <div className="relative">
        <select
          id={name}
          name={name}
          required={required}
          disabled={disabled}
          defaultValue={defaultValue}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(name, hint, error)}
          className={`${controlClass} appearance-none pr-10`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <CaretDownIcon
          aria-hidden="true"
          size={18}
          className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-muted"
        />
      </div>
    </FormField>
  );
}
