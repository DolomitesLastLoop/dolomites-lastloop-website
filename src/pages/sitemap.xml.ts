import type { APIRoute } from "astro";

export const prerender = false;

const ROUTES = [
  "/",
  "/race-info",
  "/anmeldung",
  "/startliste",
  "/ergebnisse",
  "/faq",
  "/kontakt",
];
const LANGS = ["de", "it", "en"] as const;

export const GET: APIRoute = ({ site }) => {
  const base =
    (import.meta.env.PUBLIC_SITE_URL as string | undefined) ??
    site?.toString() ??
    "https://www.dolomiteslastloop.com";
  const now = new Date().toISOString();

  const urls = LANGS.flatMap((lang) =>
    ROUTES.map((route) => {
      const url = new URL(`/${lang}${route === "/" ? "" : route}`, base).toString();
      const alternates = LANGS.map(
        (l) =>
          `<xhtml:link rel="alternate" hreflang="${l}" href="${new URL(`/${l}${route === "/" ? "" : route}`, base).toString()}"/>`,
      ).join("");
      return `
  <url>
    <loc>${url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === "/" ? "1.0" : "0.7"}</priority>
    ${alternates}
  </url>`;
    }),
  ).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
