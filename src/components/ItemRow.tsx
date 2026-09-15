import type { OfferItem } from "../config/offer";
import { formatUsd } from "../lib/currency";
import ItemThumbnail from "./ItemThumbnail";
import QuantityStepper from "./QuantityStepper";

interface ItemRowProps {
  item: OfferItem;
  quantity: number;
  onQuantityChange: (next: number) => void;
}

export default function ItemRow({ item, quantity, onQuantityChange }: ItemRowProps) {
  const lineTotal = item.unitPriceUsd * quantity;
  const inputId = `qty-${item.id}`;

  return (
    <article className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 gap-y-3 border-b border-rule/80 py-4 last:border-b-0 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:gap-x-4">
      <ItemThumbnail item={item} />
      <div className="min-w-0">
        <label htmlFor={inputId} className="block font-medium leading-snug text-ink">
          {item.name}
        </label>
        <p className="mt-0.5 text-sm text-ink-soft">
          {formatUsd(item.unitPriceUsd)} {item.unitLabel}
        </p>
      </div>
      <div className="col-span-2 flex items-center justify-between gap-4 sm:col-span-1 sm:justify-end">
        <QuantityStepper
          id={inputId}
          label={item.name}
          value={quantity}
          onChange={onQuantityChange}
        />
        <p className="w-24 text-right text-sm tabular-nums text-ink-soft sm:w-28">
          <span className="sr-only">Line total: </span>
          <span className={quantity > 0 ? "font-semibold text-ink" : ""}>
            {quantity > 0 ? formatUsd(lineTotal) : "—"}
          </span>
        </p>
      </div>
    </article>
  );
}
