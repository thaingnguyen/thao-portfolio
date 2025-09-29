// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://thao-portfolio.com",
  vite: {
    plugins: [tailwindcss()]
  },

  server: {
  },

  integrations: [icon(), sitemap(), robotsTxt()]
});
