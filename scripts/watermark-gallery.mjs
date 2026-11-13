import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, readdirSync, renameSync, rmSync, statSync, writeFileSync } from "node:fs";
import { availableParallelism } from "node:os";
import { dirname, extname, isAbsolute, join, parse, relative, resolve, sep } from "node:path";
import sharp from "sharp";
import config from "./gallery.config.mjs";

// bump when the processing below changes, so every photo is rebuilt by the new code
const pipelineVersion = 1;
const supportedFormats = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".tif", ".tiff"]);
const statePath = "node_modules/.cache/gallery-watermark/state.json";
const force = process.argv.includes("--force");
const workers = Math.max(1, Math.min(4, availableParallelism() - 1));

function fail(message) {
  console.error(`\nGallery: ${message}\n`);
  process.exit(1);
}

const isInside = (child, parent) => {
  const path = relative(parent, child);
  return path === "" || (!path.startsWith("..") && !isAbsolute(path));
};

const sha256 = (...parts) => {
  const hash = createHash("sha256");
  for (const part of parts) hash.update(part);
  return hash.digest("hex");
};

const source = resolve(config.source);
const output = resolve(config.output);
const publicDir = resolve("public");
if (!isInside(output, publicDir)) fail(`output "${config.output}" must be inside public/.`);
if (isInside(source, publicDir)) fail(`source "${config.source}" must stay outside public/, or the originals would be served.`);
// reading generated photos back in would watermark them twice, so the two folders may never overlap
if (isInside(output, source) || isInside(source, output)) fail("source and output folders must not overlap.");

const { watermark, image } = config;
const [vertical, horizontal] = watermark.position === "center" ? ["center", "center"] : watermark.position.split("-");
if (!["top", "center", "bottom"].includes(vertical) || !["left", "center", "right"].includes(horizontal)) {
  fail(`unknown watermark position "${watermark.position}".`);
}
for (const key of ["size", "margin", "opacity"]) {
  if (!(watermark[key] > 0 && watermark[key] <= 1)) fail(`watermark.${key} must be above 0 and at most 1.`);
}
if (!(Number.isInteger(image.maxEdge) && image.maxEdge > 0)) fail("image.maxEdge must be a whole number of pixels.");
if (!(Number.isInteger(image.quality) && image.quality >= 1 && image.quality <= 100)) fail("image.quality must be 1 to 100.");

if (!existsSync(watermark.file)) fail(`watermark "${watermark.file}" not found.`);
const watermarkFile = readFileSync(watermark.file);
const watermarkInfo = await sharp(watermarkFile).metadata().catch((error) => fail(`watermark "${watermark.file}" is not a readable image: ${error.message}`));
if (!watermarkInfo.hasAlpha) fail(`watermark "${watermark.file}" has no transparency, it would cover the photo with a box.`);

// any change to the watermark image, the settings or the pipeline makes every stored result invalid
const settings = sha256(JSON.stringify({ pipelineVersion, watermark: { ...watermark, file: undefined }, image }), watermarkFile);

function readState() {
  // a missing or unreadable state file only means a full run
  try {
    return JSON.parse(readFileSync(statePath, "utf8"));
  } catch {
    return { settings: null, images: {} };
  }
}

function listSources() {
  if (!existsSync(source)) {
    console.warn(`Gallery: ${config.source} not found, the gallery will be empty.`);
    return [];
  }
  const names = [];
  for (const entry of readdirSync(source, { withFileTypes: true })) {
    if (!entry.isFile() || entry.name.startsWith(".")) continue;
    if (supportedFormats.has(extname(entry.name).toLowerCase())) names.push(entry.name);
    else console.warn(`Gallery: skipped ${entry.name}, not a supported image format.`);
  }
  // newest first: file dates do not survive git, so the number in the name sets the order (image27 is newer than image26)
  return names.sort((a, b) => b.localeCompare(a, "en", { numeric: true }));
}

function offset(alignment, space, size, margin) {
  if (alignment === "center") return Math.round((space - size) / 2);
  return alignment === "top" || alignment === "left" ? margin : space - size - margin;
}

