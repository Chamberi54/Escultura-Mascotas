"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import TactileButton from "@/components/dog/TactileButton";

type PieceDef = { title: string; image: string };

const BROCHES: PieceDef[] = [
  { title: "Broche corazón rojo", image: "/portfolio/joyeria/broche-corazon-rojo.jpg" },
  { title: "Broche corazón verde", image: "/portfolio/joyeria/broche-corazon-verde.jpg" },
  { title: "Broche perro", image: "/portfolio/joyeria/broche-perro.jpg" },
  { title: "Broche coche amarillo", image: "/portfolio/joyeria/broche-coche-amarillo.jpg" },
  { title: "Broche coche rojo", image: "/portfolio/joyeria/broche-coche-rojo.jpg" },
  { title: "Broche pez", image: "/portfolio/joyeria/broche-pez.jpg" },
];

const PENDIENTES: PieceDef[] = [
  { title: "Pendientes esmalte azul cielo", image: "/portfolio/joyeria/pendiente-esmalte-azul-cielo.jpg" },
  { title: "Pendientes esmalte azul oscuro", image: "/portfolio/joyeria/pendiente-esmalte-azul-oscuro.jpg" },
  { title: "Pendientes esmalte cuadrados azul oscuro", image: "/portfolio/joyeria/pendiente-esmalte-cuadrado-azul-oscuro.jpg" },
  { title: "Pendientes esmalte cuadrados rojo", image: "/portfolio/joyeria/pendiente-esmalte-cuadrado-rojo.jpg" },
  { title: "Pendientes esmalte naranja", image: "/portfolio/joyeria/pendiente-esmalte-naranja.jpg" },
  { title: "Pendientes esmalte rojo intenso", image: "/portfolio/joyeria/pendiente-esmalte-rojo-intenso.jpg" },
  { title: "Pendientes esmalte rojo", image: "/portfolio/joyeria/pendiente-esmalte-rojo.jpg" },
  { title: "Pendientes esmalte rosa", image: "/portfolio/joyeria/pendiente-esmalte-rosa.jpg" },
  { title: "Pendientes porcelana blanco", image: "/portfolio/joyeria/pendiente-porcelana-blanco.jpg" },
  { title: "Pendientes porcelana cuadrados turquesa", image: "/portfolio/joyeria/pendiente-porcelana-cuadrado-turquesa.jpg" },
  { title: "Pendientes porcelana cuadrados verde", image: "/portfolio/joyeria/pendiente-porcelana-cuadrado-verde.jpg" },
  { title: "Pendientes porcelana multicolor", image: "/portfolio/joyeria/pendiente-porcelana-multicolor.jpg" },
  { title: "Pendientes porcelana turquesa", image: "/portfolio/joyeria/pendiente-porcelana-turquesa.jpg" },
];

const HOGAR: PieceDef[] = [
  { title: "Tulipanes en jarrón", image: "/portfolio/hogar/tulipanes-jarron.jpg" },
  { title: "Maceta esmalte cuarteado", image: "/portfolio/hogar/maceta-cuarteada.jpg" },
  { title: "Jarrón jaspeado", image: "/portfolio/hogar/jarron-jaspeado.jpg" },
  { title: "Busto de galgo", image: "/portfolio/hogar/busto-galgo.jpg" },
  { title: "Jarrón multicolor", image: "/portfolio/hogar/jarron-multicolor.jpg" },
  { title: "Cesta de cerámica", image: "/portfolio/hogar/cesta-ceramica.jpg" },
  { title: "Set de macetas verde agua", image: "/portfolio/hogar/macetas-verde-agua.jpg" },
  { title: "Set de macetas teal", image: "/portfolio/hogar/macetas-teal.jpg" },
];

const DECORACION: PieceDef[] = [
  { title: "Salchicha bronce", image: "/portfolio/decoracion/salchicha-bronce.jpg" },
  { title: "Figura abstracta esmaltada", image: "/portfolio/decoracion/figura-abstracta.jpg" },
  { title: "Figura floral", image: "/portfolio/decoracion/figura-floral.jpg" },
  { title: "Salchicha roja", image: "/portfolio/decoracion/salchicha-roja.jpg" },
  { title: "Salchicha jaspeada", image: "/portfolio/decoracion/salchicha-jaspeada.jpg" },
  { title: "Colección de galgos", image: "/portfolio/decoracion/galgos-coleccion.jpg" },
  { title: "Galgo crema", image: "/portfolio/decoracion/galgo-crema.jpg" },
  { title: "Salchicha moteada", image: "/portfolio/decoracion/salchicha-moteada.jpg" },
  { title: "Galgo carbón", image: "/portfolio/decoracion/galgo-carbon.jpg" },
];

