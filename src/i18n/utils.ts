import { ui, defaultLang, languages, type Lang, type UIKey } from "./ui";

export { languages, defaultLang };
export type { Lang };

export function getLangFromUrl(url: URL): Lang {
  const [, segment] = url.pathname.split("/");
  if (segment === "de" || segment === "it" || segment === "en") return segment;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(
    key: UIKey,
    vars?: Record<string, string | number>,
  ): string {
    const dict = ui[lang] as Record<string, string>;
    const fallback = ui[defaultLang] as Record<string, string>;
    let value = dict[key] ?? fallback[key] ?? key;
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        value = value.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
      }
    }
    return value;
  };
}

export function localizePath(path: string, lang: Lang): string {
  const clean = path.startsWith("/") ? path.slice(1) : path;
  return `/${lang}/${clean}`.replace(/\/+$/, "") || `/${lang}`;
}

export function alternateLanguages(currentLang: Lang, currentPath: string) {
  const stripped = currentPath.replace(/^\/(de|it|en)/, "") || "/";
  return (Object.keys(languages) as Lang[]).map((l) => ({
    lang: l,
    label: languages[l],
    href: localizePath(stripped, l),
    current: l === currentLang,
  }));
}
