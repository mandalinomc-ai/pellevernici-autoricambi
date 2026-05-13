/** Raggruppa frammenti di testo PDF in righe approssimative (stessa baseline Y). */

type Fragment = { str: string; y: number; x: number };

export function groupPdfTextIntoLines(
  items: { str?: string; transform?: number[] }[],
): string[] {
  const frags: Fragment[] = [];
  for (const it of items) {
    const s = typeof it.str === "string" ? it.str.trim() : "";
    if (!s || !it.transform || it.transform.length < 6) continue;
    const x = it.transform[4];
    const y = Math.round(it.transform[5]);
    frags.push({ str: s, x, y });
  }
  if (frags.length === 0) return [];
  frags.sort((a, b) => b.y - a.y || a.x - b.x);
  const tol = 5;
  const lines: string[] = [];
  let bucket: Fragment[] = [];
  let y0: number | null = null;

  const flush = () => {
    if (!bucket.length) return;
    const text = bucket
      .slice()
      .sort((a, b) => a.x - b.x)
      .map((b) => b.str)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
    if (text.length > 1) lines.push(text);
    bucket = [];
  };

  for (const f of frags) {
    if (y0 === null || Math.abs(f.y - y0) <= tol) {
      bucket.push(f);
      y0 = y0 === null ? f.y : y0;
    } else {
      flush();
      bucket = [f];
      y0 = f.y;
    }
  }
  flush();
  return dedupeAdjacent(lines);
}

function dedupeAdjacent(lines: string[]): string[] {
  const out: string[] = [];
  for (const l of lines) {
    if (out[out.length - 1] === l) continue;
    out.push(l);
  }
  return out;
}
