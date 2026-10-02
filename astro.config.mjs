import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";

export default defineConfig({
  site: "https://www.dolomiteslastloop.com",
  output: "server",
  adapter: vercel({
    // Aus: Der Adapter würde das Analytics-Script ohne Einwilligung einfügen. Geladen wird
    // es stattdessen erst nach Einwilligung in „statistics“ (BaseLayout, data-consent).
    webAnalytics: { enabled: false },
    maxDuration: 30,
  }),
  prefetch: true,
  vite: {
    ssr: {
      noExternal: ["@supabase/supabase-js"],
    },
  },
});
