import RoundCarousel from "./RoundCarousel";

export default function DogGallery() {
  return (
    <section className="section py-24" id="galeria">
      <div className="mx-auto max-w-[1180px] px-8">
        <div className="reveal mb-14 flex flex-wrap items-end justify-between gap-8">
          <div>
            <span className="mb-3.5 block font-mono text-[11px] tracking-[0.14em] text-verdigris-dark uppercase">
              Esculturas ya realizadas
            </span>
            <h2 className="max-w-[560px] font-display text-[30px] font-[450] md:text-[42px]">
              Cada mascota, una pieza distinta.
            </h2>
          </div>
          <p className="max-w-[340px] text-[15px] text-ink-soft">
            Ejemplos de posturas y acabados posibles para tu escultura. Arrastra
            para girarlas — cada pieza real se modela una sola vez y queda
            numerada.
          </p>
        </div>

        <div className="reveal h-[440px] overflow-hidden rounded-sm border border-line">
          <RoundCarousel />
        </div>
      </div>
    </section>
  );
}
