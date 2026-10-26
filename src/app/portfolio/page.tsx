import type { Metadata } from "next";
import Header from "@/components/Header";
import DogFooter from "@/components/dog/DogFooter";
import PortfolioBook from "@/components/portfolio/PortfolioBook";

const title = "Portfolio — Chamberí 54";
const description =
  "Un recorrido pieza a pieza por nuestra joyería, piezas para el hogar y decoración, hechas a mano en nuestro taller de Chamberí, Madrid.";

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
        <PortfolioBook />
      </main>
      <DogFooter />
    </>
  );
}
