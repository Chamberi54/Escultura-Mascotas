import type { Metadata } from "next";
import Header from "@/components/Header";
import DogFooter from "@/components/dog/DogFooter";
import BackLink from "@/components/portfolio/BackLink";
import SectionBanner from "@/components/portfolio/SectionBanner";
import PieceGrid from "@/components/portfolio/PieceGrid";
import { MASCOTAS } from "@/lib/portfolio";

const title = "Mascotas personalizadas — Chamberí 54";
const description =
  "Figuras de mascotas en cerámica, inspiradas en razas y posturas favoritas, hechas a mano en nuestro taller de Chamberí, Madrid.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/mascotas",
    siteName: "Chamberí 54",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/portfolio/mascotas/conjunto-mascotas.jpg",
        width: 1400,
        height: 933,
        alt: "Figuras de mascotas de cerámica — Chamberí 54",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/portfolio/mascotas/conjunto-mascotas.jpg"],
  },
};

export default function MascotasCatalogoPage() {
  return (
    <>
      <Header />
      <main>
        <section className="py-20">
          <div className="mx-auto max-w-[1180px] px-8">
            <BackLink />
            <div className="mt-6 mb-7 text-center">
              <span className="eyebrow-badge bg-paper-dim font-mono text-[11px] tracking-[0.14em] text-verdigris-dark uppercase">
                Chamberí 54
              </span>
            </div>

            <SectionBanner
              title="Mascotas personalizadas"
              image="/portfolio/mascotas/conjunto-mascotas.jpg"
              level="h1"
            />
            <PieceGrid pieces={MASCOTAS} />
          </div>
        </section>
      </main>
      <DogFooter />
    </>
  );
}
