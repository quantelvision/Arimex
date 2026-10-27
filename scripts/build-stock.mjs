import { readFileSync, writeFileSync } from "node:fs";
import { readSheet } from "read-excel-file/node";

const source = "src/content/stock.xlsx";
const target = "src/content/stock.generated.json";
const maxAgeDays = 60;
const headers = ["Product", "Thickness (mm)", "Width (mm)", "Length (mm)", "Quantity (m3)", "Grade"];
const strict = process.argv.includes("--strict");

const file = readFileSync(source);
const details = await readSheet(file, "Details");
const sheetRows = await readSheet(file, "Stock");

const errors = [];
const isBlank = (cell) => cell === null || cell === undefined || cell === "";
const detail = (label) => details.find((row) => row[0] === label)?.[1] ?? null;

const [headerRow = [], ...dataRows] = sheetRows;
headers.forEach((header, index) => {
  if (headerRow[index] !== header) errors.push(`Stock tab, column ${index + 1}: the heading must be "${header}".`);
});

function positiveNumber(value, where, column, required) {
  if (isBlank(value)) {
    if (required) errors.push(`${where}: ${column} is required.`);
    return null;
  }
  if (typeof value !== "number" || value <= 0) {
    errors.push(`${where}: ${column} must be a number greater than 0.`);
    return null;
  }
  return value;
}

const stock = { pine: [], spruce: [] };
dataRows.forEach((cells, index) => {
  if (cells.every(isBlank)) return;
  const where = `Stock tab, row ${index + 2}`;
  const [product, thickness, width, length, quantity, grade] = cells;

  const productKey = typeof product === "string" ? product.toLowerCase() : "";
  if (!(productKey in stock)) errors.push(`${where}: Product must be Pine or Spruce.`);
  if (isBlank(grade)) errors.push(`${where}: Grade is required.`);

  const row = {
    thickness: positiveNumber(thickness, where, "Thickness", true),
    width: positiveNumber(width, where, "Width", true),
    length: positiveNumber(length, where, "Length", false),
    quantity: positiveNumber(quantity, where, "Quantity", false),
    grade: isBlank(grade) ? "" : String(grade),
  };
  if (productKey in stock) stock[productKey].push(row);
});

const hasRows = stock.pine.length + stock.spruce.length > 0;
const stockDate = detail("Stock date");
const location = detail("Location");
let asOf = null;

if (stockDate instanceof Date) {
  asOf = stockDate.toISOString().slice(0, 10);
  const ageDays = Math.floor((Date.now() - stockDate.getTime()) / 86_400_000);
  if (ageDays < -1) errors.push(`Details tab: the stock date ${asOf} is in the future.`);
  if (hasRows && ageDays > maxAgeDays) {
    const stale = `Details tab: the stock date ${asOf} is ${ageDays} days old. Update the stock list, the limit is ${maxAgeDays} days.`;
    if (strict) errors.push(stale);
    else console.warn(`\nWarning: ${stale}\n`);
  }
} else if (hasRows) {
  errors.push("Details tab: enter the Stock date, the day this stock was counted.");
}

if (errors.length > 0) {
  console.error(`\n${source} has ${errors.length} problem(s):\n${errors.map((error) => `  - ${error}`).join("\n")}\n`);
  if (strict) process.exit(1);
  console.error("The stock list is left empty until these are fixed.\n");
  stock.pine = [];
  stock.spruce = [];
}

writeFileSync(target, `${JSON.stringify({ asOf, location: isBlank(location) ? null : String(location), ...stock }, null, 2)}\n`);
process.stdout.write(`Stock list: ${stock.pine.length} pine and ${stock.spruce.length} spruce sizes${asOf ? `, as of ${asOf}` : ""}.\n`);
