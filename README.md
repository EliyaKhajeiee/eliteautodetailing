# Elite Auto Detailing — Website

Professional multi-page website for **Elite Auto Detailing** in Clute, TX — ceramic coating, window tint, and interior/exterior detailing, serving Brazoria County.

Static HTML/CSS/JS. No build step, no dependencies. Just open `index.html` or host the folder anywhere (GitHub Pages, Netlify, etc.).

## Pages
- `index.html` — Home (hero, services, about, stats, testimonials, FAQ, CTA)
- `ceramic-coating.html` — Ceramic Coating service
- `window-tint.html` — Window Tint service
- `detailing.html` — Interior & Exterior Detailing
- `about.html` — About / service areas
- `contact.html` — Contact info, hours, map, and quote form

## Design
- Light & clean minimalist system in `styles.css`
- Custom vanilla-JS animations in `app.js`: scroll reveals, sticky header, scroll-progress bar, hero intro, animated counters, subtle parallax, magnetic buttons, mobile drawer, and an animated FAQ accordion.
- Fully responsive; respects `prefers-reduced-motion`.

## Quote form
The contact form opens a pre-filled email to `sean.eliteauto@gmail.com` (no backend needed). To route submissions to an inbox/CRM instead, swap the `mailto` handler in `app.js` (`quoteForm()`) for a Formspree/Netlify Forms endpoint.

## Photos
Images are currently referenced from the existing Wix CDN. To make the site fully self-contained, download them into an `assets/` folder and update the `src` paths.

## Deploy on GitHub Pages
Push to `main`, then in the repo: **Settings → Pages → Build from branch → `main` / root**.

---
Contact: (979) 264-1718 · 641 Dixie Drive, Clute, TX 77531
