export type SizeTier = {
  id: string;
  label: string;
  priceEur: number | null;
};

export const DOG_SIZE_TIERS: SizeTier[] = [
  {
    id: "hasta-15",
    label: "Hasta 15 cm de largo",
    priceEur: 120,
  },
  {
    id: "15-25",
    label: "De 15 a 25 cm de largo",
    priceEur: 200,
  },
  {
    id: "25-35",
    label: "De 25 a 35 cm de largo",
    priceEur: 300,
  },
  {
    id: "mas-35",
    label: "Más de 35 cm de largo",
    priceEur: null,
  },
];

export const DOG_POSES = ["Tumbado", "Sentado", "De pie"] as const;
export type DogPose = (typeof DOG_POSES)[number];

export type ShippingOption = {
  id: string;
  label: string;
  amountEur: number;
};

export const DOG_SHIPPING_OPTIONS: ShippingOption[] = [
  { id: "recogida", label: "Recogida en el taller (Chamberí, Madrid)", amountEur: 0 },
  { id: "envio-peninsula", label: "Envío a domicilio (Península)", amountEur: 9.9 },
];

export function findSizeTier(id: string): SizeTier | undefined {
  return DOG_SIZE_TIERS.find((tier) => tier.id === id);
}
