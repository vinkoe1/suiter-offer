export const MINIMUM_OFFER_USD = 100_000;
export const DEFAULT_DAUGHTER_NAME = "my daughter";
export const MAX_ITEM_QUANTITY = 99;
export const MAX_NAME_LENGTH = 80;
export const MAX_MESSAGE_LENGTH = 400;
export const STORAGE_KEY = "suitor-offer-v1";

export type ItemCategory = "livestock" | "cars";

export interface OfferItem {
  id: string;
  name: string;
  category: ItemCategory;
  unitPriceUsd: number;
  unitLabel: string;
}

export interface OfferCategory {
  id: ItemCategory;
  title: string;
  subtitle: string;
}

export const OFFER_ITEMS: readonly OfferItem[] = [
  {
    id: "goat",
    name: "Goat",
    category: "livestock",
    unitPriceUsd: 250,
    unitLabel: "per head",
  },
  {
    id: "sheep",
    name: "Sheep",
    category: "livestock",
    unitPriceUsd: 275,
    unitLabel: "per head",
  },
  {
    id: "cattle",
    name: "Cattle",
    category: "livestock",
    unitPriceUsd: 3350,
    unitLabel: "per head",
  },
  {
    id: "horse",
    name: "Horse",
    category: "livestock",
    unitPriceUsd: 7700,
    unitLabel: "per head",
  },
  {
    id: "camel",
    name: "Camel",
    category: "livestock",
    unitPriceUsd: 6000,
    unitLabel: "per head",
  },
  {
    id: "cobra-replica",
    name: "Shelby Cobra replica (Factory Five)",
    category: "cars",
    unitPriceUsd: 55000,
    unitLabel: "each",
  },
  {
    id: "cobra-kit",
    name: "Shelby Cobra replica kit",
    category: "cars",
    unitPriceUsd: 25000,
    unitLabel: "each",
  },
  {
    id: "mustang-acode",
    name: "1966 Ford Mustang A-Code Fastback",
    category: "cars",
    unitPriceUsd: 40000,
    unitLabel: "each",
  },
  {
    id: "gt350",
    name: "GT350 Tribute Mustang",
    category: "cars",
    unitPriceUsd: 65000,
    unitLabel: "each",
  },
] as const;

export const OFFER_CATEGORIES: readonly OfferCategory[] = [
  {
    id: "livestock",
    title: "Livestock",
    subtitle: "Priced per head, one-time family snapshot",
  },
  {
    id: "cars",
    title: "Classic cars & kits",
    subtitle: "Priced each, values provided by the family",
  },
];

export function emptyQuantities(): Record<string, number> {
  return Object.fromEntries(OFFER_ITEMS.map((item) => [item.id, 0]));
}
