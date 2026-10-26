import type { Metadata } from "next";
import Header from "@/components/Header";
import DogFooter from "@/components/dog/DogFooter";
import BackLink from "@/components/portfolio/BackLink";
import SectionBanner from "@/components/portfolio/SectionBanner";
import PieceGrid from "@/components/portfolio/PieceGrid";
import { DECORACION } from "@/lib/portfolio";

const title = "Decoración — Portfolio | Chamberí 54";
const description =
  "Figuras y esculturas de cerámica para decorar, hechas a mano en nuestro taller de Chamberí, Madrid.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/portfolio/decoracion",
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
            <div className="mt-6 mb-7 text-center">
              <span className="eyebrow-badge bg-paper-dim font-mono text-[11px] tracking-[0.14em] text-verdigris-dark uppercase">
                Portfolio
              </span>
            </div>

            <SectionBanner
              title="Decoración"
              image="/portfolio/decoracion/conjunto-decoracion.jpg"
              level="h1"
            />
            <PieceGrid pieces={DECORACION} />
          </div>
        </section>
      </main>
      <DogFooter />
    </>
  );
}
