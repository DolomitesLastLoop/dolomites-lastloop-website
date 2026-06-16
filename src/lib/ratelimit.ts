import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Sliding-Window-Rate-Limiting pro IP über Upstash Redis.
//
// Fail-open by design: Sind UPSTASH_REDIS_REST_URL / _TOKEN nicht gesetzt
// (z. B. lokal oder bevor die Keys im Vercel-Dashboard hinterlegt sind) oder
// ist Upstash kurzzeitig nicht erreichbar, werden Requests durchgelassen.
// Verfügbarkeit der öffentlichen Formulare hat hier Vorrang vor dem Limit.

const url = import.meta.env.UPSTASH_REDIS_REST_URL as string | undefined;
const token = import.meta.env.UPSTASH_REDIS_REST_TOKEN as string | undefined;

let _redis: Redis | null = null;
function getRedis(): Redis | null {
  if (!url || !token) return null;
  if (!_redis) _redis = new Redis({ url, token });
  return _redis;
}

export type RateLimitName =
  | "contact"
  | "newsletter"
  | "waitlist"
  | "upload-attest";

// tokens / window pro Endpoint und IP.
const LIMITS: Record<RateLimitName, { tokens: number; window: `${number} s` }> =
  {
    contact: { tokens: 5, window: "60 s" },
    newsletter: { tokens: 3, window: "60 s" },
    waitlist: { tokens: 3, window: "60 s" },
    "upload-attest": { tokens: 3, window: "60 s" },
  };

const _limiters = new Map<RateLimitName, Ratelimit>();
function getLimiter(name: RateLimitName): Ratelimit | null {
  const redis = getRedis();
  if (!redis) return null;
  let limiter = _limiters.get(name);
  if (!limiter) {
    const cfg = LIMITS[name];
    limiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(cfg.tokens, cfg.window),
      prefix: `rl:${name}`,
      analytics: false,
    });
    _limiters.set(name, limiter);
  }
  return limiter;
}

// Vercel-Standard: erste IP in x-forwarded-for ist der Client.
export function clientIp(request: Request): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

export interface RateLimitResult {
  ok: boolean;
  /** Sekunden bis zum nächsten erlaubten Request (nur wenn ok === false). */
  retryAfter: number;
}

export async function checkRateLimit(
  name: RateLimitName,
  request: Request,
): Promise<RateLimitResult> {
  const limiter = getLimiter(name);
  if (!limiter) return { ok: true, retryAfter: 0 }; // nicht konfiguriert → durchlassen
  try {
    const ip = clientIp(request);
    const { success, reset } = await limiter.limit(ip);
    if (success) return { ok: true, retryAfter: 0 };
    const retryAfter = Math.max(1, Math.ceil((reset - Date.now()) / 1000));
    return { ok: false, retryAfter };
  } catch {
    return { ok: true, retryAfter: 0 }; // Upstash unerreichbar → durchlassen
  }
}

export function tooManyRequests(retryAfter: number): Response {
  return new Response(
    JSON.stringify({
      error: "Zu viele Anfragen. Bitte später erneut versuchen.",
    }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": String(retryAfter),
      },
    },
  );
}
