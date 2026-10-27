import type { Metadata } from "next";
import Header from "@/components/Header";
import DogFooter from "@/components/dog/DogFooter";
import BackLink from "@/components/portfolio/BackLink";
import SectionBanner from "@/components/portfolio/SectionBanner";
import PieceGrid from "@/components/portfolio/PieceGrid";
import { BROCHES, CRUCES, PENDIENTES } from "@/lib/portfolio";

const title = "Joyería — Chamberí 54";
const description =
  "Broches y pendientes de cerámica, esmaltados a mano en nuestro taller de Chamberí, Madrid.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/joyeria",
    siteName: "Chamberí 54",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/portfolio/joyeria/conjunto-broches.jpg",
        width: 1400,
        height: 933,
        alt: "Broches de cerámica hechos a mano — Chamberí 54",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/portfolio/joyeria/conjunto-broches.jpg"],
  },
};

export default function JoyeriaPage() {
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
              <h1 className="heading-hero font-display font-[450] tracking-[-0.01em]">Joyería</h1>
            </div>

            <SectionBanner title="Broches" image="/portfolio/joyeria/conjunto-broches.jpg" />
            <PieceGrid pieces={BROCHES} className="mb-20" />

            <SectionBanner title="Cruces" image="/portfolio/joyeria/cruz-chamberi.jpg" />
            <PieceGrid pieces={CRUCES} className="mb-20" />

            <SectionBanner title="Pendientes" image="/portfolio/joyeria/conjunto-pendientes.jpg" />
            <PieceGrid pieces={PENDIENTES} />
          </div>
        </section>
      </main>
      <DogFooter />
    </>
  );
}
