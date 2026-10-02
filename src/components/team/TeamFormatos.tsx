const FORMATOS = [
  {
    title: "En la oficina",
    description:
      "Llevamos todo lo necesario a la oficina: arcilla, pinturas, herramientas y delantales desechables. Solo hace falta una sala con mesas. Las piezas se cuecen en nuestro horno y se entregan en la propia oficina.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={1.3}>
        <rect x={10} y={14} width={44} height={36} rx={2} />
        <path d="M10 26h44M22 14v-4h20v4" />
        <path d="M20 36h8M20 44h16" />
      </svg>
    ),
  },
  {
    title: "En nuestro taller",
    description:
      "La experiencia completa en nuestro espacio del barrio de Chamberí (Madrid), rodeados de nuestras piezas, herramientas y el ambiente del estudio.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={1.3}>
        <path d="M10 28L32 10l22 18" />
        <path d="M14 26v26h36V26" />
        <path d="M26 52V36h12v16" />
      </svg>
    ),
  },
];

export default function TeamFormatos() {
  return (
    <section className="border-t border-line py-24" id="formatos">
      <div className="mx-auto max-w-[1180px] px-8">
        <div className="reveal mb-14">
          <span className="eyebrow-badge mb-3.5 bg-paper-dim font-mono text-[11px] tracking-[0.14em] text-verdigris-dark uppercase">
            Dos formatos
          </span>
          <h2 className="heading-section max-w-[600px] font-display font-[450]">
            Dos formas de hacerlo: en la oficina, o en el taller.
          </h2>
        </div>

        <div className="reveal grid grid-cols-1 gap-6 md:grid-cols-2">
          {FORMATOS.map((formato) => (
            <div
              key={formato.title}
              className="shadow-soft border border-line bg-paper px-8 pt-10 pb-9"
            >
              <div className="mb-6.5 h-[48px] w-[48px] text-verdigris-dark">
                {formato.icon}
              </div>
              <h3 className="mb-2.5 text-[21px] font-[450]">{formato.title}</h3>
              <p className="text-[14.5px] text-ink-soft">{formato.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
