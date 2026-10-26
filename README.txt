MyBizGate Website
=================

Static, single-page business website for https://www.mybizgate.com
No build step, no backend. Upload the whole folder to any static host
(Netlify, shared hosting, etc.).

Files
-----
index.html        Main page (all sections, SEO metadata, JSON-LD)
style.css         Responsive styles and UI mockups (design tokens in :root)
script.js         Mobile navigation, active links, reveal animation, footer year
robots.txt        Search engine directives
sitemap.xml       Sitemap (single URL)
site.webmanifest  Web app manifest
favicon.ico       Favicon (root)
assets/
  logo-horizontal.png/.webp Horizontal logo used in header and footer
  mybizgate-hero-960.webp    Responsive mobile/tablet hero artwork
  mybizgate-hero-1600.webp   Responsive desktop hero artwork
  logo.png / logo.webp      Optimised square logo (used for JSON-LD logo URL)
  logo-main.png             Original high-resolution logo (not loaded by the page)
  icon-192.png, icon-512.png, apple-touch-icon.png, favicon-32.png
  og-image.jpg              Open Graph / social sharing image (1200x630)
  thumbs/                   Optimised WebP industry images used by the homepage
  logos/                    Alternative logo options (not loaded by the page)

Editing
-------
- Contact details: search index.html for "601158121239" and "sales@mybizgate.com".
- Pricing: edit the #pricing section. Each card shows a one-time setup fee and
  a yearly fee; its button also carries both amounts in a prefilled WhatsApp message.
- Colours and spacing: edit the CSS variables at the top of style.css.
- WhatsApp links open a prefilled conversation directly (no server needed).
