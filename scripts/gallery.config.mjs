// settings for scripts/watermark-gallery.mjs; changing any of them, or the watermark image itself, rebuilds every gallery photo
const galleryConfig = {
  // the originals: only ever read, never written, and kept outside public/ so they are never served
  source: "assets/gallery",
  // watermarked WebP copies the site serves; the script owns this folder and removes anything without a source
  output: "public/gallery",
  manifest: "src/content/gallery.generated.json",
  watermark: {
    // a PNG with transparency
    file: "assets/watermark/arimex-watermark.png",
    // width and edge margin as a share of the photo's shorter side, so portrait and landscape photos get the same proportions
    size: 0.3,
    margin: 0.035,
    opacity: 0.8,
    // top-left, top-right, bottom-left, bottom-right or center
    position: "bottom-right",
  },
  image: {
    // longest edge in pixels; smaller photos are never enlarged
    maxEdge: 2000,
    // WebP quality, 1 to 100
    quality: 80,
  },
};

export default galleryConfig;
