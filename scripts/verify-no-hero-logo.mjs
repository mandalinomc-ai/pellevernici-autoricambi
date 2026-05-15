/**
 * Fallisce se la build contiene il logo hero rimosso (logo-tricolore / alt noto).
 * Uso: npm run build && node scripts/verify-no-hero-logo.mjs
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..", ".next");
const FORBIDDEN = ["logo-tricolore", 'alt="P.ELLE Vernici e Ricambi"'];
/** Solo output build produzione — ignora `.next/dev` (cache Turbopack vecchia). */
const SCAN_DIRS = ["server", "static"].map((d) => join(ROOT, d));

function walk(dir, files = []) {
  if (!statSync(dir, { throwIfNoEntry: false })?.isDirectory()) return files;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, files);
    else if (/\.(html|rsc|js|json)$/.test(name)) files.push(p);
  }
  return files;
}

let hits = [];
for (const scanRoot of SCAN_DIRS) {
  for (const file of walk(scanRoot)) {
  const text = readFileSync(file, "utf8");
    for (const needle of FORBIDDEN) {
      if (text.includes(needle)) hits.push({ file, needle });
    }
  }
}

if (hits.length) {
  console.error("ERRORE: trovato logo hero vietato nella build:");
  for (const h of hits) console.error(`  ${h.needle} in ${h.file}`);
  process.exit(1);
}
console.log("OK: nessun logo hero vietato in .next");
