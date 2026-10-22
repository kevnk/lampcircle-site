# Lamp Circle site

The one-page landing site for Lamp Circle, a free Mac app that makes live song maps for home-church and living-room worship. It deploys to Netlify at https://lampcircle.truefrontier.app/.

Stack: React 19, Vite, Tailwind CSS 3.4.17, GSAP 3 with ScrollTrigger, lucide-react.

## Run it

You need Node 22 (see `.nvmrc`).

```bash
npm install
npm run dev       # local dev server
npm run build     # production build into dist/
npm run preview   # serve dist/ locally
```

## Deploy

Netlify reads `netlify.toml`: it runs `npm run build`, publishes `dist/`, sets the security headers, and caches `/assets/*` for a year. The build needs no environment variables.

## Where things live

| Path | What it holds |
| --- | --- |
| `src/App.jsx` | Page order: navbar, hero, features, walkthrough video, manifesto, how it works, get started, footer |
| `src/components/` | One file per section, plus `ui.jsx` (pill button, GitHub link, sound bars) |
| `src/site.js` | Download and GitHub links, Unsplash image URLs and alt text, the reduced-motion hook |
| `src/index.css` | Film-grain overlay, button styles, keyframes, reduced-motion rules |
| `tailwind.config.js` | Brand colors and fonts |
| `public/` | Logo files, favicons, `site.webmanifest`, `robots.txt`, `sitemap.xml`, `og.png` |
| `scripts/og.html`, `scripts/og.sh` | Source and render script for the social image |

## Remake the social image

```bash
sh scripts/og.sh
```

It renders `scripts/og.html` to `public/og.png` (1200×630) with headless Google Chrome. Chrome must be installed, and the fonts load from Google Fonts, so it needs a network connection.

## Notes

- The product name is "Lamp Circle", two words, in all copy. Domains, the repo, URLs and file names stay lowercase `lampcircle`.
- Colors, type and logo rules come from the app repo's `docs/brand/README.md`. The logo files are used unchanged.
- Photos are hotlinked from Unsplash.
- Motion follows `prefers-reduced-motion`. With it on, nothing pins or loops and all content shows. The "How it works" cards stack and pin only when each card fits the screen; otherwise they scroll normally.
