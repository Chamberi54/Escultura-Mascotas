import type { Metadata } from "next";
import Header from "@/components/Header";
import DogFooter from "@/components/dog/DogFooter";
import ChoiceCard from "@/components/esculturas/ChoiceCard";

const title = "Esculturas personalizadas — Chamberí 54";
const description =
  "Esculturas de mascotas personalizadas a partir de una fotografía, o cualquier otra idea hecha realidad en cerámica, a mano en nuestro taller de Chamberí, Madrid.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/esculturas-personalizadas",
    siteName: "Chamberí 54",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/gallery/mascotas/pieza-01-airedale-sentado.png",
        width: 1024,
        height: 1024,
        alt: "Escultura de mascota hecha a mano — Chamberí 54",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/gallery/mascotas/pieza-01-airedale-sentado.png"],
  },
};

export default function EsculturasPersonalizadasPage() {
  return (
    <>
      <Header />
      <main>
        <section className="py-24">
          <div className="mx-auto max-w-[1180px] px-8">
            <div className="mb-14 text-center">
              <span className="eyebrow-badge mb-5 bg-paper-dim font-mono text-[11px] tracking-[0.14em] text-verdigris-dark uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-clay" />
                Chamberí 54
              </span>
              <h1 className="heading-hero mx-auto max-w-[640px] font-display font-[450] tracking-[-0.01em]">
                Esculturas personalizadas
              </h1>
              <p className="mt-5 mx-auto max-w-[520px] text-[17px] text-ink-soft">
                Dos formas de encargar una pieza única, modelada a mano en
                nuestro taller de Chamberí.
              </p>
            </div>

            <div className="mx-auto grid max-w-[880px] grid-cols-1 gap-10 sm:grid-cols-2">
              <ChoiceCard
                href="/"
                title="Mascotas personalizadas"
                description="Envía las fotos de tu mascota y la convertimos en una escultura única."
                image="/gallery/mascotas/pieza-01-airedale-sentado.png"
              />
              <ChoiceCard
                href="/esculturas-personalizadas/a-medida"
                title="Hagamos tu idea realidad"
                description="Cuéntanos tu idea y la modelamos en cerámica, a medida."
                image="/about/about-us.jpg"
              />
            </div>
          </div>
        </section>
      </main>
      <DogFooter />
    </>
  );
}
