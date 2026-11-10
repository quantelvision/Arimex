import { business, enquiryEmailCopy as copy, enquiryForm, productOptions } from "@/content/site";
import { enquiryFields, type EnquiryValues } from "@/lib/enquiry";
import { siteUrl } from "@/lib/site-url";
import { whatsappUrl } from "@/lib/whatsapp";
import { emailTheme } from "@/theme/themes";

const { colors, font } = emailTheme;

const productLabel = (value: string) => productOptions.find((option) => option.value === value)?.label ?? value;

const escapeHtml = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// the form accepts numbers with or without +91 or a leading 0, call and WhatsApp links need the full 91 prefix
function internationalNumber(phone: string) {
  const digits = phone.replace(/\D/g, "").replace(/^0/, "");
  return digits.length === 10 ? `91${digits}` : digits;
}

function button(href: string, label: string, primary: boolean) {
  const look = primary
    ? `background:${colors.cta};color:${colors.onCta};border:1px solid ${colors.cta}`
    : `background:${colors.surface};color:${colors.ink};border:1px solid ${colors.field}`;
  return `<a href="${escapeHtml(href)}" style="display:inline-block;margin:0 8px 8px 0;padding:11px 18px;border-radius:8px;${look};font-size:15px;line-height:20px;font-weight:700;text-decoration:none">${escapeHtml(label)}</a>`;
}

export function enquiryEmail(values: EnquiryValues) {
  const product = productLabel(values.product);
  const rows = enquiryFields
    .map((field) => [enquiryForm.fields[field].label, field === "product" ? product : values[field]])
    .filter(([, value]) => value);
  const number = internationalNumber(values.phone);
  const headline = [product, values.quantity].filter(Boolean).join(", ");
  const sender = [values.name, values.company, values.city].filter(Boolean).join(", ");
  const sentAt = new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" }).format(new Date());
  const footer = copy.sentFrom(new URL(siteUrl).host, sentAt);
  const subject = `New enquiry: ${[product, values.quantity, values.city].filter(Boolean).join(", ")}`;

  const actions = [
    button(`tel:+${number}`, `${copy.callAction} ${values.phone}`, true),
    button(whatsappUrl(copy.whatsappGreeting(values.name, product), number), copy.whatsappAction, false),
    values.email ? button(`mailto:${values.email}?subject=${encodeURIComponent(copy.replySubject)}`, copy.emailAction, false) : "",
  ].join("");

  const cell = `padding:12px 0;border-top:1px solid ${colors.line};vertical-align:top`;
  const detailRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="${cell};width:36%;padding-right:12px;font-size:14px;line-height:20px;color:${colors.muted}">${escapeHtml(label)}</td>` +
        `<td style="${cell};font-size:15px;line-height:22px;font-weight:600;color:${colors.heading}">${escapeHtml(value).replace(/\n/g, "<br>")}</td></tr>`,
    )
    .join("");

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background:${colors.bg}">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${escapeHtml(sender)}: ${escapeHtml(headline)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${colors.bg}">
<tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background:${colors.surface};border:1px solid ${colors.line};border-radius:14px;overflow:hidden;font-family:${font};color:${colors.ink}">
<tr><td style="padding:22px 28px">
<img src="${siteUrl}/images/logo/arimex-logo.png" width="168" height="44" alt="${business.brand}" style="display:block;width:168px;height:auto;border:0;font-family:${font};font-size:24px;font-weight:800;color:${colors.logo}">
</td></tr>
<tr><td style="padding:24px 28px;background:${colors.band}">
<p style="margin:0;font-size:12px;line-height:16px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${colors.wood}">${escapeHtml(copy.heading)}</p>
<h1 style="margin:8px 0 0;font-family:${font};font-size:24px;line-height:30px;font-weight:800;color:${colors.onBand}">${escapeHtml(headline)}</h1>
<p style="margin:6px 0 0;font-size:15px;line-height:22px;color:${colors.onBand}">${escapeHtml(sender)}</p>
</td></tr>
<tr><td style="padding:24px 28px 16px">${actions}</td></tr>
<tr><td style="padding:0 28px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${detailRows}</table>
</td></tr>
<tr><td style="padding:16px 28px;background:${colors.bg};border-top:1px solid ${colors.line};font-size:12px;line-height:18px;color:${colors.muted}">${escapeHtml(footer)}</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;

  const text = [copy.heading, headline, sender, "", ...rows.map(([label, value]) => `${label}: ${value}`), "", footer].join("\n");

  return { subject, text, html };
}
