import type { Metadata } from "next";
import Header from "@/components/Header";
import RevealObserver from "@/components/RevealObserver";
import DogFooter from "@/components/dog/DogFooter";
import TeamHero from "@/components/team/TeamHero";
import TeamFormatos from "@/components/team/TeamFormatos";
import TeamProceso from "@/components/team/TeamProceso";
import TeamFormulario from "@/components/team/TeamFormulario";

export const metadata: Metadata = {
  title: "Team building — Taller de figuras personalizadas | Chamberí 54",
  description:
    "Un taller de cerámica para empresas: cada participante diseña y pinta su propia figura personalizada. Lo llevamos a vuestra oficina o lo vivís en nuestro taller de Chamberí, Madrid.",
};

export default function TeamBuildingPage() {
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
