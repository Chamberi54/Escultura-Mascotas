export type LetraColor = { id: string; label: string; hex: string };

export const LETRA_COLORS: LetraColor[] = [
  { id: "blanco", label: "Blanco", hex: "#f0ece3" },
  { id: "beige", label: "Beige", hex: "#d6b99c" },
  { id: "amarillo", label: "Amarillo", hex: "#f4b91f" },
  { id: "rojo", label: "Rojo", hex: "#df1529" },
  { id: "rosa", label: "Rosa", hex: "#e9a3a5" },
  { id: "celeste", label: "Celeste", hex: "#9fc6e9" },
  { id: "azul", label: "Azul", hex: "#103d85" },
  { id: "verde_agua", label: "Verde agua", hex: "#a6ccb9" },
  { id: "verde", label: "Verde", hex: "#245f4c" },
  { id: "terracota", label: "Terracota", hex: "#bd552c" },
  { id: "gris", label: "Gris", hex: "#a3a3a3" },
  { id: "lila", label: "Lila", hex: "#c99be7" },
  { id: "morado", label: "Morado", hex: "#542478" },
  { id: "violeta", label: "Violeta", hex: "#a16dd3" },
  { id: "negro", label: "Negro", hex: "#151515" },
];

export const DEFAULT_LETRA_COLOR = "blanco";
export const LETRA_PRICE_EUR = 9;
export const MAX_LETRA_LENGTH = 14;

export function findLetraColor(id: string): LetraColor | undefined {
  return LETRA_COLORS.find((color) => color.id === id);
}

export function isValidLetraColor(id: string): boolean {
  return LETRA_COLORS.some((color) => color.id === id);
}

export function normalizeLetraWord(input: string): string {
  return input
    .toUpperCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^A-Z]/g, "")
    .slice(0, MAX_LETRA_LENGTH);
}

export function letraImageSrc(letter: string, colorId: string): string {
  return `/letras/${colorId}/${letter}.png`;
}

export type LetraCartItem = { palabra: string; colores: string[] };

// Codifica cada color como un único carácter (índice en LETRA_COLORS, en base 36)
// para poder guardar un pedido completo dentro de la metadata de Stripe, sin
// depender de un almacenamiento externo (Vercel Blob) para esta pasarela.
const COLOR_CODE_CHARS = "0123456789abcdefghijklmnopqrstuvwxyz";

function encodeLetraColors(colores: string[]): string {
  return colores
    .map((id) => {
      const idx = LETRA_COLORS.findIndex((c) => c.id === id);
      return COLOR_CODE_CHARS[idx] ?? "0";
    })
    .join("");
}

function decodeLetraColors(code: string): string[] {
  return [...code].map((char) => {
    const idx = COLOR_CODE_CHARS.indexOf(char);
    return LETRA_COLORS[idx]?.id ?? DEFAULT_LETRA_COLOR;
  });
}

export function encodeLetraItems(items: LetraCartItem[]): string {
  return items.map((item) => `${item.palabra}:${encodeLetraColors(item.colores)}`).join(";");
}

export function decodeLetraItems(raw: string): LetraCartItem[] {
  return raw
    .split(";")
    .map((entry) => {
      const [palabra, code] = entry.split(":");
      if (!palabra || !code || code.length !== palabra.length) return null;
      return { palabra, colores: decodeLetraColors(code) };
    })
    .filter((item): item is LetraCartItem => item !== null);
}
