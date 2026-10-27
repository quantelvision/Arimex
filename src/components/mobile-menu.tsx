"use client";

import type { MouseEvent } from "react";
import { ListIcon, XIcon } from "@phosphor-icons/react/ssr";
import Button from "./button";

type MobileMenuProps = {
  label: string;
  links: { label: string; href: string }[];
  openLabel: string;
  closeLabel: string;
  quoteLabel: string;
};

const menuId = "mobile-menu";
const iconButton = "inline-flex size-11 items-center justify-center rounded-md text-heading hover:bg-ink/5";

export default function MobileMenu({ label, links, openLabel, closeLabel, quoteLabel }: MobileMenuProps) {
  function closeOnLink(event: MouseEvent<HTMLDivElement>) {
    if ((event.target as HTMLElement).closest("a")) event.currentTarget.hidePopover();
  }

  return (
    <>
      <button type="button" popoverTarget={menuId} aria-label={openLabel} className={`${iconButton} lg:hidden`}>
        <ListIcon aria-hidden="true" size={26} />
      </button>
      <div
        id={menuId}
        popover="auto"
        onClick={closeOnLink}
        className="m-0 ml-auto h-dvh max-h-none w-full max-w-sm border-0 border-l border-line bg-bg p-0 text-ink shadow-raised backdrop:bg-ink/40"
      >
        <div className="flex justify-end px-gutter py-2.5">
          <button type="button" popoverTarget={menuId} popoverTargetAction="hide" aria-label={closeLabel} className={iconButton}>
            <XIcon aria-hidden="true" size={26} />
          </button>
        </div>
        <nav aria-label={label} className="px-gutter">
          <ul className="grid">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="flex min-h-12 items-center border-b border-line text-lead font-semibold text-heading">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Button href="#contact" className="mt-8 w-full">
            {quoteLabel}
          </Button>
        </nav>
      </div>
    </>
  );
}
