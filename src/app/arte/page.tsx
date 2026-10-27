import type { Metadata } from "next";
import Header from "@/components/Header";
import DogFooter from "@/components/dog/DogFooter";
import BackLink from "@/components/portfolio/BackLink";
import PieceGrid from "@/components/portfolio/PieceGrid";
import { ARTE_SACRO, ICONOS, DE_AUTOR } from "@/lib/portfolio";

const title = "Arte personalizado — Chamberí 54";
const description =
  "Figuras y bustos de cerámica para encargos únicos, hechos a mano en nuestro taller de Chamberí, Madrid.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/arte",
    siteName: "Chamberí 54",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/portfolio/arte/conjunto-arte.jpg",
        width: 1400,
        height: 933,
        alt: "Figuras de cerámica personalizadas — Chamberí 54",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/portfolio/arte/conjunto-arte.jpg"],
  },
};

export default function ArteCatalogoPage() {
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
              <h1 className="heading-hero font-display font-[450] tracking-[-0.01em]">
                Arte personalizado
              </h1>
            </div>

            <h2 className="heading-section-sm mb-7 text-center font-display font-[450]">
              Arte sacro
            </h2>
            <PieceGrid pieces={ARTE_SACRO} className="mb-20" />

            <h2 className="heading-section-sm mb-7 text-center font-display font-[450]">
              Iconos
            </h2>
            <PieceGrid pieces={ICONOS} className="mb-20" />

            <h2 className="heading-section-sm mb-7 text-center font-display font-[450]">
              De autor
            </h2>
            <PieceGrid pieces={DE_AUTOR} />
          </div>
        </section>
      </main>
      <DogFooter />
    </>
  );
}
