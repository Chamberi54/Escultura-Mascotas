import Image from "next/image";

export default function SectionBanner({
  title,
  image,
  level = "h2",
}: {
  title: string;
  image: string;
  level?: "h1" | "h2";
}) {
  const Heading = level;
  return (
    <div className="mb-7 text-center">
      <div className="shadow-soft relative aspect-[3/2] w-full overflow-hidden rounded-sm border border-line sm:aspect-[21/9]">
        <Image
          src={image}
          alt={`Conjunto de piezas de ${title.toLowerCase()}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 90vw, 1120px"
        />
      </div>
      <Heading
        className={
          level === "h1"
            ? "heading-hero mt-6 font-display font-[450] tracking-[-0.01em]"
            : "heading-section-sm mt-6 font-display font-[450]"
        }
      >
        {title}
      </Heading>
    </div>
  );
}
