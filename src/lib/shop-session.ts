// Shop-Session für Community-Run-Angemeldete.
//
// Gleiches HMAC-Muster wie src/lib/auth.ts (Admin), aber bewusst getrennt:
// eigener Cookie-Name, eigenes Secret (SHOP_SESSION_SECRET), eigene Laufzeit.
// auth.ts bleibt unangetastet, damit der Admin-Login nicht mitbetroffen ist.
//
// Das Cookie belegt nur "diese Registrierungs-ID hat sich per Mail-Link
// ausgewiesen". Ob der Zugang noch gilt (Widerruf/Ablauf), prüft die Shop-Seite
// bei jedem Aufruf zusätzlich in der DB (checkAccessById).
//
// Fehlt SHOP_SESSION_SECRET, ist der Shop fail-closed: die Shop-Seite bricht beim
// Mail-Link mit 500 ab (isShopSessionConfigured), statt den Token dauerhaft in
// der URL stehen zu lassen.

import type { AstroCookies } from "astro";
import crypto from "node:crypto";
import { env } from "@lib/env";

const COOKIE_NAME = "dll_shop";
const SCOPE = "shop";
/** Lebensdauer des Cookies; der eigentliche Zugang läuft über die DB-Frist. */
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30; // 30 Tage

function secret(): string | null {
  const s = env("SHOP_SESSION_SECRET");
  return s && s.length >= 32 ? s : null;
}

/** false → Shop-Zugang über den Mail-Link ist nicht betriebsbereit (fail-closed). */
export function isShopSessionConfigured(): boolean {
  return secret() !== null;
}

function signature(payload: string, key: string): string {
  return crypto.createHmac("sha256", key).update(payload).digest("hex");
}

/** Setzt das Session-Cookie. Gibt false zurück, wenn kein Secret konfiguriert ist. */
export function issueShopSession(
  cookies: AstroCookies,
  registrationId: string,
  accessExpiresAt: string | null,
): boolean {
  const key = secret();
  if (!key) return false;
  let exp = Date.now() + SESSION_TTL_MS;
  const accessExp = accessExpiresAt ? Date.parse(accessExpiresAt) : NaN;
  if (Number.isFinite(accessExp)) exp = Math.min(exp, accessExp);
  const payload = `${SCOPE}.${registrationId}.${exp}`;
  cookies.set(COOKIE_NAME, `${payload}.${signature(payload, key)}`, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: import.meta.env.PROD,
    maxAge: Math.max(0, Math.floor((exp - Date.now()) / 1000)),
  });
  return true;
}

export function clearShopSession(cookies: AstroCookies): void {
  cookies.delete(COOKIE_NAME, { path: "/" });
}

/** Liefert die Registrierungs-ID aus einem gültig signierten, nicht abgelaufenen Cookie. */
export function readShopSession(cookies: AstroCookies): string | null {
  const key = secret();
  if (!key) return null;
  const raw = cookies.get(COOKIE_NAME)?.value;
  if (!raw) return null;
  const parts = raw.split(".");
  if (parts.length !== 4) return null;
  const [scope, id, expStr, sig] = parts;
  const expected = signature(`${scope}.${id}.${expStr}`, key);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || exp < Date.now()) return null;
  if (scope !== SCOPE) return null;
  return id;
}
