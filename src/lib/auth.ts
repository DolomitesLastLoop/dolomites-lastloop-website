import type { AstroCookies } from "astro";
import crypto from "node:crypto";

const ADMIN_PASSWORD = import.meta.env.ADMIN_PASSWORD as string | undefined;
const SESSION_SECRET = import.meta.env.ADMIN_SESSION_SECRET as string | undefined;
const COOKIE_NAME = "dll_admin";
const TTL_MS = 1000 * 60 * 60 * 8; // 8h

function signature(payload: string, secret: string): string {
  return crypto.createHmac("sha256", secret).update(payload).digest("hex");
}

export function verifyPassword(input: string): boolean {
  if (!ADMIN_PASSWORD) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(ADMIN_PASSWORD);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function issueSession(cookies: AstroCookies): void {
  if (!SESSION_SECRET) {
    throw new Error("Missing environment variable: ADMIN_SESSION_SECRET");
  }
  const exp = Date.now() + TTL_MS;
  const payload = `admin.${exp}`;
  const sig = signature(payload, SESSION_SECRET);
  cookies.set(COOKIE_NAME, `${payload}.${sig}`, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: import.meta.env.PROD,
    maxAge: TTL_MS / 1000,
  });
}

export function clearSession(cookies: AstroCookies): void {
  cookies.delete(COOKIE_NAME, { path: "/" });
}

export function isAuthenticated(cookies: AstroCookies): boolean {
  if (!SESSION_SECRET) return false;
  const raw = cookies.get(COOKIE_NAME)?.value;
  if (!raw) return false;
  const parts = raw.split(".");
  if (parts.length !== 3) return false;
  const [scope, expStr, sig] = parts;
  const payload = `${scope}.${expStr}`;
  const expected = signature(payload, SESSION_SECRET);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || exp < Date.now()) return false;
  return scope === "admin";
}
