"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { CheckCircleIcon } from "@phosphor-icons/react/ssr";
import { sendEnquiry } from "@/app/actions/send-enquiry";
import { enquiryForm, productOptions } from "@/content/site";
import { maxLengths, type EnquiryErrors, type EnquiryState, type EnquiryValues } from "@/lib/enquiry";
import Button from "./button";
import EnquiryFallback from "./enquiry-fallback";
import SelectField from "./select-field";
import TextField from "./text-field";

const initialState: EnquiryState = { status: "idle" };
const fields = enquiryForm.fields;
const noErrors: EnquiryErrors = {};

export default function EnquiryForm({ id }: { id: string }) {
  const [state, formAction, pending] = useActionState(sendEnquiry, initialState);
  const [dismissed, setDismissed] = useState<EnquiryState | null>(null);
  const noticeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.status !== "idle") noticeRef.current?.focus();
  }, [state]);

  if (state.status === "sent" && dismissed !== state) {
    return (
      <div ref={noticeRef} tabIndex={-1} role="status" className="max-w-3xl rounded-lg border border-line bg-surface p-6 md:p-8">
        <CheckCircleIcon aria-hidden="true" size={36} className="text-accent" />
        <h3 className="mt-3 text-h3">{enquiryForm.success.heading}</h3>
        <p className="mt-2 text-lead">{enquiryForm.success.text}</p>
        <Button variant="secondary" className="mt-6" onClick={() => setDismissed(state)}>
          {enquiryForm.success.anotherAction}
        </Button>
      </div>
    );
  }

  const values: Partial<EnquiryValues> = state.status === "invalid" || state.status === "failed" ? state.values : {};
  const errors = state.status === "invalid" ? state.errors : noErrors;
  // a select keeps its first default after mount, so remount it to restore the submitted product
  const productKey = `product-${values.product ?? ""}`;

  return (
    <form id={id} action={formAction} noValidate className="grid max-w-3xl gap-5 sm:grid-cols-2">
      <p className="text-small text-muted sm:col-span-2">{enquiryForm.requiredNote}</p>

      {(state.status === "invalid" || state.status === "failed") && (
        <div
          ref={noticeRef}
          tabIndex={-1}
          role="alert"
          className="rounded-md border-l-4 border-error bg-surface p-4 sm:col-span-2"
        >
          {state.status === "invalid" ? (
            <p className="font-semibold text-error">{enquiryForm.errors.summary}</p>
          ) : (
            <EnquiryFallback
              message={state.reason === "rate-limited" ? enquiryForm.errors.rateLimited : enquiryForm.errors.failed}
            />
          )}
        </div>
      )}

      <TextField
        name="name"
        label={fields.name.label}
        required
        autoComplete="name"
        maxLength={maxLengths.name}
        defaultValue={values.name}
        error={errors.name}
      />
      <TextField
        name="company"
        label={fields.company.label}
        optionalLabel={enquiryForm.optionalLabel}
        autoComplete="organization"
        maxLength={maxLengths.company}
        defaultValue={values.company}
        error={errors.company}
      />
      <TextField
        name="phone"
        label={fields.phone.label}
        hint={fields.phone.hint}
        type="tel"
        required
        autoComplete="tel"
        maxLength={maxLengths.phone}
        defaultValue={values.phone}
        error={errors.phone}
      />
      <TextField
        name="email"
        label={fields.email.label}
        optionalLabel={enquiryForm.optionalLabel}
        type="email"
        autoComplete="email"
        maxLength={maxLengths.email}
        defaultValue={values.email}
        error={errors.email}
      />
      <SelectField
        key={productKey}
        name="product"
        label={fields.product.label}
        placeholder={fields.product.placeholder}
        options={productOptions}
        required
        defaultValue={values.product}
        error={errors.product}
      />
      <TextField
        name="quantity"
        label={fields.quantity.label}
        hint={fields.quantity.hint}
        maxLength={maxLengths.quantity}
        defaultValue={values.quantity}
        error={errors.quantity}
      />
      <TextField
        name="size"
        label={fields.size.label}
        hint={fields.size.hint}
        maxLength={maxLengths.size}
        defaultValue={values.size}
        error={errors.size}
      />
      <TextField
        name="city"
        label={fields.city.label}
        autoComplete="address-level2"
        maxLength={maxLengths.city}
        defaultValue={values.city}
        error={errors.city}
      />
      <div className="sm:col-span-2">
        <TextField
          name="message"
          label={fields.message.label}
          hint={fields.message.hint}
          multiline
          maxLength={maxLengths.message}
          defaultValue={values.message}
          error={errors.message}
        />
      </div>

      <div aria-hidden="true" className="absolute -left-[10000px] size-px overflow-hidden">
        <label htmlFor="website">{fields.honeypot.label}</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="sm:col-span-2">
        <Button type="submit" disabled={pending}>
          {pending ? enquiryForm.sending : enquiryForm.submit}
        </Button>
      </div>
    </form>
  );
}
