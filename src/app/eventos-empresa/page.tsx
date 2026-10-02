import type { Metadata } from "next";
import Header from "@/components/Header";
import RevealObserver from "@/components/RevealObserver";
import DogFooter from "@/components/dog/DogFooter";
import TeamHero from "@/components/team/TeamHero";
import TeamFormatos from "@/components/team/TeamFormatos";
import TeamProceso from "@/components/team/TeamProceso";
import TeamFormulario from "@/components/team/TeamFormulario";

export const metadata: Metadata = {
  title: "Eventos de empresa — Taller de cerámica para equipos | Chamberí 54",
  description:
    "Un taller de cerámica para eventos de empresa: adaptamos una propuesta a la medida de vuestro equipo para vivir una experiencia de grupo única. Lo llevamos a vuestra oficina o lo vivís en nuestro taller de Chamberí, Madrid.",
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
