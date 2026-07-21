# Nerd On Retainer — Website

Static marketing site for **Nerd On Retainer**, built from the Claude Design handoff.

## Structure
- `index.html` — the landing page (nav, hero, services, how-it-works, pricing, FAQ, CTA, footer)
- `styles.css` — all styling, animations, and responsive rules
- `script.js` — reveal-on-scroll, sticky-nav shrink, FAQ accordion
- `assets/` — mascot art, favicon, social-share image

## Local preview
Any static file server, e.g.:

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

## Deploy
Hosted free on **GitHub Pages** from the `main` branch root.
Live at: https://lee22bird.github.io/nerd-on-retainer/

To point a custom domain here later, add a `CNAME` file and update DNS.

---
*Code. Coffee. Repeat.*
