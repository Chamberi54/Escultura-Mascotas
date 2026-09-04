"use client";

import Image from "next/image";
import { useState } from "react";

const NAV_LINKS = [
  { href: "#proceso", label: "El proceso" },
  { href: "#pedido", label: "Encargar" },
  { href: "#galeria", label: "Galería" },
  { href: "#contacto", label: "Contacto" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md">
      <nav className="mx-auto flex h-[76px] max-w-[1180px] items-center justify-between px-8">
        <a href="/" className="block">
          <Image
            src="/logo/logo-negro.png"
            alt="Chamberí 54"
            width={140}
            height={70}
            className="h-[34px] w-auto"
            priority
          />
        </a>

        <div className="hidden gap-9 text-[14.5px] font-medium md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="group relative py-1"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 h-px w-0 bg-ink transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-5">
          <a
            href="#pedido"
            className="rounded-sm bg-ink px-5 py-2.5 text-[13.5px] font-medium text-paper transition-colors hover:bg-verdigris-dark"
          >
            Encargar mi escultura
          </a>
          <button
            aria-label="Abrir menú"
            onClick={() => setMenuOpen((v) => !v)}
            className="text-ink md:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              className="h-[22px] w-[22px]"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="absolute inset-x-0 top-[76px] flex flex-col gap-4 border-b border-line bg-paper px-8 py-6 md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-[14.5px] font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
