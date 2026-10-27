"use client";

import { useState } from "react";
import Image from "next/image";

const NAV_LINKS = [
  { href: "/mascotas-personalizadas", label: "Mascotas personalizadas" },
  { href: "/arte-personalizado", label: "Arte personalizado" },
  { href: "/eventos-empresa", label: "Eventos de empresa" },
  { href: "/mascotas-personalizadas#contacto", label: "Contacto" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md">
      <nav className="mx-auto flex h-[76px] max-w-[1180px] items-center justify-between gap-4 px-4 sm:px-8">
        <a href="/" className="block shrink-0" onClick={() => setOpen(false)}>
          <Image
            src="/logo/logo-negro.png"
            alt="Chamberí 54"
            width={140}
            height={70}
            className="h-[28px] w-auto sm:h-[34px]"
            priority
          />
        </a>

        <div className="hidden items-center gap-9 text-[14.5px] font-medium sm:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="group relative py-1">
              {link.label}
              <span className="absolute bottom-0 left-0 h-px w-0 bg-ink transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <button
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-[5px] sm:hidden"
        >
          <span
            className={`h-px w-5 bg-ink transition-transform duration-200 ${open ? "translate-y-[6px] rotate-45" : ""}`}
          />
          <span className={`h-px w-5 bg-ink transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
          <span
            className={`h-px w-5 bg-ink transition-transform duration-200 ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-paper px-4 pt-2 pb-4 sm:hidden">
          <div className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-line/60 py-4 text-[16px] font-medium text-ink last:border-none"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
