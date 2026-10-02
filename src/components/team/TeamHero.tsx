import Image from "next/image";
import TactileButton from "@/components/dog/TactileButton";

export default function TeamHero() {
  return (
    <section className="overflow-hidden pt-24 pb-16">
      <div className="mx-auto max-w-[1180px] px-8">
        <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-2">
          <div className="reveal">
            <div className="eyebrow-badge mb-[22px] bg-paper-dim font-mono text-[11px] tracking-[0.14em] text-verdigris-dark uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-clay" />
              Chamberí 54 — Eventos de empresa
            </div>
            <h1 className="heading-hero max-w-[560px] font-display leading-[1.06] font-[450] tracking-[-0.01em]">
              Creatividad, cerámica y{" "}
              <span className="font-normal italic">momentos para compartir.</span>
            </h1>
            <p className="mt-6 max-w-[500px] text-[17px] text-ink-soft">
              Un taller de cerámica pensado para empresas: adaptamos una
              propuesta a la medida de vuestro equipo para vivir una
              experiencia de grupo única — lo llevamos a vuestra oficina o lo
              vivís en nuestro taller de Chamberí.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <TactileButton
                href="#solicitar"
                label="Solicitar más información"
                padding="15px 28px"
                rounded={100}
                base={{ color: "#0097B2", depth: 6 }}
                colors={{ fill: "#1F2420", textColor: "#F7F4EE" }}
                font={{ fontFamily: "var(--font-inter)", fontSize: "15px", fontWeight: 500 }}
              />
              <TactileButton
                href="#proceso-equipo"
                label="Ver cómo funciona"
                padding="15px 28px"
                rounded={100}
                base={{ color: "#9E4624", depth: 6 }}
                colors={{ fill: "#F7F4EE", textColor: "#1F2420" }}
                font={{ fontFamily: "var(--font-inter)", fontSize: "15px", fontWeight: 500 }}
              />
            </div>
          </div>
          <div className="reveal relative aspect-[4/5] overflow-hidden rounded-sm border border-line shadow-soft">
            <Image
              src="/eventos-empresa/taller-equipo.jpeg"
              alt="Equipo pintando sus figuras de cerámica personalizadas en un taller de Chamberí 54"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
