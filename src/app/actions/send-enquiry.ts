"use server";

import { checkRateLimit } from "@vercel/firewall";
import { headers } from "next/headers";
import { Resend } from "resend";
import { enquiryEmail, readEnquiry, validateEnquiry, type EnquiryState } from "@/lib/enquiry";

const rateLimitId = "enquiry-form";

async function isRateLimited() {
  // the rate limit API only exists on Vercel deployments, with a matching rule in the project firewall
  if (!process.env.VERCEL) return false;
  try {
    const { rateLimited } = await checkRateLimit(rateLimitId, { headers: new Headers(await headers()), timeout: 1500 });
    return rateLimited;
  } catch (error) {
    console.error("Enquiry rate limit check failed, letting the request through:", error);
    return false;
  }
}

export async function sendEnquiry(_previous: EnquiryState, formData: FormData): Promise<EnquiryState> {
  if (formData.get("website")) return { status: "sent" };

  const values = readEnquiry(formData);
  const errors = validateEnquiry(values);
  if (Object.keys(errors).length > 0) return { status: "invalid", values, errors };

  if (await isRateLimited()) return { status: "failed", values, reason: "rate-limited" };

  const { RESEND_API_KEY, ENQUIRY_TO_EMAIL, ENQUIRY_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !ENQUIRY_TO_EMAIL || !ENQUIRY_FROM_EMAIL) {
    console.error("Enquiry not sent: RESEND_API_KEY, ENQUIRY_TO_EMAIL and ENQUIRY_FROM_EMAIL must all be set.");
    return { status: "failed", values, reason: "send-failed" };
  }

  try {
    const { subject, text, html } = enquiryEmail(values);
    const { error } = await new Resend(RESEND_API_KEY).emails.send({
      from: ENQUIRY_FROM_EMAIL,
      to: ENQUIRY_TO_EMAIL,
      replyTo: values.email || undefined,
      subject,
      text,
      html,
    });
    if (error) {
      console.error("Enquiry not sent, Resend returned an error:", error);
      return { status: "failed", values, reason: "send-failed" };
    }
  } catch (error) {
    console.error("Enquiry not sent, the request to Resend failed:", error);
    return { status: "failed", values, reason: "send-failed" };
  }

  return { status: "sent" };
}
