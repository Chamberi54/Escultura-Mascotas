import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { getStripe } from "@/lib/stripe";
import { DOG_SHIPPING_OPTIONS } from "@/lib/pricing";
import { findLetraColor, LETRA_PRICE_EUR, normalizeLetraWord } from "@/lib/letras";
import type { LetrasOrderItem } from "@/lib/notify";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_ITEMS = 20;

function parseItem(raw: unknown): LetrasOrderItem | null {
  if (!raw || typeof raw !== "object") return null;
  const { palabra, colores } = raw as Record<string, unknown>;
  const palabraStr = normalizeLetraWord(String(palabra ?? ""));
  const coloresArr = Array.isArray(colores) ? colores.map((c) => String(c)) : [];
  if (!palabraStr) return null;
  if (coloresArr.length !== palabraStr.length) return null;
  if (coloresArr.some((c) => !findLetraColor(c))) return null;
  return { palabra: palabraStr, colores: coloresArr };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const { nombre, email, telefono, items, acepta } = (body ?? {}) as Record<string, unknown>;

  const nombreStr = String(nombre ?? "").trim();
  const emailStr = String(email ?? "").trim();
  const telefonoStr = String(telefono ?? "").trim();
  const aceptaBool = acepta === true;

  if (!nombreStr || !emailStr || !telefonoStr) {
    return NextResponse.json(
      { error: "Faltan campos obligatorios (nombre, email o teléfono)." },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(emailStr)) {
    return NextResponse.json({ error: "El email no es válido." }, { status: 400 });
  }
  if (!aceptaBool) {
    return NextResponse.json(
      { error: "Debes aceptar la política de encargo y devoluciones." },
      { status: 400 },
    );
  }
  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "Tu carrito está vacío." }, { status: 400 });
  }
  if (items.length > MAX_ITEMS) {
    return NextResponse.json(
      { error: `Puedes pedir como máximo ${MAX_ITEMS} palabras por pedido.` },
      { status: 400 },
    );
  }
  const parsedItems = items.map(parseItem);
  if (parsedItems.some((item) => item === null)) {
    return NextResponse.json(
      { error: "Alguna de las palabras del carrito no es válida." },
      { status: 400 },
    );
  }
  const validItems = parsedItems as LetrasOrderItem[];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  let detallesUrl: string;
  try {
    const detallesBlob = await put(
      `pedidos-letras/${Date.now()}-detalles.json`,
      JSON.stringify({ nombre: nombreStr, email: emailStr, telefono: telefonoStr, items: validItems }),
      { access: "public", addRandomSuffix: true, contentType: "application/json" },
    );
    detallesUrl = detallesBlob.url;
  } catch (error) {
    console.error("Error guardando los detalles del pedido de letras", error);
    return NextResponse.json(
      { error: "No hemos podido procesar tu pedido. Inténtalo de nuevo en unos minutos." },
      { status: 502 },
    );
  }

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: emailStr,
      line_items: validItems.map((item) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: `Letras de cerámica — "${item.palabra}"`,
            description: [...item.palabra]
              .map((char, i) => `${char}: ${findLetraColor(item.colores[i])?.label ?? item.colores[i]}`)
              .join(", "),
          },
          unit_amount: Math.round(LETRA_PRICE_EUR * 100),
        },
        quantity: item.palabra.length,
      })),
      shipping_address_collection: { allowed_countries: ["ES"] },
      shipping_options: DOG_SHIPPING_OPTIONS.map((option) => ({
        shipping_rate_data: {
          type: "fixed_amount" as const,
          fixed_amount: { amount: Math.round(option.amountEur * 100), currency: "eur" },
          display_name: option.label,
        },
      })),
      metadata: { tipo: "letras", detallesUrl },
      success_url: `${siteUrl}/gracias?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/carrito?estado=cancelado`,
    });

    return NextResponse.json({ ok: true, url: session.url });
  } catch (error) {
    console.error("Error creando la sesión de Stripe para letras", error);
    return NextResponse.json(
      {
        error: "No hemos podido abrir la pasarela de pago. Inténtalo de nuevo en unos minutos.",
      },
      { status: 502 },
    );
  }
}
