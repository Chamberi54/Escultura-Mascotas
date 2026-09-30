"use client";

import { useRef, useState } from "react";

const STEPS = [
  {
    title: "1. Figuras base",
    description: "Partimos de dos siluetas planas de cerámica: hombre y mujer.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={1.3}>
        <circle cx={22} cy={14} r={6} />
        <path d="M22 20v24M14 30h16" />
        <circle cx={42} cy={14} r={6} />
        <path d="M42 20l-6 24h12l-6-24z" />
      </svg>
    ),
  },
  {
    title: "2. Personaliza",
    description:
      "Añade los accesorios que más os gusten: peinados, ropa y complementos.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={1.3}>
        <path d="M14 44c4-14 10-22 18-22s14 8 18 22" />
        <circle cx={32} cy={16} r={4} />
        <path d="M20 44h24" />
      </svg>
    ),
  },
  {
    title: "3. Modela y monta",
    description:
      "Da forma a tu figura con arcilla refractaria y añade los accesorios.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={1.3}>
        <path d="M16 48c0-14 7-26 16-26s16 12 16 26" />
        <path d="M20 48h24" />
        <circle cx={32} cy={16} r={3} fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: "4. Pinta y decora",
    description: "Usa pintura cerámica y esmalte para darle color y detalle.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={1.3}>
        <path d="M42 8l14 14-24 24-16 2 2-16z" />
        <path d="M36 14l14 14" />
      </svg>
    ),
  },
  {
    title: "5. Cocciones",
    description:
      "Dos cocciones en horno cerámico (1000°C y 1230°C) para un acabado resistente y duradero.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={1.3}>
        <rect x={12} y={14} width={40} height={36} rx={2} />
        <path d="M20 24h24M20 32h24M20 40h24" />
      </svg>
    ),
  },
  {
    title: "6. Entrega",
    description: "Os entregamos las piezas terminadas, listas para disfrutar.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={1.3}>
        <rect x={14} y={22} width={36} height={26} rx={1.5} />
        <path d="M14 30h36M32 22v26" />
        <path d="M22 22l4-8h12l4 8" />
      </svg>
    ),
  },
];

export default function TeamProceso() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const drag = useRef({ dragging: false, startX: 0, scrollLeft: 0 });

  function onPointerDown(e: React.PointerEvent) {
    if (e.pointerType !== "mouse") return;
    const track = trackRef.current;
    if (!track) return;
    drag.current = { dragging: true, startX: e.clientX, scrollLeft: track.scrollLeft };
    track.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent) {
    const track = trackRef.current;
    if (!track || !drag.current.dragging) return;
    track.scrollLeft = drag.current.scrollLeft - (e.clientX - drag.current.startX);
  }

  function onPointerUp() {
    drag.current.dragging = false;
  }

  function onScroll() {
    const track = trackRef.current;
    if (!track) return;
    const trackCenter = track.getBoundingClientRect().left + track.clientWidth / 2;
    let closest = 0;
    let minDistance = Infinity;
    Array.from(track.children).forEach((child, i) => {
      const rect = (child as HTMLElement).getBoundingClientRect();
      const distance = Math.abs(rect.left + rect.width / 2 - trackCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closest = i;
      }
    });
    setActive(closest);
  }

  function goTo(index: number) {
    const track = trackRef.current;
    const card = track?.children[index] as HTMLElement | undefined;
    if (!track || !card) return;
    const trackRect = track.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const delta =
      cardRect.left + cardRect.width / 2 - (trackRect.left + track.clientWidth / 2);
    track.scrollTo({ left: track.scrollLeft + delta, behavior: "smooth" });
  }

  return (
    <section className="py-24" id="proceso-equipo">
      <div className="mx-auto max-w-[1180px] px-8">
        <div className="reveal mb-14 flex flex-wrap items-end justify-between gap-8">
          <div>
            <span className="eyebrow-badge mb-3.5 bg-paper-dim font-mono text-[11px] tracking-[0.14em] text-verdigris-dark uppercase">
              Cómo funciona
            </span>
            <h2 className="heading-section max-w-[560px] font-display font-[450]">
              De la silueta a la figura terminada, en seis pasos.
            </h2>
          </div>
          <p className="max-w-[300px] text-[13.5px] text-ink-soft">
            Desliza o arrastra para ver los siguientes pasos.
          </p>
        </div>

        <div
          ref={trackRef}
          onScroll={onScroll}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          className="reveal -mx-8 flex snap-x snap-mandatory gap-6 overflow-x-auto px-8 pb-4 [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
        >
          {STEPS.map((step, i) => (
            <div
              key={step.title}
              className={`shadow-soft hover-wiggle tilt-${(i % 4) + 1} w-[78%] shrink-0 snap-center border border-line bg-paper px-8 pt-10 pb-9 select-none sm:w-[46%] lg:w-[31%]`}
            >
              <div className="mb-6.5 h-[48px] w-[48px] text-verdigris-dark">
                {step.icon}
              </div>
              <h3 className="mb-2.5 text-[19px] font-[450]">{step.title}</h3>
              <p className="text-[14px] text-ink-soft">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {STEPS.map((step, i) => (
            <button
              key={step.title}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ir al paso ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                active === i ? "w-6 bg-ink" : "w-1.5 bg-line"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
