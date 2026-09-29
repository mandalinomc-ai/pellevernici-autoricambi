"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { vetrinaLabel, type VetrinaProduct } from "@/lib/vetrina-product";

type Draft = {
  id: string;
  code: string;
  name: string;
  info: string;
  price: string;
  visible: boolean;
  images: string[];
  isNew: boolean;
};

const emptyDraft = (): Draft => ({
  id: "",
  code: "",
  name: "",
  info: "",
  price: "",
  visible: true,
  images: [],
  isNew: true,
});

async function readError(res: Response): Promise<string> {
  try {
    const data = (await res.json()) as { error?: string };
    return data.error || "Operazione non riuscita.";
  } catch {
    return "Operazione non riuscita.";
  }
}

export function GestioneApp() {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [configured, setConfigured] = useState(true);
  const [storage, setStorage] = useState<"blob" | "file" | "readonly">("file");
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState<VetrinaProduct[]>([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"tutti" | "visibili" | "nascosti">("tutti");
  const [draft, setDraft] = useState<Draft | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const loadProducts = useCallback(async () => {
    const res = await fetch("/api/admin/products", { cache: "no-store" });
    if (res.status === 401) {
      setAuthed(false);
      return;
    }
    const data = (await res.json()) as {
      ok?: boolean;
      products?: VetrinaProduct[];
      storage?: "blob" | "file" | "readonly";
      error?: string;
    };
    if (!res.ok || !data.ok || !data.products) {
      throw new Error(data.error || "Impossibile leggere gli articoli.");
    }
    setProducts(data.products);
    if (data.storage) setStorage(data.storage);
  }, []);

  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        const res = await fetch("/api/admin/session", { cache: "no-store" });
        const data = (await res.json()) as {
          ok?: boolean;
          configured?: boolean;
          storage?: "blob" | "file" | "readonly";
        };
        if (cancel) return;
        setConfigured(data.configured !== false);
        if (data.storage) setStorage(data.storage);
        setAuthed(Boolean(data.ok));
        if (data.ok) await loadProducts();
      } catch (err) {
        if (!cancel) setError(err instanceof Error ? err.message : "Errore di rete.");
      } finally {
        if (!cancel) setReady(true);
      }
    })();
    return () => {
      cancel = true;
    };
  }, [loadProducts]);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((product) => {
      if (filter === "visibili" && !product.visible) return false;
      if (filter === "nascosti" && product.visible) return false;
      if (!q) return true;
      return [product.name, product.code, product.info, product.price, vetrinaLabel(product)]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [filter, products, query]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) throw new Error(await readError(res));
      setPassword("");
      setAuthed(true);
      await loadProducts();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Accesso non riuscito.");
    } finally {
      setBusy(false);
    }
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
    setProducts([]);
    setDraft(null);
  };

  const openEdit = (product: VetrinaProduct) => {
    setError(null);
    setNotice(null);
    setDraft({ ...product, isNew: false });
  };

  const save = async () => {
    if (!draft) return;
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      const res = await fetch(draft.isNew ? "/api/admin/products" : `/api/admin/products/${draft.id}`, {
        method: draft.isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      const data = (await res.json()) as { ok?: boolean; products?: VetrinaProduct[]; error?: string };
      if (!res.ok || !data.ok || !data.products) throw new Error(data.error || "Salvataggio non riuscito.");
      setProducts(data.products);
      setDraft(null);
      setNotice("Salvato. La vetrina pubblica è aggiornata.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Salvataggio non riuscito.");
    } finally {
      setBusy(false);
    }
  };

  const toggleVisible = async (product: VetrinaProduct) => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...product, visible: !product.visible }),
      });
      const data = (await res.json()) as { ok?: boolean; products?: VetrinaProduct[]; error?: string };
      if (!res.ok || !data.products) throw new Error(data.error || "Aggiornamento non riuscito.");
      setProducts(data.products);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Aggiornamento non riuscito.");
    } finally {
      setBusy(false);
    }
  };

  const remove = async (product: VetrinaProduct) => {
    const label = vetrinaLabel(product);
    if (!window.confirm(`Togliere «${label}» dal sito? Non comparirà più in vetrina.`)) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/products/${product.id}`, { method: "DELETE" });
      const data = (await res.json()) as { ok?: boolean; products?: VetrinaProduct[]; error?: string };
      if (!res.ok || !data.products) throw new Error(data.error || "Eliminazione non riuscita.");
      setProducts(data.products);
      if (draft?.id === product.id) setDraft(null);
      setNotice("Articolo rimosso dalla vetrina.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Eliminazione non riuscita.");
    } finally {
      setBusy(false);
    }
  };

  const addPhotos = async (files: FileList | null) => {
    if (!draft || !files?.length) return;
    if (draft.images.length + files.length > 8) {
      setError("Massimo 8 foto per articolo.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const urls: string[] = [];
      for (const file of Array.from(files)) {
        const prepared = await shrinkImage(file);
        const form = new FormData();
        form.set("file", prepared, "foto.jpg");
        const res = await fetch("/api/admin/upload", { method: "POST", body: form });
        const data = (await res.json()) as { ok?: boolean; url?: string; error?: string };
        if (!res.ok || !data.url) throw new Error(data.error || "Caricamento foto non riuscito.");
        urls.push(data.url);
      }
      setDraft({ ...draft, images: [...draft.images, ...urls] });
      setNotice("Foto caricate. Premi Salva per pubblicarle.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Caricamento foto non riuscito.");
    } finally {
      setBusy(false);
    }
  };

  if (!ready) {
    return <p className="text-sm text-zinc-400">Apertura pannello…</p>;
  }

  if (!authed) {
    return (
      <form onSubmit={login} className="mx-auto max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h1 className="text-2xl font-semibold text-white">Gestione vetrina</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Area riservata al negozio. Da qui si aggiungono, modificano o tolgono gli articoli visibili sul sito.
        </p>
        {!configured ? (
          <p className="mt-4 text-sm text-amber-200">
            Il pannello non è ancora attivato sul server. Serve la variabile ADMIN_PASSWORD.
          </p>
        ) : null}
        <label className="mt-6 block text-sm text-zinc-300">
          Password
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-white outline-none focus:border-[#1565c0]"
          />
        </label>
        {error ? <p className="mt-3 text-sm text-red-300">{error}</p> : null}
        <button
          type="submit"
          disabled={busy || !configured}
          className="mt-5 min-h-11 w-full rounded-full bg-[#d32f2f] px-4 py-3 text-sm font-semibold text-white disabled:opacity-50"
        >
          Entra
        </button>
      </form>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold text-white">Gestione vetrina</h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-400">
            Nome, prezzo, informazioni e foto. Non c&apos;è pagamento sul sito: il prezzo è solo
            indicativo, l&apos;acquisto resta in sede o su WhatsApp.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void logout()}
          className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-zinc-300"
        >
          Esci
        </button>
      </div>

      {storage === "readonly" ? (
        <p className="mt-4 rounded-2xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
          Le modifiche non restano salvate: sul server manca l&apos;archivio Blob. Collega un Blob
          store Vercel e la variabile BLOB_READ_WRITE_TOKEN.
        </p>
      ) : null}
      {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}
      {notice ? <p className="mt-4 text-sm text-[#90caf9]">{notice}</p> : null}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cerca nome, codice, prezzo"
          className="w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-white outline-none focus:border-[#1565c0]"
        />
        <button
          type="button"
          onClick={() => {
            setDraft(emptyDraft());
            setNotice(null);
            setError(null);
          }}
          className="min-h-11 shrink-0 rounded-full bg-[#1565c0] px-5 py-3 text-sm font-semibold text-white"
        >
          Nuovo articolo
        </button>
      </div>

      <div className="mt-4 flex gap-2 text-xs font-semibold">
        {(
          [
            ["tutti", "Tutti"],
            ["visibili", "In vetrina"],
            ["nascosti", "Nascosti"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setFilter(id)}
            className={`rounded-full px-3 py-2 ${
              filter === id ? "bg-white text-black" : "border border-white/15 text-zinc-300"
            }`}
          >
            {label}
          </button>
        ))}
        <span className="self-center text-zinc-500">{shown.length} in elenco</span>
      </div>

      {draft ? (
        <section className="mt-6 rounded-3xl border border-white/10 bg-[#161b22] p-5">
          <h2 className="text-lg font-semibold text-white">
            {draft.isNew ? "Nuovo articolo" : `Modifica ${vetrinaLabel(draft)}`}
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block text-sm text-zinc-300">
              Nome
              <input
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                placeholder="Es. Stucco Permacron 2025"
                className="mt-2 w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-white outline-none focus:border-[#1565c0]"
              />
            </label>
            <label className="block text-sm text-zinc-300">
              Codice articolo
              <input
                value={draft.code}
                onChange={(e) => setDraft({ ...draft, code: e.target.value })}
                placeholder="Es. 12"
                className="mt-2 w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-white outline-none focus:border-[#1565c0]"
              />
            </label>
            <label className="block text-sm text-zinc-300">
              Prezzo indicativo
              <input
                value={draft.price}
                onChange={(e) => setDraft({ ...draft, price: e.target.value })}
                placeholder="Es. 18,90 € — vuoto se non vuoi mostrarlo"
                className="mt-2 w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-white outline-none focus:border-[#1565c0]"
              />
            </label>
            <label className="flex items-end gap-3 pb-3 text-sm text-zinc-200">
              <input
                type="checkbox"
                checked={draft.visible}
                onChange={(e) => setDraft({ ...draft, visible: e.target.checked })}
                className="h-4 w-4"
              />
              Visibile in vetrina
            </label>
          </div>
          <label className="mt-4 block text-sm text-zinc-300">
            Informazioni
            <textarea
              value={draft.info}
              onChange={(e) => setDraft({ ...draft, info: e.target.value })}
              rows={4}
              placeholder="Formato, marca, note per il cliente. Facoltativo."
              className="mt-2 w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-white outline-none focus:border-[#1565c0]"
            />
          </label>

          <div className="mt-4">
            <p className="text-sm text-zinc-300">Foto</p>
            <div className="mt-2 flex flex-wrap gap-3">
              {draft.images.map((src, index) => (
                <div key={`${src}-${index}`} className="w-24">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" className="h-24 w-24 rounded-xl bg-white object-contain" />
                  <div className="mt-1 flex justify-between text-[10px] text-zinc-400">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => {
                        const images = [...draft.images];
                        const [item] = images.splice(index, 1);
                        images.splice(index - 1, 0, item);
                        setDraft({ ...draft, images });
                      }}
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      className="text-red-300"
                      onClick={() =>
                        setDraft({ ...draft, images: draft.images.filter((_, i) => i !== index) })
                      }
                    >
                      Togli
                    </button>
                    <button
                      type="button"
                      disabled={index === draft.images.length - 1}
                      onClick={() => {
                        const images = [...draft.images];
                        const [item] = images.splice(index, 1);
                        images.splice(index + 1, 0, item);
                        setDraft({ ...draft, images });
                      }}
                    >
                      →
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <label className="mt-3 inline-flex min-h-11 cursor-pointer items-center rounded-full border border-white/15 px-4 py-2 text-sm text-white">
              Aggiungi foto
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                className="sr-only"
                onChange={(e) => {
                  void addPhotos(e.target.files);
                  e.target.value = "";
                }}
              />
            </label>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              disabled={busy}
              onClick={() => void save()}
              className="min-h-11 rounded-full bg-[#d32f2f] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
            >
              Salva
            </button>
            <button
              type="button"
              onClick={() => setDraft(null)}
              className="min-h-11 rounded-full border border-white/15 px-5 py-2.5 text-sm text-zinc-300"
            >
              Annulla
            </button>
          </div>
        </section>
      ) : null}

      <ul className="mt-6 divide-y divide-white/10 rounded-3xl border border-white/10">
        {shown.map((product) => (
          <li key={product.id} className="flex flex-col gap-3 p-3 sm:flex-row sm:items-center">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white">
              {product.images[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={product.images[0]} alt="" className="h-full w-full object-contain" />
              ) : (
                <span className="px-1 text-center text-[10px] text-zinc-500">Senza foto</span>
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-white">{vetrinaLabel(product)}</p>
              <p className="text-xs text-zinc-400">
                {product.code ? `Codice ${product.code}` : "Senza codice"}
                {product.price ? ` · ${product.price}` : ""}
                {product.visible ? "" : " · nascosto"}
                {product.images.length ? ` · ${product.images.length} foto` : ""}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => openEdit(product)}
                className="rounded-full border border-white/15 px-3 py-2 text-xs font-semibold text-white"
              >
                Modifica
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={() => void toggleVisible(product)}
                className="rounded-full border border-white/15 px-3 py-2 text-xs text-zinc-300"
              >
                {product.visible ? "Nascondi" : "Mostra"}
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={() => void remove(product)}
                className="rounded-full px-3 py-2 text-xs text-red-300"
              >
                Elimina
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

async function shrinkImage(file: File): Promise<Blob> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Il file non è una foto.");
  }
  try {
    const bitmap = await createImageBitmap(file);
    const max = 1600;
    const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.82));
    return blob ?? file;
  } catch {
    throw new Error("Questa foto non si può leggere. Usa JPG o PNG.");
  }
}
