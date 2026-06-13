import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";

export default defineConfig({
  site: "https://www.dolomiteslastloop.com",
  output: "server",
  adapter: vercel({
    webAnalytics: { enabled: true },
    maxDuration: 30,
  }),
  prefetch: true,
  vite: {
    ssr: {
      noExternal: ["@supabase/supabase-js"],
    },
  },
});
