import type { Metadata } from "next";
import Header from "@/components/Header";
import DogFooter from "@/components/dog/DogFooter";
import RevealObserver from "@/components/RevealObserver";
import CartView from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "Tu carrito — Chamberí 54",
  description: "Revisa tus letras de cerámica personalizadas y completa el pago.",
};

export default async function CarritoPage({
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
            Has cancelado el pago. Tu carrito sigue aquí — puedes volver a
            intentarlo cuando quieras.
          </div>
        )}
        <section className="py-20">
          <div className="mx-auto max-w-[1180px] px-8">
            <div className="mt-2 mb-14 text-center">
              <span className="eyebrow-badge mb-5 bg-paper-dim font-mono text-[11px] tracking-[0.14em] text-verdigris-dark uppercase">
                Chamberí 54
              </span>
              <h1 className="heading-hero font-display font-[450] tracking-[-0.01em]">
                Tu carrito
              </h1>
            </div>

            <CartView />
          </div>
        </section>
      </main>
      <DogFooter />
    </>
  );
}
