// Consent-Mechanik (eigener Code, kein Drittanbieter-Skript). Geladen von
// ConsentBanner.astro auf allen Seiten außer /admin. Doku: CLAUDE.md → „Consent".
//
// Öffentliche Schnittstelle:
//   window.dllConsent.get()        → { v, ts, c: { media, statistics, marketing } } | null
//   window.dllConsent.has(cat)     → boolean ("necessary" ist immer true)
//   window.dllConsent.open()       → Einstellungen öffnen (z. B. Footer-Link)
//   window-Event "dll:consent-changed" (detail = neuer Zustand)
//
// Gesteuerte Inhalte (vor der Einwilligung KEIN Request):
//   <template data-consent="media">…Embed…</template>   → wird eingesetzt/entfernt
//   <div data-consent-placeholder="media">…</div>       → sichtbar solange nicht erlaubt
//   <script type="text/plain" data-consent="statistics" data-src="/x.js"></script>
//                                                       → wird bei Einwilligung aktiviert
//   <button data-consent-grant="media">                 → erlaubt genau diese Kategorie
//   <a href="…/cookie-policy#settings" data-consent-open> → öffnet die Einstellungen

import {
  CONSENT_COOKIE,
  CONSENT_MAX_AGE_S,
  CONSENT_VERSION,
  OPTIONAL_CATEGORIES,
  VISIBLE_CATEGORIES,
  type ConsentCategory,
  type OptionalCategory,
} from "@lib/consent-config";

type Choices = Record<OptionalCategory, boolean>;
type ConsentState = { v: number; ts: number; c: Choices };

declare global {
  interface Window {
    dllConsent?: {
      get: () => ConsentState | null;
      has: (category: ConsentCategory) => boolean;
      open: () => void;
    };
  }
}

const noChoices = (): Choices => ({ media: false, statistics: false, marketing: false });

