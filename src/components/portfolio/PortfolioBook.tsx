"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import TactileButton from "@/components/dog/TactileButton";

const PIECES = [
  {
    src: "/gallery/mascotas/pieza-01-airedale-sentado.png",
    title: "Airedale terrier",
    note: "Sentado",
  },
  {
    src: "/gallery/mascotas/pieza-02-chihuahua-sentado.png",
    title: "Chihuahua",
    note: "Sentado",
  },
  {
    src: "/gallery/mascotas/pieza-03-terrier-tumbado.png",
    title: "Terrier",
    note: "Tumbado",
  },
  {
    src: "/gallery/mascotas/pieza-04-liondog-depie.png",
    title: "Perro león",
    note: "De pie",
  },
  {
    src: "/gallery/mascotas/pieza-05-boxer-sentado.png",
    title: "Bóxer",
    note: "Sentado",
  },
  {
    src: "/gallery/mascotas/pieza-07-wolf-tumbado.png",
    title: "Lobo",
    note: "Tumbado",
  },
];

const COVER = 0;
const CLOSING = PIECES.length + 1;
const LAST_PAGE = CLOSING;

export default function PortfolioBook() {
  const [page, setPage] = useState(COVER);
  const [direction, setDirection] = useState(1);
  const dragStartX = useRef<number | null>(null);

  function goNext() {
    setDirection(1);
    setPage((p) => Math.min(p + 1, LAST_PAGE));
  }

  function goPrev() {
    setDirection(-1);
    setPage((p) => Math.max(p - 1, COVER));
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function onPointerDown(e: React.PointerEvent) {
    dragStartX.current = e.clientX;
  }

  function onPointerUp(e: React.PointerEvent) {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    dragStartX.current = null;
    if (delta < -60) goNext();
    else if (delta > 60) goPrev();
  }

  const isCover = page === COVER;
  const isClosing = page === CLOSING;
  const pieceIndex = isCover || isClosing ? -1 : page - 1;

  return (
    <section className="border-t border-line">
      <div
        className="mx-auto flex min-h-[560px] max-w-[1180px] flex-col justify-between px-8 py-16 sm:min-h-[620px]"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <div className="relative flex flex-1 items-center overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              initial={{ opacity: 0, x: direction * 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -28 }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              className="w-full"
            >
              {isCover && <CoverPage onOpen={goNext} />}
              {!isCover && !isClosing && (
                <PiecePage piece={PIECES[pieceIndex]} index={pieceIndex} total={PIECES.length} />
              )}
              {isClosing && <ClosingPage />}
            </motion.div>
          </AnimatePresence>
        </div>

        {!isCover && (
          <div className="mt-10 flex items-center justify-between border-t border-line pt-6">
            <button
              type="button"
              onClick={goPrev}
              className="font-mono text-xs tracking-[0.1em] text-ink-soft uppercase transition-colors hover:text-ink"
            >
              ← Anterior
            </button>
            <span className="font-mono text-xs tracking-[0.1em] text-ink-soft">
              {!isClosing ? `${pieceIndex + 1} / ${PIECES.length}` : ""}
            </span>
            {!isClosing ? (
              <button
                type="button"
                onClick={goNext}
                className="font-mono text-xs tracking-[0.1em] text-ink-soft uppercase transition-colors hover:text-ink"
              >
                {pieceIndex === PIECES.length - 1 ? "Final →" : "Siguiente →"}
              </button>
            ) : (
              <span className="w-[70px]" />
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function CoverPage({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="flex flex-col items-center px-4 py-10 text-center">
      <span className="eyebrow-badge mb-6 bg-paper-dim font-mono text-[11px] tracking-[0.14em] text-verdigris-dark uppercase">
        <span className="h-1.5 w-1.5 rounded-full bg-clay" />
        Chamberí 54 — Portfolio
      </span>
      <h1 className="heading-hero max-w-[640px] font-display leading-[1.08] font-[450] tracking-[-0.01em]">
        Un recorrido por nuestras piezas.
      </h1>
      <p className="mt-6 max-w-[480px] text-[17px] text-ink-soft">
        Cada escultura nace de una fotografía y se modela a mano, pieza a
        pieza. Pasa página para verlas.
      </p>
      <div className="mt-9">
        <TactileButton
          label="Abrir"
          onClick={onOpen}
          padding="15px 36px"
          rounded={100}
          base={{ color: "#0097B2", depth: 6 }}
          colors={{ fill: "#1F2420", textColor: "#F7F4EE" }}
          font={{ fontFamily: "var(--font-inter)", fontSize: "15px", fontWeight: 500 }}
        />
      </div>
    </div>
  );
}

function PiecePage({
  piece,
  index,
  total,
}: {
  piece: (typeof PIECES)[number];
  index: number;
  total: number;
}) {
  return (
    <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
      <div className="shadow-soft relative mx-auto aspect-square w-full max-w-[420px] overflow-hidden rounded-sm border border-line">
        <Image
          src={piece.src}
          alt={`Escultura de ${piece.title.toLowerCase()}, ${piece.note.toLowerCase()}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 90vw, 420px"
          priority={index === 0}
        />
      </div>
      <div className="text-center md:text-left">
        <span className="font-mono text-xs tracking-[0.14em] text-verdigris-dark uppercase">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <h2 className="heading-section mt-3 font-display font-[450]">{piece.title}</h2>
        <p className="mt-3 text-[15px] text-ink-soft">{piece.note}</p>
      </div>
    </div>
  );
}

function ClosingPage() {
  return (
    <div className="flex flex-col items-center px-4 py-10 text-center">
      <h2 className="heading-section max-w-[560px] font-display font-[450]">
        Así trabajamos cada pieza, de principio a fin.
      </h2>
      <p className="mt-4 max-w-[480px] text-[15px] text-ink-soft">
        Desde una fotografía hasta una escultura única, hecha a mano en el
        barrio de Chamberí.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-4">
        <TactileButton
          href="/"
          label="Encargar mi escultura"
          padding="15px 28px"
          rounded={100}
          base={{ color: "#0097B2", depth: 6 }}
          colors={{ fill: "#1F2420", textColor: "#F7F4EE" }}
          font={{ fontFamily: "var(--font-inter)", fontSize: "15px", fontWeight: 500 }}
        />
        <TactileButton
          href="/eventos-empresa"
          label="Eventos de empresa"
          padding="15px 28px"
          rounded={100}
          base={{ color: "#9E4624", depth: 6 }}
          colors={{ fill: "#F7F4EE", textColor: "#1F2420" }}
          font={{ fontFamily: "var(--font-inter)", fontSize: "15px", fontWeight: 500 }}
        />
      </div>
    </div>
  );
}
