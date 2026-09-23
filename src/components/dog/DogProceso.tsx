"use client";

import { useRef, useState } from "react";

const STEPS = [
  {
    title: "1. Fotografía a tu mascota",
    description:
      "Haz varias fotos — de perfil, de frente, de cuerpo entero — intentando captar el máximo detalle posible para plasmar su esencia en la escultura.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={1.3}>
        <rect x={8} y={20} width={48} height={32} rx={3} />
        <circle cx={32} cy={36} r={10} />
        <path d="M22 20l3-7h14l3 7" />
      </svg>
    ),
  },
  {
    title: "2. Envíanos las fotos",
    description: "Adjunta las fotos en el formulario de pedido.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={1.3}>
        <path d="M7 32L56 10 37 57l-9-21-21-4z" strokeLinejoin="round" />
        <path d="M28 36L45 17" />
      </svg>
    ),
  },
  {
    title: "3. Estudio y escultura",
    description:
      "Nuestro escultor estudia la anatomía, el pelaje y el carácter de tu mascota y modela la pieza a mano en la postura que elijas.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={1.3}>
        <path d="M32 12c-11 0-18 8-18 19 0 8 3 13 7 17-9 5-14 12-16 20" />
        <path d="M32 12c11 0 18 8 18 19 0 8-3 13-7 17 9 5 14 12 16 20" />
        <circle cx={32} cy={20} r={2.5} fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: "4. Recibe tu escultura",
    description:
      "Acabado, patinado y numerado a mano. Recíbela en casa o recógela en el taller de Chamberí, con certificado de autenticidad.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={1.3}>
        <rect x={14} y={22} width={36} height={26} rx={1.5} />
        <path d="M14 30h36M32 22v26" />
        <path d="M22 22l4-8h12l4 8" />
      </svg>
    ),
  },
];

export default function DogProceso() {
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
    <section className="py-24" id="proceso">
      <div className="mx-auto max-w-[1180px] px-8">
        <div className="reveal mb-14 flex flex-wrap items-end justify-between gap-8">
          <div>
            <span className="mb-3.5 block font-mono text-[11px] tracking-[0.14em] text-verdigris-dark uppercase">
              El proceso
            </span>
            <h2 className="heading-section max-w-[560px] font-display font-[450]">
              De la foto a la escultura, en cuatro pasos.
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
              className={`hover-wiggle tilt-${(i % 4) + 1} w-[78%] shrink-0 snap-center border border-line bg-paper px-8 pt-10 pb-9 shadow-sm select-none sm:w-[46%] lg:w-[31%]`}
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
