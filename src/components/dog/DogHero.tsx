import Image from "next/image";

export default function DogHero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-16">
      <Image
        src="/logo/logo-circulo-teal.png"
        alt=""
        aria-hidden
        width={220}
        height={220}
        className="pointer-events-none absolute top-10 -right-10 hidden rotate-6 rounded-full shadow-lg md:block lg:right-8"
      />
      <div className="mx-auto max-w-[1180px] px-8">
        <div className="reveal mb-[22px] flex items-center gap-2.5 font-mono text-[11px] tracking-[0.14em] text-verdigris-dark uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-clay" />
          Chamberí 54 — Esculturas personalizadas
        </div>
        <h1 className="reveal max-w-[760px] font-display text-[38px] leading-[1.06] font-[450] tracking-[-0.01em] md:text-[56px]">
          Un recuerdo{" "}
          <span className="font-normal italic">para toda la vida</span>{" "}
          modelado a mano.
        </h1>
        <p className="reveal mt-6 max-w-[560px] text-[17px] text-ink-soft">
          Somos un taller de escultura hecha a mano en el barrio de Chamberí,
          Madrid. Trabajamos para capturar —su postura, su pelaje, sus
          gestos— y modelamos una pieza única, numerada, para conservar su
          recuerdo para siempre.
        </p>
        <div className="reveal mt-9 flex flex-wrap gap-4">
          <a
            href="#pedido"
            className="rounded-sm bg-ink px-7 py-[15px] text-paper transition-all hover:-translate-y-px hover:bg-verdigris-dark"
          >
            Enviar las fotos de mi mascota
          </a>
          <a
            href="#galeria"
            className="rounded-sm border border-ink px-7 py-[15px] transition-colors hover:bg-ink hover:text-paper"
          >
            Ver esculturas realizadas
          </a>
        </div>
      </div>
    </section>
  );
}
