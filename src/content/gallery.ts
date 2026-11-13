import generated from "./gallery.generated.json";
import { gallery } from "./site";

export type GalleryImage = { id: string; src: string; width: number; height: number; alt: string };

// keyed by file name in assets/gallery; a photo added without an entry gets a numbered fallback
const altText: Record<string, string> = {
  image26: "Strapped packs of planed timber stacked in a warehouse, with a tape measure across one pack",
  image25: "Close view of planed timber boards stacked flat, showing the grain and small knots",
  image24: "Strapped packs of planed boards stacked on bearers",
  image23: "Packs of sawn timber stacked high under a steel roof",
  image22: "Tall stacks of sawn timber packs along a warehouse aisle",
  image21: "Stacks of sawn boards on a gravel floor inside a timber shed",
  image19: "Labelled packs of sawn boards stacked against a metal wall",
  image18: "A tall stack of strapped timber packs in a covered yard",
  image17: "Strapped timber packs stacked under an open shed roof",
  image11: "Sawn boards stacked in layers with spacer sticks between them",
  image10: "Layered packs of sawn timber with spacer sticks in a timber shed",
  image9: "Strapped packs of sawn timber in an open-sided shed",
  image2: "Sawn boards stacked in layers on a gravel floor",
  image1: "Square packs of sawn timber stacked against a red wall",
};

export const galleryImages: GalleryImage[] = generated.map((image, index) => ({
  ...image,
  alt: altText[image.id] ?? gallery.altFallback(index + 1),
}));
