import Image from "next/image";
import type { PortfolioPiece } from "@/lib/portfolio";

export default function PieceGrid({
  pieces,
  className = "",
}: {
  pieces: PortfolioPiece[];
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap justify-center gap-5 ${className}`}>
      {pieces.map((piece) => (
        <div
          key={piece.image}
          className="group w-[calc((100%-20px)/2)] sm:w-[calc((100%-40px)/3)] lg:w-[calc((100%-60px)/4)]"
        >
          <div className="shadow-soft relative aspect-square overflow-hidden rounded-sm border border-line">
            <Image
              src={piece.image}
              alt={piece.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
            />
          </div>
          <p className="mt-2.5 text-center text-[13px] text-ink-soft">{piece.title}</p>
        </div>
      ))}
    </div>
  );
}
