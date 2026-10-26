import Link from "next/link";

export default function BackLink() {
  return (
    <Link
      href="/nuestras-obras"
      className="font-mono text-xs tracking-[0.1em] text-ink-soft uppercase transition-colors hover:text-ink"
    >
      ← Nuestras obras
    </Link>
  );
}
