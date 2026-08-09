/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SUPABASE_URL: string;
  readonly PUBLIC_SUPABASE_ANON_KEY: string;
  readonly SUPABASE_SERVICE_ROLE_KEY: string;
  readonly STRIPE_SECRET_KEY: string;
  readonly PUBLIC_STRIPE_PUBLISHABLE_KEY: string;
  readonly STRIPE_WEBHOOK_SECRET: string;
  readonly STRIPE_PRICE_EARLY_BIRD: string;
  readonly STRIPE_PRICE_STANDARD: string;
  readonly RESEND_API_KEY: string;
  readonly EMAIL_FROM: string;
  readonly EMAIL_REPLY_TO: string;
  readonly ADMIN_PASSWORD: string;
  readonly ADMIN_SESSION_SECRET: string;
  readonly PUBLIC_SITE_URL: string;
  readonly MAX_PARTICIPANTS: string;
  readonly UPSTASH_REDIS_REST_URL: string;
  readonly UPSTASH_REDIS_REST_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Declaration merging in Astro's global JSX namespace (astro/astro-jsx.d.ts).
// `credentialless` is a COEP opt-out attribute that is not part of the HTML
// standard yet, so Astro's IframeHTMLAttributes does not declare it. It is
// required on the Google Maps embed in src/pages/[lang]/kontakt.astro — see the
// 2026-08-09 entry in CLAUDE.md. Browsers without support ignore it.
declare namespace astroHTML.JSX {
  interface IframeHTMLAttributes {
    credentialless?: boolean | "true" | "false";
  }
}
