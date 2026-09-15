import { MAX_MESSAGE_LENGTH, MAX_NAME_LENGTH } from "../config/offer";

interface SuitorNoteProps {
  suitorName: string;
  message: string;
  onSuitorNameChange: (value: string) => void;
  onMessageChange: (value: string) => void;
}

export default function SuitorNote({
  suitorName,
  message,
  onSuitorNameChange,
  onMessageChange,
}: SuitorNoteProps) {
  return (
    <section className="rounded-2xl border border-rule bg-paper p-5 sm:p-6">
      <h2 className="font-display text-2xl text-ink">Your note</h2>
      <p className="mt-1 text-sm text-ink-soft">Optional. Included if you copy or share the offer.</p>
      <div className="mt-4 grid gap-4">
        <label className="grid gap-1.5 text-sm font-medium text-ink">
          Your name
          <input
            type="text"
            autoComplete="name"
            maxLength={MAX_NAME_LENGTH}
            value={suitorName}
            onChange={(event) => onSuitorNameChange(event.target.value)}
            placeholder="Name of the suitor"
            className="h-11 rounded-xl border border-rule bg-white/80 px-3 text-base font-normal text-ink placeholder:text-ink-soft/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy"
          />
        </label>
        <label className="grid gap-1.5 text-sm font-medium text-ink">
          Message
          <textarea
            rows={4}
            maxLength={MAX_MESSAGE_LENGTH}
            value={message}
            onChange={(event) => onMessageChange(event.target.value)}
            placeholder="A short word to the family, if you wish."
            className="resize-y rounded-xl border border-rule bg-white/80 px-3 py-2.5 text-base font-normal leading-relaxed text-ink placeholder:text-ink-soft/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy"
          />
          <span className="text-xs font-normal text-ink-soft">
            {message.length}/{MAX_MESSAGE_LENGTH}
          </span>
        </label>
      </div>
    </section>
  );
}
