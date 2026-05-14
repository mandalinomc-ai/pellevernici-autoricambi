"use client";

import type { PDFDocumentProxy } from "pdfjs-dist";
import { useCallback, useEffect, useRef, useState } from "react";
import { useCart } from "@/context/cart-context";
import { groupPdfTextIntoLines } from "@/lib/pdf-lines";
import { WhatsAppGlyph } from "@/components/icons/WhatsAppGlyph";
import { whatsappHref } from "@/lib/whatsapp";
import { Reveal } from "./Reveal";

const PDFJS_VERSION = "4.10.38";
const WORKER_SRC = `https://unpkg.com/pdfjs-dist@${PDFJS_VERSION}/build/pdf.worker.min.mjs`;

async function loadPdfLib() {
  const pdfjs = await import("pdfjs-dist");
  if (typeof window !== "undefined") {
    pdfjs.GlobalWorkerOptions.workerSrc = WORKER_SRC;
  }
  return pdfjs;
}

export function PdfCatalogSection() {
  const { add } = useCart();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pdfRef = useRef<PDFDocumentProxy | null>(null);

  const [fileName, setFileName] = useState<string | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [lines, setLines] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const renderPage = useCallback(async (page: number) => {
    const pdf = pdfRef.current;
    const canvas = canvasRef.current;
    if (!pdf || !canvas) return;
    setBusy(true);
    setErr(null);
    try {
      const p = await pdf.getPage(page);
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas non disponibile");
      const base = p.getViewport({ scale: 1 });
      const maxW = Math.min(720, typeof window !== "undefined" ? window.innerWidth - 48 : 720);
      const scale = maxW / base.width;
      const viewport = p.getViewport({ scale });
      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      await p.render({ canvasContext: ctx, viewport }).promise;
      const tc = await p.getTextContent();
      const raw = groupPdfTextIntoLines(tc.items as { str?: string; transform?: number[] }[]);
      const cleaned = raw
        .map((l) => l.replace(/\s+/g, " ").trim())
        .filter((l) => l.length >= 3 && l.length < 240)
        .filter((l, idx, a) => a.indexOf(l) === idx)
        .slice(0, 120);
      setLines(cleaned);
    } catch (e) {
      console.error(e);
      setErr("Impossibile leggere questa pagina del PDF. Prova un altro file o una pagina diversa.");
      setLines([]);
    } finally {
      setBusy(false);
    }
  }, []);

  useEffect(() => {
    if (!numPages || pageNum < 1) return;
    void renderPage(pageNum);
  }, [pageNum, numPages, renderPage]);

  const onPickFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      setErr("Seleziona un file PDF.");
      return;
    }
    setErr(null);
    setBusy(true);
    setFileName(file.name);
    try {
      const buf = await file.arrayBuffer();
      const pdfjs = await loadPdfLib();
      const pdf = await pdfjs.getDocument({ data: new Uint8Array(buf) }).promise;
      pdfRef.current = pdf;
      setNumPages(pdf.numPages);
      setPageNum(1);
    } catch (e) {
      console.error(e);
      setErr("Caricamento PDF non riuscito. File troppo grande o protetto.");
      pdfRef.current = null;
      setNumPages(0);
    } finally {
      setBusy(false);
    }
  };

  const buyOne = (label: string) => {
    const msg = `Ciao P.ELLE,\nvorrei acquistare:\n${label}\n(catalogo PDF — pag. ${pageNum})`;
    window.open(whatsappHref(msg), "_blank", "noopener,noreferrer");
  };

  return (
    <section id="catalogo-pdf" className="bg-[#0d1117] px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#fca5a5]">
            Catalogo ricambi
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Carica il PDF listino: sfoglia, clicca, ordina su WhatsApp.
          </h2>
          <p className="mt-4 max-w-2xl text-zinc-400">
            Il file resta sul tuo browser: nessun upload al server. Estraiamo il testo per creare
            voci cliccabili; puoi aggiungere le righe al carrello e inviare l&apos;ordine completo
            sempre su WhatsApp.
          </p>
        </Reveal>

        <div className="mt-10 flex flex-col gap-8 lg:flex-row">
          <div className="flex-1 space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-zinc-200">PDF pezzi e ricambi</span>
              <input
                type="file"
                accept="application/pdf"
                onChange={onPickFile}
                className="mt-2 block w-full cursor-pointer rounded-xl border border-dashed border-white/20 bg-white/5 px-3 py-3 text-sm text-zinc-300 file:mr-3 file:rounded-lg file:border-0 file:bg-[#1565c0] file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white"
              />
            </label>
            {fileName ? (
              <p className="text-xs text-zinc-500">
                File: <span className="text-zinc-300">{fileName}</span> — {numPages} pag.
              </p>
            ) : null}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 p-2">
              <canvas ref={canvasRef} className="mx-auto block max-h-[70vh] w-auto rounded-lg" />
              {busy ? (
                <p className="py-3 text-center text-xs text-zinc-500">Elaborazione…</p>
              ) : null}
            </div>
            {numPages > 0 ? (
              <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  disabled={pageNum <= 1 || busy}
                  onClick={() => setPageNum((p) => Math.max(1, p - 1))}
                  className="rounded-full border border-white/15 px-4 py-2 text-sm text-white disabled:opacity-40"
                >
                  Pagina precedente
                </button>
                <span className="text-sm text-zinc-400">
                  Pagina {pageNum} / {numPages}
                </span>
                <button
                  type="button"
                  disabled={pageNum >= numPages || busy}
                  onClick={() => setPageNum((p) => Math.min(numPages, p + 1))}
                  className="rounded-full border border-white/15 px-4 py-2 text-sm text-white disabled:opacity-40"
                >
                  Pagina successiva
                </button>
              </div>
            ) : null}
            {err ? <p className="text-sm text-red-400">{err}</p> : null}
          </div>

          <div className="lg:w-[min(100%,420px)] lg:shrink-0">
            <Reveal delay={0.08}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-300">
                  Voci dalla pagina (cliccabili)
                </h3>
                <p className="mt-2 text-xs text-zinc-500">
                  Il PDF non è strutturato come un database: le righe sono ricostruite dal testo.
                  Verifica sempre in sede disponibilità e codici.
                </p>
                <ul className="mt-4 max-h-[min(70vh,520px)] space-y-2 overflow-y-auto pr-1">
                  {lines.length === 0 && !busy && numPages > 0 ? (
                    <li className="text-sm text-zinc-500">Nessun testo leggibile su questa pagina.</li>
                  ) : null}
                  {lines.map((line) => (
                    <li
                      key={`${pageNum}-${line.slice(0, 80)}`}
                      className="rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-zinc-200"
                    >
                      <p className="leading-snug">{line}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => add(line, pageNum)}
                          className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/20"
                        >
                          + Carrello
                        </button>
                        <button
                          type="button"
                          onClick={() => buyOne(line)}
                          className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-3 py-1.5 text-xs font-semibold text-white hover:brightness-110"
                        >
                          <WhatsAppGlyph className="h-3.5 w-3.5 shrink-0" />
                          Voglio acquistarlo (WhatsApp)
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
