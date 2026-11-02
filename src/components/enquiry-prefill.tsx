"use client";

import { useEffect } from "react";

export default function EnquiryPrefill({ formId }: { formId: string }) {
  useEffect(() => {
    let lastPrefilledSize = "";

    function prefill(event: MouseEvent) {
      const link = (event.target as Element).closest<HTMLAnchorElement>("a[data-product], a[data-size]");
      const form = document.getElementById(formId);
      if (!link || !form) return;

      const product = form.querySelector<HTMLSelectElement>('[name="product"]');
      const size = form.querySelector<HTMLInputElement>('[name="size"]');
      const name = form.querySelector<HTMLInputElement>('[name="name"]');
      if (product && link.dataset.product) product.value = link.dataset.product;
      if (size && (link.dataset.size || size.value === lastPrefilledSize)) {
        size.value = link.dataset.size ?? "";
        lastPrefilledSize = size.value;
      }
      // the fragment jump that follows this click resets focus, so focus after it
      window.setTimeout(() => name?.focus({ preventScroll: true }), 0);
    }

    document.addEventListener("click", prefill);
    return () => document.removeEventListener("click", prefill);
  }, [formId]);

  return null;
}
