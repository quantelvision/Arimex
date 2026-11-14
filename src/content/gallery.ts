import generated from "./gallery.generated.json";
import { gallery } from "./site";

export type GalleryImage = { id: string; src: string; width: number; height: number; alt: string };

// keyed by file name in assets/gallery; a photo added without an entry gets a numbered fallback
const altText: Record<string, string> = {
  image24: "Packs of planed timber stacked on bearers, with a tape measure held against one pack",
  image23: "Close view of pale planed boards, showing the grain and small knots",
  image22: "Packs of pale planed boards held with metal strapping",
  image21: "Packs of pale sawn boards stacked in several piles",
  image20: "A high stack of pale timber packs, seen from below",
  image19: "Pale sawn timber packs stacked high, showing the board ends",
  image18: "Strapped packs of sawn timber with a pack of short boards in front",
  image17: "A tall stack of sawn board packs separated by bearers",
  image16: "Strapped packs of long sawn boards lined up side by side",
  image15: "Stepped stacks of sawn board packs with green strapping, seen from a corner",
  image14: "Packs of pale sawn boards stacked in steps",
  image13: "Strapped packs of yellow sawn boards stacked four high",
  image12: "Close view of strapped sawn board packs stacked on bearers",
  image11: "Long packs of sawn boards held with green strapping",
  image10: "Sawn timber packs of different lengths stacked in steps",
  image9: "Packs of sawn boards and battens stacked together",
  image8: "A stack of strapped sawn timber packs in different lengths",
  image7: "Stacked packs of sawn boards with bearers between the layers",
  image6: "Tall stacks of sawn timber packs, seen from a corner",
  image5: "Rows of sawn timber packs stacked high, with uneven board ends",
  image4: "Packs of sawn boards stacked on bearers, one marked with a red crayon cross",
  image3: "Strapped packs of sawn timber stacked in a tall column",
  image2: "Sawn boards of mixed lengths stacked in layers",
  image1: "Square packs of sawn timber stacked four high",
};

export const galleryImages: GalleryImage[] = generated.map((image, index) => ({
  ...image,
  alt: altText[image.id] ?? gallery.altFallback(index + 1),
}));
