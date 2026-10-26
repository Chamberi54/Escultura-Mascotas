import Image from "next/image";
import Link from "next/link";

export default function ChoiceCard({
  href,
  title,
  description,
  image,
}: {
  href: string;
  title: string;
  description: string;
  image: string;
}) {
  return (
    <Link href={href} className="group block">
      <div className="shadow-soft relative aspect-[4/3] overflow-hidden rounded-sm border border-line">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 90vw, 480px"
        />
      </div>
      <div className="mt-5 text-center">
        <h2 className="font-display text-[22px] font-[450] text-ink group-hover:text-verdigris-dark">
          {title}
        </h2>
        <p className="mt-1.5 text-[14px] text-ink-soft">{description}</p>
      </div>
    </Link>
  );
}
