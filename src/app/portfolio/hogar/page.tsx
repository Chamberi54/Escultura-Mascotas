import type { Metadata } from "next";
import Header from "@/components/Header";
import DogFooter from "@/components/dog/DogFooter";
import BackLink from "@/components/portfolio/BackLink";
import SectionBanner from "@/components/portfolio/SectionBanner";
import PieceGrid from "@/components/portfolio/PieceGrid";
import { HOGAR } from "@/lib/portfolio";

const title = "Hogar — Portfolio | Chamberí 54";
const description =
  "Jarrones, macetas y piezas de cerámica para el hogar, hechas a mano en nuestro taller de Chamberí, Madrid.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/portfolio/hogar",
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
            <div className="mt-6 mb-7 text-center">
              <span className="eyebrow-badge bg-paper-dim font-mono text-[11px] tracking-[0.14em] text-verdigris-dark uppercase">
                Portfolio
              </span>
            </div>

            <SectionBanner title="Hogar" image="/portfolio/hogar/conjunto-hogar.jpg" level="h1" />
            <PieceGrid pieces={HOGAR} />
          </div>
        </section>
      </main>
      <DogFooter />
    </>
  );
}
