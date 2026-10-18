# Self care

My skin and teeth routines as a small static site, hosted on GitHub Pages.

Live: https://sophiamariem.github.io/selfcare/

- `index.html`: skin schedule (daily, week, limits, if/then, procedure plan, treatments, shelf)
- `teeth.html`: teeth whitening routine
- `style.css`, `app.js`: shared styles, light/dark toggle, "Tonight" and today highlights
- `sw.js`, `manifest.webmanifest`, icons: home-screen app and offline support

Pages are `noindex` so they stay out of search engines.

When changing `style.css` or `app.js`, bump the `?v=` number in both HTML files and in `sw.js` (and the `CACHE` name) so phones pick up the new version.
