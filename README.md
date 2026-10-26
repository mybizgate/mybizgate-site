# MyBizGate Static Websites

A collection of buildless, responsive websites created by MyBizGate for Malaysian businesses. The repository includes the main MyBizGate marketing site and several industry-specific demos with enquiry, booking, ordering, and WhatsApp handoff experiences.

## Websites

| Directory | Website | Description |
| --- | --- | --- |
| `mybizgate-site/` | MyBizGate | Main marketing site for website and business-system services. |
| `autogate/` | Auto Gate Car Saloon | Automotive detailing and service enquiry demo. |
| `beautygate/` | Beauty Gate Hair & Beauty Lounge | Salon services and appointment enquiry demo. |
| `dentalgate/` | Dental Gate Clinic | Family dental services and appointment enquiry demo. |
| `supplygate/` | RuncitHub | Retail supply catalogue and ordering demo. |
| `petgate/` | PetGate | Cat boarding, grooming, daycare, and booking demo. |

Each website is independent and can be deployed on its own. Most demo sites keep their HTML, CSS, and JavaScript together in a single `index.html`; `mybizgate-site/` uses separate `index.html`, `style.css`, and `script.js` files.

## Run locally

No package installation or build step is required. From the repository root, start a local static server:

```bash
python3 -m http.server 8000
```

Then open one of these URLs:

- <http://localhost:8000/mybizgate-site/>
- <http://localhost:8000/autogate/>
- <http://localhost:8000/beautygate/>
- <http://localhost:8000/dentalgate/>
- <http://localhost:8000/supplygate/>
- <http://localhost:8000/petgate/>

## Validate changes

Check the standalone JavaScript used by the main site:

```bash
node --check mybizgate-site/script.js
```

There is no automated test runner, linter, or formatter. After making changes, manually verify the affected site at desktop and mobile widths. Check navigation, forms, WhatsApp links, image fallbacks, browser-console errors, and any `localStorage` flows relevant to the page.

## Project structure

```text
.
├── autogate/          # Automotive website demo
├── beautygate/        # Hair and beauty website demo
├── dentalgate/        # Dental clinic website demo
├── supplygate/        # Retail supply website demo
├── petgate/           # Pet-care website demo and images
├── mybizgate-site/    # Main marketing site, SEO files, and assets
└── AGENTS.md          # Repository contribution guidelines
```

Images and other assets live inside their respective site directories. Keep asset URLs relative so every site continues to work when hosted from a subdirectory or deployed independently.

## Deployment

These sites are entirely static and can be uploaded to services such as GitHub Pages, Netlify, or conventional shared hosting. Deploy the contents of the selected site directory as the hosting root. The main site's file and asset details are documented in [`mybizgate-site/README.txt`](mybizgate-site/README.txt).

## Demo data and privacy

- Forms run in the browser and may prepare an enquiry to continue through WhatsApp.
- Some demos save enquiry details in the browser's `localStorage`; this is demonstration data, not a production data store.
- No backend, authentication service, or online payment flow is included.
- Do not add credentials, private customer information, or production secrets to the repository.
- Keep displayed prices and contact details consistent with linked messages and metadata.

## Contributing

Keep changes scoped to the relevant site directory and follow the conventions in [`AGENTS.md`](AGENTS.md). Preserve accessibility attributes, meaningful image alternative text, visible focus states, responsive behavior, and reduced-motion support.
