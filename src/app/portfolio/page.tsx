import type { Metadata } from "next";
import Header from "@/components/Header";
import DogFooter from "@/components/dog/DogFooter";
import CategoryCard from "@/components/portfolio/CategoryCard";
import { CATEGORIES } from "@/lib/portfolio";

const title = "Portfolio — Chamberí 54";
const description =
  "Joyería, piezas para el hogar y decoración, hechas a mano en nuestro taller de Chamberí, Madrid.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/portfolio",
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

export default function PortfolioPage() {
  return (
    <>
      <Header />
      <main>
        <section className="py-24">
          <div className="mx-auto max-w-[1180px] px-8">
            <div className="mb-14 text-center">
              <span className="eyebrow-badge mb-5 bg-paper-dim font-mono text-[11px] tracking-[0.14em] text-verdigris-dark uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-clay" />
                Chamberí 54 — Portfolio
              </span>
              <h1 className="heading-hero max-w-[640px] mx-auto font-display font-[450] tracking-[-0.01em]">
                Nuestras piezas, por categoría.
              </h1>
              <p className="mt-5 mx-auto max-w-[520px] text-[17px] text-ink-soft">
                Joyería, piezas para el hogar y decoración, modeladas y
                esmaltadas a mano en nuestro taller de Chamberí.
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
