import type { MetadataRoute } from "next";
import { hero, products } from "@/content/site";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const images = [hero.media.poster, ...products.cards.map((card) => card.image)];
  return [{ url: `${siteUrl}/`, images: images.map((path) => `${siteUrl}${path}`) }];
}
