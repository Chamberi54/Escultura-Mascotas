import type { Metadata } from "next";
import Header from "@/components/Header";
import DogFooter from "@/components/dog/DogFooter";
import BackLink from "@/components/portfolio/BackLink";
import IdeaFormulario from "@/components/esculturas/IdeaFormulario";

const title = "Arte personalizado — Chamberí 54";
const description =
  "Cuéntanos tu idea y la modelamos en cerámica, a medida, en nuestro taller de Chamberí, Madrid.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/arte-personalizado",
    siteName: "Chamberí 54",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/about/about-us.jpg",
        width: 1200,
        height: 1200,
        alt: "El equipo de Chamberí 54 en su taller de Madrid",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/about/about-us.jpg"],
  },
};

export default function ArtePersonalizadoPage() {
  return (
    <>
      <Header />
      <main>
        <section className="py-20">
          <div className="mx-auto max-w-[1180px] px-8">
            <BackLink />

            <div className="mt-10 grid grid-cols-1 items-start gap-16 md:grid-cols-2">
              <div>
                <span className="eyebrow-badge mb-5 bg-paper-dim font-mono text-[11px] tracking-[0.14em] text-verdigris-dark uppercase">
                  Arte personalizado
                </span>
                <h1 className="heading-hero font-display font-[450] tracking-[-0.01em]">
                  Hagamos tu idea realidad.
                </h1>
                <p className="mt-6 max-w-[460px] text-[17px] text-ink-soft">
                  Si hay una pieza que no encaja en mascotas, joyería, hogar o
                  decoración, se puede modelar igualmente a mano en el taller
                  de Chamberí. Con la descripción de la idea, se propone una
                  pieza y un presupuesto a medida.
                </p>
              </div>

              <IdeaFormulario />
            </div>
          </div>
        </section>
      </main>
      <DogFooter />
    </>
  );
}
