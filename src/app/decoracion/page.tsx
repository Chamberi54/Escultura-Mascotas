import type { Metadata } from "next";
import Header from "@/components/Header";
import DogFooter from "@/components/dog/DogFooter";
import BackLink from "@/components/portfolio/BackLink";
import PieceGrid from "@/components/portfolio/PieceGrid";
import { GALGOS, TECKLES, FIGURAS_DECORACION } from "@/lib/portfolio";

const title = "Decoración — Chamberí 54";
const description =
  "Figuras y esculturas de cerámica para decorar, hechas a mano en nuestro taller de Chamberí, Madrid.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/decoracion",
    siteName: "Chamberí 54",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/portfolio/decoracion/conjunto-decoracion.jpg",
        width: 1400,
        height: 933,
        alt: "Figuras de cerámica decorativas — Chamberí 54",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/portfolio/decoracion/conjunto-decoracion.jpg"],
  },
};

export default function DecoracionPage() {
  return (
    <>
      <Header />
      <main>
        <section className="py-20">
          <div className="mx-auto max-w-[1180px] px-8">
            <BackLink />
            <div className="mt-6 mb-14 text-center">
              <span className="eyebrow-badge mb-5 bg-paper-dim font-mono text-[11px] tracking-[0.14em] text-verdigris-dark uppercase">
                Chamberí 54
              </span>
              <h1 className="heading-hero font-display font-[450] tracking-[-0.01em]">Decoración</h1>
            </div>

            <h2 className="heading-section-sm mb-7 text-center font-display font-[450]">
              Nuestros galgos
            </h2>
            <PieceGrid pieces={GALGOS} className="mb-20" />

            <h2 className="heading-section-sm mb-7 text-center font-display font-[450]">
              Nuestros teckles
            </h2>
            <PieceGrid pieces={TECKLES} className="mb-20" />

            <h2 className="heading-section-sm mb-7 text-center font-display font-[450]">
              Figuras
            </h2>
            <PieceGrid pieces={FIGURAS_DECORACION} />
          </div>
        </section>
      </main>
      <DogFooter />
    </>
  );
}
