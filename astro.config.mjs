import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// The v0 sandbox sets this for its preview proxy. The relaxed dev-server
// settings below are only applied there, so local `pnpm dev` keeps Astro's
// and Vite's secure defaults (localhost only, host and origin checks on).
const isV0Sandbox = Boolean(process.env.__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS);

// The v0 preview proxy forwards requests with `Sec-Fetch-Site: cross-site`
// but strips the `Origin` header, so `security.allowedDomains` can never match
// and Astro's dev server returns 403. This middleware runs before Astro's
// check and drops the fetch-metadata header for those origin-less requests.
// `configureServer` never runs during `astro build`.
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

const v0PreviewConfig = isV0Sandbox
  ? {
      server: { host: true, allowedHosts: true },
      // The preview embeds the dev server in a cross-origin iframe. An entry
      // with no hostname allows any origin; this check only runs in dev.
      security: { allowedDomains: [{}] },
    }
  : {};

export default defineConfig({
  output: 'static',
  // GitHub Pages serves the site from the repo subpath, so the Pages
  // workflow sets BASE_PATH=/michjk.dev/. Everywhere else (dev, the v0
  // preview, Vercel) the site lives at the root.
  site: process.env.SITE_URL ?? 'https://michjk.github.io',
  base: process.env.BASE_PATH ?? '/',
  ...v0PreviewConfig,
  vite: {
    plugins: [tailwindcss(), ...(isV0Sandbox ? [allowOriginlessPreviewRequests()] : [])],
    ...(isV0Sandbox && { server: { allowedHosts: true, cors: true } }),
  },
});
