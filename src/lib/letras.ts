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
