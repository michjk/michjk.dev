import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  // No custom domain yet, so this deploys to the repo's GitHub Pages
  // subpath. Once a domain is added: set site to the domain, drop base,
  // and add a public/CNAME file with the domain.
  site: 'https://michjk.github.io',
  // Dev serves from root so the v0 preview (which loads "/") works.
  base: process.argv.includes('dev') ? '/' : '/michjk.dev/',
  server: {
    host: true,
    allowedHosts: true,
  },
  security: {
    // The v0 preview embeds the dev server in a cross-origin iframe, and
    // Astro's dev server answers those subresource requests with 403
    // "Cross-origin request blocked". An entry with no hostname allows any
    // origin; this check only runs in dev, so the static build is unaffected.
    allowedDomains: [{}],
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: true,
      cors: true,
    },
  },
});
