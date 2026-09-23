"use client";

import { useEffect, useMemo, useState } from "react";
import { DOG_POSES, DOG_SIZE_TIERS, findSizeTier } from "@/lib/pricing";
import TactileButton from "./TactileButton";
import {
  DELIVERY_TIME_TEXT,
  ORDER_POLICY_ACCEPT_TEXT,
  ORDER_POLICY_CLAUSES,
} from "@/lib/policy";

const MAX_FILES = 5;

const fieldLabel =
  "mb-2 block font-mono text-[10.5px] tracking-[0.08em] text-verdigris-dark uppercase";
const fieldInput =
  "w-full border-0 border-b border-line bg-transparent px-0.5 py-2.5 text-[15px] text-ink placeholder:text-ink-soft/40 focus:border-gold focus:outline-none";

type Status = "idle" | "submitting" | "consulta" | "error";

export default function DogOrderForm() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [tamano, setTamano] = useState(DOG_SIZE_TIERS[0].id);
  const [postura, setPostura] = useState<string>(DOG_POSES[0]);
  const [descripcion, setDescripcion] = useState("");
  const [fotos, setFotos] = useState<File[]>([]);
  const [aceptaPolitica, setAceptaPolitica] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const sizeTier = findSizeTier(tamano);

  const previews = useMemo(
    () => fotos.map((file) => ({ file, url: URL.createObjectURL(file) })),
    [fotos],
  );

  useEffect(() => {
    return () => {
      previews.forEach((p) => URL.revokeObjectURL(p.url));
    };
  }, [previews]);

  function handleFiles(newFiles: FileList | null) {
    if (!newFiles) return;
    setErrorMsg("");
    setFotos((current) => {
      const combined = [...current, ...Array.from(newFiles)];
      if (combined.length > MAX_FILES) {
        setErrorMsg(`Puedes adjuntar como máximo ${MAX_FILES} fotos.`);
        return combined.slice(0, MAX_FILES);
      }
      return combined;
    });
  }

  function removeFoto(index: number) {
    setFotos((current) => current.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (fotos.length === 0) {
      setErrorMsg("Añade al menos una foto de tu mascota (frontal y de perfil, si puedes).");
      return;
    }
    if (!aceptaPolitica) {
      setErrorMsg("Debes aceptar la política de encargo y devoluciones para continuar.");
      return;
    }

    setStatus("submitting");

    const formData = new FormData();
    formData.set("nombre", nombre);
    formData.set("email", email);
    formData.set("telefono", telefono);
    formData.set("tamano", tamano);
    formData.set("postura", postura);
    formData.set("descripcion", descripcion);
    formData.set("acepta", "true");
    formData.set("aceptadoEn", new Date().toISOString());
    fotos.forEach((file) => formData.append("fotos", file));

    try {
      const res = await fetch("/api/pedido-mascota", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Algo ha ido mal. Inténtalo de nuevo.");
      }

      if (data.mode === "pago" && data.url) {
        window.location.href = data.url;
        return;
      }

      setStatus("consulta");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Algo ha ido mal. Inténtalo de nuevo.");
    }
  }

  if (status === "consulta") {
    return (
      <div className="reveal rounded-sm border border-line bg-paper-dim p-10 text-center">
        <h3 className="mb-3 font-display text-[23px] font-[450]">
          ¡Gracias! Hemos recibido tus fotos.
        </h3>
        <p className="text-[15px] text-ink-soft">
          Como tu mascota entra en el tamaño más grande, te enviaremos un
          presupuesto a medida por email en menos de 48 horas.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="reveal rounded-sm border border-line bg-paper p-10">
      <h3 className="mb-2 text-[23px] font-[450]">Encarga la escultura de tu mascota</h3>
      <p className="mb-2 text-sm text-ink-soft">
        Rellena los datos, sube las fotos y elige la postura. El precio final
        depende del tamaño de tu mascota.
      </p>
      <p className="mb-7.5 font-mono text-[11.5px] tracking-[0.02em] text-verdigris-dark">
        {DELIVERY_TIME_TEXT}
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

      <div className="mb-5">
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

      <div className="mb-5">
        <label htmlFor="tamano" className={fieldLabel}>
          Tamaño de tu mascota (largo, de pecho a cola)
        </label>
        <select
          id="tamano"
          value={tamano}
          onChange={(e) => setTamano(e.target.value)}
          className={fieldInput}
        >
          {DOG_SIZE_TIERS.map((tier) => (
            <option key={tier.id} value={tier.id}>
              {tier.label} — {tier.priceEur != null ? `${tier.priceEur} €` : "a consultar"}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <span className={fieldLabel}>Postura</span>
        <div className="flex flex-wrap items-start gap-4">
          {DOG_POSES.map((pose) => {
            const isSelected = postura === pose;
            return (
              <TactileButton
                key={pose}
                label={pose}
                padding="10px 20px"
                rounded={100}
                base={{ color: isSelected ? "#0097B2" : "#D9D4C7", depth: 4 }}
                colors={
                  isSelected
                    ? { fill: "#1F2420", textColor: "#F7F4EE" }
                    : { fill: "#F7F4EE", textColor: "#1F2420" }
                }
                font={{ fontFamily: "var(--font-inter)", fontSize: "13.5px", fontWeight: 500 }}
                onClick={() => setPostura(pose)}
              />
            );
          })}
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="fotos" className={fieldLabel}>
          Fotos de tu mascota (frontal, de perfil — cuantas más, mejor)
        </label>
        <input
          id="fotos"
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          className="block w-full text-sm text-ink-soft file:mr-4 file:rounded-sm file:border file:border-ink file:bg-transparent file:px-4 file:py-2 file:text-[13.5px] file:text-ink hover:file:bg-ink hover:file:text-paper"
        />
        {previews.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-3">
            {previews.map((p, i) => (
              <div key={p.url} className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element -- transient blob: preview URL, not an optimizable asset */}
                <img
                  src={p.url}
                  alt={`Foto ${i + 1} de tu mascota`}
                  className="h-20 w-20 rounded-sm border border-line object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeFoto(i)}
                  aria-label="Quitar foto"
                  className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[11px] text-paper"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="descripcion" className={fieldLabel}>
          Cuéntanos cómo es tu mascota
        </label>
        <textarea
          id="descripcion"
          rows={3}
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Su carácter, algún detalle o cicatriz que no queramos perdernos..."
          className={fieldInput}
        />
      </div>

      <div className="mb-6">
        <span className={fieldLabel}>Política de encargo y devoluciones</span>
        <ul className="mb-3 list-none space-y-2 rounded-sm border border-line bg-paper-dim p-4 text-xs text-ink-soft">
          {ORDER_POLICY_CLAUSES.map((clause) => (
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

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-sm bg-ink py-[15px] font-medium text-paper transition-colors hover:bg-verdigris-dark disabled:opacity-60"
      >
        {status === "submitting"
          ? "Enviando..."
          : sizeTier?.priceEur != null
            ? `Continuar al pago — ${sizeTier.priceEur} €`
            : "Solicitar presupuesto"}
      </button>
      <p className="mt-4 text-center text-xs text-ink-soft">
        Los gastos de envío se calculan en el siguiente paso del pago.
      </p>
    </form>
  );
}
