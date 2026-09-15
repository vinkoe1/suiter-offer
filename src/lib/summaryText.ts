import { DEFAULT_DAUGHTER_NAME, MINIMUM_OFFER_USD, OFFER_CATEGORIES } from "../config/offer";
import { formatUsd } from "./currency";
import { grandTotal, meetsMinimum, selectedLines } from "./offerMath";
import type { OfferState } from "./persistence";

export function formatOfferSummary(state: OfferState): string {
  const total = grandTotal(state.quantities);
  const lines = selectedLines(state.quantities);
  const sections = OFFER_CATEGORIES.map((category) => {
    const categoryLines = lines.filter((line) => line.item.category === category.id);
    if (categoryLines.length === 0) return null;
    const body = categoryLines
      .map((line) => {
        return `- ${line.quantity} × ${line.item.name} @ ${formatUsd(line.item.unitPriceUsd)} = ${formatUsd(line.lineTotalUsd)}`;
      })
      .join("\n");
    return `${category.title}\n${body}`;
  }).filter(Boolean);

  const parts = [
    "Marriage Permission Offer",
    `For: ${state.daughterName.trim() || DEFAULT_DAUGHTER_NAME}`,
    state.suitorName.trim() ? `From: ${state.suitorName.trim()}` : "From: (not given)",
    "",
    sections.length > 0 ? sections.join("\n\n") : "No items selected.",
    "",
    `Grand total: ${formatUsd(total)}`,
    meetsMinimum(total)
      ? `Status: Meets the ${formatUsd(MINIMUM_OFFER_USD)} minimum`
      : `Status: Below the ${formatUsd(MINIMUM_OFFER_USD)} minimum`,
  ];

  if (state.message.trim()) {
    parts.push("", "Message:", state.message.trim());
  }

  return parts.join("\n");
}
