# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev       # dev server on :4321
pnpm build     # static output to dist/
pnpm preview   # serve dist/ locally
```

Astro 7 **daemonizes the dev server** — it detaches from the shell, so killing the
foreground process does nothing. Use `pnpm astro dev stop`, `pnpm astro dev status`,
`pnpm astro dev logs`.

There is no test suite, linter, or typecheck script. `tsconfig.json` extends
`astro/tsconfigs/strict`, so type errors surface in the editor; `astro check` would
need `@astrojs/check` + `typescript` installed first.

## Package manager (pnpm 11)

**pnpm 11 silently ignores the `"pnpm"` field in `package.json`.** All pnpm settings
live in `pnpm-workspace.yaml` — putting `overrides` or `onlyBuiltDependencies` in
`package.json` fails with no warning. Current contents:

- `allowBuilds` — packages allowed to run install scripts (`esbuild`, `sharp`).
  `pnpm approve-builds --all` writes here; the interactive form hangs a non-TTY shell.
- `overrides` — pins `sharp >=0.35.3` and `svgo >=4.0.2`, both transitive Astro deps
  patched for CVEs. Don't drop these without re-running `pnpm audit`.

A user-global `minimumReleaseAge` (7 days) blocks installing just-published versions.
`pnpm add <pkg>@<range>` quietly resolves to the newest version clearing that window
rather than the true latest — so a fresh install may not land on `latest`.

## Architecture

Static single-page portfolio. Astro 7, `output: 'static'`, **no UI framework** — no
React/Vue/Svelte. All interactivity is vanilla TS inside Astro `<script>` tags, which
Astro bundles as modules (TypeScript works; `is:inline` opts out of bundling).

`src/pages/index.astro` composes section components; `BaseLayout.astro` provides the
document shell.

### Content

All copy lives in `src/data/portfolio.ts` as typed exports (`identity`, `about`,
`experience`, `education`, `skills`, `links`). **Edit content there, not in components** —
components import and map over it. `identity.portfolio` and `identity.blog` are still
`"#"` placeholders.

### Styling — read this before writing markup

Tailwind v4 is installed and `@import "tailwindcss"` sits at the top of
`src/styles/global.css`, but **no component uses Tailwind utility classes.** In practice
Tailwind only contributes its preflight reset. Do not reach for `flex gap-4 text-sm`.

The actual convention is two-part:

1. **Inline `style={{ }}` objects** (camelCased keys, Astro supports the object form) for
   layout and one-off styling, with every value referencing a CSS custom property:
   `style={{ color: "var(--text-secondary)", padding: "0 var(--margin)" }}`.
2. **A small set of semantic classes** defined in `global.css`: `.section`,
   `.section-label`, `.section-title`, `.btn` + `.btn-primary`/`.btn-secondary`,
   `.badge` + `.badge-skill`, `.card-base`, `.icon-btn`.

Design tokens in `global.css` cover color, spacing (`--space-*`, `--gutter`, `--margin`),
radii, `--content-max`/`--prose-max`/`--nav-h`, easing/duration, and font stacks. Add a
token rather than hardcoding a value.

`ElasticLine.astro` is the sole component with a scoped `<style>` block.

### Theming

Dark is the default. Tokens are redefined under `:root.dark` and `:root.light`, and the
active theme is a class on `<html>`. Two places must stay in sync, both hardcoded to the
literals `"dark"` / `"light"`:

- `BaseLayout.astro` — an `is:inline` script in `<head>` reads `localStorage["theme"]` and
  sets the class **before first paint** (prevents flash). It must stay inline and
  unbundled.
- `Nav.astro` — the toggle button writes `localStorage`, swaps the class, and syncs the
  sun/moon icons plus the scrolled-nav background (which is theme-dependent).

### Motion

`src/scripts/motion.ts` exports `tryAnimate`, `setupScrollReveals`, `setupHeroEntries`,
`setupTextReveals`. The guiding rule: **elements are visible by default and animation is
progressive enhancement** — `tryAnimate` swallows failures and leaves the element in its
final state, so never rely on an animation to make content appear.

Animations are declared with data attributes in markup, not wired up imperatively:

- `data-reveal="up|down|left|right"` + optional `data-delay` (ms) — scroll-triggered
- `data-hero-entry` + `data-delay` — on-load entry
- `data-text-reveal` + optional `data-stagger` on a container whose words are wrapped in
  `[data-word]` spans — per-word stagger

Each section component calls the relevant `setup*()` in its own `<script>`. These
functions query the **whole document**, so they run once per importing component and
re-scan every matching element; the IntersectionObserver `unobserve` keeps repeats cheap.

### Icons

`Icon.astro` holds a hardcoded `Record<string, string>` of inline SVG path markup, keyed
by a **closed TypeScript union** of icon names, rendered via `set:html`. There is no icon
library. To add an icon, extend both the `Props["name"]` union and the `paths` record —
the union is what keeps the `set:html` safe, so don't widen it to `string`.

## Deployment

`.github/workflows/deploy.yml` builds with pnpm and publishes to GitHub Pages on push to
`main` (Pages source must be set to "GitHub Actions").

No custom domain yet, so `astro.config.mjs` sets `base: '/michjk.dev/'`. **Consequence:**
references to files in `public/` must be prefixed with `import.meta.env.BASE_URL`
(see the font preloads and favicon in `BaseLayout.astro`) — a bare `/fonts/...` breaks
under the subpath. `global.css` `@font-face` URLs are rewritten by Vite automatically.
The migration steps for moving to a real domain are commented in `astro.config.mjs`.
