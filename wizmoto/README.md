# Wizmoto – new landing page (/links)

Static page, no build step. Files:

- `index.html` – the whole page (inline styles, Inter from Google Fonts)
- `assets/wizmoto-logo.png`, `assets/wizmoto-annunci.mp4`, `assets/wizmoto-annunci-poster.jpg`

## Putting it live on Django
1. Copy `assets/*` into the static folder (e.g. `static/links/`).
2. Save `index.html` as a template (e.g. `templates/links.html`), add `{% load static %}` at the top
   and replace each `assets/...` path with `{% static 'links/...' %}`.
3. Point the existing `/links` URL to this template (TemplateView is enough).
4. Run `collectstatic` and deploy.

## Things to wire up
- Seller buttons ("Pubblica l'annuncio", "Vendo") point to `/it/accounts/guest/login/`.
  Better: after login, redirect straight to the create-listing form (`?next=`).
- Buyer buttons point to `/it/`.
- IT/EN toggle links are placeholders (`href="#"`): link the EN version when ready.
- Paste the Meta Pixel snippet in `<head>` and fire events on the two main buttons
  (e.g. `ViewContent` for "Compro", `Lead` for "Vendo") so Meta ads can optimise.
- For ads, add UTM parameters to the ad URL (e.g. `/links?utm_source=meta&utm_campaign=...`).
