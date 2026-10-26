"use client";

import { useState } from "react";
import TactileButton from "@/components/dog/TactileButton";

const fieldLabel =
  "mb-2 block font-mono text-[10.5px] tracking-[0.08em] text-verdigris-dark uppercase";
const fieldInput =
  "w-full border-0 border-b border-line bg-transparent px-0.5 py-2.5 text-[15px] text-ink placeholder:text-ink-soft/40 focus:border-gold focus:outline-none";

type Status = "idle" | "submitting" | "success" | "error";

export default function IdeaFormulario() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    setStatus("submitting");

    try {
      const res = await fetch("/api/idea-personalizada", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, telefono, descripcion }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Algo ha ido mal. Inténtalo de nuevo.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Algo ha ido mal. Inténtalo de nuevo.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-sm border border-line bg-paper p-10 text-center">
        <h3 className="mb-3 font-display text-[23px] font-[450]">
          ¡Gracias! Hemos recibido la idea.
        </h3>
        <p className="text-[15px] text-ink-soft">
          Nos pondremos en contacto en menos de 48 horas para hablar sobre la
          pieza y el presupuesto.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-sm border border-line bg-paper p-10">
      <h3 className="mb-2 text-[23px] font-[450]">Cuéntanos la idea</h3>
      <p className="mb-7.5 text-sm text-ink-soft">
        Con estos datos, se propone una pieza y un presupuesto a medida.
      </p>

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
            placeholder="Nombre y apellidos"
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
            placeholder="nombre@email.com"
            className={fieldInput}
          />
        </div>
      </div>

      <div className="mb-5">
        <label htmlFor="telefono" className={fieldLabel}>
          Teléfono (opcional)
        </label>
        <input
          id="telefono"
          type="tel"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          placeholder="600 000 000"
          className={fieldInput}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="descripcion" className={fieldLabel}>
          Descripción de la idea
        </label>
        <textarea
          id="descripcion"
          rows={4}
          required
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Qué pieza te gustaría, tamaño aproximado, referencias..."
          className={fieldInput}
        />
      </div>

      {errorMsg && <p className="mb-5 text-sm text-clay">{errorMsg}</p>}

      <TactileButton
        type="submit"
        fullWidth
        disabled={status === "submitting"}
        label={status === "submitting" ? "Enviando..." : "Enviar idea"}
        padding="15px 28px"
        rounded={100}
        base={{ color: "#9E4624", depth: 5 }}
        colors={{ fill: "#1F2420", textColor: "#F7F4EE" }}
        font={{ fontFamily: "var(--font-inter)", fontSize: "15px", fontWeight: 500 }}
      />
      <p className="mt-4 text-center text-xs text-ink-soft">
        Sin compromiso. Confirmación por email.
      </p>
    </form>
  );
}
