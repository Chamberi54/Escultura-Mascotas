import Image from "next/image";
import HandDrawnUnderline from "./HandDrawnUnderline";
import TactileButton from "./TactileButton";

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
        <div className="reveal eyebrow-badge mb-[22px] bg-paper-dim font-mono text-[11px] tracking-[0.14em] text-verdigris-dark uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-clay" />
          Chamberí 54 — Esculturas personalizadas
        </div>
        <h1 className="reveal heading-hero max-w-[760px] font-display leading-[1.06] font-[450] tracking-[-0.01em]">
          Un recuerdo{" "}
          <span className="relative inline-block font-normal italic">
            para toda la vida
            <HandDrawnUnderline />
          </span>{" "}
          modelado a mano.
        </h1>
        <p className="reveal mt-6 max-w-[560px] text-[17px] text-ink-soft">
          Somos un taller de escultura hecha a mano en el barrio de Chamberí,
          Madrid. Trabajamos para capturar —su postura, su pelaje, sus
          gestos— y modelamos una pieza única, numerada, para conservar su
          recuerdo para siempre.
        </p>
        <div className="reveal mt-9 flex flex-wrap items-start gap-5">
          <TactileButton
            href="#pedido"
            label="Enviar las fotos de mi mascota"
            padding="15px 28px"
            rounded={100}
            base={{ color: "#0097B2", depth: 6 }}
            colors={{ fill: "#1F2420", textColor: "#F7F4EE" }}
            font={{ fontFamily: "var(--font-inter)", fontSize: "15px", fontWeight: 500 }}
          />
          <TactileButton
            href="#galeria"
            label="Ver esculturas realizadas"
            padding="15px 28px"
            rounded={100}
            base={{ color: "#9E4624", depth: 6 }}
            colors={{ fill: "#F7F4EE", textColor: "#1F2420" }}
            font={{ fontFamily: "var(--font-inter)", fontSize: "15px", fontWeight: 500 }}
          />
        </div>
      </div>
    </section>
  );
}
