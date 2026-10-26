import type { Metadata } from "next";
import Header from "@/components/Header";
import DogFooter from "@/components/dog/DogFooter";
import CategoryCard from "@/components/portfolio/CategoryCard";
import { CATEGORIES } from "@/lib/portfolio";

const title = "Chamberí 54 — Piezas de cerámica hechas a mano";
const description =
  "Joyería, piezas para el hogar y decoración de cerámica hechas a mano en nuestro taller de Chamberí, Madrid. El detalle perfecto para bodas, comuniones y regalos personalizados.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/",
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

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <section className="py-24">
          <div className="mx-auto max-w-[1180px] px-8">
            <div className="mb-14 text-center">
              <span className="eyebrow-badge mb-5 bg-paper-dim font-mono text-[11px] tracking-[0.14em] text-verdigris-dark uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-clay" />
                Taller de cerámica — Madrid
              </span>
              <h1 className="heading-hero max-w-[640px] mx-auto font-display font-[450] tracking-[-0.01em]">
                Chamberí 54
              </h1>
              <p className="mt-5 mx-auto max-w-[560px] text-[17px] text-ink-soft">
                Piezas únicas hechas a mano en el corazón de Chamberí:
                joyería, piezas para el hogar y arte en cerámica, pensadas
                para regalar o para conservar. El detalle perfecto para
                bodas, comuniones y otras celebraciones.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {CATEGORIES.map((category) => (
                <CategoryCard key={category.slug} category={category} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <DogFooter />
    </>
  );
}
