# DIA PROD

The website for DIA PROD — a film and photography production studio.

**Live:** https://diprow.github.io/DIAPROD/

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

## Imagery

Real frames live in `photos/` (long edge 1800px, 150–450&nbsp;KB each). Each project in the
`WORK` array carries two optional properties:

- `img` — path to the frame, e.g. `photos/02.jpg`
- `pos` — `background-position`, which keeps the subject in shot when a tall photograph is
  cropped into a wide slot (e.g. `center 25%` pulls the crop up toward a face)

Drop `img` from a project and the canvas-generated placeholder returns for it, so the page
still works with no image files at all. The hero frame is set separately in `HERO`.
`photos/06.jpg` and `photos/10.jpg` are unused spares.

In the lightbox, real photographs get `background-size: contain` (class `fit`) so the full
frame shows uncropped on the big view. The video lightbox still accepts a YouTube ID via `yt`.

## Contact

studio@diaprod.it · +39 377 090 3078
