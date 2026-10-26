import type { Metadata } from "next";
import Header from "@/components/Header";
import DogFooter from "@/components/dog/DogFooter";
import PortfolioBook from "@/components/portfolio/PortfolioBook";

const title = "Portfolio — Chamberí 54";
const description =
  "Un recorrido pieza a pieza por las esculturas de mascotas hechas a mano en nuestro taller de Chamberí, Madrid.";

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

export default function PortfolioPage() {
  return (
    <>
      <Header />
      <main>
        <PortfolioBook />
      </main>
      <DogFooter />
    </>
  );
}
