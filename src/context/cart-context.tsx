"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { whatsappHref } from "@/lib/whatsapp";

export type CartLine = {
  id: string;
  label: string;
  page?: number;
  qty: number;
};

type CartContextValue = {
  items: CartLine[];
  count: number;
  add: (label: string, page?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  orderWhatsAppHref: string | null;
};

const CartContext = createContext<CartContextValue | null>(null);

function buildOrderMessage(lines: CartLine[]): string {
  const rows = lines.map((l, i) => {
    const pg = l.page != null ? ` — catalogo PDF pag. ${l.page}` : "";
    return `${i + 1}. x${l.qty} ${l.label}${pg}`;
  });
  return `Ciao P.ELLE Vernici e Ricambi,\nvorrei ordinare:\n\n${rows.join("\n")}\n\nGrazie.`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);

  const add = useCallback((label: string, page?: number) => {
    const trimmed = label.replace(/\s+/g, " ").trim();
    if (!trimmed) return;
    const id = `${page ?? 0}::${trimmed}`.slice(0, 400);
    setItems((prev) => {
      const hit = prev.find((p) => p.id === id);
      if (hit) {
        return prev.map((p) => (p.id === id ? { ...p, qty: p.qty + 1 } : p));
      }
      return [...prev, { id, label: trimmed, page, qty: 1 }];
    });
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    const q = Math.max(0, Math.min(999, Math.floor(qty)));
    setItems((prev) => {
      if (q <= 0) return prev.filter((p) => p.id !== id);
      return prev.map((p) => (p.id === id ? { ...p, qty: q } : p));
    });
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const count = useMemo(() => items.reduce((s, l) => s + l.qty, 0), [items]);

  const orderWhatsAppHref = useMemo(() => {
    if (!items.length) return null;
    return whatsappHref(buildOrderMessage(items));
  }, [items]);

  const value = useMemo(
    () => ({ items, count, add, remove, setQty, clear, orderWhatsAppHref }),
    [items, count, add, remove, setQty, clear, orderWhatsAppHref],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart deve essere usato dentro CartProvider");
  return ctx;
}
