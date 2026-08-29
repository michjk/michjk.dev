import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  // No custom domain yet, so this deploys to the repo's GitHub Pages
  // subpath. Once a domain is added: set site to the domain, drop base,
  // and add a public/CNAME file with the domain.
  site: 'https://michjk.github.io',
  base: '/michjk.dev/',
  vite: {
    plugins: [tailwindcss()],
  },
});