function read(): ConsentState | null {
  try {
    // document.cookie kann werfen (z. B. Sandbox/blockierte Cookies) → wie „keine Entscheidung".
    const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE}=([^;]*)`));
    if (!match) return null;
    const raw = JSON.parse(decodeURIComponent(match[1]));
    if (raw?.v !== CONSENT_VERSION || typeof raw.ts !== "number") return null;
    // Ablauf zusätzlich am Zeitstempel prüfen (nicht nur über Max-Age des Browsers).
    if (Date.now() - raw.ts > CONSENT_MAX_AGE_S * 1000) return null;
    const c = noChoices();
    for (const cat of OPTIONAL_CATEGORIES) c[cat] = raw.c?.[cat] === true;
    return { v: raw.v, ts: raw.ts, c };
  } catch {
    return null;
  }
}

function write(c: Choices): ConsentState {
  const state: ConsentState = { v: CONSENT_VERSION, ts: Date.now(), c };
  // Secure: auf https immer; auf http nur für localhost (Browser erlauben es dort).
  const secure =
    location.protocol === "https:" || location.hostname === "localhost" ? "; Secure" : "";
  try {
    document.cookie =
      `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(state))}` +
      `; Max-Age=${CONSENT_MAX_AGE_S}; Path=/; SameSite=Lax${secure}`;
  } catch {
    // Cookie nicht schreibbar: Entscheidung gilt dann nur für diese Seitenansicht
    // (Banner schließt trotzdem, Seite bleibt bedienbar); beim nächsten Laden fragt er erneut.
  }
  return state;
}

let state = read();

function has(category: ConsentCategory): boolean {
  if (category === "necessary") return true;
  return state?.c[category as OptionalCategory] === true;
}

// ─── Gesteuerte Inhalte ───
const inserted = new WeakMap<HTMLTemplateElement, Element[]>();
let pendingReload = false;

function applyContent() {
  document.querySelectorAll<HTMLTemplateElement>("template[data-consent]").forEach((tpl) => {
    const on = has(tpl.dataset.consent as ConsentCategory);
    const nodes = inserted.get(tpl);
    if (on && !nodes) {
      const frag = tpl.content.cloneNode(true) as DocumentFragment;
      const els = Array.from(frag.children);
      tpl.after(frag);
      inserted.set(tpl, els);
    } else if (!on && nodes) {
      nodes.forEach((n) => n.remove());
      inserted.delete(tpl);
    }
  });

  document.querySelectorAll<HTMLElement>("[data-consent-placeholder]").forEach((el) => {
    el.hidden = has(el.dataset.consentPlaceholder as ConsentCategory);
  });

  document
    .querySelectorAll<HTMLScriptElement>('script[type="text/plain"][data-consent]')
    .forEach((orig) => {
      const on = has(orig.dataset.consent as ConsentCategory);
      const active = orig.dataset.consentActive === "true";
      if (on && !active) {
        const s = document.createElement("script");
        for (const { name, value } of Array.from(orig.attributes)) {
          if (name === "type" || name === "data-consent" || name === "data-src") continue;
          s.setAttribute(name, value);
        }
        if (orig.dataset.src) s.src = orig.dataset.src;
        else s.textContent = orig.textContent;
        orig.after(s);
        orig.dataset.consentActive = "true";
      } else if (!on && active) {
        // Geladene Skripte lassen sich nicht entladen → Seite einmal neu laden.
        pendingReload = true;
      }
    });
}

function save(c: Choices) {
  state = write(c);
  applyContent();
  window.dispatchEvent(new CustomEvent("dll:consent-changed", { detail: state }));
  if (pendingReload) location.reload();
}

// ─── Banner ───
const banner = document.getElementById("dll-consent");
const prefs = banner?.querySelector<HTMLElement>("[data-consent-prefs]");
const settingsBtn = banner?.querySelector<HTMLButtonElement>('[data-consent-action="settings"]');
const saveBtn = banner?.querySelector<HTMLButtonElement>('[data-consent-action="save"]');
const title = banner?.querySelector<HTMLElement>("[data-consent-title]");
let opener: HTMLElement | null = null;

function setPrefsOpen(open: boolean) {
  if (!prefs || !settingsBtn || !saveBtn) return;
  prefs.hidden = !open;
  saveBtn.hidden = !open;
  settingsBtn.setAttribute("aria-expanded", String(open));
  if (open) {
    banner!.querySelectorAll<HTMLInputElement>("input[data-consent-cat]").forEach((input) => {
      input.checked = has(input.dataset.consentCat as ConsentCategory);
    });
  }
}

function show(fromUser: boolean) {
  if (!banner) return;
  banner.hidden = false;
  if (fromUser) {
    opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setPrefsOpen(true);
    title?.focus();
  }
}

function hide() {
  if (!banner) return;
  // Fokus aus dem Banner holen, bevor er verschwindet.
  const hadFocus = banner.contains(document.activeElement);
  banner.hidden = true;
  setPrefsOpen(false);
  if (hadFocus) {
    if (opener?.isConnected) opener.focus();
    else {
      const main = document.getElementById("main");
      if (main && !main.hasAttribute("tabindex")) main.setAttribute("tabindex", "-1");
      main?.focus({ preventScroll: true });
    }
  }
  opener = null;
}

function decide(action: string) {
  if (action === "all") {
    const c = noChoices();
    for (const cat of OPTIONAL_CATEGORIES) c[cat] = VISIBLE_CATEGORIES[cat];
    save(c);
  } else if (action === "necessary") {
    save(noChoices());
  } else if (action === "save" && banner) {
    const c = noChoices();
    banner.querySelectorAll<HTMLInputElement>("input[data-consent-cat]").forEach((input) => {
      c[input.dataset.consentCat as OptionalCategory] = input.checked;
    });
    save(c);
  } else if (action === "close") {
    // × bzw. Escape: ohne bisherige Entscheidung = „Nur notwendige" (Garante 2021),
    // mit bestehender Entscheidung = nur schließen, nichts ändern.
    if (!state) save(noChoices());
  } else {
    return;
  }
  hide();
}

banner?.addEventListener("click", (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLElement>("[data-consent-action]");
  if (!btn) return;
  const action = btn.dataset.consentAction!;
  if (action === "settings") {
    setPrefsOpen(prefs?.hidden ?? false);
    return;
  }
  decide(action);
});

banner?.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    e.stopPropagation();
    decide("close");
  }
});

// Capture-Phase auf document: muss vor dem Seitenwechsel-Handler in BaseLayout
// (Listener auf body) laufen, sonst würde der Footer-Link navigieren.
document.addEventListener(
  "click",
  (e) => {
    const target = e.target as HTMLElement;
    const openLink = target.closest<HTMLElement>("[data-consent-open]");
    if (openLink && banner) {
      e.preventDefault();
      e.stopPropagation();
      show(true);
      return;
    }
    const grant = target.closest<HTMLElement>("[data-consent-grant]");
    if (grant) {
      const cat = grant.dataset.consentGrant as OptionalCategory;
      if (!OPTIONAL_CATEGORIES.includes(cat)) return;
      e.preventDefault();
      const wasUndecided = !state;
      save({ ...(state?.c ?? noChoices()), [cat]: true });
      if (wasUndecided || !banner?.hidden) hide();
    }
  },
  true,
);

window.dllConsent = {
  get: () => (state ? { ...state, c: { ...state.c } } : null),
  has,
  open: () => show(true),
};

applyContent();
// Das erstmalige Einblenden ohne Entscheidung übernimmt das Inline-Script in
// ConsentBanner.astro (wartet auf die Webfonts, siehe dort).
// Direktaufruf der Cookie-Policy über den Footer-Link ohne JS-Abfang (z. B. von /admin).
if (location.hash === "#settings" && banner) show(true);
