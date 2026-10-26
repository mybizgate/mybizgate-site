# Repository Guidelines

## Project Structure & Module Organization

This repository contains independent, buildless static websites:

- `autogate/`, `beautygate/`, `dentalgate/`, and `supplygate/` are single-page demos with HTML, CSS, and JavaScript in `index.html`; some include fallback artwork in `images/`.
- `petgate/` follows the same model, with screenshots and optimized images under `petgate/images/`.
- `mybizgate-site/` is the main marketing site. Markup, styling, and behavior are split across `index.html`, `style.css`, and `script.js`; SEO files and assets sit alongside them.

Keep changes within the relevant site directory. Use relative asset paths so pages continue to work on static hosting.

## Build, Test, and Development Commands

No dependency installation or compilation is required. From the repository root:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000/mybizgate-site/` or another site directory to test it. Check the standalone JavaScript with:

```bash
node --check mybizgate-site/script.js
```

There is no configured test runner, linter, or formatter. Avoid generated dependency folders for simple changes.

## Coding Style & Naming Conventions

Follow the file's existing style. Use two-space indentation in expanded HTML, CSS, and JavaScript; preserve compact formatting in self-contained demos unless a focused reformat improves readability. Prefer semantic HTML, CSS custom properties, kebab-case CSS classes, and descriptive camelCase JavaScript names. Maintain accessibility attributes, visible focus states, meaningful image `alt` text, and reduced-motion behavior.

## Testing Guidelines

Verify the changed page at desktop and mobile widths. Exercise navigation, forms, local-storage flows, copy actions, WhatsApp links, and image fallbacks as applicable. Check the browser console and confirm every edited asset path resolves. For visual changes, compare screenshots at representative widths such as 1440 px and 390 px.

## Commit & Pull Request Guidelines

This checkout has no accessible Git history, so no established commit convention can be inferred. Use short, imperative, scoped subjects, for example `beautygate: improve booking form validation`. Keep commits focused on one site or concern.

Pull requests should identify affected directories, summarize user-visible changes, list manual checks, and include desktop/mobile screenshots for UI work. Link the relevant issue when available and call out changes to contact details, pricing, external image sources, or WhatsApp message content.

## Security & Configuration

These pages run entirely in the browser. Never commit credentials or private customer data. Treat `localStorage` records as demonstration data only, and keep displayed pricing/contact details synchronized with their linked messages and metadata.
