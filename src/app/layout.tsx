import type { Metadata } from "next";
import Script from "next/script";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: "variable",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.chamberi54.com";
const title = "Chamberí 54 — Esculturas de mascotas hechas a mano";
const description =
  "Envíanos las fotos de tu mascota y modelamos a mano su escultura, en el barrio de Chamberí, Madrid.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "escultura de mascotas",
    "escultura personalizada",
    "regalo mascota",
    "escultura de perro",
    "taller Chamberí Madrid",
  ],
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Chamberí 54",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/gallery/mascotas/pieza-01-airedale-sentado.png",
        width: 1024,
        height: 1024,
        alt: "Escultura de mascota hecha a mano — Chamberí 54",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/gallery/mascotas/pieza-01-airedale-sentado.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${inter.variable} ${plexMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-paper text-ink font-sans antialiased">
        {children}
        <Script
          src="https://news.google.com/swg/js/v1/publisher.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
