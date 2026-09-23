import PreferredSourceBadge from "./PreferredSourceBadge";

export default function DogFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-paper-dim pt-12 pb-8.5">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "url('/patterns/chamberi-patron-terracota.png')",
          backgroundSize: "220px",
          backgroundRepeat: "repeat",
        }}
      />
      <div className="relative mx-auto max-w-[1180px] px-8">
        <div className="pb-8 text-center">
          <h5 className="mb-4 font-mono text-[11px] tracking-[0.1em] text-gold uppercase">
            Visítanos
          </h5>
          <p className="mb-2.5 text-[14.5px] text-ink-soft">
            C/ García de Paredes, 54
            <br />
            28010 Madrid
          </p>
          <a
            href="https://www.instagram.com/chamberi_54"
            target="_blank"
            rel="noopener"
            className="inline-block py-1.5 text-[14.5px] text-ink-soft hover:text-ink"
          >
            Instagram @chamberi_54
          </a>
          <PreferredSourceBadge />
        </div>

        <div className="flex flex-wrap justify-between gap-2.5 border-t border-line pt-6.5 text-[12.5px] text-ink-soft">
          <span>© 2026 Chamberí 54. Todas las piezas son originales y numeradas.</span>
          <span>Hecho a mano en Madrid</span>
        </div>
      </div>
    </footer>
  );
}
