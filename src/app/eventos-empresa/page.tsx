import type { Metadata } from "next";
import Header from "@/components/Header";
import RevealObserver from "@/components/RevealObserver";
import DogFooter from "@/components/dog/DogFooter";
import TeamHero from "@/components/team/TeamHero";
import TeamFormatos from "@/components/team/TeamFormatos";
import TeamProceso from "@/components/team/TeamProceso";
import TeamFormulario from "@/components/team/TeamFormulario";

const title = "Eventos de empresa — Taller de cerámica para equipos | Chamberí 54";
const description =
  "Un taller de cerámica para eventos de empresa: cada propuesta se adapta al equipo para crear una experiencia de grupo única. Se puede celebrar en la oficina o en nuestro taller de Chamberí, Madrid.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "eventos de empresa Madrid",
    "team building Madrid",
    "taller de cerámica para empresas",
    "actividad para equipos Madrid",
    "team building cerámica",
  ],
  openGraph: {
    title,
    description,
    url: "/eventos-empresa",
    siteName: "Chamberí 54",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/eventos-empresa/taller-equipo.jpeg",
        width: 1400,
        height: 2489,
        alt: "Equipo pintando sus figuras de cerámica personalizadas en un taller de Chamberí 54",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/eventos-empresa/taller-equipo.jpeg"],
  },
};

export default function EventosEmpresaPage() {
  return (
    <>
      <RevealObserver />
      <Header />
      <main>
        <TeamHero />
        <TeamFormatos />
        <TeamProceso />
        <TeamFormulario />
      </main>
      <DogFooter />
    </>
  );
}
