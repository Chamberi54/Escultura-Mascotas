import { NextResponse } from "next/server";
import { del } from "@vercel/blob";
import { getStripe } from "@/lib/stripe";
import { findSizeTier } from "@/lib/pricing";
import { sendOrderNotification } from "@/lib/notify";
import type Stripe from "stripe";

export const runtime = "nodejs";

type StoredOrderDetails = {
  nombre: string;
  email: string;
  telefono: string;
  postura: string;
  descripcion: string;
  aceptadoEn: string;
  tamanoId: string;
  fotos: { url: string; filename: string }[];
};

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    console.error("Webhook de Stripe sin firma o sin STRIPE_WEBHOOK_SECRET configurado");
    return NextResponse.json({ error: "Webhook no configurado." }, { status: 400 });
  }

  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (error) {
    console.error("Firma de webhook de Stripe inválida", error);
    return NextResponse.json({ error: "Firma inválida." }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const detallesUrl = session.metadata?.detallesUrl;
  if (!detallesUrl) {
    console.error("checkout.session.completed sin detallesUrl en metadata", session.id);
    return NextResponse.json({ received: true });
  }

  try {
    const detallesRes = await fetch(detallesUrl);
    if (!detallesRes.ok) {
      throw new Error(`No se pudieron leer los detalles del pedido (${detallesRes.status})`);
    }
    const detalles = (await detallesRes.json()) as StoredOrderDetails;

    const sizeTier = findSizeTier(detalles.tamanoId);
    if (!sizeTier) {
      throw new Error(`Tamaño de pedido desconocido: ${detalles.tamanoId}`);
    }

    const attachments = await Promise.all(
      detalles.fotos.map(async (foto) => {
        const res = await fetch(foto.url);
        if (!res.ok) {
          throw new Error(`No se pudo descargar la foto ${foto.url}`);
        }
        return { filename: foto.filename, content: Buffer.from(await res.arrayBuffer()) };
      }),
    );

    await sendOrderNotification(
      {
        nombre: detalles.nombre,
        email: session.customer_details?.email ?? detalles.email,
        telefono: detalles.telefono,
        postura: detalles.postura,
        descripcion: detalles.descripcion,
        aceptadoEn: detalles.aceptadoEn,
        sizeTier,
      },
      attachments,
      true,
    );

    await Promise.allSettled([
      del(detallesUrl),
      ...detalles.fotos.map((foto) => del(foto.url)),
    ]);
  } catch (error) {
    console.error("Error procesando checkout.session.completed", error);
    return NextResponse.json({ error: "Error procesando el pedido." }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
