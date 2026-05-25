import Stripe from "stripe";

const key = import.meta.env.STRIPE_SECRET_KEY as string | undefined;

let _client: Stripe | null = null;

export function getStripe(): Stripe {
  if (_client) return _client;
  if (!key) {
    throw new Error("Missing environment variable: STRIPE_SECRET_KEY");
  }
  _client = new Stripe(key, { apiVersion: "2024-06-20" });
  return _client;
}

export const PRICES = {
  earlyBird: import.meta.env.STRIPE_PRICE_EARLY_BIRD as string | undefined,
  standard: import.meta.env.STRIPE_PRICE_STANDARD as string | undefined,
};

export const TICKET_TIERS = [
  {
    id: "early_bird" as const,
    labelKey: "signup.ticket.earlybird" as const,
    priceLabel: "€ 80",
    envKey: "STRIPE_PRICE_EARLY_BIRD",
  },
  {
    id: "standard" as const,
    labelKey: "signup.ticket.standard" as const,
    priceLabel: "€ 100",
    envKey: "STRIPE_PRICE_STANDARD",
  },
];
