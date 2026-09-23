export default function DogContacto() {
  return (
    <section
      className="relative overflow-hidden border-t border-line bg-paper-dim py-20"
      id="contacto"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "url('/patterns/chamberi-patron-terracota.png')",
          backgroundSize: "220px",
          backgroundRepeat: "repeat",
        }}
      />
      <div className="reveal relative mx-auto max-w-[640px] px-8 text-center">
        <span className="mb-3.5 block font-mono text-[11px] tracking-[0.14em] text-verdigris-dark uppercase">
          ¿Tienes dudas?
        </span>
        <h2 className="heading-section-sm mb-4 font-display font-[450]">
          Escríbenos antes de encargar tu escultura
        </h2>
        <p className="mb-8 text-[15px] text-ink-soft">
          Si quieres preguntarnos algo sobre plazos, materiales o el tamaño de
          tu mascota antes de enviar las fotos, mándanos un correo y te
          respondemos personalmente.
        </p>
        <a
          href="mailto:chamberi54store@gmail.com?subject=Consulta%20escultura%20de%20mascota"
          className="inline-block rounded-sm border border-ink px-7 py-[15px] text-[14.5px] font-medium transition-colors hover:bg-ink hover:text-paper"
        >
          Escribir a chamberi54store@gmail.com
        </a>
      </div>
    </section>
  );
}
