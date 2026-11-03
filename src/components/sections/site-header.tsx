import Button from "@/components/button";
import Container from "@/components/container";
import Logo from "@/components/logo";
import MobileMenu from "@/components/mobile-menu";
import { nav } from "@/content/site";

export default function SiteHeader() {
  return (
    <header className="header-edge sticky top-0 z-40 bg-bg">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-cta focus:px-4 focus:py-2.5 focus:font-semibold focus:text-on-cta"
      >
        {nav.skipLink}
      </a>
      <Container className="flex min-h-16 items-center justify-between gap-3 sm:gap-4">
        <a href="#top" className="shrink-0 py-2">
          <Logo sizes="160px" className="h-8 sm:h-10" />
        </a>
        <nav aria-label={nav.label} className="hidden lg:block">
          <ul className="flex gap-7">
            {nav.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="font-semibold text-ink hover:text-accent">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <Button href="#contact" className="whitespace-nowrap max-[22.4rem]:hidden">
            {nav.quoteAction}
          </Button>
          <MobileMenu
            label={nav.label}
            links={nav.links}
            openLabel={nav.openMenu}
            closeLabel={nav.closeMenu}
            quoteLabel={nav.quoteAction}
          />
        </div>
      </Container>
    </header>
  );
}