type Slide =
  | { kind: "cover" }
  | { kind: "divider"; eyebrow: string; title: string; image: string }
  | { kind: "piece"; section: string; title: string; image: string; index: number; total: number }
  | { kind: "closing" };

function buildSection(eyebrow: string, title: string, image: string, pieces: PieceDef[]): Slide[] {
  return [
    { kind: "divider", eyebrow, title, image },
    ...pieces.map(
      (p, i): Slide => ({
        kind: "piece",
        section: title,
        title: p.title,
        image: p.image,
        index: i + 1,
        total: pieces.length,
      }),
    ),
  ];
}

const SLIDES: Slide[] = [
  { kind: "cover" },
  ...buildSection("Joyería", "Broches", "/portfolio/joyeria/conjunto-broches.jpg", BROCHES),
  ...buildSection("Joyería", "Pendientes", "/portfolio/joyeria/conjunto-pendientes.jpg", PENDIENTES),
  ...buildSection("Portfolio", "Hogar", "/portfolio/hogar/conjunto-hogar.jpg", HOGAR),
  ...buildSection("Portfolio", "Decoración", "/portfolio/decoracion/conjunto-decoracion.jpg", DECORACION),
  { kind: "closing" },
];

const LAST_PAGE = SLIDES.length - 1;

export default function PortfolioBook() {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const dragStartX = useRef<number | null>(null);

  function goNext() {
    setDirection(1);
    setPage((p) => Math.min(p + 1, LAST_PAGE));
  }

  function goPrev() {
    setDirection(-1);
    setPage((p) => Math.max(p - 1, 0));
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

  const slide = SLIDES[page];
  const isCover = slide.kind === "cover";
  const isClosing = slide.kind === "closing";
  const isLastBeforeClosing = page === LAST_PAGE - 1;

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
              {slide.kind === "cover" && <CoverPage onOpen={goNext} />}
              {slide.kind === "divider" && <DividerPage slide={slide} />}
              {slide.kind === "piece" && <PiecePage slide={slide} />}
              {slide.kind === "closing" && <ClosingPage />}
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
              {slide.kind === "piece" ? `${slide.index} / ${slide.total}` : ""}
            </span>
            {!isClosing ? (
              <button
                type="button"
                onClick={goNext}
                className="font-mono text-xs tracking-[0.1em] text-ink-soft uppercase transition-colors hover:text-ink"
              >
                {isLastBeforeClosing ? "Final →" : "Siguiente →"}
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
        Joyería, piezas para el hogar y decoración, modeladas y esmaltadas a
        mano en nuestro taller de Chamberí. Pasa página para verlas.
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

function DividerPage({ slide }: { slide: Extract<Slide, { kind: "divider" }> }) {
  return (
    <div className="flex flex-col items-center px-4 text-center">
      <span className="eyebrow-badge mb-5 bg-paper-dim font-mono text-[11px] tracking-[0.14em] text-verdigris-dark uppercase">
        {slide.eyebrow}
      </span>
      <h2 className="heading-hero mb-8 max-w-[560px] font-display font-[450] tracking-[-0.01em]">
        {slide.title}
      </h2>
      <div className="shadow-soft relative aspect-[3/2] w-full max-w-[560px] overflow-hidden rounded-sm border border-line">
        <Image
          src={slide.image}
          alt={`Conjunto de piezas de ${slide.title.toLowerCase()}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 90vw, 560px"
        />
      </div>
    </div>
  );
}

function PiecePage({ slide }: { slide: Extract<Slide, { kind: "piece" }> }) {
  return (
    <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
      <div className="shadow-soft relative mx-auto aspect-square w-full max-w-[420px] overflow-hidden rounded-sm border border-line">
        <Image
          src={slide.image}
          alt={slide.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 90vw, 420px"
        />
      </div>
      <div className="text-center md:text-left">
        <span className="font-mono text-xs tracking-[0.14em] text-verdigris-dark uppercase">
          {slide.section} · {String(slide.index).padStart(2, "0")} / {String(slide.total).padStart(2, "0")}
        </span>
        <h2 className="heading-section mt-3 font-display font-[450]">{slide.title}</h2>
      </div>
    </div>
  );
}

function ClosingPage() {
  return (
    <div className="flex flex-col items-center px-4 py-10 text-center">
      <h2 className="heading-section max-w-[560px] font-display font-[450]">
        Cada pieza, hecha a mano en Chamberí.
      </h2>
      <p className="mt-4 max-w-[480px] text-[15px] text-ink-soft">
        Para un recuerdo personalizado o una actividad distinta para el
        equipo, hay más opciones.
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
