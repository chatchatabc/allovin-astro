import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import { astroImageTools } from "astro-imagetools";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import svelte from "@astrojs/svelte";
import compress from "astro-compress";

export default defineConfig({
  site: "https://allovin.pages.dev",
  integrations: [
    tailwind(),
    mdx(),
    astroImageTools,
    sitemap(),
    robotsTxt(),
    svelte(),
    compress({
      // Regex for .webp files
      exclude: [".webp"],
    }),
  ],
});