async function render(input) {
  const { data, info } = await sharp(input)
    .rotate()
    .resize({ width: image.maxEdge, height: image.maxEdge, fit: "inside", withoutEnlargement: true })
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  const shorterSide = Math.min(width, height);
  const margin = Math.round(shorterSide * watermark.margin);
  const markWidth = Math.max(1, Math.min(Math.round(shorterSide * watermark.size), width - 2 * margin));
  const mark = await sharp(watermarkFile)
    .resize({ width: markWidth })
    .ensureAlpha()
    // scales the watermark's own transparency by the configured opacity
    .composite([
      { input: Buffer.from([0, 0, 0, Math.round(255 * watermark.opacity)]), raw: { width: 1, height: 1, channels: 4 }, tile: true, blend: "dest-in" },
    ])
    .png()
    .toBuffer({ resolveWithObject: true });

  const webp = await sharp(data, { raw: { width, height, channels } })
    .composite([
      {
        input: mark.data,
        left: offset(horizontal, width, mark.info.width, margin),
        top: offset(vertical, height, mark.info.height, margin),
      },
    ])
    .webp({ quality: image.quality, effort: 5 })
    .toBuffer();
  return { webp, width, height };
}

async function processPhoto({ name, id }, previous, reusable) {
  const path = join(source, name);
  const file = `${id}.webp`;
  const target = join(output, file);
  const { size, mtimeMs } = statSync(path);
  const known = reusable && previous?.file === file && existsSync(target);

  if (known && previous.size === size && previous.mtimeMs === mtimeMs) return { ...previous, name, id, status: "unchanged" };
  const input = readFileSync(path);
  const hash = sha256(input);
  if (known && previous.hash === hash) return { ...previous, name, id, size, mtimeMs, status: "unchanged" };

  const { webp, width, height } = await render(input);
  // write beside the target and rename, so an interrupted run never leaves a half written photo in place
  const temporary = `${target}.tmp`;
  writeFileSync(temporary, webp);
  renameSync(temporary, target);
  return { name, id, file, size, mtimeMs, hash, width, height, status: "processed" };
}

const state = readState();
const reusable = !force && state.settings === settings;
const photos = [];
const ids = new Set();
for (const name of listSources()) {
  const id = parse(name).name;
  if (ids.has(id)) {
    console.error(`Gallery: skipped ${name}, another photo is already named "${id}". Rename one of them.`);
    continue;
  }
  ids.add(id);
  photos.push({ name, id });
}

mkdirSync(output, { recursive: true });
const results = new Array(photos.length).fill(null);
let failed = 0;
let next = 0;
async function worker() {
  while (next < photos.length) {
    const position = next++;
    const photo = photos[position];
    try {
      results[position] = await processPhoto(photo, state.images?.[photo.name], reusable);
    } catch (error) {
      failed++;
      console.error(`Gallery: skipped ${photo.name}, it could not be processed: ${error.message}`);
    }
  }
}
await Promise.all(Array.from({ length: Math.min(workers, photos.length) }, worker));
const done = results.filter(Boolean);

// anything left in the output without a current source (deleted, renamed or failed photos, interrupted writes) is removed
const expected = new Set(done.map((photo) => photo.file));
let removed = 0;
for (const entry of readdirSync(output)) {
  if (expected.has(entry)) continue;
  rmSync(join(output, entry), { recursive: true, force: true });
  removed++;
  process.stdout.write(`Gallery: removed ${entry}, it has no source photo.\n`);
}

const publicPath = `/${relative(publicDir, output).split(sep).join("/")}`;
const manifest = done.map(({ id, file, width, height }) => ({ id, src: `${publicPath}/${encodeURIComponent(file)}`, width, height }));
writeFileSync(config.manifest, `${JSON.stringify(manifest, null, 2)}\n`);

mkdirSync(dirname(statePath), { recursive: true });
const images = Object.fromEntries(done.map(({ name, file, size, mtimeMs, hash, width, height }) => [name, { file, size, mtimeMs, hash, width, height }]));
writeFileSync(statePath, JSON.stringify({ settings, images }));

const processed = done.filter((photo) => photo.status === "processed").length;
process.stdout.write(
  `Gallery: ${done.length} photos, ${processed} watermarked, ${done.length - processed} unchanged, ${removed} removed, ${failed} failed.\n`,
);
