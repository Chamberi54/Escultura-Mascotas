"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { LETRA_PRICE_EUR } from "@/lib/letras";

const STORAGE_KEY = "chamberi54-carrito-letras";

export type CartLetraItem = {
  id: string;
  palabra: string;
  colores: string[];
};

type CartContextValue = {
  items: CartLetraItem[];
  addItem: (palabra: string, colores: string[]) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  totalEur: number;
};

const CartContext = createContext<CartContextValue | null>(null);

function readStoredItems(): CartLetraItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is CartLetraItem =>
        item &&
        typeof item.id === "string" &&
        typeof item.palabra === "string" &&
        Array.isArray(item.colores),
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLetraItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(readStoredItems());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // almacenamiento no disponible (modo privado, etc.): el carrito seguirá
      // funcionando para esta sesión aunque no se recuerde al recargar.
    }
  }, [items, hydrated]);

  const addItem = useCallback((palabra: string, colores: string[]) => {
    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setItems((prev) => [...prev, { id, palabra, colores }]);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const totalEur = items.reduce((sum, item) => sum + item.palabra.length * LETRA_PRICE_EUR, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clear, totalEur }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }
  return ctx;
}
