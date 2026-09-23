import Image from "next/image";

export default function SobreNosotros() {
  return (
    <section className="border-t border-line py-24" id="sobre-nosotros">
      <div className="mx-auto max-w-[1180px] px-8">
        <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-2">
          <div className="reveal relative aspect-[3/2] md:order-2">
            <div className="shadow-soft hover-wiggle tilt-1 relative h-full w-full overflow-hidden rounded-sm border border-line bg-paper">
              <Image
                src="/about/about-us.jpg"
                alt="El equipo de Chamberí 54 a la entrada de su taller en Madrid"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="reveal md:order-1">
            <span className="eyebrow-badge mb-3.5 bg-paper-dim font-mono text-[11px] tracking-[0.14em] text-verdigris-dark uppercase">
              Sobre nosotros
            </span>
            <h2 className="heading-section mb-6 font-display font-[450]">
              Piezas únicas, hechas con cariño.
            </h2>
            <p className="max-w-[480px] text-[16px] leading-relaxed text-ink-soft">
              Chamberí 54 nace en el corazón de Madrid con el objetivo de crear
              piezas únicas, regalos que generen sentimientos y recuerdos para
              toda la vida. El arte es nuestra pasión, y ponemos cariño en
              cada una de nuestras obras. Forma parte de la familia y regala
              felicidad con Chamberí 54.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
