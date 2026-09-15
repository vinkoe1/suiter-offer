import { MAX_ITEM_QUANTITY } from "../config/offer";

interface QuantityStepperProps {
  id: string;
  label: string;
  value: number;
  onChange: (next: number) => void;
}

export default function QuantityStepper({ id, label, value, onChange }: QuantityStepperProps) {
  const setClamped = (next: number) => {
    if (!Number.isFinite(next)) return;
    onChange(Math.min(MAX_ITEM_QUANTITY, Math.max(0, Math.floor(next))));
  };

  return (
    <div className="flex items-center gap-1.5" role="group" aria-label={`${label} quantity`}>
      <button
        type="button"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-rule bg-paper text-xl leading-none text-ink transition hover:border-gold hover:bg-gold-soft/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy disabled:cursor-not-allowed disabled:opacity-35"
        aria-label={`Decrease ${label}`}
        disabled={value <= 0}
        onClick={() => setClamped(value - 1)}
      >
        −
      </button>
      <input
        id={id}
        type="number"
        inputMode="numeric"
        min={0}
        max={MAX_ITEM_QUANTITY}
        value={value}
        onChange={(event) => {
          const raw = event.target.value;
          if (raw === "") {
            onChange(0);
            return;
          }
          setClamped(Number(raw));
        }}
        aria-label={`${label} quantity`}
        className="h-11 w-14 rounded-xl border border-rule bg-white/80 text-center text-base font-semibold tabular-nums text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy"
      />
      <button
        type="button"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-rule bg-paper text-xl leading-none text-ink transition hover:border-gold hover:bg-gold-soft/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy disabled:cursor-not-allowed disabled:opacity-35"
        aria-label={`Increase ${label}`}
        disabled={value >= MAX_ITEM_QUANTITY}
        onClick={() => setClamped(value + 1)}
      >
        +
      </button>
    </div>
  );
}
