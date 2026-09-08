import { getResend, STUDIO_FROM_EMAIL, STUDIO_ORDER_EMAIL } from "@/lib/resend";
import { DELIVERY_TIME_TEXT } from "@/lib/policy";
import type { SizeTier } from "@/lib/pricing";

export type OrderAttachment = { filename: string; content: Buffer };

export type OrderDetails = {
  nombre: string;
  email: string;
  telefono: string;
  postura: string;
  descripcion: string;
  aceptadoEn: string;
  sizeTier: SizeTier;
};

export async function sendOrderNotification(
  order: OrderDetails,
  attachments: OrderAttachment[],
  paid: boolean,
) {
  const { nombre, email, telefono, postura, descripcion, aceptadoEn, sizeTier } = order;
  const priceLabel =
    sizeTier.priceEur != null ? `${sizeTier.priceEur} € + gastos de envío` : "A consultar";
  const resend = getResend();

  await resend.emails.send({
    from: STUDIO_FROM_EMAIL,
    to: STUDIO_ORDER_EMAIL,
    replyTo: email,
    subject: `${paid ? "Pedido pagado" : "Solicitud de presupuesto"} — escultura de mascota (${nombre})`,
    text: [
      `Nombre: ${nombre}`,
      `Email: ${email}`,
      `Teléfono: ${telefono}`,
      `Tamaño: ${sizeTier.label} (${priceLabel})`,
      `Postura: ${postura}`,
      `Pago: ${paid ? "Confirmado" : "No aplica (presupuesto a medida)"}`,
      `Política de encargo y devoluciones aceptada: Sí (${aceptadoEn || "sin fecha registrada"})`,
      "",
      "Descripción del cliente:",
      descripcion || "(sin descripción)",
    ].join("\n"),
    attachments,
  });

  const customerBody = paid
    ? [
        `Hola ${nombre},`,
        "",
        "Hemos recibido tu pago y las fotos de tu mascota. Nuestro escultor va a estudiarlas para empezar a dar forma a tu pieza.",
        "",
        `Tamaño: ${sizeTier.label} (${priceLabel})`,
        `Postura: ${postura}`,
        "",
        DELIVERY_TIME_TEXT,
        "",
        "Gracias por confiar en Chamberí 54.",
      ]
    : [
        `Hola ${nombre},`,
        "",
        "Hemos recibido tus fotos y los detalles de tu solicitud. Nuestro equipo va a revisarlas para preparar tu presupuesto.",
        "",
        `Tamaño: ${sizeTier.label} (${priceLabel})`,
        `Postura: ${postura}`,
        "",
        "Como es una pieza de mayor tamaño, te enviaremos un presupuesto a medida en menos de 48 horas.",
        "",
        "Gracias por confiar en Chamberí 54.",
      ];

  await resend.emails.send({
    from: STUDIO_FROM_EMAIL,
    to: email,
    subject: paid
      ? "Hemos recibido tu pago y las fotos de tu mascota — Chamberí 54"
      : "Hemos recibido las fotos de tu mascota — Chamberí 54",
    text: customerBody.join("\n"),
  });
}
