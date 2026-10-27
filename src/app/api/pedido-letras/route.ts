import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { DOG_SHIPPING_OPTIONS } from "@/lib/pricing";
import { findLetraColor, LETRA_PRICE_EUR, normalizeLetraWord } from "@/lib/letras";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const { nombre, email, telefono, palabra, colores, acepta } = (body ?? {}) as Record<
    string,
    unknown
  >;

  const nombreStr = String(nombre ?? "").trim();
  const emailStr = String(email ?? "").trim();
  const telefonoStr = String(telefono ?? "").trim();
  const palabraStr = normalizeLetraWord(String(palabra ?? ""));
  const coloresArr = Array.isArray(colores) ? colores.map((c) => String(c)) : [];
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
  if (!palabraStr) {
    return NextResponse.json(
      { error: "Escribe una palabra válida (solo letras, sin espacios ni números)." },
      { status: 400 },
    );
  }
  if (coloresArr.length !== palabraStr.length || coloresArr.some((c) => !findLetraColor(c))) {
    return NextResponse.json(
      { error: "Elige un color para cada letra de la palabra." },
      { status: 400 },
    );
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const description = [...palabraStr]
    .map((char, i) => `${char}: ${findLetraColor(coloresArr[i])?.label ?? coloresArr[i]}`)
    .join(", ");

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: emailStr,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `Letras de cerámica — "${palabraStr}"`,
              description,
            },
            unit_amount: Math.round(LETRA_PRICE_EUR * 100),
          },
          quantity: palabraStr.length,
        },
      ],
      shipping_address_collection: { allowed_countries: ["ES"] },
      shipping_options: DOG_SHIPPING_OPTIONS.map((option) => ({
        shipping_rate_data: {
          type: "fixed_amount" as const,
          fixed_amount: { amount: Math.round(option.amountEur * 100), currency: "eur" },
          display_name: option.label,
        },
      })),
      metadata: {
        tipo: "letras",
        nombre: nombreStr,
        telefono: telefonoStr,
        palabra: palabraStr,
        colores: coloresArr.join("|"),
      },
      success_url: `${siteUrl}/gracias?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/letras-personalizadas?estado=cancelado`,
    });

    return NextResponse.json({ ok: true, url: session.url });
  } catch (error) {
    console.error("Error creando la sesión de Stripe para letras", error);
    return NextResponse.json(
      {
        error:
          "No hemos podido abrir la pasarela de pago. Inténtalo de nuevo en unos minutos.",
      },
      { status: 502 },
    );
  }
}
