import { NextResponse } from "next/server";
import { getResend, STUDIO_FROM_EMAIL, STUDIO_ORDER_EMAIL } from "@/lib/resend";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const nombre = String(body.nombre ?? "").trim();
  const email = String(body.email ?? "").trim();
  const telefono = String(body.telefono ?? "").trim();
  const descripcion = String(body.descripcion ?? "").trim();

  if (!nombre || !email || !descripcion) {
    return NextResponse.json(
      { error: "Faltan campos obligatorios (nombre, email o descripción)." },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "El email no es válido." }, { status: 400 });
  }

  try {
    const resend = getResend();

    await resend.emails.send({
      from: STUDIO_FROM_EMAIL,
      to: STUDIO_ORDER_EMAIL,
      replyTo: email,
      subject: `Nueva idea personalizada — ${nombre}`,
      text: [
        `Nombre: ${nombre}`,
        `Email: ${email}`,
        `Teléfono: ${telefono || "sin especificar"}`,
        "",
        "Descripción de la idea:",
        descripcion,
      ].join("\n"),
    });

    await resend.emails.send({
      from: STUDIO_FROM_EMAIL,
      to: email,
      subject: "Hemos recibido tu idea — Chamberí 54",
      text: [
        `Hola ${nombre},`,
        "",
        "Hemos recibido la descripción de la idea. Nos pondremos en contacto en menos de 48 horas para hablar sobre la pieza y el presupuesto.",
        "",
        "Gracias por pensar en Chamberí 54 para hacerla realidad.",
      ].join("\n"),
    });
  } catch (error) {
    console.error("Error enviando la idea personalizada", error);
    return NextResponse.json(
      { error: "No hemos podido enviar la idea. Inténtalo de nuevo en unos minutos." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
