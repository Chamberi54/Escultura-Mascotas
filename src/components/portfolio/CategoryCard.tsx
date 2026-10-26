import Image from "next/image";
import Link from "next/link";
import type { PortfolioCategory } from "@/lib/portfolio";

export default function CategoryCard({ category }: { category: PortfolioCategory }) {
  return (
    <Link href={`/portfolio/${category.slug}`} className="group block">
      <div className="shadow-soft relative aspect-[4/3] overflow-hidden rounded-sm border border-line">
        <Image
          src={category.image}
          alt={category.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 90vw, 380px"
        />
      </div>
      <div className="mt-5 text-center">
        <h2 className="font-display text-[22px] font-[450] text-ink group-hover:text-verdigris-dark">
          {category.title}
        </h2>
        <p className="mt-1.5 text-[14px] text-ink-soft">{category.description}</p>
        <p className="mt-1 font-mono text-[11px] tracking-[0.1em] text-verdigris-dark uppercase">
          {category.count} piezas
        </p>
      </div>
    </Link>
  );
}
