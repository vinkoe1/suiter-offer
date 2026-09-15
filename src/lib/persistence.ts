import {
  DEFAULT_DAUGHTER_NAME,
  MAX_ITEM_QUANTITY,
  MAX_MESSAGE_LENGTH,
  MAX_NAME_LENGTH,
  OFFER_ITEMS,
  STORAGE_KEY,
  emptyQuantities,
} from "../config/offer";

export interface OfferState {
  quantities: Record<string, number>;
  suitorName: string;
  message: string;
  daughterName: string;
}

export function defaultOfferState(): OfferState {
  return {
    quantities: emptyQuantities(),
    suitorName: "",
    message: "",
    daughterName: DEFAULT_DAUGHTER_NAME,
  };
}

function clampQuantity(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(MAX_ITEM_QUANTITY, Math.max(0, Math.floor(value)));
}

function clampText(value: string, max: number): string {
  return value.slice(0, max);
}

export function normalizeOfferState(partial: Partial<OfferState> | null | undefined): OfferState {
  const base = defaultOfferState();
  const quantities = emptyQuantities();

  if (partial?.quantities) {
    for (const item of OFFER_ITEMS) {
      quantities[item.id] = clampQuantity(Number(partial.quantities[item.id] ?? 0));
    }
  }

  return {
    quantities,
    suitorName: clampText(partial?.suitorName ?? base.suitorName, MAX_NAME_LENGTH),
    message: clampText(partial?.message ?? base.message, MAX_MESSAGE_LENGTH),
    daughterName: clampText(partial?.daughterName ?? base.daughterName, MAX_NAME_LENGTH),
  };
}

export function encodeOfferSearchParams(state: OfferState): URLSearchParams {
  const params = new URLSearchParams();
  const quantities = OFFER_ITEMS.map((item) => String(state.quantities[item.id] ?? 0));

  if (quantities.some((q) => q !== "0")) {
    params.set("q", quantities.join(","));
  }
  if (state.suitorName.trim()) {
    params.set("name", state.suitorName.trim());
  }
  if (state.message.trim()) {
    params.set("msg", state.message.trim());
  }
  if (state.daughterName.trim() && state.daughterName.trim() !== DEFAULT_DAUGHTER_NAME) {
    params.set("for", state.daughterName.trim());
  }

  return params;
}

export function parseOfferSearchParams(search: string): Partial<OfferState> | null {
  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  if (![...params.keys()].some((key) => ["q", "name", "msg", "for"].includes(key))) {
    return null;
  }

  const quantities = emptyQuantities();
  const rawQuantities = params.get("q");
  if (rawQuantities) {
    rawQuantities.split(",").forEach((value, index) => {
      const item = OFFER_ITEMS[index];
      if (item) {
        quantities[item.id] = clampQuantity(Number(value));
      }
    });
  }

  return {
    quantities,
    suitorName: params.get("name") ?? "",
    message: params.get("msg") ?? "",
    daughterName: params.get("for") ?? DEFAULT_DAUGHTER_NAME,
  };
}

export function loadStoredOffer(): OfferState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return normalizeOfferState(JSON.parse(raw) as Partial<OfferState>);
  } catch {
    return null;
  }
}

export function saveStoredOffer(state: OfferState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore quota / private-mode failures.
  }
}

export function loadInitialOffer(): OfferState {
  const fromUrl = parseOfferSearchParams(window.location.search);
  if (fromUrl) {
    return normalizeOfferState(fromUrl);
  }
  return loadStoredOffer() ?? defaultOfferState();
}

export function persistOffer(state: OfferState): void {
  saveStoredOffer(state);
  const params = encodeOfferSearchParams(state);
  const next = params.toString();
  const url = next ? `${window.location.pathname}?${next}` : window.location.pathname;
  window.history.replaceState(null, "", url);
}
