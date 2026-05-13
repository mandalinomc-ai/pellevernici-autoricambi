"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "pelle_cookie_consent_v1";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      try {
        setVisible(!window.localStorage.getItem(STORAGE_KEY));
      } catch {
        setVisible(true);
      }
    });
  }, []);

  const accept = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[55] border-t border-white/10 bg-[#161b22]/95 px-4 py-4 shadow-[0_-20px_60px_rgba(0,0,0,0.5)] backdrop-blur sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-zinc-400 sm:text-sm">
          Utilizziamo cookie e strumenti affini necessari al funzionamento del sito. Per maggiori
          informazioni consulta la{" "}
          <Link href="/cookie-policy" className="text-[#93c5fd] underline">
            Cookie Policy
          </Link>{" "}
          e la{" "}
          <Link href="/privacy-policy" className="text-[#93c5fd] underline">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <Link
            href="/cookie-policy#impostazioni-cookie"
            className="rounded-full border border-white/15 px-4 py-2 text-xs font-medium text-zinc-300 hover:bg-white/5"
          >
            Impostazioni cookie
          </Link>
          <button
            type="button"
            onClick={accept}
            className="rounded-full bg-[#d32f2f] px-5 py-2 text-xs font-semibold text-white hover:bg-[#ef5350]"
          >
            Accetta necessari
          </button>
        </div>
      </div>
    </div>
  );
}
