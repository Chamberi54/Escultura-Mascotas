import { Resend } from "resend";

let resendClient: Resend | null = null;

export function getResend(): Resend {
  if (!process.env.RESEND_API_KEY) {
    throw new Error(
      "Falta RESEND_API_KEY en las variables de entorno. Copia .env.local.example a .env.local y añade tu clave de Resend.",
    );
  }
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}

export const STUDIO_ORDER_EMAIL =
  process.env.STUDIO_ORDER_EMAIL ?? "pedidos@chamberi54.com";

export const STUDIO_FROM_EMAIL =
  process.env.STUDIO_FROM_EMAIL ?? "Chamberí 54 <pedidos@chamberi54.com>";
