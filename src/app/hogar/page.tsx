import type { Metadata } from "next";
import Header from "@/components/Header";
import DogFooter from "@/components/dog/DogFooter";
import BackLink from "@/components/portfolio/BackLink";
import SectionBanner from "@/components/portfolio/SectionBanner";
import PieceGrid from "@/components/portfolio/PieceGrid";
import { FLORES_MACETAS, DIFUSORES, PERCHEROS } from "@/lib/portfolio";

const title = "Hogar — Chamberí 54";
const description =
  "Jarrones, macetas y piezas de cerámica para el hogar, hechas a mano en nuestro taller de Chamberí, Madrid.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/hogar",
    siteName: "Chamberí 54",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/portfolio/hogar/conjunto-hogar.jpg",
        width: 1254,
        height: 1254,
        alt: "Piezas de cerámica para el hogar — Chamberí 54",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/portfolio/hogar/conjunto-hogar.jpg"],
  },
};

export default function HogarPage() {
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
              <h1 className="heading-hero font-display font-[450] tracking-[-0.01em]">Hogar</h1>
            </div>

            <SectionBanner title="Flores y macetas cerámicas" image="/portfolio/hogar/tulipanes-jarron.jpg" />
            <PieceGrid pieces={FLORES_MACETAS} className="mb-20" />

            <SectionBanner title="Difusores" image="/portfolio/hogar/jarron-jaspeado.jpg" />
            <PieceGrid pieces={DIFUSORES} className="mb-20" />

            <SectionBanner title="Percheros" image="/portfolio/hogar/busto-galgo.jpg" />
            <PieceGrid pieces={PERCHEROS} />
          </div>
        </section>
      </main>
      <DogFooter />
    </>
  );
}
