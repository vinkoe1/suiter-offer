import { useEffect, useMemo, useState, type FormEvent } from "react";
import BrandHeader from "./components/BrandHeader";
import Confirmation from "./components/Confirmation";
import ItemRow from "./components/ItemRow";
import OfferSummary from "./components/OfferSummary";
import SuitorNote from "./components/SuitorNote";
import {
  DEFAULT_DAUGHTER_NAME,
  MAX_NAME_LENGTH,
  MINIMUM_OFFER_USD,
  OFFER_CATEGORIES,
  OFFER_ITEMS,
} from "./config/offer";
import { formatUsd } from "./lib/currency";
import { grandTotal, meetsMinimum } from "./lib/offerMath";
import {
  loadInitialOffer,
  persistOffer,
  type OfferState,
} from "./lib/persistence";

export default function App() {
  const [offer, setOffer] = useState<OfferState>(() => loadInitialOffer());
  const [submitted, setSubmitted] = useState(false);
  const [submitHint, setSubmitHint] = useState(false);

  const total = useMemo(() => grandTotal(offer.quantities), [offer.quantities]);
  const canSubmit = meetsMinimum(total);

  useEffect(() => {
    persistOffer(offer);
  }, [offer]);

  function updateQuantity(id: string, quantity: number) {
    setOffer((current) => ({
      ...current,
      quantities: { ...current.quantities, [id]: quantity },
    }));
    setSubmitHint(false);
  }

  function handleSubmit(event?: FormEvent) {
    event?.preventDefault();
    if (!canSubmit) {
      setSubmitHint(true);
      return;
    }
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (submitted) {
    return (
      <div className="min-h-dvh">
        <Confirmation offer={offer} onEdit={() => setSubmitted(false)} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-dvh">
      <BrandHeader eyebrow="She's priceless. Here's the price." title="Marriage Permission Offer">
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
            Select livestock and classic automobiles to offer toward marriage permission for{" "}
            <label className="inline">
              <span className="sr-only">Name of the daughter</span>
              <input
                type="text"
                value={offer.daughterName}
                maxLength={MAX_NAME_LENGTH}
                onChange={(event) => {
                  setOffer((current) => ({
                    ...current,
                    daughterName: event.target.value,
                  }));
                }}
                onBlur={() => {
                  if (!offer.daughterName.trim()) {
                    setOffer((current) => ({
                      ...current,
                      daughterName: DEFAULT_DAUGHTER_NAME,
                    }));
                  }
                }}
                style={{ width: `${Math.max(12, offer.daughterName.length + 1)}ch` }}
                className="inline-block max-w-[min(40vw,16rem)] border-0 border-b border-gold bg-transparent px-0.5 text-center font-medium text-ink focus-visible:outline-none"
              />
            </label>
            . Unit values are fixed. The family asks for at least {formatUsd(MINIMUM_OFFER_USD)}.
        </p>
      </BrandHeader>

      <form
        onSubmit={handleSubmit}
        className="mx-auto grid max-w-6xl gap-6 px-4 pb-8 pt-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start lg:pb-16"
      >
        <div className="grid gap-6">
          {OFFER_CATEGORIES.map((category) => (
            <section key={category.id} className="rounded-2xl border border-rule bg-paper p-5 sm:p-6">
              <div className="border-b border-rule pb-3">
                <h2 className="font-display text-2xl text-ink">{category.title}</h2>
                <p className="mt-1 text-sm text-ink-soft">{category.subtitle}</p>
              </div>
              {OFFER_ITEMS.filter((item) => item.category === category.id).map((item) => (
                <ItemRow
                  key={item.id}
                  item={item}
                  quantity={offer.quantities[item.id] ?? 0}
                  onQuantityChange={(next) => updateQuantity(item.id, next)}
                />
              ))}
            </section>
          ))}

          <SuitorNote
            suitorName={offer.suitorName}
            message={offer.message}
            onSuitorNameChange={(suitorName) => setOffer((current) => ({ ...current, suitorName }))}
            onMessageChange={(message) => setOffer((current) => ({ ...current, message }))}
          />

          {submitHint && !canSubmit ? (
            <p className="text-sm text-burgundy" role="alert">
              This offer is below {formatUsd(MINIMUM_OFFER_USD)} and cannot be submitted yet.
            </p>
          ) : null}

          <div className="hidden lg:block">
            <Footer />
          </div>
        </div>

        <div className="hidden lg:sticky lg:top-6 lg:block">
          <OfferSummary
            variant="panel"
            totalUsd={total}
            canSubmit={canSubmit}
            onSubmit={() => handleSubmit()}
          />
        </div>
      </form>

      <div className="lg:hidden">
        <div className="px-4 pb-40">
          <Footer />
        </div>
        <div className="fixed inset-x-0 bottom-0 z-20 pb-[env(safe-area-inset-bottom)]">
          <OfferSummary
            variant="bar"
            totalUsd={total}
            canSubmit={canSubmit}
            onSubmit={() => handleSubmit()}
          />
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="py-4 text-center text-xs leading-relaxed text-ink-soft">
      Unit values are a one-time fair-market snapshot set by the family; not live market quotes.
    </footer>
  );
}
