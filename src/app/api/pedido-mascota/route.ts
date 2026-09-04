import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getResend, STUDIO_FROM_EMAIL, STUDIO_ORDER_EMAIL } from "@/lib/resend";
import { DOG_SHIPPING_OPTIONS, findSizeTier } from "@/lib/pricing";
import { DELIVERY_TIME_TEXT } from "@/lib/policy";

export const runtime = "nodejs";

const MAX_FILES = 5;
const MAX_FILE_BYTES = 6 * 1024 * 1024;
const MAX_TOTAL_BYTES = 20 * 1024 * 1024;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const nombre = String(form.get("nombre") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const telefono = String(form.get("telefono") ?? "").trim();
  const tamanoId = String(form.get("tamano") ?? "").trim();
  const postura = String(form.get("postura") ?? "").trim();
  const descripcion = String(form.get("descripcion") ?? "").trim();
  const acepta = String(form.get("acepta") ?? "") === "true";
  const aceptadoEn = String(form.get("aceptadoEn") ?? "").trim();
  const fotos = form.getAll("fotos").filter((f): f is File => f instanceof File && f.size > 0);

  if (!nombre || !email || !telefono || !tamanoId || !postura) {
    return NextResponse.json(
      { error: "Faltan campos obligatorios (nombre, email, teléfono, tamaño o postura)." },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "El email no es válido." }, { status: 400 });
  }
  if (!acepta) {
    return NextResponse.json(
      { error: "Debes aceptar la política de encargo y devoluciones." },
      { status: 400 },
    );
  }
  const sizeTier = findSizeTier(tamanoId);
  if (!sizeTier) {
    return NextResponse.json({ error: "El tamaño seleccionado no es válido." }, { status: 400 });
  }
  if (fotos.length === 0) {
    return NextResponse.json(
      { error: "Añade al menos una foto de tu mascota." },
      { status: 400 },
    );
  }
  if (fotos.length > MAX_FILES) {
    return NextResponse.json(
      { error: `Puedes adjuntar como máximo ${MAX_FILES} fotos.` },
      { status: 400 },
    );
  }
  const totalBytes = fotos.reduce((sum, f) => sum + f.size, 0);
  if (fotos.some((f) => f.size > MAX_FILE_BYTES) || totalBytes > MAX_TOTAL_BYTES) {
    return NextResponse.json(
      { error: "Las fotos pesan demasiado. Reduce el tamaño o el número de imágenes e inténtalo de nuevo." },
      { status: 400 },
    );
  }

  const attachments = await Promise.all(
    fotos.map(async (file) => ({
      filename: file.name || "foto.jpg",
      content: Buffer.from(await file.arrayBuffer()),
    })),
  );

  const priceLabel =
    sizeTier.priceEur != null ? `${sizeTier.priceEur} € + gastos de envío` : "A consultar";

  try {
    const resend = getResend();

    await resend.emails.send({
      from: STUDIO_FROM_EMAIL,
      to: STUDIO_ORDER_EMAIL,
      replyTo: email,
      subject: `Nuevo pedido — escultura de mascota (${nombre})`,
      text: [
        `Nombre: ${nombre}`,
        `Email: ${email}`,
        `Teléfono: ${telefono}`,
        `Tamaño: ${sizeTier.label} (${priceLabel})`,
        `Postura: ${postura}`,
        `Política de encargo y devoluciones aceptada: Sí (${aceptadoEn || "sin fecha registrada"})`,
        "",
        "Descripción del cliente:",
        descripcion || "(sin descripción)",
      ].join("\n"),
      attachments,
    });

    await resend.emails.send({
      from: STUDIO_FROM_EMAIL,
      to: email,
      subject: "Hemos recibido las fotos de tu mascota — Chamberí 54",
      text: [
        `Hola ${nombre},`,
        "",
        "Hemos recibido tus fotos y los detalles de tu pedido. Nuestro escultor va a estudiarlas para empezar a dar forma a tu pieza.",
        "",
        `Tamaño: ${sizeTier.label} (${priceLabel})`,
        `Postura: ${postura}`,
        "",
        sizeTier.priceEur != null
          ? "En breve recibirás la confirmación del pago si aún no la has completado."
          : "Como es una pieza de mayor tamaño, te enviaremos un presupuesto a medida en menos de 48 horas.",
        "",
        DELIVERY_TIME_TEXT,
        "",
        "Gracias por confiar en Chamberí 54.",
      ].join("\n"),
    });
  } catch (error) {
    console.error("Error enviando el pedido por email", error);
    return NextResponse.json(
      { error: "No hemos podido enviar tu pedido. Inténtalo de nuevo en unos minutos." },
      { status: 502 },
    );
  }

  if (sizeTier.priceEur == null) {
    return NextResponse.json({ ok: true, mode: "consulta" as const });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `Escultura de tu mascota — ${sizeTier.label}`,
              description: `Postura: ${postura}`,
            },
            unit_amount: Math.round(sizeTier.priceEur * 100),
          },
          quantity: 1,
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
      metadata: { nombre, postura, tamano: sizeTier.id },
      success_url: `${siteUrl}/gracias?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/?estado=cancelado`,
    });

    return NextResponse.json({ ok: true, mode: "pago" as const, url: session.url });
  } catch (error) {
    console.error("Error creando la sesión de Stripe", error);
    return NextResponse.json(
      {
        error:
          "Hemos recibido tu pedido, pero no hemos podido abrir la pasarela de pago. Te contactaremos por email para completarlo.",
      },
      { status: 502 },
    );
  }
}
