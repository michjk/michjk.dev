import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// The v0 preview proxy forwards requests with `Sec-Fetch-Site: cross-site`
// but strips the `Origin` header, so `security.allowedDomains` can never match
// and Astro's dev server returns 403. This dev-only middleware runs before
// Astro's check and drops the fetch-metadata header for those origin-less
// requests. `configureServer` never runs during `astro build`.
function allowOriginlessPreviewRequests() {
  return {
    name: 'allow-originless-preview-requests',
    configureServer(server) {
      return () => {
        server.middlewares.stack.unshift({
          route: '',
          handle(req, _res, next) {
            if (req.headers['sec-fetch-site'] === 'cross-site' && !req.headers.origin) {
              delete req.headers['sec-fetch-site'];
            }
            next();
          },
        });
      };
    },
  };
}

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
    plugins: [tailwindcss(), allowOriginlessPreviewRequests()],
    server: {
      allowedHosts: true,
      cors: true,
    },
  },
});
