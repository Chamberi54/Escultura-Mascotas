import Image from "next/image";
import TactileButton from "./dog/TactileButton";

const NAV_LINKS = [
  { href: "/team-building", label: "Team building" },
  { href: "/#contacto", label: "Contacto" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md">
      <nav className="mx-auto flex h-[76px] max-w-[1180px] items-center justify-between gap-4 px-4 sm:px-8">
        <a href="/" className="block shrink-0">
          <Image
            src="/logo/logo-negro.png"
            alt="Chamberí 54"
            width={140}
            height={70}
            className="h-[28px] w-auto sm:h-[34px]"
            priority
          />
        </a>

        <div className="flex items-center gap-4 text-[13px] font-medium sm:gap-9 sm:text-[14.5px]">
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
          <TactileButton
            href="/#pedido"
            label="Encargar mi escultura"
            padding="10px 20px"
            rounded={100}
            base={{ color: "#0097B2", depth: 4 }}
            colors={{ fill: "#1F2420", textColor: "#F7F4EE" }}
            font={{ fontFamily: "var(--font-inter)", fontSize: "13.5px", fontWeight: 500 }}
          />
        </div>
      </nav>
    </header>
  );
}
