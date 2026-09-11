# DIA PROD

The website for DIA PROD — a film and photography production studio.

**Live:** https://USERNAME.github.io/diaprod/

## What it is

A single self-contained page. No build step, no dependencies, no framework — one `index.html`
containing the markup, styles and script. Open it in a browser and it runs.

- Bilingual EN / IT, switched from the nav (choice is remembered per browser)
- Screens: Home, Portfolio, Packages, Track, Book a call, Sign in, and an 8-step project brief
- Project briefs get a reference (`DIA-XXXX`) and are stored in the visitor's own browser
  via `localStorage` — nothing is sent anywhere
- Placeholder film stills are generated on a `<canvas>` at load, so the page ships with
  no image files

## Design system

Built on a token system defined at the top of `index.html` under `:root` — colours, type
scale, spacing, radii. The rules it follows:

- Pure black stages alternating with white detail bands; depth comes from surface contrast,
  never from shadows or gradients
- One filled chromatic button on the page (`--apple-blue`); orange, violet and teal appear
  only as category eyebrows
- SF Pro Display / SF Pro Text, with Inter loaded from Google Fonts as the substitute
- Restricted radii: 10 / 28 / 32 / 36 / 980px

Change a token and it propagates across every screen.

## Running it locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploying

GitHub Pages serves this directly. In **Settings → Pages**, set the source to the `main`
branch, root folder. The `.nojekyll` file stops Jekyll from touching the output.

For a custom domain (e.g. `diaprod.it`), add a `CNAME` file containing the domain, then
point the DNS at GitHub Pages.

## Replacing the placeholder imagery

The generated stills are stand-ins. To use real frames, add your images and swap the
`still(...)` calls in the script for paths — each project in the `WORK` array can take an
`img` property, and the video lightbox already accepts a YouTube ID via `yt`.

## Contact

studio@diaprod.it · +39 377 090 3078
