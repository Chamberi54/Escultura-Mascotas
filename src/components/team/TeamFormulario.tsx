"use client";

import { useState } from "react";
import TactileButton from "@/components/dog/TactileButton";

const INCLUYE = [
  "Presentación de la actividad",
  "Materiales: arcilla refractaria, herramientas de modelar, pinceles, pintura cerámica, esmalte y delantal desechable",
  "Dos cocciones (bizcocho a 1000°C y alta temperatura a 1230°C)",
  "Entrega de las piezas terminadas",
];

const FORMATOS = ["En vuestra oficina", "En nuestro taller"] as const;

const fieldLabel =
  "mb-2 block font-mono text-[10.5px] tracking-[0.08em] text-verdigris-dark uppercase";
const fieldInput =
  "w-full border-0 border-b border-line bg-transparent px-0.5 py-2.5 text-[15px] text-ink placeholder:text-ink-soft/40 focus:border-gold focus:outline-none";

type Status = "idle" | "submitting" | "success" | "error";

export default function TeamFormulario() {
  const [empresa, setEmpresa] = useState("");
  const [contacto, setContacto] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [participantes, setParticipantes] = useState("");
  const [formato, setFormato] = useState<string>(FORMATOS[0]);
  const [fecha, setFecha] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    setStatus("submitting");

    try {
      const res = await fetch("/api/eventos-empresa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          empresa,
          contacto,
          email,
          telefono,
          participantes,
          formato,
          fecha,
          mensaje,
        }),
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

  return (
    <section className="border-t border-line bg-paper-dim py-24" id="solicitar">
      <div className="mx-auto max-w-[1180px] px-8">
        <div className="reveal mb-14">
          <span className="eyebrow-badge mb-3.5 bg-paper font-mono text-[11px] tracking-[0.14em] text-verdigris-dark uppercase">
            Información y disponibilidad
          </span>
          <h2 className="heading-section max-w-[560px] font-display font-[450]">
            Organiza el taller de tu equipo.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-[70px] md:grid-cols-2">
          <div className="reveal">
            <div className="mb-8">
              <span className="mb-1 block font-mono text-[10.5px] tracking-[0.08em] text-verdigris-dark uppercase">
                Duración
              </span>
              <span className="font-display text-[22px] font-[450]">2–3 horas</span>
              <p className="mt-3 text-[13.5px] text-ink-soft">
                El precio varía según la actividad, desde 40 € por persona.
              </p>
            </div>
            <span className={fieldLabel}>Incluye</span>
            <ul className="space-y-3">
              {INCLUYE.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] text-ink-soft">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {status === "success" ? (
            <div className="reveal rounded-sm border border-line bg-paper p-10 text-center">
              <h3 className="mb-3 font-display text-[23px] font-[450]">
                ¡Gracias! Hemos recibido vuestra solicitud.
              </h3>
              <p className="text-[15px] text-ink-soft">
                Os contactaremos en menos de 48 horas para confirmar fecha,
                formato y presupuesto final.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="reveal rounded-sm border border-line bg-paper p-10">
              <h3 className="mb-2 text-[23px] font-[450]">Solicita más información</h3>
              <p className="mb-7.5 text-sm text-ink-soft">
                Cuéntanos sobre vuestro equipo y os proponemos una actividad,
                fecha y presupuesto a medida.
              </p>

              <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="empresa" className={fieldLabel}>
                    Empresa
                  </label>
                  <input
                    id="empresa"
                    type="text"
                    required
                    value={empresa}
                    onChange={(e) => setEmpresa(e.target.value)}
                    placeholder="Nombre de la empresa"
                    className={fieldInput}
                  />
                </div>
                <div>
                  <label htmlFor="contacto" className={fieldLabel}>
                    Persona de contacto
                  </label>
                  <input
                    id="contacto"
                    type="text"
                    required
                    value={contacto}
                    onChange={(e) => setContacto(e.target.value)}
                    placeholder="Tu nombre"
                    className={fieldInput}
                  />
                </div>
              </div>

              <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
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
                    placeholder="tucorreo@empresa.com"
                    className={fieldInput}
                  />
                </div>
                <div>
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
              </div>

              <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="participantes" className={fieldLabel}>
                    Nº de participantes
                  </label>
                  <input
                    id="participantes"
                    type="number"
                    min={1}
                    required
                    value={participantes}
                    onChange={(e) => setParticipantes(e.target.value)}
                    placeholder="12"
                    className={fieldInput}
                  />
                </div>
                <div>
                  <label htmlFor="fecha" className={fieldLabel}>
                    Fecha aproximada
                  </label>
                  <input
                    id="fecha"
                    type="date"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    className={fieldInput}
                  />
                </div>
              </div>

              <div className="mb-6">
                <span className={fieldLabel}>Formato</span>
                <div className="flex flex-wrap items-start gap-4">
                  {FORMATOS.map((f) => {
                    const isSelected = formato === f;
                    return (
                      <TactileButton
                        key={f}
                        label={f}
                        padding="10px 20px"
                        rounded={100}
                        base={{ color: isSelected ? "#0097B2" : "#D9D4C7", depth: 4 }}
                        colors={
                          isSelected
                            ? { fill: "#1F2420", textColor: "#F7F4EE" }
                            : { fill: "#F7F4EE", textColor: "#1F2420" }
                        }
                        font={{ fontFamily: "var(--font-inter)", fontSize: "13.5px", fontWeight: 500 }}
                        onClick={() => setFormato(f)}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="mensaje" className={fieldLabel}>
                  Cuéntanos algo más (opcional)
                </label>
                <textarea
                  id="mensaje"
                  rows={3}
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  placeholder="Ocasión, horario preferido, alguna necesidad especial..."
                  className={fieldInput}
                />
              </div>

              <p className="mb-5 text-[13.5px] text-ink-soft">
                El precio puede variar según la actividad elegida, desde 40 €
                por persona.
              </p>

              {errorMsg && <p className="mb-5 text-sm text-clay">{errorMsg}</p>}

              <TactileButton
                type="submit"
                fullWidth
                disabled={status === "submitting"}
                label={status === "submitting" ? "Enviando..." : "Solicitar más información"}
                padding="15px 28px"
                rounded={100}
                base={{ color: "#9E4624", depth: 5 }}
                colors={{ fill: "#1F2420", textColor: "#F7F4EE" }}
                font={{ fontFamily: "var(--font-inter)", fontSize: "15px", fontWeight: 500 }}
              />
              <p className="mt-4 text-center text-xs text-ink-soft">
                Sin compromiso. Os confirmamos disponibilidad por email.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
