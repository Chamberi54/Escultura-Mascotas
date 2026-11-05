type Review = { text: string; lang: "es" | "en" };

const REVIEWS: Review[] = [
  {
    lang: "en",
    text: "We went for a friend's birthday and it was amazing. They taught us how to make a mug from scratch and decorate it. A super fun and original workshop. They also have beautiful ceramic figures and accessories. We'll definitely be back!",
  },
  {
    lang: "en",
    text: "Wonderful center. Yago has the hands of an artist and can create anything you ask for in ceramics. I highly recommend him for both commissions and workshops!",
  },
  {
    lang: "es",
    text: "Tienen la opción de hacer a tu perrito en cerámica!!! Un regalo súper bonito y personalizado. Además tienen mucha variedad de cerámica ya hecha!!! Los dueños son majisimos y me atendieron muy amables! Recomendable al 100%!!",
  },
  {
    lang: "es",
    text: "Trato inmejorable! Sin duda una de mis tiendas preferidas. Los productos son de una calidad excepcional y muy originales. Os la recomiendo muchísimo!!",
  },
  {
    lang: "es",
    text: "Una tienda muy bonita con un trato excelente! Da gusto ver que todavía quedan tiendas que de verdad vendan cosas bonitas hechas a mano y no de forma industrial. Muy recomendada!!",
  },
];

function Stars() {
  return (
    <span aria-label="5 de 5 estrellas" className="text-[15px] tracking-[0.15em] text-gold">
      ★★★★★
    </span>
  );
}

export default function GoogleReviews() {
  return (
    <section className="border-t border-line bg-paper-dim py-24" id="resenas">
      <div className="mx-auto max-w-[1180px] px-8">
        <div className="mb-14 text-center">
          <h2 className="heading-hero mx-auto max-w-[640px] font-display font-[450] tracking-[-0.01em]">
            Lo que dicen de nosotros
          </h2>
          <p className="mt-5 flex flex-wrap items-center justify-center gap-3 text-[15px] text-ink-soft">
            <Stars />
            <span>Reseñas de 5 estrellas en Google</span>
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {REVIEWS.map((review) => (
            <figure
              key={review.text}
              className="flex w-full flex-col rounded-sm border border-line bg-paper p-7 sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)]"
            >
              <Stars />
              <blockquote
                lang={review.lang}
                className="mt-4 flex-1 text-[14.5px] leading-relaxed text-ink"
              >
                “{review.text}”
              </blockquote>
              <figcaption className="mt-5 font-mono text-[11px] tracking-[0.06em] text-ink-soft uppercase">
                Reseña en Google
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
