"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import TactileButton from "@/components/dog/TactileButton";
import { useCart } from "@/components/cart/CartContext";
import {
  DEFAULT_LETRA_COLOR,
  LETRA_COLORS,
  LETRA_PRICE_EUR,
  letraImageSrc,
  normalizeLetraWord,
} from "@/lib/letras";

const fieldLabel =
  "mb-2 block font-mono text-[10.5px] tracking-[0.08em] text-verdigris-dark uppercase";
const fieldInput =
  "w-full border-0 border-b border-line bg-transparent px-0.5 py-2.5 text-[15px] text-ink placeholder:text-ink-soft/40 focus:border-gold focus:outline-none";

export default function LetrasBuilder() {
  const { addItem } = useCart();

  const [word, setWord] = useState("MARTINA");
  const [colors, setColors] = useState<string[]>(() => Array(7).fill(DEFAULT_LETRA_COLOR));
  const [selected, setSelected] = useState(0);
  const [currentColor, setCurrentColor] = useState(DEFAULT_LETRA_COLOR);
  const [justAdded, setJustAdded] = useState(false);

  const total = word.length * LETRA_PRICE_EUR;

  function handleWordChange(raw: string) {
    const next = normalizeLetraWord(raw);
    setColors((prev) => [...next].map((char, i) => (word[i] === char ? prev[i] : DEFAULT_LETRA_COLOR)));
    setWord(next);
    setSelected((i) => Math.min(i, Math.max(next.length - 1, 0)));
    setJustAdded(false);
  }

  function pickColor(colorId: string) {
    setCurrentColor(colorId);
    setColors((prev) => prev.map((c, i) => (i === selected ? colorId : c)));
    setJustAdded(false);
  }

  function applyToAll() {
    setColors((prev) => prev.map(() => currentColor));
    setJustAdded(false);
  }

  function resetColors() {
    setColors((prev) => prev.map(() => DEFAULT_LETRA_COLOR));
    setCurrentColor(DEFAULT_LETRA_COLOR);
    setJustAdded(false);
  }

  function handleAddToCart() {
    if (!word) return;
    addItem(word, colors);
    setJustAdded(true);
    setWord("");
    setColors([]);
    setSelected(0);
    setCurrentColor(DEFAULT_LETRA_COLOR);
  }

  return (
    <div className="reveal grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.15fr]">
      <div className="rounded-sm border border-line bg-paper p-8 sm:p-10">
        <h2 className="mb-2 font-display text-[22px] font-[450]">Personaliza tus letras</h2>
        <p className="mb-7 text-sm text-ink-soft">
          Escribe tu palabra, elige el color de cada letra y añádelas al
          carrito. Cada letra mide 12 cm y cuesta {LETRA_PRICE_EUR} €.
        </p>

        <label htmlFor="palabra" className={fieldLabel}>
          Escribe tu palabra
        </label>
        <input
          id="palabra"
          type="text"
          value={word}
          onChange={(e) => handleWordChange(e.target.value)}
          placeholder="MARTINA"
          className={`${fieldInput} mb-7 font-display text-[20px] tracking-[0.02em] uppercase`}
        />

        {word.length > 0 && (
          <>
            <span className={fieldLabel}>Selecciona una letra</span>
            <div className="mb-7 flex flex-wrap gap-2">
              {[...word].map((char, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelected(i)}
                  className={`flex h-11 w-11 items-center justify-center rounded-sm border font-display text-[17px] transition-colors ${
                    selected === i
                      ? "border-ink bg-ink text-paper"
                      : "border-line bg-paper-dim text-ink hover:border-ink"
                  }`}
                >
                  {char}
                </button>
              ))}
            </div>

            <span className={fieldLabel}>Elige un color</span>
            <div className="mb-7 grid grid-cols-5 gap-3">
              {LETRA_COLORS.map((color) => {
                const isActive = colors[selected] === color.id;
                return (
                  <button
                    key={color.id}
                    type="button"
                    aria-label={color.label}
                    onClick={() => pickColor(color.id)}
                    className={`flex h-11 w-11 items-center justify-center rounded-full border-2 transition-transform ${
                      isActive ? "scale-110 border-ink" : "border-transparent hover:scale-105"
                    }`}
                    style={{
                      backgroundColor: color.hex,
                      boxShadow: "inset -4px -5px 8px rgba(0,0,0,0.18), inset 3px 4px 6px rgba(255,255,255,0.45)",
                    }}
                  />
                );
              })}
            </div>

            <div className="mb-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={applyToAll}
                className="rounded-sm border border-ink px-4 py-2 text-[13px] font-medium text-ink hover:bg-ink hover:text-paper"
              >
                Aplicar a toda la palabra
              </button>
              <button
                type="button"
                onClick={resetColors}
                className="rounded-sm border border-line px-4 py-2 text-[13px] font-medium text-ink-soft hover:border-ink hover:text-ink"
              >
                Restablecer colores
              </button>
            </div>
          </>
        )}

        <TactileButton
          type="button"
          fullWidth
          disabled={word.length === 0}
          onClick={handleAddToCart}
          label={word.length > 0 ? `Añadir al carrito — ${total} €` : "Escribe tu palabra"}
          padding="15px 28px"
          rounded={100}
          base={{ color: "#076876", depth: 5 }}
          colors={{ fill: "#0097B2", textColor: "#F7F4EE" }}
          font={{ fontFamily: "var(--font-inter)", fontSize: "15px", fontWeight: 500 }}
        />

        {justAdded && (
          <p className="mt-4 text-center text-[13.5px] text-verdigris-dark">
            Añadido al carrito.{" "}
            <Link href="/carrito" className="underline underline-offset-2">
              Ver carrito y pagar
            </Link>
          </p>
        )}
        <p className="mt-4 text-center text-xs text-ink-soft">
          {LETRA_PRICE_EUR} € por letra · puedes añadir varias palabras antes
          de pagar.
        </p>
      </div>

      <LetrasPreview word={word} colors={colors} />
    </div>
  );
}

function LetrasPreview({ word, colors }: { word: string; colors: string[] }) {
  const letters = useMemo(() => [...word].map((char, i) => ({ char, color: colors[i] ?? DEFAULT_LETRA_COLOR })), [word, colors]);

  return (
    <div className="relative overflow-hidden rounded-sm border border-line">
      <div className="relative aspect-[4/3] w-full">
        <Image
          src="/letras/fondo-pared.jpg"
          alt="Pared con luz natural donde se muestran las letras de cerámica"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 55vw"
          priority
        />
        {letters.length > 0 ? (
          <div className="absolute inset-0 flex items-start justify-center px-6 pt-[22%]">
            <div className="flex max-w-full flex-wrap items-center justify-center gap-1">
              {letters.map((letter, i) => (
                <div
                  key={i}
                  className="relative h-[8vw] w-[8vw] max-h-14 max-w-14 min-h-6 min-w-6 drop-shadow-[0_6px_10px_rgba(0,0,0,0.25)]"
                >
                  <Image
                    src={letraImageSrc(letter.char, letter.color)}
                    alt={letter.char}
                    fill
                    className="object-contain"
                    sizes="100px"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="rounded-sm bg-paper/80 px-5 py-2 text-[14px] text-ink-soft">
              Escribe tu palabra para ver la vista previa
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
