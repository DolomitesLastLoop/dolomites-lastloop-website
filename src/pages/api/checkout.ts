import type { APIRoute } from "astro";
import { isRegistrationEnabled } from "@lib/registration";
import { runCheckout, bad } from "@lib/checkout-core";

export const prerender = false;

export const POST: APIRoute = async ({ request, url }) => {
  // Security-Gate: Bei deaktivierter Anmeldung darf serverseitig KEINE neue,
  // zahlungspflichtige Checkout-Session entstehen — auch nicht per direktem POST
  // (das Verstecken des Formulars allein ist kein Schutz). Fail-safe via @lib/registration.
  //
  // Das ist die EINZIGE Prüfung, die der VIP-Weg (/api/checkout-vip) nicht durchläuft.
  // Alles Weitere — Tier-Fenster und damit der gültige Preis, Pflichtfelder, Kapazitäts-
  // Gate gegen MAX_PARTICIPANTS, Stripe-Session, DB-Insert — liegt in @lib/checkout-core
  // und gilt für beide Endpoints gleichermaßen. Siehe CLAUDE.md → "VIP-Anmeldeweg".
  if (!isRegistrationEnabled()) return bad("Registration closed", 403);

  return runCheckout(request, url);
};
