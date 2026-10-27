import { enquiryForm, productOptions } from "@/content/site";

export const enquiryFields = ["name", "company", "phone", "email", "product", "quantity", "size", "city", "message"] as const;

export type EnquiryField = (typeof enquiryFields)[number];
export type EnquiryValues = Record<EnquiryField, string>;
export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

export type EnquiryState =
  | { status: "idle" }
  | { status: "invalid"; values: EnquiryValues; errors: EnquiryErrors }
  | { status: "failed"; values: EnquiryValues; reason: "rate-limited" | "send-failed" }
  | { status: "sent" };

export const maxLengths: Record<EnquiryField, number> = {
  name: 100,
  company: 120,
  phone: 30,
  email: 200,
  product: 20,
  quantity: 100,
  size: 200,
  city: 100,
  message: 2000,
};

// 10 digit Indian mobile or landline (STD code included), optionally after +91, 91 or a leading 0
const phonePattern = /^(?:\+?91|0)?[1-9]\d{9}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function readEnquiry(formData: FormData): EnquiryValues {
  const read = (field: EnquiryField) => String(formData.get(field) ?? "").trim();
  return {
    name: read("name"),
    company: read("company"),
    phone: read("phone"),
    email: read("email"),
    product: read("product"),
    quantity: read("quantity"),
    size: read("size"),
    city: read("city"),
    message: read("message"),
  };
}

export function validateEnquiry(values: EnquiryValues): EnquiryErrors {
  const messages = enquiryForm.errors;
  const errors: EnquiryErrors = {};

  if (!values.name) errors.name = messages.name;
  if (!phonePattern.test(values.phone.replace(/[\s().-]/g, ""))) errors.phone = messages.phone;
  if (values.email && !emailPattern.test(values.email)) errors.email = messages.email;
  if (!productOptions.some((option) => option.value === values.product)) errors.product = messages.product;
  for (const field of enquiryFields) {
    if (!errors[field] && values[field].length > maxLengths[field]) errors[field] = messages.tooLong(maxLengths[field]);
  }
  return errors;
}

const productLabel = (value: string) => productOptions.find((option) => option.value === value)?.label ?? value;

const escapeHtml = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function enquiryEmail(values: EnquiryValues) {
  const rows = enquiryFields
    .map((field) => [enquiryForm.fields[field].label, field === "product" ? productLabel(values.product) : values[field]])
    .filter(([, value]) => value);

  return {
    subject: `New enquiry: ${[productLabel(values.product), values.quantity, values.city].filter(Boolean).join(", ")}`,
    text: rows.map(([label, value]) => `${label}: ${value}`).join("\n"),
    html: `<table cellpadding="8" style="border-collapse:collapse;font-family:sans-serif;font-size:15px">${rows
      .map(
        ([label, value]) =>
          `<tr><th align="left" valign="top">${escapeHtml(label)}</th><td>${escapeHtml(value).replace(/\n/g, "<br>")}</td></tr>`,
      )
      .join("")}</table>`,
  };
}
