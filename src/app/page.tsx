import type { Metadata } from "next";
import Header from "@/components/Header";
import RevealObserver from "@/components/RevealObserver";
import DogHero from "@/components/dog/DogHero";
import SobreNosotros from "@/components/dog/SobreNosotros";
import DogProceso from "@/components/dog/DogProceso";
import DogPedido from "@/components/dog/DogPedido";
import DogGallery from "@/components/dog/DogGallery";
import DogContacto from "@/components/dog/DogContacto";
import DogFooter from "@/components/dog/DogFooter";

export const metadata: Metadata = {
  title: "Esculturas de mascotas hechas a mano — Chamberí 54",
  description:
    "Envíanos las fotos de tu mascota y modelamos a mano su escultura: elige la postura, tumbado, sentado o de pie, y recíbela en casa.",
};

export default async function Home({
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
        <DogHero />
        <SobreNosotros />
        <DogProceso />
        <DogPedido />
        <DogGallery />
        <DogContacto />
      </main>
      <DogFooter />
    </>
  );
}
