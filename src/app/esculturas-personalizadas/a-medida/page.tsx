import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import DogFooter from "@/components/dog/DogFooter";
import IdeaFormulario from "@/components/esculturas/IdeaFormulario";

const title = "Hagamos tu idea realidad — Chamberí 54";
const description =
  "Cuéntanos tu idea y la modelamos en cerámica, a medida, en nuestro taller de Chamberí, Madrid.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/esculturas-personalizadas/a-medida",
    siteName: "Chamberí 54",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/about/about-us.jpg",
        width: 1200,
        height: 1200,
        alt: "El equipo de Chamberí 54 en su taller de Madrid",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/about/about-us.jpg"],
  },
};

export default function IdeaPersonalizadaPage() {
  return (
    <>
      <Header />
      <main>
        <section className="py-20">
          <div className="mx-auto max-w-[1180px] px-8">
            <Link
              href="/esculturas-personalizadas"
              className="font-mono text-xs tracking-[0.1em] text-ink-soft uppercase transition-colors hover:text-ink"
            >
              ← Esculturas personalizadas
            </Link>

            <div className="mt-10 grid grid-cols-1 items-start gap-16 md:grid-cols-2">
              <div>
                <span className="eyebrow-badge mb-5 bg-paper-dim font-mono text-[11px] tracking-[0.14em] text-verdigris-dark uppercase">
                  Chamberí 54
                </span>
                <h1 className="heading-hero font-display font-[450] tracking-[-0.01em]">
                  Hagamos tu idea realidad.
                </h1>
                <p className="mt-6 max-w-[460px] text-[17px] text-ink-soft">
                  Si hay una pieza que no encaja en mascotas, joyería, hogar o
                  decoración, se puede modelar igualmente a mano en el taller
                  de Chamberí. Con la descripción de la idea, se propone una
                  pieza y un presupuesto a medida.
                </p>
              </div>

              <IdeaFormulario />
            </div>
          </div>
        </section>
      </main>
      <DogFooter />
    </>
  );
}
