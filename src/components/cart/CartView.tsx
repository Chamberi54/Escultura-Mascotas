"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import TactileButton from "@/components/dog/TactileButton";
import { useCart } from "@/components/cart/CartContext";
import { LETRA_PRICE_EUR, letraImageSrc } from "@/lib/letras";
import { LETRAS_POLICY_CLAUSES, ORDER_POLICY_ACCEPT_TEXT } from "@/lib/policy";

const fieldLabel =
  "mb-2 block font-mono text-[10.5px] tracking-[0.08em] text-verdigris-dark uppercase";
const fieldInput =
  "w-full border-0 border-b border-line bg-transparent px-0.5 py-2.5 text-[15px] text-ink placeholder:text-ink-soft/40 focus:border-gold focus:outline-none";

type Status = "idle" | "submitting" | "error";

export default function CartView() {
  const { items, removeItem, totalEur } = useCart();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [aceptaPolitica, setAceptaPolitica] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (items.length === 0) {
      setErrorMsg("Tu carrito está vacío.");
      return;
    }
    if (!aceptaPolitica) {
      setErrorMsg("Debes aceptar la política de encargo y devoluciones para continuar.");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/pedido-letras", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          email,
          telefono,
          acepta: true,
          items: items.map((item) => ({ palabra: item.palabra, colores: item.colores })),
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Algo ha ido mal. Inténtalo de nuevo.");
      }
      window.location.href = data.url;
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Algo ha ido mal. Inténtalo de nuevo.");
    }
  }

  if (items.length === 0) {
    return (
      <div className="reveal rounded-sm border border-line bg-paper-dim p-10 text-center">
        <h2 className="mb-3 font-display text-[22px] font-[450]">Tu carrito está vacío</h2>
        <p className="mb-6 text-sm text-ink-soft">
          Personaliza tus letras de cerámica y añádelas al carrito para
          pedirlas.
        </p>
        <Link
          href="/letras-personalizadas"
          className="inline-block rounded-sm border border-ink px-5 py-2.5 text-[14px] font-medium text-ink hover:bg-ink hover:text-paper"
        >
          Ir a Letras personalizadas
        </Link>
      </div>
    );
  }

  return (
    <div className="reveal grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_1fr]">
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 rounded-sm border border-line bg-paper p-5"
          >
            <div className="flex flex-1 flex-wrap gap-1">
              {[...item.palabra].map((char, i) => (
                <div key={i} className="relative h-9 w-9 shrink-0">
                  <Image
                    src={letraImageSrc(char, item.colores[i])}
                    alt={char}
                    fill
                    className="object-contain"
                    sizes="36px"
                  />
                </div>
              ))}
            </div>
            <div className="text-right">
              <p className="font-display text-[15px]">{item.palabra}</p>
              <p className="text-xs text-ink-soft">
                {item.palabra.length} letras · {item.palabra.length * LETRA_PRICE_EUR} €
              </p>
            </div>
            <button
              type="button"
              onClick={() => removeItem(item.id)}
              aria-label={`Quitar "${item.palabra}" del carrito`}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[18px] text-ink-soft hover:bg-paper-dim hover:text-ink"
            >
              ×
            </button>
          </div>
        ))}

        <div className="flex items-center justify-between rounded-sm border border-line bg-paper-dim px-5 py-4">
          <span className="font-mono text-[10.5px] tracking-[0.08em] text-verdigris-dark uppercase">
            Subtotal
          </span>
          <span className="font-display text-[20px] font-[450]">{totalEur} €</span>
        </div>
        <p className="text-xs text-ink-soft">
          Los gastos de envío se calculan en el siguiente paso del pago.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="h-fit rounded-sm border border-line bg-paper p-8 sm:p-10">
        <h2 className="mb-6 font-display text-[22px] font-[450]">Completa tu pedido</h2>

        <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="nombre" className={fieldLabel}>
              Nombre
            </label>
            <input
              id="nombre"
              type="text"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Tu nombre"
              className={fieldInput}
            />
          </div>
          <div>
            <label htmlFor="email" className={fieldLabel}>
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tucorreo@ejemplo.com"
              className={fieldInput}
            />
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="telefono" className={fieldLabel}>
            Teléfono
          </label>
          <input
            id="telefono"
            type="tel"
            required
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="600 000 000"
            className={fieldInput}
          />
        </div>

        <div className="mb-6">
          <span className={fieldLabel}>Política de encargo y devoluciones</span>
          <ul className="mb-3 list-none space-y-2 rounded-sm border border-line bg-paper-dim p-4 text-xs text-ink-soft">
            {LETRAS_POLICY_CLAUSES.map((clause) => (
              <li key={clause} className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-clay" />
                {clause}
              </li>
            ))}
          </ul>
          <label className="flex cursor-pointer items-start gap-2.5 text-[13.5px] text-ink-soft">
            <input
              type="checkbox"
              required
              checked={aceptaPolitica}
              onChange={(e) => setAceptaPolitica(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 accent-ink"
            />
            {ORDER_POLICY_ACCEPT_TEXT}
          </label>
        </div>

        {errorMsg && <p className="mb-5 text-sm text-clay">{errorMsg}</p>}

        <TactileButton
          type="submit"
          fullWidth
          disabled={status === "submitting"}
          label={status === "submitting" ? "Enviando..." : `Pagar — ${totalEur} €`}
          padding="15px 28px"
          rounded={100}
          base={{ color: "#076876", depth: 5 }}
          colors={{ fill: "#0097B2", textColor: "#F7F4EE" }}
          font={{ fontFamily: "var(--font-inter)", fontSize: "15px", fontWeight: 500 }}
        />
      </form>
    </div>
  );
}
