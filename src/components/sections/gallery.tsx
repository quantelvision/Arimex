import GalleryGrid from "@/components/gallery-grid";
import Section from "@/components/section";
import { galleryImages } from "@/content/gallery";
import { gallery } from "@/content/site";

export default function Gallery() {
  if (galleryImages.length === 0) return null;

  return (
    <Section id="gallery" ground="band" heading={gallery.heading}>
      <GalleryGrid images={galleryImages} />
    </Section>
  );
}
