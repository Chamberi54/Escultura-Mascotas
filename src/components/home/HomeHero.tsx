import Image from "next/image";
import TactileButton from "@/components/dog/TactileButton";

export default function HomeHero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="relative h-[560px] sm:h-[620px]">
        <Image
          src="/about/tienda-fachada.jpg"
          alt="Escaparate de Chamberí 54 en el barrio de Chamberí, Madrid"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/35 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-[1180px] px-8">
            <div className="max-w-[480px]">
              <span className="border-line-on-ink mb-5 inline-flex items-center gap-2 rounded-full border bg-paper/10 px-3 py-1.5 font-mono text-[11px] tracking-[0.14em] text-paper uppercase backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-clay" />
                Piezas únicas para espacios con alma
              </span>
              <h1 className="heading-hero font-display leading-[1.05] font-[450] tracking-[-0.01em] text-paper">
                Objetos que cuentan historias
              </h1>
              <p className="mt-5 max-w-[420px] text-[17px] text-paper/85">
                Esculturas y detalles de cerámica hechos a mano en el barrio
                de Chamberí.
              </p>
              <div className="mt-8">
                <TactileButton
                  href="#colecciones"
                  label="Ver colecciones"
                  padding="15px 28px"
                  rounded={100}
                  base={{ color: "#0097B2", depth: 6 }}
                  colors={{ fill: "#F7F4EE", textColor: "#1F2420" }}
                  font={{ fontFamily: "var(--font-inter)", fontSize: "15px", fontWeight: 500 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
