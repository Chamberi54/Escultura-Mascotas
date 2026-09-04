import Image from "next/image";

export type GalleryPiece = {
  numero: string;
  descripcion: string;
  src?: string;
};

// Cuando tengáis piezas reales fotografiadas, sustituye estas rutas por
// las vuestras en /public/gallery/mascotas.
const PIEZAS: GalleryPiece[] = [
  {
    numero: "Sentado",
    descripcion: "Acabado texturizado en tonos cobre",
    src: "/gallery/mascotas/pieza-01-airedale-sentado.png",
  },
  {
    numero: "Sentado",
    descripcion: "Patinado verde oliva, con jersey de punto",
    src: "/gallery/mascotas/pieza-02-chihuahua-sentado.png",
  },
  {
    numero: "Tumbado",
    descripcion: "Esmaltado en tonos tierra y burdeos",
    src: "/gallery/mascotas/pieza-03-terrier-tumbado.png",
  },
  {
    numero: "De pie",
    descripcion: "Acabado en cerámica blanca craquelada",
    src: "/gallery/mascotas/pieza-04-liondog-depie.png",
  },
  {
    numero: "Sentado",
    descripcion: "Esmaltado marrón brillante, pechera blanca",
    src: "/gallery/mascotas/pieza-05-boxer-sentado.png",
  },
  {
    numero: "Tumbado",
    descripcion: "Gres sin esmaltar, estilo naturalista",
    src: "/gallery/mascotas/pieza-07-wolf-tumbado.png",
  },
];

function PawIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={1.3} className="h-10 w-10">
      <circle cx={22} cy={22} r={5} />
      <circle cx={34} cy={17} r={5} />
      <circle cx={45} cy={24} r={4.5} />
      <path d="M33 30c-9 0-15 6-15 13a8 8 0 0016 2c1 4 5 6 9 5a8 8 0 004-13c-3-5-8-7-14-7z" />
    </svg>
  );
}

export default function DogGallery() {
  return (
    <section className="section py-24" id="galeria">
      <div className="mx-auto max-w-[1180px] px-8">
        <div className="reveal mb-14 flex flex-wrap items-end justify-between gap-8">
          <div>
            <span className="mb-3.5 block font-mono text-[11px] tracking-[0.14em] text-verdigris-dark uppercase">
              Esculturas ya realizadas
            </span>
            <h2 className="max-w-[560px] font-display text-[30px] font-[450] md:text-[42px]">
              Cada mascota, una pieza distinta.
            </h2>
          </div>
          <p className="max-w-[340px] text-[15px] text-ink-soft">
            Ejemplos de posturas y acabados posibles para tu escultura. Cada
            pieza real se modela una sola vez y queda numerada.
          </p>
        </div>

        <div className="reveal grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PIEZAS.map((pieza) => (
            <div key={pieza.src ?? pieza.descripcion} className="border border-line bg-paper">
              <div className="relative flex aspect-square items-center justify-center bg-paper-dim text-verdigris-dark/50">
                {pieza.src ? (
                  <Image
                    src={pieza.src}
                    alt={`${pieza.numero} — ${pieza.descripcion}`}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <PawIcon />
                )}
                <span className="absolute top-3 right-3 rounded-full border border-gold bg-paper/90 px-2.5 py-1 font-mono text-[10.5px] text-gold">
                  {pieza.numero}
                </span>
              </div>
              <p className="px-5 py-4 text-[13.5px] text-ink-soft">{pieza.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
