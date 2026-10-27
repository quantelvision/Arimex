import { readFileSync, writeFileSync } from "node:fs";
import { readSheet } from "read-excel-file/node";

const source = "src/content/stock.xlsx";
const target = "src/content/stock.generated.json";
const headers = ["Product", "Thickness (mm)", "Width (mm)", "Quantity (m3)", "Grade"];
const strict = process.argv.includes("--strict");

const [headerRow = [], ...dataRows] = await readSheet(readFileSync(source), "Sizes");
const errors = [];
const isBlank = (cell) => cell === null || cell === undefined || cell === "";

headers.forEach((header, index) => {
  if (headerRow[index] !== header) errors.push(`Sizes tab, column ${index + 1}: the heading must be "${header}".`);
});

function positiveNumber(value, where, column) {
  if (typeof value === "number" && value > 0) return value;
  errors.push(`${where}: ${column} must be a number greater than 0.`);
  return 0;
}

const sizes = { pine: [], spruce: [] };
dataRows.forEach((cells, index) => {
  if (cells.every(isBlank)) return;
  const where = `Sizes tab, row ${index + 2}`;
  const [product, thickness, width, quantity, grade] = cells;

  const productKey = typeof product === "string" ? product.toLowerCase() : "";
  if (!(productKey in sizes)) {
    errors.push(`${where}: Product must be Pine or Spruce.`);
    return;
  }

  const size = {
    thickness: positiveNumber(thickness, where, "Thickness"),
    width: positiveNumber(width, where, "Width"),
    quantity: isBlank(quantity) ? null : positiveNumber(quantity, where, "Quantity"),
    grade: isBlank(grade) ? null : String(grade),
  };
  if (sizes[productKey].some((listed) => listed.thickness === size.thickness && listed.width === size.width)) {
    errors.push(`${where}: ${product} ${size.thickness} x ${size.width} is already listed.`);
  }
  sizes[productKey].push(size);
});

if (errors.length > 0) {
  console.error(`\n${source} has ${errors.length} problem(s):\n${errors.map((error) => `  - ${error}`).join("\n")}\n`);
  if (strict) process.exit(1);
  console.error("The sizes table is left empty until these are fixed.\n");
  sizes.pine = [];
  sizes.spruce = [];
}

writeFileSync(target, `${JSON.stringify(sizes, null, 2)}\n`);
process.stdout.write(`Sizes list: ${sizes.pine.length} pine and ${sizes.spruce.length} spruce sizes.\n`);
