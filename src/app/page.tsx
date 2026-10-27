import type { Metadata } from "next";
import Header from "@/components/Header";
import DogFooter from "@/components/dog/DogFooter";
import HomeHero from "@/components/home/HomeHero";
import FeatureStrip from "@/components/home/FeatureStrip";
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
        <HomeHero />
        <FeatureStrip />
        <section className="py-24" id="colecciones">
          <div className="mx-auto max-w-[1180px] px-8">
            <div className="mb-14 text-center">
              <span className="eyebrow-badge mb-5 bg-paper-dim font-mono text-[11px] tracking-[0.14em] text-verdigris-dark uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-clay" />
                Chamberí 54
              </span>
              <h2 className="heading-hero mx-auto max-w-[640px] font-display font-[450] tracking-[-0.01em]">
                Nuestras colecciones
              </h2>
              <p className="mt-5 mx-auto max-w-[560px] text-[17px] text-ink-soft">
                Piezas únicas hechas a mano en el corazón de Chamberí:
                joyería, piezas para el hogar y arte en cerámica. El detalle
                perfecto para bodas, comuniones y otras celebraciones.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-10">
              {CATEGORIES.map((category) => (
                <div
                  key={category.slug}
                  className="w-full sm:w-[calc((100%-40px)/2)] lg:w-[calc((100%-80px)/3)]"
                >
                  <CategoryCard category={category} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <DogFooter />
    </>
  );
}
