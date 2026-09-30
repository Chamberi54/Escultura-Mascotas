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

  const empresa = String(body.empresa ?? "").trim();
  const contacto = String(body.contacto ?? "").trim();
  const email = String(body.email ?? "").trim();
  const telefono = String(body.telefono ?? "").trim();
  const participantes = String(body.participantes ?? "").trim();
  const formato = String(body.formato ?? "").trim();
  const fecha = String(body.fecha ?? "").trim();
  const mensaje = String(body.mensaje ?? "").trim();

  if (!empresa || !contacto || !email || !telefono || !participantes || !formato) {
    return NextResponse.json(
      {
        error:
          "Faltan campos obligatorios (empresa, contacto, email, teléfono, participantes o formato).",
      },
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
      subject: `Nueva solicitud de team building — ${empresa}`,
      text: [
        `Empresa: ${empresa}`,
        `Persona de contacto: ${contacto}`,
        `Email: ${email}`,
        `Teléfono: ${telefono}`,
        `Número de participantes: ${participantes}`,
        `Formato: ${formato}`,
        `Fecha aproximada: ${fecha || "sin especificar"}`,
        "Precio: varía según la actividad, desde 40 €/persona.",
        "",
        "Mensaje:",
        mensaje || "(sin mensaje adicional)",
      ].join("\n"),
    });

    await resend.emails.send({
      from: STUDIO_FROM_EMAIL,
      to: email,
      subject: "Hemos recibido vuestra solicitud de team building — Chamberí 54",
      text: [
        `Hola ${contacto},`,
        "",
        "Hemos recibido la solicitud de vuestro taller de cerámica para equipos. Nos pondremos en contacto en menos de 48 horas para confirmar fecha, formato y presupuesto final.",
        "",
        `Formato: ${formato}`,
        `Participantes: ${participantes}`,
        "Precio: varía según la actividad, desde 40 €/persona.",
        "",
        "Gracias por pensar en Chamberí 54 para vuestro equipo.",
      ].join("\n"),
    });
  } catch (error) {
    console.error("Error enviando la solicitud de team building", error);
    return NextResponse.json(
      { error: "No hemos podido enviar tu solicitud. Inténtalo de nuevo en unos minutos." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
