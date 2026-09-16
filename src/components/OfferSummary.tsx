import { MINIMUM_OFFER_USD } from "../config/offer";
import { formatUsd } from "../lib/currency";
import { meetsMinimum, progressToMinimum, remainingToMinimum } from "../lib/offerMath";

interface OfferSummaryProps {
  totalUsd: number;
  variant: "panel" | "bar";
  canSubmit: boolean;
  onSubmit: () => void;
}

export default function OfferSummary({ totalUsd, variant, canSubmit, onSubmit }: OfferSummaryProps) {
  const remaining = remainingToMinimum(totalUsd);
  const complete = meetsMinimum(totalUsd);
  const progress = progressToMinimum(totalUsd);

  const statusText = complete
    ? `Meets the ${formatUsd(MINIMUM_OFFER_USD)} minimum`
    : totalUsd === 0
      ? `Minimum contribution: ${formatUsd(MINIMUM_OFFER_USD)}`
      : `${formatUsd(remaining)} more to reach ${formatUsd(MINIMUM_OFFER_USD)}`;

  const submitNote = (
    <p className="text-center text-[11px] leading-snug text-ink-soft sm:text-xs">
      Love is patient. Love is kind. Love is roughly 10 Camels and 12 goats
    </p>
  );

  const submitButton = (
    <button
      type="button"
      disabled={!canSubmit}
      onClick={onSubmit}
      className="inline-flex w-full items-center justify-center rounded-full bg-burgundy px-5 py-3 text-sm font-semibold tracking-wide text-white transition hover:bg-burgundy-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy disabled:cursor-not-allowed disabled:bg-rule disabled:text-ink-soft"
    >
      Submit offer
    </button>
  );

  if (variant === "bar") {
    return (
      <div className="border-t border-rule bg-paper/95 px-4 py-3 shadow-[0_-8px_24px_rgba(36,30,24,0.08)] backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="font-display text-2xl leading-none text-ink">{formatUsd(totalUsd)}</p>
            <p className={`mt-1 truncate text-xs ${complete ? "text-forest" : "text-ink-soft"}`}>
              {statusText}
            </p>
            <div
              className="mt-2 h-1.5 overflow-hidden rounded-full bg-rule/80"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={MINIMUM_OFFER_USD}
              aria-valuenow={Math.min(totalUsd, MINIMUM_OFFER_USD)}
              aria-label="Progress toward the minimum contribution"
            >
              <div
                className={`h-full rounded-full transition-all ${complete ? "bg-forest" : "bg-gold"}`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <div className="w-40 shrink-0">{submitButton}</div>
        </div>
        <div className="mx-auto mt-2 max-w-3xl">{submitNote}</div>
        {!canSubmit && (
          <p className="mx-auto mt-1.5 max-w-3xl text-xs text-ink-soft">
            Offers below {formatUsd(MINIMUM_OFFER_USD)} cannot be submitted.
          </p>
        )}
      </div>
    );
  }

  return (
    <aside className="rounded-2xl border border-rule bg-paper p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Running total</p>
      <p className="mt-2 font-display text-4xl leading-none text-ink">{formatUsd(totalUsd)}</p>
      <p className="mt-2 text-sm tabular-nums text-ink-soft">
        {formatUsd(totalUsd)} / {formatUsd(MINIMUM_OFFER_USD)}
      </p>
      <div
        className="mt-4 h-2.5 overflow-hidden rounded-full bg-rule/80"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={MINIMUM_OFFER_USD}
        aria-valuenow={Math.min(totalUsd, MINIMUM_OFFER_USD)}
        aria-label="Progress toward the minimum contribution"
      >
        <div
          className={`h-full rounded-full transition-all ${complete ? "bg-forest" : "bg-gold"}`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <p
        className={`mt-3 rounded-xl px-3 py-2 text-sm ${
          complete ? "bg-forest-soft text-forest" : "bg-rose-soft text-burgundy"
        }`}
        role="status"
      >
        {complete ? "This offer meets the family minimum." : statusText}
      </p>
      <div className="mt-5">{submitButton}</div>
      <div className="mt-3">{submitNote}</div>
      {!canSubmit && (
        <p className="mt-2 text-xs leading-relaxed text-ink-soft">
          Add livestock or automobiles until the total reaches {formatUsd(MINIMUM_OFFER_USD)}.
        </p>
      )}
    </aside>
  );
}
