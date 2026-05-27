# Agentic AI RCM Optimizer — Faithful Angular Static Conversion

This project is a faithful Angular conversion of the supplied HTML demo. The provided design, colors, layout, typography, copy, embedded images, and original interaction logic are preserved. The only changes are structural changes needed to host the demo inside an Angular static application and to package it for Docker/Azure.

## What is included

- Angular standalone application.
- Original demo rendered at `/` and `/demo` without redesigning the supplied HTML.
- Original CSS and JavaScript split into Angular assets so the app can be built and served statically.
- Converted web-page routes for screenshot-based “How It Works” content:
  - `/how-it-works/denialshield`
  - `/how-it-works/frontdeskshield`
  - `/how-it-works/revenueshield`
  - `/how-it-works/rcm-analytics`
- Original extracted screenshot references in `src/assets/screenshots/`.
- Dockerfile using Node build stage and Nginx static runtime.
- Nginx SPA fallback for Angular routes.
- Azure Static Web Apps fallback config.

## Local development

```bash
npm install
npm start
```

Open:

```text
http://localhost:4200/
```

## Production build

```bash
npm run build
```

Build output:

```text
dist/agentic-ai-rcm-optimizer-angular-faithful/browser
```

## Docker

```bash
docker build -t agentic-ai-rcm-optimizer-angular-faithful .
docker run --rm -p 8080:80 agentic-ai-rcm-optimizer-angular-faithful
```

Open:

```text
http://localhost:8080/
```

## Azure Static Web Apps

Suggested settings:

```text
App location: /
Output location: dist/agentic-ai-rcm-optimizer-angular-faithful/browser
Build command: npm run build
```

The included `public/staticwebapp.config.json` handles route fallback to `index.html`.

## Notes

The original supplied HTML remains available as `src/assets/original/original-demo.html` for comparison. The Angular runtime injects the original HTML body and loads the original script files in the same order to avoid design or interaction changes.
