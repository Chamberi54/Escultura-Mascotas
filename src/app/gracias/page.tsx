import type { Metadata } from "next";
import Header from "@/components/Header";
import DogFooter from "@/components/dog/DogFooter";
import { getStripe } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Pedido confirmado — Chamberí 54",
};

async function getSessionSummary(sessionId: string | undefined) {
  if (!sessionId || !process.env.STRIPE_SECRET_KEY) return null;
  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId);
    return {
      email: session.customer_details?.email ?? session.customer_email ?? null,
      total: session.amount_total != null ? session.amount_total / 100 : null,
    };
  } catch {
    return null;
  }
}

export default async function GraciasPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  const summary = await getSessionSummary(session_id);

  return (
    <>
      <Header />
      <main>
        <section className="py-28">
          <div className="mx-auto max-w-[640px] px-8 text-center">
            <span className="mb-3.5 block font-mono text-[11px] tracking-[0.14em] text-verdigris-dark uppercase">
              Pedido confirmado
            </span>
            <h1 className="mb-5 font-display text-[32px] font-[450] md:text-[42px]">
              Gracias, hemos recibido tu pago
            </h1>
            <p className="mb-3 text-[16px] text-ink-soft">
              Nuestro escultor ya tiene las fotos de tu mascota y empezará a
              estudiar la pieza. Te escribiremos por email
              {summary?.email ? ` a ${summary.email}` : ""} con las
              novedades y el plazo de entrega.
            </p>
            {summary?.total != null && (
              <p className="text-[14px] text-ink-soft">
                Importe cobrado: {summary.total.toFixed(2)} €
              </p>
            )}
          </div>
        </section>
      </main>
      <DogFooter />
    </>
  );
}
