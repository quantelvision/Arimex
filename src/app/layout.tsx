import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "@fontsource-variable/bitter";
import "@fontsource-variable/source-sans-3";
import "@fontsource-variable/literata";
import "@fontsource-variable/public-sans";
import "@fontsource-variable/archivo/wdth.css";
import "@fontsource-variable/gelasio";
import "@fontsource-variable/figtree";
import "@fontsource-variable/aleo";
import "@fontsource-variable/work-sans";
import "@fontsource-variable/oswald";
import "@fontsource-variable/libre-franklin";
import "@fontsource-variable/lora";
import "@fontsource-variable/nunito-sans";
import "@fontsource-variable/red-hat-display";
import "@fontsource-variable/red-hat-text";
import "@fontsource-variable/cormorant";
import "@fontsource-variable/manrope";
import "./globals.css";
import { business, meta } from "@/content/site";
import { siteUrl } from "@/lib/site-url";
import ThemeEngine from "@/theme/theme-engine";
import { buildThemeCss, defaultFont, defaultPalette, noFlashScript, switcherEnabled } from "@/theme/themes";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: meta.title,
  description: meta.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: business.brand,
    locale: meta.locale,
    title: meta.title,
    description: meta.description,
  },
  twitter: {
    card: "summary_large_image",
    title: meta.title,
    description: meta.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme={defaultPalette} data-font={defaultFont} suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: buildThemeCss() }} />
        {switcherEnabled && <script dangerouslySetInnerHTML={{ __html: noFlashScript() }} />}
      </head>
      <body className="bg-bg text-ink antialiased">
        {children}
        {switcherEnabled && <ThemeEngine />}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
