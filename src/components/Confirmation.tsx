import { useState } from "react";
import { DEFAULT_DAUGHTER_NAME, MINIMUM_OFFER_USD, OFFER_CATEGORIES } from "../config/offer";
import { formatUsd } from "../lib/currency";
import { grandTotal, selectedLines } from "../lib/offerMath";
import type { OfferState } from "../lib/persistence";
import { formatOfferSummary } from "../lib/summaryText";

interface ConfirmationProps {
  offer: OfferState;
  onEdit: () => void;
}

export default function Confirmation({ offer, onEdit }: ConfirmationProps) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const total = grandTotal(offer.quantities);
  const lines = selectedLines(offer.quantities);

  async function copySummary() {
    const text = formatOfferSummary(offer);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setCopyError(false);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopyError(true);
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:pt-14">
      <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-gold">
        Offer recorded
      </p>
      <h1 className="mt-2 text-center font-display text-4xl leading-tight text-ink sm:text-5xl">
        Thank you for your offer
      </h1>
      <p className="mx-auto mt-3 max-w-lg text-center text-base leading-relaxed text-ink-soft">
        This summary is ready to copy and send to the family. Nothing has been charged or purchased.
      </p>

      <section className="mt-8 rounded-2xl border border-rule bg-paper p-5 shadow-sm sm:p-7">
        <p className="text-sm text-ink-soft">
          For <span className="font-medium text-ink">{offer.daughterName.trim() || DEFAULT_DAUGHTER_NAME}</span>
          {offer.suitorName.trim() ? (
            <>
              {" "}
              · From <span className="font-medium text-ink">{offer.suitorName.trim()}</span>
            </>
          ) : null}
        </p>
        <p className="mt-4 font-display text-4xl text-ink">{formatUsd(total)}</p>
        <p className="mt-1 text-sm text-forest">Meets the {formatUsd(MINIMUM_OFFER_USD)} minimum</p>

        {OFFER_CATEGORIES.map((category) => {
          const categoryLines = lines.filter((line) => line.item.category === category.id);
          if (categoryLines.length === 0) return null;
          return (
            <div key={category.id} className="mt-6">
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                {category.title}
              </h2>
              <ul className="mt-2 divide-y divide-rule/80">
                {categoryLines.map((line) => (
                  <li key={line.item.id} className="flex justify-between gap-4 py-2 text-sm">
                    <span>
                      {line.quantity} × {line.item.name}
                      <span className="block text-ink-soft">
                        {formatUsd(line.item.unitPriceUsd)} {line.item.unitLabel}
                      </span>
                    </span>
                    <span className="shrink-0 tabular-nums font-medium">
                      {formatUsd(line.lineTotalUsd)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}

        {offer.message.trim() ? (
          <blockquote className="mt-6 border-l-2 border-gold-soft pl-4 text-sm italic leading-relaxed text-ink-soft">
            {offer.message.trim()}
          </blockquote>
        ) : null}
      </section>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => void copySummary()}
          className="inline-flex flex-1 items-center justify-center rounded-full bg-burgundy px-5 py-3 text-sm font-semibold text-white transition hover:bg-burgundy-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy"
        >
          {copied ? "Copied" : "Copy summary"}
        </button>
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex flex-1 items-center justify-center rounded-full border border-rule bg-paper px-5 py-3 text-sm font-semibold text-ink transition hover:border-gold hover:bg-gold-soft/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy"
        >
          Edit offer
        </button>
      </div>
      {copyError ? (
        <p className="mt-3 text-sm text-burgundy" role="status">
          Copying was blocked by the browser. Select and copy the summary manually.
        </p>
      ) : (
        copied && (
          <p className="mt-3 text-sm text-forest" role="status">
            Summary copied. You can paste it into a text or email.
          </p>
        )
      )}
    </main>
  );
}
