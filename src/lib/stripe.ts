import Stripe from "stripe";
import { env } from "@lib/env";

let _client: Stripe | null = null;

export function getStripe(): Stripe {
  if (_client) return _client;
  const key = env("STRIPE_SECRET_KEY");
  if (!key) {
    throw new Error("Missing environment variable: STRIPE_SECRET_KEY");
  }
  _client = new Stripe(key, { apiVersion: "2024-06-20" });
  return _client;
}

export const PRICES = {
  earlyBird: env("STRIPE_PRICE_EARLY_BIRD"),
  standard: env("STRIPE_PRICE_STANDARD"),
};

export type Tier = "early_bird" | "standard";

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

// Early-Bird endet 3 Monate vor dem Renntag (Platzhalter 15.05.2027 → 15.02.2027).
// Mitteleuropäische Zeit; nach diesem Zeitpunkt gilt automatisch Standard.
export const EARLY_BIRD_DEADLINE = new Date("2027-02-15T23:59:59+01:00");

export function currentTier(now: Date = new Date()): Tier {
  return now <= EARLY_BIRD_DEADLINE ? "early_bird" : "standard";
}

// Betrag in Cent (EUR) und Anzeige-Label je Tier.
export const TIER_AMOUNT: Record<Tier, number> = {
  early_bird: 8000,
  standard: 10000,
};

export const TIER_PRICE_LABEL: Record<Tier, string> = {
  early_bird: "€ 80",
  standard: "€ 100",
};

export function priceIdFor(tier: Tier): string | undefined {
  return tier === "standard" ? PRICES.standard : PRICES.earlyBird;
}
