import type { Metadata } from "next";
import Header from "@/components/Header";
import DogFooter from "@/components/dog/DogFooter";
import RevealObserver from "@/components/RevealObserver";
import LetrasBuilder from "@/components/letras/LetrasBuilder";

const title = "Letras personalizadas de cerámica — Chamberí 54";
const description =
  "Escribe tu palabra, elige el color de cada letra y encarga tus letras de cerámica hechas a mano en nuestro taller de Chamberí, Madrid.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/letras-personalizadas",
    siteName: "Chamberí 54",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/portfolio/letras/conjunto-letras.jpg",
        width: 1400,
        height: 933,
        alt: "Letras de cerámica personalizadas — Chamberí 54",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/portfolio/letras/conjunto-letras.jpg"],
  },
};

export default async function LetrasPersonalizadasPage({
  searchParams,
}: {
  searchParams: Promise<{ estado?: string }>;
}) {
  const { estado } = await searchParams;

  return (
    <>
      <RevealObserver />
      <Header />
      <main>
        {estado === "cancelado" && (
          <div className="border-b border-line bg-paper-dim px-8 py-3 text-center text-[14px] text-ink-soft">
            Has cancelado el pago. Tu pedido no se ha completado — puedes
            volver a intentarlo cuando quieras.
          </div>
        )}
        <section className="py-20">
          <div className="mx-auto max-w-[1180px] px-8">
            <div className="mt-2 mb-14 text-center">
              <span className="eyebrow-badge mb-5 bg-paper-dim font-mono text-[11px] tracking-[0.14em] text-verdigris-dark uppercase">
                Chamberí 54
              </span>
              <h1 className="heading-hero font-display font-[450] tracking-[-0.01em]">
                Letras personalizadas
              </h1>
              <p className="mt-5 mx-auto max-w-[560px] text-[17px] text-ink-soft">
                Letras de cerámica hechas a mano, esmaltadas en el color que
                elijas. El detalle perfecto para decorar una pared, un mueble
                o regalar un nombre.
              </p>
            </div>

            <LetrasBuilder />
          </div>
        </section>
      </main>
      <DogFooter />
    </>
  );
}
