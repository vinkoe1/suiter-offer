import { MINIMUM_OFFER_USD, OFFER_ITEMS, type OfferItem } from "../config/offer";

export interface LineItem {
  item: OfferItem;
  quantity: number;
  lineTotalUsd: number;
}

export function lineTotal(item: OfferItem, quantity: number): number {
  return item.unitPriceUsd * quantity;
}

export function selectedLines(quantities: Record<string, number>): LineItem[] {
  return OFFER_ITEMS.map((item) => {
    const quantity = quantities[item.id] ?? 0;
    return {
      item,
      quantity,
      lineTotalUsd: lineTotal(item, quantity),
    };
  }).filter((line) => line.quantity > 0);
}

export function grandTotal(quantities: Record<string, number>): number {
  return OFFER_ITEMS.reduce((sum, item) => {
    return sum + lineTotal(item, quantities[item.id] ?? 0);
  }, 0);
}

export function remainingToMinimum(totalUsd: number): number {
  return Math.max(0, MINIMUM_OFFER_USD - totalUsd);
}

export function meetsMinimum(totalUsd: number): boolean {
  return totalUsd >= MINIMUM_OFFER_USD;
}

export function progressToMinimum(totalUsd: number): number {
  if (MINIMUM_OFFER_USD <= 0) return 100;
  return Math.min(100, (totalUsd / MINIMUM_OFFER_USD) * 100);
}
