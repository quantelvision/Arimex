import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join, parse } from "node:path";
import sharp from "sharp";

const source = "assets/gallery";
const target = "public/images/gallery";
const manifest = "src/content/gallery.generated.json";
const longestEdge = 2000;

// newest first: file dates do not survive git, so the number in the name sets the order (image27 is newer than image26)
const files = readdirSync(source)
  .filter((file) => /\.(jpe?g|png|webp|avif)$/i.test(file))
  .sort((a, b) => b.localeCompare(a, "en", { numeric: true }));

rmSync(target, { recursive: true, force: true });
mkdirSync(target, { recursive: true });

const images = [];
for (const file of files) {
  const id = parse(file).name;
  const output = `${id}.jpg`;
  // rotate() applies the camera orientation, and re-encoding drops the photo metadata, location included
  const { width, height } = await sharp(join(source, file))
    .rotate()
    .resize({ width: longestEdge, height: longestEdge, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(join(target, output));
  images.push({ id, src: `/images/gallery/${output}`, width, height });
}

writeFileSync(manifest, `${JSON.stringify(images, null, 2)}\n`);
process.stdout.write(`Gallery: ${images.length} photos.\n`);
